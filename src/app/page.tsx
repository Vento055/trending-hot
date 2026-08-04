import fs from "fs";
import path from "path";
import HomeClient from "./HomeClient";
import type { SignalCard, KeywordItem } from "./HomeClient";

// ── Server-side data loading ────────────────────────────────────────────────
// Reads data files at build/render time so the initial HTML already contains
// real content (signals, trends, categories).  Googlebot and other crawlers
// see the full listings without waiting for client-side JavaScript.

function loadInitialSignals(): SignalCard[] {
  try {
    const signalsPath = path.join(process.cwd(), "data", "signals.json");
    const raw = fs.readFileSync(signalsPath, "utf-8");
    const data = JSON.parse(raw);
    return (data.signals || []).map((s: any) => ({
      tag: s.tag || "Signal",
      title: s.title || "",
      slug: s.slug || "",
      number: s.strength || "",
      trend: s.trend || "Rising",
      desc: s.subtitle || "",
      meta: `Confidence: ${s.strength || "N/A"}`,
    }));
  } catch {
    return [];
  }
}

function loadChinaSignals(allSignals: SignalCard[]): SignalCard[] {
  return allSignals
    .filter(
      (s) =>
        s.tag === "China Signal" ||
        (typeof s.tag === "string" && s.tag.toLowerCase().includes("china"))
    )
    .slice(0, 3);
}

function loadInitialKeywords(): KeywordItem[] {
  try {
    const trendsDir = path.join(process.cwd(), "data", "trends");
    const files = fs
      .readdirSync(trendsDir)
      .filter((f) => f.endsWith(".json"))
      .sort()
      .reverse()
      .slice(0, 4);

    const items: KeywordItem[] = [];
    for (const f of files) {
      const raw = fs.readFileSync(path.join(trendsDir, f), "utf-8");
      const data = JSON.parse(raw);
      for (const kw of data.data || []) {
        const val = kw.avg_interest || kw.peak_interest || 50;
        const slug = (kw.keyword || "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        items.push({
          rank: items.length + 1,
          name: kw.keyword || "",
          slug,
          volume: `${Math.round(val)}K`,
          source: "Google Trends",
          sparkline: kw.interest_values?.slice(-7) || Array(7).fill(val),
          category: kw.category || "",
        });
      }
      if (items.length >= 12) break;
    }
    return items.slice(0, 12);
  } catch {
    return [];
  }
}

export default async function Page() {
  const signals = loadInitialSignals();
  const chinaSignals = loadChinaSignals(signals);
  const keywords = loadInitialKeywords();

  return (
    <HomeClient
      initialSignals={signals.length > 0 ? signals : undefined}
      initialChinaSignals={chinaSignals.length > 0 ? chinaSignals : undefined}
      initialKeywords={keywords.length > 0 ? keywords : undefined}
    />
  );
}
