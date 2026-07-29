import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface SignalCard {
  tag: string;
  title: string;
  slug: string;
  number: string;
  trend: string;
  desc: string;
  meta: string;
}

const FALLBACK_SIGNALS: SignalCard[] = [
  {
    tag: "Content Goldmine",
    title: "WebGPU Tutorials",
    slug: "webgpu-tutorials",
    number: "+340%",
    trend: "Surging",
    desc: "Developer interest is climbing while high-quality beginner content remains scarce. Early movers can capture search demand.",
    meta: "Window: ~2 weeks  |  Confidence: 87%",
  },
  {
    tag: "Product Opportunity",
    title: "EU AI Act Compliance",
    slug: "eu-ai-act-compliance",
    number: "+220%",
    trend: "Surging",
    desc: "Teams are actively searching for practical checklists, audits, and lightweight tools as the compliance deadline approaches.",
    meta: "Window: ~1 month  |  Confidence: 92%",
  },
  {
    tag: "Info Arbitrage",
    title: "AI Agent Workflows",
    slug: "ai-agent-workflows",
    number: "+185%",
    trend: "Surging",
    desc: "Demand is shifting from broad AI news toward repeatable, role-specific workflows. Content bridging theory to practice wins.",
    meta: "Window: ~3 weeks  |  Confidence: 78%",
  },
  {
    tag: "Traffic Breakout",
    title: "TypeScript Pattern Matching",
    slug: "typescript-pattern-matching",
    number: "+156%",
    trend: "Spike",
    desc: "Discussions around TC39 pattern matching proposal are accelerating. Tutorial content and dev tooling have a narrow window.",
    meta: "Window: ~10 days  |  Confidence: 71%",
  },
];

let cache: { data: SignalCard[]; ts: number } | null = null;
const TTL = 60 * 60 * 1000; // 1 hour cache

export async function GET() {
  if (cache && Date.now() - cache.ts < TTL) {
    return NextResponse.json(cache.data, { headers: { "x-cache": "HIT" } });
  }

  try {
    const signalsPath = path.join(process.cwd(), "data", "signals.json");

    if (fs.existsSync(signalsPath)) {
      const raw = fs.readFileSync(signalsPath, "utf-8");
      const parsed = JSON.parse(raw);

      if (parsed.signals && Array.isArray(parsed.signals) && parsed.signals.length > 0) {
        const cards: SignalCard[] = parsed.signals.map((s: any) => ({
          tag: s.tag || "Opportunity",
          title: s.title,
          slug: s.slug,
          number: s.number || s.growth || "+100%",
          trend: s.trend || "Rising",
          desc: s.subtitle || s.desc || "",
          meta: s.meta || `Confidence: ${s.strength || "N/A"}`,
        }));

        cache = { data: cards, ts: Date.now() };
        return NextResponse.json(cards, { headers: { "x-cache": "MISS" } });
      }
    }

    throw new Error("No signals in data file");
  } catch (e: any) {
    console.error("Signals API error:", e.message);
    cache = { data: FALLBACK_SIGNALS, ts: Date.now() };
    return NextResponse.json(FALLBACK_SIGNALS, { headers: { "x-cache": "FALLBACK" } });
  }
}
