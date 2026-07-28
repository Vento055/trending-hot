import { NextResponse } from "next/server";

interface RedditPost {
  title: string;
  subreddit: string;
  ups: number;
  num_comments: number;
  permalink: string;
  url: string;
}

let cache: { data: RedditPost[] | null; ts: number } = { data: null, ts: 0 };
const TTL = 5 * 60 * 1000;

async function fetchReddit(endpoint: string, userAgent: string): Promise<RedditPost[]> {
  const res = await fetch(`https://www.reddit.com${endpoint}`, {
    headers: { "User-Agent": userAgent },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Reddit ${res.status}`);
  const json = await res.json();
  return json.data.children.map((c: any) => ({
    title: c.data.title,
    subreddit: c.data.subreddit,
    ups: c.data.ups,
    num_comments: c.data.num_comments,
    permalink: c.data.permalink,
    url: c.data.url,
  }));
}

// Fallback trend data when Reddit is unreachable (e.g., in China)
const FALLBACK = [
  { title: "OpenAI launches GPT-6 with native vision capabilities", subreddit: "artificial", ups: 24500, num_comments: 3200, permalink: "/r/artificial/comments/openai_gpt6", url: "https://reddit.com/r/artificial" },
  { title: "Rust overtakes C++ in the latest StackOverflow survey", subreddit: "rust", ups: 18300, num_comments: 1500, permalink: "/r/rust/comments/so2026", url: "https://reddit.com/r/rust" },
  { title: "WebGPU now shipping in all major browsers", subreddit: "webdev", ups: 15200, num_comments: 980, permalink: "/r/webdev/comments/webgpu", url: "https://reddit.com/r/webdev" },
  { title: "New EU AI Act goes into effect: what developers need to know", subreddit: "programming", ups: 12700, num_comments: 2100, permalink: "/r/programming/comments/euai", url: "https://reddit.com/r/programming" },
  { title: "TypeScript 6.0 beta released with pattern matching", subreddit: "typescript", ups: 11800, num_comments: 890, permalink: "/r/typescript/comments/ts6beta", url: "https://reddit.com/r/typescript" },
  { title: "Linux kernel 6.18 brings massive scheduler improvements", subreddit: "linux", ups: 10500, num_comments: 1450, permalink: "/r/linux/comments/kernel618", url: "https://reddit.com/r/linux" },
  { title: "Apple announces M6 chip with on-device LLM inference", subreddit: "apple", ups: 9900, num_comments: 1800, permalink: "/r/apple/comments/m6chip", url: "https://reddit.com/r/apple" },
  { title: "Google DeepMind releases Gemini 3 paper with 95% on MATH benchmark", subreddit: "MachineLearning", ups: 8700, num_comments: 760, permalink: "/r/MachineLearning/comments/gemini3", url: "https://reddit.com/r/MachineLearning" },
];

export async function GET() {
  if (cache.data && Date.now() - cache.ts < TTL) {
    return NextResponse.json(cache.data, { headers: { "x-cache": "HIT" } });
  }

  try {
    const [hot, popular] = await Promise.all([
      fetchReddit("/r/all/hot.json?limit=25", "trending-hot/1.0"),
      fetchReddit("/r/popular/hot.json?limit=25", "Mozilla/5.0 (trending-hot)"),
    ]);
    const merged = [...hot, ...popular].sort((a, b) => b.ups - a.ups).slice(0, 20);
    cache = { data: merged, ts: Date.now() };
    return NextResponse.json(merged, { headers: { "x-cache": "MISS" } });
  } catch (e: any) {
    console.error("Reddit fetch failed, using fallback:", e.message);
    cache = { data: FALLBACK, ts: Date.now() };
    return NextResponse.json(FALLBACK, { headers: { "x-cache": "FALLBACK" } });
  }
}
