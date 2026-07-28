import { NextRequest, NextResponse } from "next/server";

// ============================================================
// Data types
// ============================================================

interface TrendItem {
  title: string;
  traffic: string;
}

interface RedditPost {
  title: string;
  subreddit: string;
  ups: number;
  num_comments: number;
  permalink: string;
  url: string;
}

interface SearchResult {
  id: string;
  title: string;
  source: "google" | "reddit";
  metric: string;
  metricLabel: string;
  direction: "up" | "down" | "new";
  slug: string;
  score: number;
}

interface RegionDistribution {
  region: string;
  percentage: number;
}

interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
}

interface TrendDataPoint {
  date: string;
  google: number;
  reddit: number;
}

interface SearchResponse {
  query: string;
  total: number;
  results: SearchResult[];
  redditResults: SearchResult[];
  region: RegionDistribution[];
  sentiment: SentimentData;
  trendData: TrendDataPoint[];
}

// ============================================================
// Fallback data (mirrors trends & reddit APIs)
// ============================================================

const FALLBACK_TRENDS: TrendItem[] = [
  { title: "GPT-6", traffic: "1M+" },
  { title: "WebGPU", traffic: "950K+" },
  { title: "TypeScript 6.0", traffic: "830K+" },
  { title: "EU AI Act", traffic: "780K+" },
  { title: "Rust programming", traffic: "720K+" },
  { title: "Linux 6.18", traffic: "650K+" },
  { title: "Apple M6", traffic: "600K+" },
  { title: "Gemini 3", traffic: "580K+" },
  { title: "Hugging Face", traffic: "520K+" },
  { title: "Ollama", traffic: "490K+" },
  { title: "Kubernetes 2.0", traffic: "460K+" },
  { title: "SolidJS", traffic: "430K+" },
  { title: "Blockchain AI", traffic: "410K+" },
  { title: "Quantum computing", traffic: "390K+" },
  { title: "Edge AI", traffic: "370K+" },
  { title: "React 20", traffic: "350K+" },
  { title: "Deno 3.0", traffic: "330K+" },
  { title: "Zig language", traffic: "310K+" },
  { title: "Supabase", traffic: "290K+" },
  { title: "LangChain", traffic: "270K+" },
];

const FALLBACK_REDDIT: RedditPost[] = [
  { title: "OpenAI launches GPT-6 with native vision capabilities", subreddit: "artificial", ups: 24500, num_comments: 3200, permalink: "/r/artificial/comments/openai_gpt6", url: "https://reddit.com/r/artificial" },
  { title: "Rust overtakes C++ in the latest StackOverflow survey", subreddit: "rust", ups: 18300, num_comments: 1500, permalink: "/r/rust/comments/so2026", url: "https://reddit.com/r/rust" },
  { title: "WebGPU now shipping in all major browsers", subreddit: "webdev", ups: 15200, num_comments: 980, permalink: "/r/webdev/comments/webgpu", url: "https://reddit.com/r/webdev" },
  { title: "New EU AI Act goes into effect: what developers need to know", subreddit: "programming", ups: 12700, num_comments: 2100, permalink: "/r/programming/comments/euai", url: "https://reddit.com/r/programming" },
  { title: "TypeScript 6.0 beta released with pattern matching", subreddit: "typescript", ups: 11800, num_comments: 890, permalink: "/r/typescript/comments/ts6beta", url: "https://reddit.com/r/typescript" },
  { title: "Linux kernel 6.18 brings massive scheduler improvements", subreddit: "linux", ups: 10500, num_comments: 1450, permalink: "/r/linux/comments/kernel618", url: "https://reddit.com/r/linux" },
  { title: "Apple announces M6 chip with on-device LLM inference", subreddit: "apple", ups: 9900, num_comments: 1800, permalink: "/r/apple/comments/m6chip", url: "https://reddit.com/r/apple" },
  { title: "Google DeepMind releases Gemini 3 paper with 95% on MATH benchmark", subreddit: "MachineLearning", ups: 8700, num_comments: 760, permalink: "/r/MachineLearning/comments/gemini3", url: "https://reddit.com/r/MachineLearning" },
];

// ============================================================
// Caching
// ============================================================

let cache: { trends: TrendItem[]; reddit: RedditPost[]; ts: number } = {
  trends: FALLBACK_TRENDS,
  reddit: FALLBACK_REDDIT,
  ts: 0,
};
const TTL = 5 * 60 * 1000; // 5 minutes

async function getData(): Promise<{ trends: TrendItem[]; reddit: RedditPost[] }> {
  if (cache.ts && Date.now() - cache.ts < TTL) {
    return { trends: cache.trends, reddit: cache.reddit };
  }

  try {
    const redditRes = await fetch("https://www.reddit.com/r/all/hot.json?limit=25", {
      headers: { "User-Agent": "trending-hot/1.0" },
      signal: AbortSignal.timeout(8000),
    }).then(async (r) => {
      if (!r.ok) throw new Error("Reddit fetch failed");
      const json = await r.json();
      return json.data.children.map((c: any) => ({
        title: c.data.title,
        subreddit: c.data.subreddit,
        ups: c.data.ups,
        num_comments: c.data.num_comments,
        permalink: c.data.permalink,
        url: c.data.url,
      })) as RedditPost[];
    }).catch(() => null);

    const redditData = redditRes || FALLBACK_REDDIT;
    cache = { trends: FALLBACK_TRENDS, reddit: redditData, ts: Date.now() };
    return { trends: FALLBACK_TRENDS, reddit: redditData };
  } catch {
    cache = { trends: FALLBACK_TRENDS, reddit: FALLBACK_REDDIT, ts: Date.now() };
    return { trends: FALLBACK_TRENDS, reddit: FALLBACK_REDDIT };
  }
}

