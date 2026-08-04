import fs from "fs";
import path from "path";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
if (!DEEPSEEK_API_KEY) {
  console.error("DEEPSEEK_API_KEY is not set. Set it as a GitHub Secret or environment variable.");
  process.exit(1);
}
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const DATA_DIR = path.join(process.cwd(), "data");
const ARTICLES_DIR = path.join(DATA_DIR, "articles");
const CONTENT_DIR = path.join(process.cwd(), "src", "content", "signals");
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

// P0 fix: fallback fake data generators REMOVED.
// When external APIs fail, processSignal passes empty arrays [] to the LLM,
// and the prompt clearly labels the missing data.

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

  const prompt = `You are a senior tech trend analyst. Based on the following data, write a comprehensive English opportunity signal analysis article.\n\nSIGNAL TOPIC: \${signal.title}\nTAG: \${signal.tag}\nSTRENGTH: \${signal.strength}\nKEYWORDS: \${signal.keywords.join(", ")}\n\nSUBTITLE (context):\n\${signal.subtitle}\n\nREDDIT DISCUSSIONS:\n\${redditContext || "[No external data available — analysis based on general knowledge only]"}\n\nNEWS COVERAGE:\n\${newsContext || "[No external data available — analysis based on general knowledge only]"}\n\nWrite the analysis in this exact JSON structure:\n{\n  "coreJudgment": "One paragraph (200-300 words) summarizing the core thesis. What's the signal, what's driving it, who benefits, what's the window? Bold, confident, data-backed.",\n  "sections": [\n    {\n      "heading": "Trend Data & Stage Classification",\n      "body": "Analyze search trends, engagement metrics, and growth trajectory. Classify the trend stage: [Sustained rise] / [Short-term spike] / [Peaking soon] / [Brewing]. Use specific numbers where available. 200+ words."\n    },\n    {\n      "heading": "Mechanism & Stakeholder Game",\n      "body": "Explain why this trend is rising: what structural driver or recent catalyst is fueling it? Map the money flow: who captures value, who pays the cost, who wants the status quo, who wants change? 200+ words."\n    },\n    {\n      "heading": "Behavioral Drivers & Desire Decoding",\n      "body": "Decode the underlying human need this trend satisfies. What pain point or desire does it serve? Why are people engaging with it? 200+ words."\n    },\n    {\n      "heading": "Forward-Looking Assessment",\n      "body": "Will this keep rising? For how long? What's the ceiling? Rate confidence: high / medium / low. Identify opportunity windows: content gap, product window, information arbitrage, traffic oasis. 200+ words."\n    },\n    {\n      "heading": "Risk Assessment",\n      "body": "Label and evaluate policy risks, controversy risks, and time-sensitivity risks. Assign confidence level (high / medium / low). If this is a time-sensitive window, state when it might close. If evidence is insufficient, explicitly write “uncertain.” 150+ words."\n    }\n  ]\n}\n\nRequirements:\n- All content must be in English\n- Use specific numbers and percentages only when you can cite a verifiable source. If no source exists, write "no authoritative data available" rather than inventing one.\n- Never fabricate URLs, report names, or survey numbers\n- No conspiracy speculation. No taking sides. When evidence is weak, write "uncertain" or "evidence is limited."\n- All cited URLs must come from actual search results, never hallucinated.\n- Tone: professional, analytical, actionable\n- Each section body must be at least the word count specified\n- Do NOT include markdown formatting inside JSON strings\n- Return ONLY valid JSON, no other text`;

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
      max_tokens: 8000,
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
    let jsonStr = jsonMatch ? jsonMatch[0] : content;
    // Attempt to repair truncated JSON by closing open braces
    const openBraces = (jsonStr.match(/{/g) || []).length;
    const closeBraces = (jsonStr.match(/}/g) || []).length;
    if (openBraces > closeBraces) {
      jsonStr = jsonStr + "}".repeat(openBraces - closeBraces);
    }
    // Close truncated strings
    const openQuotes = (jsonStr.match(/"/g) || []).length;
    if (openQuotes % 2 !== 0) {
      jsonStr = jsonStr + '"]';
    }
    parsed = JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse DeepSeek response:", content.slice(0, 500));
    // Last resort: try to extract what we can
    try {
      const coreMatch = content.match(/"coreJudgment"\s*:\s*"([\s\S]*?)(?:"|$)/);
      const sectionsMatch = content.match(/"sections"\s*:\s*\[([\s\S]*?)(?:\]|$)/);
      if (coreMatch) {
        parsed = {
          coreJudgment: coreMatch[1],
          sections: [],
        };
        console.log("  [Recovered partial JSON]");
      } else {
        throw new Error("Invalid JSON from DeepSeek");
      }
    } catch (e2) {
      throw new Error("Invalid JSON from DeepSeek");
    }
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

function saveMarkdown(article: GeneratedArticle) {
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      fs.mkdirSync(CONTENT_DIR, { recursive: true });
    }

    const mdContent = `# ${article.title}

> ${article.subtitle}

**Tag:** ${article.tag} | **Strength:** ${article.strength}

---

## Core Judgment

${article.coreJudgment}

---

${article.sections.map((s) => `## ${s.heading}\n\n${s.body}`).join("\n\n---\n\n")}

---

## Sources

${article.sources.map((s) => `- [${s.label}](${s.url})`).join("\n")}

---

*Generated at: ${article.generatedAt}*
`;

    const mdPath = path.join(CONTENT_DIR, `${article.slug}.md`);
    fs.writeFileSync(mdPath, mdContent, "utf-8");
    console.log(`Markdown saved: ${mdPath}`);
  } catch (e) {
    console.error("Markdown save failed:", e);
  }
}

async function processSignal(signal: SignalSeed): Promise<void> {
  console.log(`Processing: ${signal.title}...`);
  try {
    const keyword = signal.keywords[0] || signal.title;
    const [redditPosts, newsItems] = await Promise.all([
      fetchRedditDirect(keyword),
      fetchNewsDirect(keyword),
    ]);

    // P0 fix: no fake fallback — pass empty arrays when APIs fail
    if (redditPosts.length === 0 && newsItems.length === 0) {
      console.log('  [No external data available — analysis based on general knowledge only]');
    }
    console.log(`  Reddit: ${redditPosts.length} live posts, News: ${newsItems.length} live items`);

    const article = await generateArticleWithDeepSeek(signal, redditPosts, newsItems);
    saveArticle(article);
    saveMarkdown(article);
    syncToObsidian(article);

    console.log(`  Done: ${article.title}\n`);
  } catch (e: any) {
    console.error(`  FAILED: ${signal.title} - ${e.message}\n`);
  }
}

async function main() {
  console.log("=== Signal Article Generator ===\n");

  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  }

  const signals = loadSignals();
  console.log(`Loaded ${signals.length} signals\n`);

  // Process all signals concurrently via Promise.allSettled
  await Promise.allSettled(signals.map((signal) => processSignal(signal)));

  console.log("=== All done ===");
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
