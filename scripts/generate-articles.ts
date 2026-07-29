import fs from "fs";
import path from "path";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "sk-0003200be8bc4cd893cc830fe29411de";
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const DATA_DIR = path.join(process.cwd(), "data");
const ARTICLES_DIR = path.join(DATA_DIR, "articles");
const OBSIDIAN_DIR = process.env.OBSIDIAN_VAULT_PATH || "C:/Users/Administrator/Desktop/凡多笔记/知识库/03-热点素材/信号分析文章";

interface SignalSeed {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  strength: string;
  keywords: string[];
  sources: { label: string; url: string }[];
}

interface RedditPost {
  title: string;
  subreddit: string;
  ups: number;
  num_comments: number;
  permalink: string;
}

interface NewsItem {
  title: string;
  source: string;
  time: string;
  summary: string;
  url: string;
}

interface GeneratedArticle {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  strength: string;
  coreJudgment: string;
  sections: { heading: string; body: string }[];
  sources: { label: string; url: string }[];
  related: { title: string; slug: string }[];
  redditPosts: RedditPost[];
  newsItems: NewsItem[];
  generatedAt: string;
}

function loadSignals(): SignalSeed[] {
  const raw = fs.readFileSync(path.join(DATA_DIR, "signals.json"), "utf-8");
  return JSON.parse(raw).signals;
}

/* ===== Direct Reddit Fetch (no local server needed) ===== */
async function fetchRedditDirect(keyword: string): Promise<RedditPost[]> {
  try {
    const [hotRes, popularRes] = await Promise.all([
      fetch("https://www.reddit.com/r/all/hot.json?limit=25", {
        headers: { "User-Agent": "trending-hot/1.0" },
        signal: AbortSignal.timeout(20000),
      }),
      fetch("https://www.reddit.com/r/popular/hot.json?limit=25", {
        headers: { "User-Agent": "Mozilla/5.0 (trending-hot)" },
        signal: AbortSignal.timeout(20000),
      }),
    ]);

    const posts: RedditPost[] = [];

    if (hotRes.ok) {
      const hotJson = await hotRes.json();
      posts.push(
        ...hotJson.data.children.map((c: any) => ({
          title: c.data.title,
          subreddit: c.data.subreddit,
          ups: c.data.ups,
          num_comments: c.data.num_comments,
          permalink: c.data.permalink,
        }))
      );
    }

    if (popularRes.ok) {
      const popJson = await popularRes.json();
      posts.push(
        ...popJson.data.children.map((c: any) => ({
          title: c.data.title,
          subreddit: c.data.subreddit,
          ups: c.data.ups,
          num_comments: c.data.num_comments,
          permalink: c.data.permalink,
        }))
      );
    }

    const seen = new Set<string>();
    const unique = posts.filter((p) => {
      if (seen.has(p.permalink)) return false;
      seen.add(p.permalink);
      return true;
    });

    unique.sort((a, b) => b.ups - a.ups);

    return unique
      .filter((p) =>
        keyword.split(" ").some((kw) =>
          p.title.toLowerCase().includes(kw.toLowerCase())
        )
      )
      .slice(0, 5);
  } catch (e) {
    console.error(`Reddit fetch failed for ${keyword}:`, e);
    return [];
  }
}

