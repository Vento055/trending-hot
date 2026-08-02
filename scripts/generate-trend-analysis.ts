import fs from "fs";
import path from "path";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
if (!DEEPSEEK_API_KEY) {
  console.error("DEEPSEEK_API_KEY is not set. Set it as a GitHub Secret or environment variable.");
  process.exit(1);
}
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const DATA_DIR = path.join(process.cwd(), "data");
const TREND_ANALYSIS_DIR = path.join(DATA_DIR, "trend-analysis");

/* ===== Types ===== */
type TrendCategory = "AI" | "E-commerce" | "Social Media" | "Entertainment" | "Tech" | "China Signal" | "Other";
type TrendTagType = "surge" | "streak" | "new" | "none";

interface TrendTopic {
  title: string;
  source: string;
  score: number;
  traffic?: string;
  url?: string;
}

interface TrendAnalysis {
  slug: string;
  name: string;
  volume: string;
  source: string;
  rank: number;
  sparkline: number[];
  summary: string;
  category: TrendCategory;
  trendTag: { type: TrendTagType; value?: string };
  analysisWhy: string;
  analysisMeaning: string;
  faqAnswers: { question: string; answer: string }[];
  relatedTrends: { name: string; slug: string }[];
  generatedAt: string;
}

/* ===== Slugify ===== */
function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
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
        items.push({ title, source: "Google Trends", score, traffic: traffic || "Trending" });
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

/* ===== Fallback trends ===== */
const FALLBACK_TRENDS: TrendTopic[] = [
  { title: "GPT-6", source: "Google Trends", score: 200, traffic: "1M+" },
  { title: "WebGPU", source: "Google Trends", score: 180, traffic: "950K+" },
  { title: "AI Agents", source: "Reddit", score: 160, traffic: "94K" },
  { title: "TypeScript 6.0", source: "Google Trends", score: 140, traffic: "830K+" },
  { title: "EU AI Act", source: "Google Trends", score: 130, traffic: "780K+" },
  { title: "Rust 2026", source: "Google Trends", score: 120, traffic: "720K+" },
  { title: "Sora AI Video", source: "Reddit", score: 110, traffic: "58K" },
  { title: "Bun 2.0", source: "Reddit", score: 95, traffic: "29K" },
  { title: "Local LLM", source: "Google Trends", score: 85, traffic: "490K+" },
  { title: "Turbopack", source: "Google Trends", score: 75, traffic: "320K+" },
];

/* ===== Sparkline generation ===== */
function generateSparkline(score: number): number[] {
  const arr: number[] = [];
  let v = Math.max(10, score * 0.3);
  const trendUp = Math.random() > 0.2;
  for (let i = 0; i < 7; i++) {
    if (trendUp) {
      v = v + (Math.random() * 0.3 + 0.05) * v;
    } else {
      v = v + (Math.random() - 0.4) * v * 0.25;
    }
    v = Math.max(5, v);
    arr.push(Math.round(v));
  }
  return arr;
}

/* ===== Calculate heat change ===== */
function calculateHeatChange(sparkline: number[]): { percentage: number; isMonotonicUp: boolean; streakWeeks: number } {
  const first = sparkline[0];
  const last = sparkline[sparkline.length - 1];
  const percentage = first > 0 ? Math.round(((last - first) / first) * 100) : 0;

  let isMonotonicUp = true;
  for (let i = 1; i < sparkline.length; i++) {
    if (sparkline[i] < sparkline[i - 1]) {
      isMonotonicUp = false;
      break;
    }
  }

  const streakWeeks = isMonotonicUp ? Math.floor(Math.random() * 3) + 2 : 0;

  return { percentage, isMonotonicUp, streakWeeks };
}

/* ===== Determine trend tag ===== */
function determineTrendTag(
  heatChange: { percentage: number; isMonotonicUp: boolean; streakWeeks: number },
  isNew: boolean
): { type: TrendTagType; value?: string } {
  if (isNew) {
    return { type: "new" };
  }
  if (heatChange.percentage > 50) {
    return { type: "surge", value: `+${heatChange.percentage}%` };
  }
  if (heatChange.isMonotonicUp && heatChange.streakWeeks >= 2) {
    return { type: "streak", value: `${heatChange.streakWeeks}` };
  }
  if (heatChange.percentage > 0) {
    return { type: "surge", value: `+${heatChange.percentage}%` };
  }
  return { type: "none" };
}

/* ===== Format volume ===== */
function formatVolume(topic: TrendTopic): string {
  if (topic.traffic && topic.traffic !== "Trending") {
    return topic.traffic;
  }
  if (topic.score > 1000) {
    return `${(topic.score / 1000).toFixed(1)}K`;
  }
  return topic.score.toString();
}

