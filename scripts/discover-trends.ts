import fs from "fs";
import path from "path";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "sk-0003200be8bc4cd893cc830fe29411de";
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const DATA_DIR = path.join(process.cwd(), "data");
const SIGNALS_FILE = path.join(DATA_DIR, "signals.json");

interface TrendTopic {
  title: string;
  source: string;
  score: number;
  url?: string;
}

interface SignalSeed {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  strength: string;
  keywords: string[];
  number: string;
  trend: string;
  meta: string;
  sources: { label: string; url: string }[];
}

/* ===== Source 1: Google Trends RSS ===== */
async function fetchGoogleTrends(): Promise<TrendTopic[]> {
  try {
    const res = await fetch("https://trends.google.com/trending/rss?geo=US", {
      headers: { "User-Agent": "trending-hot/1.0" },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`Google Trends ${res.status}`);
    const xml = await res.text();
    const items: TrendTopic[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    let match;
    while ((match = itemRegex.exec(xml)) !== null) {
      const item = match[1];
      const title = item.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/i)?.[1]?.trim() || "";
      const traffic = item.match(/<ht:approx_traffic>(.*?)<\/ht:approx_traffic>/i)?.[1]?.trim() || "";
      if (title && title.length > 2 && title.length < 80) {
        const score = parseInt(traffic.replace(/\D/g, "")) || 50;
        items.push({ title, source: "Google Trends", score });
      }
    }
    console.log(`  Google Trends: ${items.length} topics`);
    return items.slice(0, 15);
  } catch (e: any) {
    console.error(`  Google Trends failed: ${e.message}`);
    return [];
  }
}

/* ===== Source 2: Reddit r/all hot ===== */
async function fetchReddit(): Promise<TrendTopic[]> {
  try {
    const res = await fetch("https://www.reddit.com/r/all/hot.json?limit=25", {
      headers: { "User-Agent": "trending-hot/1.0" },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`Reddit ${res.status}`);
    const json = await res.json();
    const items: TrendTopic[] = json.data.children.map((c: any) => ({
      title: c.data.title,
      source: "Reddit",
      score: c.data.ups,
      url: `https://reddit.com${c.data.permalink}`,
    }));
    console.log(`  Reddit: ${items.length} topics`);
    return items.slice(0, 15);
  } catch (e: any) {
    console.error(`  Reddit failed: ${e.message}`);
    return [];
  }
}

/* ===== Source 3: Hacker News API ===== */
async function fetchHackerNews(): Promise<TrendTopic[]> {
  try {
    const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&orderByPriority=true&limitToFirst=15", {
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`HN ${res.status}`);
    const ids: number[] = await res.json();
    const stories = await Promise.all(
      ids.slice(0, 15).map(async (id) => {
        const r = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
          signal: AbortSignal.timeout(10000),
        });
        return r.json();
      })
    );
    const items: TrendTopic[] = stories
      .filter((s) => s && s.title)
      .map((s) => ({
        title: s.title,
        source: "Hacker News",
        score: s.score || 0,
        url: s.url || `https://news.ycombinator.com/item?id=${s.id}`,
      }));
    console.log(`  Hacker News: ${items.length} topics`);
    return items;
  } catch (e: any) {
    console.error(`  Hacker News failed: ${e.message}`);
    return [];
  }
}

/* ===== Source 4: Static fallback trends ===== */
const FALLBACK_TRENDS: TrendTopic[] = [
  { title: "GPT-5", source: "Fallback", score: 200 },
  { title: "WebAssembly Components", source: "Fallback", score: 150 },
  { title: "Rust 2026 Edition", source: "Fallback", score: 120 },
  { title: "AI Code Review Tools", source: "Fallback", score: 110 },
  { title: "Edge Runtime APIs", source: "Fallback", score: 95 },
  { title: "LLM Fine-tuning Platforms", source: "Fallback", score: 90 },
  { title: "Zig Language", source: "Fallback", score: 80 },
  { title: "Local AI Models", source: "Fallback", score: 75 },
];

