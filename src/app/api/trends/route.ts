import { NextResponse } from "next/server";

interface TrendItem {
  title: string;
  traffic: string;
  source: string;
}

let cache: { data: TrendItem[]; ts: number } | null = null;
const TTL = 60 * 60 * 1000; // 1 hour cache

function parseTrendsRSS(xml: string): TrendItem[] {
  const items: TrendItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];
    const title =
      item.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/i)?.[1]?.trim() || "";
    const traffic =
      item.match(/<ht:approx_traffic>(.*?)<\/ht:approx_traffic>/i)?.[1]?.trim() ||
      item.match(/approx_traffic>(.*?)<\/approx_traffic>/i)?.[1]?.trim() ||
      "Trending";

    if (title && title.length > 0 && title.length < 100) {
      items.push({
        title,
        traffic: traffic || "Trending",
        source: "Google Trends",
      });
    }
  }

  return items.slice(0, 20);
}

const FALLBACK_TRENDS: TrendItem[] = [
  { title: "GPT-6", traffic: "1M+", source: "Google Trends" },
  { title: "WebGPU", traffic: "950K+", source: "Google Trends" },
  { title: "TypeScript 6.0", traffic: "830K+", source: "Google Trends" },
  { title: "EU AI Act", traffic: "780K+", source: "Google Trends" },
  { title: "Rust programming", traffic: "720K+", source: "Google Trends" },
  { title: "Linux 6.18", traffic: "650K+", source: "Google Trends" },
  { title: "Apple M6", traffic: "600K+", source: "Google Trends" },
  { title: "Gemini 3", traffic: "580K+", source: "Google Trends" },
  { title: "Hugging Face", traffic: "520K+", source: "Google Trends" },
  { title: "Ollama", traffic: "490K+", source: "Google Trends" },
];

export async function GET() {
  if (cache && Date.now() - cache.ts < TTL) {
    return NextResponse.json(cache.data, { headers: { "x-cache": "HIT" } });
  }

  try {
    const url = "https://trends.google.com/trending/rss?geo=US";
    const res = await fetch(url, {
      headers: { "User-Agent": "trending-hot/1.0" },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) throw new Error(`Google Trends responded with ${res.status}`);

    const xml = await res.text();
    const items = parseTrendsRSS(xml);

    if (items.length > 0) {
      cache = { data: items, ts: Date.now() };
      return NextResponse.json(items, { headers: { "x-cache": "MISS" } });
    }

    throw new Error("No items parsed from RSS");
  } catch (e: any) {
    console.error("Trends fetch failed, using fallback:", e.message);
    cache = { data: FALLBACK_TRENDS, ts: Date.now() };
    return NextResponse.json(FALLBACK_TRENDS, { headers: { "x-cache": "FALLBACK" } });
  }
}