/* ===== Load existing slugs (for "new" detection) ===== */
function loadExistingSlugs(): Set<string> {
  const slugs = new Set<string>();
  try {
    if (fs.existsSync(TREND_ANALYSIS_DIR)) {
      const files = fs.readdirSync(TREND_ANALYSIS_DIR).filter((f) => f.endsWith(".json"));
      for (const file of files) {
        slugs.add(file.replace(".json", ""));
      }
    }
  } catch {}
  return slugs;
}

/* ===== Category fallback classifier ===== */
function classifyCategoryFallback(title: string): TrendCategory {
  const lower = title.toLowerCase();
  if (/\b(ai|gpt|llm|machine learning|deepseek|openai|gemini|claude|copilot|agent|model)\b/.test(lower)) return "AI";
  if (/\b(shopify|ecommerce|e-commerce|amazon|shop|store|merchant|retail)\b/.test(lower)) return "E-commerce";
  if (/\b(tiktok|instagram|twitter|reddit|facebook|social|influencer)\b/.test(lower)) return "Social Media";
  if (/\b(movie|game|gaming|music|video|streaming|netflix|entertainment)\b/.test(lower)) return "Entertainment";
  if (/\b(china|chinese|deepseek|qwen|baidu|alibaba|wechat|xiaohongshu|v2ex)\b/.test(lower)) return "China Signal";
  if (/\b(rust|typescript|javascript|python|webgpu|wasm|bun|node|programming|developer|coding)\b/.test(lower)) return "Tech";
  return "Other";
}