// ============================================================
// Fuzzy matching
// ============================================================

function longestCommonSubsequence(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const prev = new Array(n + 1).fill(0);
  const curr = new Array(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        curr[j] = prev[j - 1] + 1;
      } else {
        curr[j] = Math.max(prev[j], curr[j - 1]);
      }
    }
    for (let k = 0; k <= n; k++) {
      prev[k] = curr[k];
      curr[k] = 0;
    }
  }
  return prev[n];
}

function fuzzyScore(query: string, target: string): number {
  const q = query.toLowerCase().trim();
  const t = target.toLowerCase().trim();

  if (!q) return 0;

  // Exact match
  if (q === t) return 100;

  // Prefix match
  if (t.startsWith(q)) return 80;

  // Contains match
  if (t.includes(q)) return 60;

  // Character sequence match (LCS ratio)
  const lcs = longestCommonSubsequence(q, t);
  const ratio = lcs / Math.max(q.length, t.length);

  return Math.floor(ratio * 50);
}

// ============================================================
// Region & sentiment generation (consistent per query)
// ============================================================

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateRegionData(seed: number): RegionDistribution[] {
  const rand = seededRandom(seed);
  const regions = [
    "United States", "United Kingdom", "Canada", "Australia",
    "Germany", "India", "Japan", "Brazil", "France", "Others",
  ];

  let remaining = 100;
  const result: RegionDistribution[] = [];

  for (let i = 0; i < regions.length - 1; i++) {
    const max = Math.min(remaining - (regions.length - 1 - i), Math.floor(remaining * 0.6));
    const pct = Math.max(1, Math.floor(rand() * max));
    result.push({ region: regions[i], percentage: pct });
    remaining -= pct;
  }
  result.push({ region: regions[regions.length - 1], percentage: remaining });

  return result.sort((a, b) => b.percentage - a.percentage);
}

function generateSentimentData(seed: number): SentimentData {
  const rand = seededRandom(seed + 12345);
  const positive = Math.floor(rand() * 40 + 40);
  const neutral = Math.floor(rand() * 30 + 10);
  const negative = 100 - positive - neutral;
  return { positive, neutral, negative };
}

function generateTrendData(seed: number): TrendDataPoint[] {
  const rand = seededRandom(seed + 67890);
  const now = new Date();
  const data: TrendDataPoint[] = [];

  for (let i = 23; i >= 0; i--) {
    const d = new Date(now);
    d.setHours(d.getHours() - i);
    const hourLabel = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    data.push({
      date: hourLabel,
      google: Math.floor(rand() * 60 + 20),
      reddit: Math.floor(rand() * 40 + 10),
    });
  }
  return data;
}

// ============================================================
// GET handler
// ============================================================

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (!query.trim()) {
    return NextResponse.json({
      query: "",
      total: 0,
      results: [],
      redditResults: [],
      region: [],
      sentiment: { positive: 0, neutral: 0, negative: 0 },
      trendData: [],
    } as SearchResponse);
  }

  const { trends, reddit } = await getData();

  const googleResults: SearchResult[] = trends
    .map((t, i) => {
      const score = fuzzyScore(query, t.title);
      return {
        id: `gt-${i}`,
        title: t.title,
        source: "google" as const,
        metric: t.traffic,
        metricLabel: "searches",
        direction: (["up", "up", "up", "down", "new"] as const)[i % 5],
        slug: t.title.toLowerCase().replace(/\s+/g, "-"),
        score,
      };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  const redditResults: SearchResult[] = reddit
    .map((p, i) => {
      const score = fuzzyScore(query, p.title);
      return {
        id: `rd-${i}`,
        title: p.title.length > 80 ? p.title.slice(0, 77) + "..." : p.title,
        source: "reddit" as const,
        metric: p.ups > 1000 ? `${(p.ups / 1000).toFixed(1)}K` : `${p.ups}`,
        metricLabel: `upvotes \u00b7 r/${p.subreddit}`,
        direction: p.ups > 5000 ? ("up" as const) : ("new" as const),
        slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60),
        score,
      };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  const allResults = [...googleResults, ...redditResults].sort((a, b) => b.score - a.score);

  const seed = hashCode(query);

  const response: SearchResponse = {
    query,
    total: allResults.length,
    results: allResults,
    redditResults: redditResults,
    region: generateRegionData(seed),
    sentiment: generateSentimentData(seed),
    trendData: generateTrendData(seed),
  };

  return NextResponse.json(response);
}