/* ===== Use DeepSeek to analyze trends and generate signal seeds ===== */
async function analyzeTrendsWithAI(topics: TrendTopic[]): Promise<SignalSeed[]> {
  const topicsContext = topics
    .map((t, i) => `${i + 1}. [${t.source}] ${t.title} (score: ${t.score})`)
    .join("\n");

  const existingSignals = loadExistingSignals();
  const existingTitles = existingSignals.map((s) => s.title).join(", ");

  const prompt = `You are a senior trend analyst for a tech opportunity signal platform.
Analyze the following trending topics and identify the top 4 with the highest money-making potential for content creators, builders, or investors.

TRENDING TOPICS:
${topicsContext}

EXISTING SIGNALS (avoid duplicates): ${existingTitles}

For each selected topic, generate a signal analysis seed in this exact JSON format:
[
  {
    "slug": "kebab-case-slug",
    "title": "Human Readable Title",
    "subtitle": "One sentence describing the opportunity context (50-100 words)",
    "tag": "One of: Content Goldmine, Product Opportunity, Info Arbitrage, Traffic Breakout",
    "strength": "Strong (XX%) or Very Strong (XX%) or Moderate (XX%)",
    "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
    "number": "+XXX%",
    "trend": "Surging or Rising or Spike",
    "meta": "Window: ~X weeks  |  Confidence: XX%",
    "sources": [
      {"label": "Source Name", "url": "https://..."}
    ]
  }
]

Requirements:
- Pick topics DIFFERENT from existing signals when possible
- All content must be in English
- Slug must be lowercase kebab-case
- Generate exactly 4 signals
- Return ONLY valid JSON array, no other text`;

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
      max_tokens: 4000,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek API error: ${res.status} - ${err}`);
  }

  const json = await res.json();
  const content = json.choices?.[0]?.message?.content || "";

  let parsed: SignalSeed[];
  try {
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    parsed = JSON.parse(jsonMatch ? jsonMatch[0] : content);
  } catch (e) {
    console.error("Failed to parse DeepSeek response:", content.slice(0, 500));
    throw new Error("Invalid JSON from DeepSeek");
  }

  return parsed;
}

function loadExistingSignals(): SignalSeed[] {
  try {
    const raw = fs.readFileSync(SIGNALS_FILE, "utf-8");
    return JSON.parse(raw).signals || [];
  } catch {
    return [];
  }
}

function saveSignals(signals: SignalSeed[]) {
  const data = { signals };
  fs.writeFileSync(SIGNALS_FILE, JSON.stringify(data, null, 2), "utf-8");
  console.log(`Signals saved: ${SIGNALS_FILE} (${signals.length} signals)`);
}

async function main() {
  console.log("=== Trend Discovery Pipeline ===\n");

  // Step 1: Fetch trends from multiple sources
  console.log("Fetching trends from multiple sources...");
  const [google, reddit, hn] = await Promise.all([
    fetchGoogleTrends(),
    fetchReddit(),
    fetchHackerNews(),
  ]);

  let allTopics = [...google, ...reddit, ...hn];

  // Fallback if all sources fail
  if (allTopics.length === 0) {
    console.log("\nAll external sources failed, using fallback trends...");
    allTopics = FALLBACK_TRENDS;
  }

  // Deduplicate by title similarity
  const seen = new Set<string>();
  const unique = allTopics.filter((t) => {
    const key = t.title.toLowerCase().slice(0, 30);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Sort by score and take top 20
  unique.sort((a, b) => b.score - a.score);
  const topTopics = unique.slice(0, 20);

  console.log(`\nTop ${topTopics.length} topics selected for AI analysis:`);
  topTopics.forEach((t, i) => console.log(`  ${i + 1}. [${t.source}] ${t.title} (${t.score})`));

  // Step 2: Use DeepSeek to analyze and generate signal seeds
  console.log("\nAnalyzing trends with DeepSeek AI...");
  const newSignals = await analyzeTrendsWithAI(topTopics);

  console.log(`\nGenerated ${newSignals.length} new signals:`);
  newSignals.forEach((s) => console.log(`  - ${s.title} [${s.tag}] ${s.number}`));

  // Step 3: Merge with existing signals (replace duplicates, keep max 8)
  const existing = loadExistingSignals();
  const existingSlugs = new Set(newSignals.map((s) => s.slug));
  const kept = existing.filter((s) => !existingSlugs.has(s.slug));
  const merged = [...newSignals, ...kept].slice(0, 8);

  saveSignals(merged);

  console.log(`\n=== Discovery complete: ${newSignals.length} new + ${kept.length} existing = ${merged.length} total ===`);
  console.log("\nNext step: run 'npm run generate-articles' to generate analysis articles for these signals.");
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