/* ===== Generate analysis with DeepSeek ===== */
async function generateAnalysisWithDeepSeek(
  topic: TrendTopic,
  volume: string,
  heatPercentage: number
): Promise<{
  summary: string;
  category: TrendCategory;
  analysisWhy: string;
  analysisMeaning: string;
  faqAnswers: { question: string; answer: string }[];
  relatedTrends: { name: string; slug: string }[];
}> {
  const prompt = `You are a senior trend analyst for a trending topics platform.
Analyze the following trending keyword and generate structured trend analysis content.

KEYWORD: ${topic.title}
SEARCH VOLUME / POPULARITY: ${volume}
DATA SOURCE: ${topic.source}
HEAT CHANGE: ${heatPercentage > 0 ? "+" + heatPercentage + "%" : heatPercentage + "%"}
${topic.url ? `REFERENCE URL: ${topic.url}` : ""}

Generate the analysis in this EXACT JSON structure:
{
  "summary": "One sentence (12-15 English words) explaining WHY this keyword is trending right now. Be specific about the trigger. Example: 'OpenAI Sora 2.0 release drives surge in AI video tool searches'",
  "category": "One of: AI, E-commerce, Social Media, Entertainment, Tech, China Signal, Other",
  "analysisWhy": "200-250 words in English explaining why this keyword is trending right now. Cover trigger reasons, related events, and data change background. Be specific and factual.",
  "analysisMeaning": "200-250 words in English explaining what this trend means. Cover impact analysis, who is affected, and signals worth watching. Be analytical and actionable.",
  "faqAnswers": [
    {
      "question": "Is ${topic.title} worth paying attention to?",
      "answer": "50-80 words answering whether this trend deserves attention and why."
    },
    {
      "question": "How long will this trend last?",
      "answer": "50-80 words estimating the trend duration with reasoning."
    },
    {
      "question": "Where is ${topic.title} most popular?",
      "answer": "50-80 words describing geographic or demographic popularity."
    }
  ],
  "relatedTrends": [
    {"name": "Related Keyword 1", "slug": "related-keyword-1"},
    {"name": "Related Keyword 2", "slug": "related-keyword-2"},
    {"name": "Related Keyword 3", "slug": "related-keyword-3"}
  ]
}

Requirements:
- All content must be in English
- summary must be exactly 12-15 words
- analysisWhy and analysisMeaning must each be 200-250 words
- Be specific, factual, and avoid generic statements
- Do NOT include markdown formatting inside JSON strings
- Return ONLY valid JSON, no other text`;

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

  let parsed: any;
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    let jsonStr = jsonMatch ? jsonMatch[0] : content;
    const openBraces = (jsonStr.match(/{/g) || []).length;
    const closeBraces = (jsonStr.match(/}/g) || []).length;
    if (openBraces > closeBraces) {
      jsonStr = jsonStr + "}".repeat(openBraces - closeBraces);
    }
    parsed = JSON.parse(jsonStr);
  } catch (e) {
    console.error("  Failed to parse DeepSeek response, using fallback");
    const summaryMatch = content.match(/"summary"\s*:\s*"([\s\S]*?)(?:"|$)/);
    const whyMatch = content.match(/"analysisWhy"\s*:\s*"([\s\S]*?)(?:"|$)/);
    const meaningMatch = content.match(/"analysisMeaning"\s*:\s*"([\s\S]*?)(?:"|$)/);
    parsed = {
      summary: summaryMatch ? summaryMatch[1] : `${topic.title} gains momentum as search interest surges across platforms`,
      category: classifyCategoryFallback(topic.title),
      analysisWhy: whyMatch ? whyMatch[1] : `${topic.title} is trending due to increased attention from ${topic.source}. The search volume of ${volume} indicates significant public interest. Recent developments in this area have sparked curiosity among users, driving the upward momentum. Industry observers note that this trend aligns with broader shifts in technology adoption and user behavior patterns. The data suggests a genuine surge rather than a temporary spike, as sustained growth over recent periods confirms strong underlying demand. Multiple factors contribute to this trend, including technological advancements, regulatory changes, and shifting consumer preferences. As more people discover and engage with this topic, the network effect further amplifies its visibility across social platforms and search engines.`,
      analysisMeaning: meaningMatch ? meaningMatch[1] : `The rising interest in ${topic.title} signals important shifts for creators, developers, and investors. Content creators who produce high-quality tutorials, comparisons, and analyses can capture significant search demand before the market becomes saturated. Builders and entrepreneurs should evaluate product opportunities that address pain points revealed by this trend. Investors should monitor companies positioned to benefit from the growing ecosystem. The trend also indicates broader industry direction, suggesting where resources and talent are flowing. Early movers have a distinct advantage, as the window of opportunity typically narrows as mainstream awareness increases. Organizations should assess how this trend impacts their strategy and whether adaptation is necessary. The data points to sustained growth rather than a fleeting phenomenon, making proactive engagement worthwhile.`,
      faqAnswers: [
        { question: `Is ${topic.title} worth paying attention to?`, answer: `Yes, the current surge in ${topic.title} reflects genuine market interest with a ${heatPercentage > 0 ? "+" + heatPercentage + "%" : "significant"} heat change. The trend aligns with broader industry shifts and presents opportunities for early movers in content creation and product development.` },
        { question: `How long will this trend last?`, answer: `Based on the growth trajectory and data patterns, this trend is likely to remain relevant for several weeks to months. Sustained interest from multiple sources suggests this is not a fleeting spike but a meaningful shift in user attention.` },
        { question: `Where is ${topic.title} most popular?`, answer: `${topic.title} shows strongest interest from the United States, followed by the United Kingdom, Canada, and Australia. Developer communities and tech-focused regions tend to show the highest engagement levels.` },
      ],
      relatedTrends: [],
    };
  }

  const validCategories: TrendCategory[] = ["AI", "E-commerce", "Social Media", "Entertainment", "Tech", "China Signal", "Other"];
  if (!validCategories.includes(parsed.category)) {
    parsed.category = classifyCategoryFallback(topic.title);
  }

  if (parsed.relatedTrends && Array.isArray(parsed.relatedTrends)) {
    parsed.relatedTrends = parsed.relatedTrends.slice(0, 5).map((r: any) => ({
      name: r.name || r.title || "Related Trend",
      slug: r.slug || slugify(r.name || r.title || "related-trend"),
    }));
  } else {
    parsed.relatedTrends = [];
  }

  if (!parsed.faqAnswers || !Array.isArray(parsed.faqAnswers) || parsed.faqAnswers.length < 3) {
    parsed.faqAnswers = [
      { question: `Is ${topic.title} worth paying attention to?`, answer: `Yes, the current data shows significant growth in ${topic.title} with increasing search volume and engagement across platforms.` },
      { question: `How long will this trend last?`, answer: `Based on current momentum, this trend is expected to remain relevant for several weeks as interest continues to grow.` },
      { question: `Where is ${topic.title} most popular?`, answer: `${topic.title} shows strongest interest from the United States, with growing engagement from European and Asian markets.` },
    ];
  }

  return parsed;
}

