import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const TREND_ANALYSIS_DIR = path.join(process.cwd(), "data", "trend-analysis");

let cache: { data: any[]; ts: number } | null = null;
const TTL = 60 * 60 * 1000; // 1 hour cache

export async function GET() {
  if (cache && Date.now() - cache.ts < TTL) {
    return NextResponse.json(cache.data, { headers: { "x-cache": "HIT" } });
  }

  try {
    if (!fs.existsSync(TREND_ANALYSIS_DIR)) {
      return NextResponse.json([], { headers: { "x-cache": "MISS" } });
    }

    const files = fs.readdirSync(TREND_ANALYSIS_DIR).filter((f) => f.endsWith(".json"));
    const trends: any[] = [];

    for (const file of files) {
      try {
        const content = JSON.parse(fs.readFileSync(path.join(TREND_ANALYSIS_DIR, file), "utf-8"));
        trends.push(content);
      } catch {}
    }

    // Sort by rank
    trends.sort((a, b) => (a.rank || 999) - (b.rank || 999));

    cache = { data: trends, ts: Date.now() };
    return NextResponse.json(trends, { headers: { "x-cache": "MISS" } });
  } catch (e: any) {
    console.error("Trend analysis fetch failed:", e.message);
    return NextResponse.json([], { headers: { "x-cache": "FALLBACK" } });
  }
}