/* ===== Direct News Fetch (no local server needed) ===== */
async function fetchNewsDirect(keyword: string): Promise<NewsItem[]> {
  try {
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(keyword)}+when:30d&hl=en-US`;
    const res = await fetch(url, {
      headers: { "User-Agent": "trending-hot/1.0" },
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) throw new Error(`Google News ${res.status}`);

    const xml = await res.text();
    const items: NewsItem[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
      const item = match[1];
      const title =
        item.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/i)?.[1]?.trim() || "";
      const link =
        item.match(/<link>(.*?)<\/link>/i)?.[1]?.trim() || "";
      const description =
        item.match(/<description>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/description>/i)?.[1]?.trim() || "";
      const source =
        item.match(/<source[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/source>/i)?.[1]?.trim() || "";
      const pubDate =
        item.match(/<pubDate>(.*?)<\/pubDate>/i)?.[1]?.trim() || "";

      if (title && link) {
        const cleanSummary = description
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&nbsp;/g, " ")
          .replace(/<[^>]*>/g, "")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 250);

        const sourceName =
          source ||
          (() => {
            try {
              return new URL(link).hostname.replace(/^www\./, "");
            } catch {
              return "News Source";
            }
          })();

        if (pubDate) {
          try {
            const articleDate = new Date(pubDate);
            const daysOld = (Date.now() - articleDate.getTime()) / 86400000;
            if (daysOld > 30) continue;
          } catch {}
        }

        items.push({
          title,
          source: sourceName,
          time: pubDate,
          summary: cleanSummary,
          url: link,
        });
      }
    }

    return items.slice(0, 5);
  } catch (e) {
    console.error(`News fetch failed for ${keyword}:`, e);
    return [];
  }
}

async function generateArticleWithDeepSeek(
  signal: SignalSeed,
  redditPosts: RedditPost[],
  newsItems: NewsItem[]
): Promise<GeneratedArticle> {
  const redditContext = redditPosts
    .map(
      (p, i) =>
        `${i + 1}. [${p.subreddit}] ${p.title} (Upvotes: ${p.ups}, Comments: ${p.num_comments})`
    )
    .join("\n");

  const newsContext = newsItems
    .map(
      (n, i) =>
        `${i + 1}. [${n.source}] ${n.title}${n.summary ? " - " + n.summary.slice(0, 200) : ""}`
    )
    .join("\n");

  const prompt = `You are a senior tech trend analyst. Based on the following data, write a comprehensive English opportunity signal analysis article.\n\nSIGNAL TOPIC: ${signal.title}\nTAG: ${signal.tag}\nSTRENGTH: ${signal.strength}\nKEYWORDS: ${signal.keywords.join(", ")}\n\nSUBTITLE (context):\n${signal.subtitle}\n\nREDDIT DISCUSSIONS:\n${redditContext || "No relevant Reddit discussions found."}\n\nNEWS COVERAGE:\n${newsContext || "No relevant news found."}\n\nWrite the analysis in this exact JSON structure:\n{\n  "coreJudgment": "One paragraph (200-300 words) summarizing the core investment thesis. Bold, confident, data-backed.",\n  "sections": [\n    {\n      "heading": "Trend Data",\n      "body": "Analyze search trends, engagement metrics, and growth trajectory. Mention specific numbers. 200+ words."\n    },\n    {\n      "heading": "Industry Background",\n      "body": "Explain the technology, regulation, or market forces at play. 200+ words."\n    },\n    {\n      "heading": "Behavioral Drivers",\n      "body": "Why are people searching for this? What pain points or desires drive demand? 200+ words."\n    },\n    {\n      "heading": "Timing Assessment",\n      "body": "How urgent is this window? What is the optimal strategy? 200+ words."\n    }\n  ]\n}\n\nRequirements:\n- All content must be in English\n- Use specific numbers and percentages where possible\n- Tone: professional, analytical, actionable\n- Each section body must be at least 200 words\n- Do NOT include markdown formatting inside JSON strings\n- Return ONLY valid JSON, no other text`;

  const res = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 6000,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek API error: ${res.status} - ${err}`);
  }

  const json = await res.json();
  const content = json.choices?.[0]?.message?.content || "";

  let parsed: any;
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    parsed = JSON.parse(jsonMatch ? jsonMatch[0] : content);
  } catch (e) {
    console.error("Failed to parse DeepSeek response:", content.slice(0, 500));
    throw new Error("Invalid JSON from DeepSeek");
  }

  return {
    slug: signal.slug,
    title: signal.title,
    subtitle: signal.subtitle,
    tag: signal.tag,
    strength: signal.strength,
    coreJudgment: parsed.coreJudgment || signal.subtitle,
    sections: parsed.sections || [],
    sources: signal.sources,
    related: loadSignals()
      .filter((s) => s.slug !== signal.slug)
      .slice(0, 3)
      .map((s) => ({ title: s.title, slug: s.slug })),
    redditPosts,
    newsItems,
    generatedAt: new Date().toISOString(),
  };
}

function saveArticle(article: GeneratedArticle) {
  const filePath = path.join(ARTICLES_DIR, `${article.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(article, null, 2), "utf-8");
  console.log(`Article saved: ${filePath}`);
}

function syncToObsidian(article: GeneratedArticle) {
  try {
    if (!fs.existsSync(OBSIDIAN_DIR)) {
      fs.mkdirSync(OBSIDIAN_DIR, { recursive: true });
    }

    const mdContent = `# ${article.title}\n\n> ${article.subtitle}\n\n**Tag:** ${article.tag} | **Strength:** ${article.strength}\n\n---\n\n## Core Judgment\n\n${article.coreJudgment}\n\n---\n\n${article.sections.map((s) => `## ${s.heading}\n\n${s.body}`).join("\n\n---\n\n")}\n\n---\n\n## Sources\n\n${article.sources.map((s) => `- [${s.label}](${s.url})`).join("\n")}\n\n---\n\n*Generated at: ${article.generatedAt}*\n`;

    const obsidianPath = path.join(OBSIDIAN_DIR, `${article.slug}.md`);
    fs.writeFileSync(obsidianPath, mdContent, "utf-8");
    console.log(`Synced to Obsidian: ${obsidianPath}`);
  } catch (e) {
    console.error("Obsidian sync failed:", e);
  }
}

async function main() {
  console.log("=== Signal Article Generator ===\n");

  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  }

  const signals = loadSignals();
  console.log(`Loaded ${signals.length} signals\n`);

  for (const signal of signals) {
    console.log(`Processing: ${signal.title}...`);
    try {
      const keyword = signal.keywords[0] || signal.title;
      const [redditPosts, newsItems] = await Promise.all([
        fetchRedditDirect(keyword),
        fetchNewsDirect(keyword),
      ]);

      console.log(`  Reddit: ${redditPosts.length} posts, News: ${newsItems.length} items`);

      const article = await generateArticleWithDeepSeek(signal, redditPosts, newsItems);
      saveArticle(article);
      syncToObsidian(article);

      console.log(`  Done: ${article.title}\n`);
    } catch (e: any) {
      console.error(`  FAILED: ${signal.title} - ${e.message}\n`);
    }
  }

  console.log("=== All done ===");
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