/* ===== Main ===== */
async function main() {
  console.log("=== Trend Analysis Generator ===\n");

  if (!fs.existsSync(TREND_ANALYSIS_DIR)) {
    fs.mkdirSync(TREND_ANALYSIS_DIR, { recursive: true });
  }

  const existingSlugs = loadExistingSlugs();
  console.log(`Existing trend analyses: ${existingSlugs.size}\n`);

  console.log("Fetching trends...");
  const [google, reddit] = await Promise.all([
    fetchGoogleTrends(),
    fetchReddit(),
  ]);

  let allTopics = [...google, ...reddit];

  if (allTopics.length === 0) {
    console.log("All external sources failed, using fallback trends...");
    allTopics = FALLBACK_TRENDS;
  }

  const seen = new Set<string>();
  const unique = allTopics.filter((t) => {
    const key = t.title.toLowerCase().slice(0, 30);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  unique.sort((a, b) => b.score - a.score);
  const topTopics = unique.slice(0, 10);

  console.log(`\nTop ${topTopics.length} topics selected for analysis:`);
  topTopics.forEach((t, i) => console.log(`  ${i + 1}. [${t.source}] ${t.title} (${t.score})`));

  const analyses: TrendAnalysis[] = [];

  for (let i = 0; i < topTopics.length; i++) {
    const topic = topTopics[i];
    const slug = slugify(topic.title);
    const rank = i + 1;
    const volume = formatVolume(topic);
    const sparkline = generateSparkline(topic.score);
    const heatChange = calculateHeatChange(sparkline);
    const isNew = !existingSlugs.has(slug);
    const trendTag = determineTrendTag(heatChange, isNew);

    console.log(`\nProcessing: ${topic.title}...`);

    try {
      const aiResult = await generateAnalysisWithDeepSeek(topic, volume, heatChange.percentage);

      const analysis: TrendAnalysis = {
        slug,
        name: topic.title,
        volume,
        source: topic.source,
        rank,
        sparkline,
        summary: aiResult.summary,
        category: aiResult.category,
        trendTag,
        analysisWhy: aiResult.analysisWhy,
        analysisMeaning: aiResult.analysisMeaning,
        faqAnswers: aiResult.faqAnswers,
        relatedTrends: aiResult.relatedTrends,
        generatedAt: new Date().toISOString(),
      };

      const filePath = path.join(TREND_ANALYSIS_DIR, `${slug}.json`);
      fs.writeFileSync(filePath, JSON.stringify(analysis, null, 2), "utf-8");
      console.log(`  Saved: ${filePath}`);

      analyses.push(analysis);
      console.log(`  Done: ${topic.title} [${aiResult.category}] ${trendTag.type}${trendTag.value ? " " + trendTag.value : ""}`);
    } catch (e: any) {
      console.error(`  FAILED: ${topic.title} - ${e.message}`);

      const fallbackAnalysis: TrendAnalysis = {
        slug,
        name: topic.title,
        volume,
        source: topic.source,
        rank,
        sparkline,
        summary: `${topic.title} gains momentum as search interest surges across platforms`,
        category: classifyCategoryFallback(topic.title),
        trendTag,
        analysisWhy: `${topic.title} is trending due to increased attention from ${topic.source}. The search volume of ${volume} indicates significant public interest. Recent developments in this area have sparked curiosity among users, driving the upward momentum. Industry observers note that this trend aligns with broader shifts in technology adoption and user behavior patterns. The data suggests a genuine surge rather than a temporary spike, as sustained growth over recent periods confirms strong underlying demand. Multiple factors contribute to this trend, including technological advancements, regulatory changes, and shifting consumer preferences. As more people discover and engage with this topic, the network effect further amplifies its visibility across social platforms and search engines.`,
        analysisMeaning: `The rising interest in ${topic.title} signals important shifts for creators, developers, and investors. Content creators who produce high-quality tutorials and analyses can capture significant search demand. Builders should evaluate product opportunities that address pain points revealed by this trend. Investors should monitor companies positioned to benefit from the growing ecosystem. The trend indicates broader industry direction, suggesting where resources and talent are flowing. Early movers have a distinct advantage as the window of opportunity narrows with mainstream awareness. Organizations should assess how this trend impacts their strategy. The data points to sustained growth rather than a fleeting phenomenon, making proactive engagement worthwhile.`,
        faqAnswers: [
          { question: `Is ${topic.title} worth paying attention to?`, answer: `Yes, the current surge in ${topic.title} reflects genuine market interest with significant heat change. The trend aligns with broader industry shifts and presents opportunities for early movers.` },
          { question: `How long will this trend last?`, answer: `Based on the growth trajectory and data patterns, this trend is likely to remain relevant for several weeks to months. Sustained interest from multiple sources suggests this is not a fleeting spike.` },
          { question: `Where is ${topic.title} most popular?`, answer: `${topic.title} shows strongest interest from the United States, followed by the United Kingdom, Canada, and Australia. Developer communities show the highest engagement levels.` },
        ],
        relatedTrends: [],
        generatedAt: new Date().toISOString(),
      };

      const filePath = path.join(TREND_ANALYSIS_DIR, `${slug}.json`);
      fs.writeFileSync(filePath, JSON.stringify(fallbackAnalysis, null, 2), "utf-8");
      console.log(`  Saved fallback: ${filePath}`);
      analyses.push(fallbackAnalysis);
    }
  }

  console.log(`\n=== Done: ${analyses.length} trend analyses generated ===`);
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
