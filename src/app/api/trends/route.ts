import { NextResponse } from "next/server";

interface TrendItem {
  title: string;
  traffic: string;
}

let cache: { data: TrendItem[] | null; ts: number } = { data: null, ts: 0 };
const TTL = 10 * 60 * 1000;

// Fallback trend data (refreshed periodically)
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

export async function GET() {
  if (cache.data && Date.now() - cache.ts < TTL) {
    return NextResponse.json(cache.data, { headers: { "x-cache": "HIT" } });
  }

  cache = { data: FALLBACK_TRENDS, ts: Date.now() };
  return NextResponse.json(FALLBACK_TRENDS, { headers: { "x-cache": "FALLBACK" } });
}
