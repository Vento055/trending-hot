"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, TrendingUp } from "lucide-react";

interface SignalItem {
  slug: string;
  title: string;
  tag: string;
  number: string;
  trend: string;
  desc: string;
  meta: string;
  date: string;
}

const archiveSignals: SignalItem[] = [
  {
    slug: "webgpu-tutorials",
    title: "WebGPU Tutorials",
    tag: "Content Goldmine",
    number: "+340%",
    trend: "Surging",
    desc: "Developer interest is climbing while high-quality beginner content remains scarce. Early movers can capture search demand.",
    meta: "Window: ~2 weeks  |  Confidence: 87%",
    date: "Jul 29, 2026",
  },
  {
    slug: "eu-ai-act-compliance",
    title: "EU AI Act Compliance",
    tag: "Product Opportunity",
    number: "+220%",
    trend: "Surging",
    desc: "Teams are actively searching for practical checklists, audits, and lightweight tools as the compliance deadline approaches.",
    meta: "Window: ~1 month  |  Confidence: 92%",
    date: "Jul 29, 2026",
  },
  {
    slug: "ai-agent-workflows",
    title: "AI Agent Workflows",
    tag: "Info Arbitrage",
    number: "+185%",
    trend: "Surging",
    desc: "Demand is shifting from broad AI news toward repeatable, role-specific workflows. Content bridging theory to practice wins.",
    meta: "Window: ~3 weeks  |  Confidence: 78%",
    date: "Jul 29, 2026",
  },
  {
    slug: "typescript-pattern-matching",
    title: "TypeScript Pattern Matching",
    tag: "Traffic Breakout",
    number: "+156%",
    trend: "Spike",
    desc: "Discussions around TC39 pattern matching proposal are accelerating. Tutorial content and dev tooling have a narrow window.",
    meta: "Window: ~10 days  |  Confidence: 71%",
    date: "Jul 29, 2026",
  },
];

export default function SignalsArchivePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a10" }}>
      <div className="mx-auto max-w-5xl px-[5%] py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-8 transition hover:text-white"
          style={{ color: "#71717a" }}
        >
          <ArrowLeft className="size-4" /> Back to Home
        </Link>

        <div className="mb-10">
          <h1
            className="font-bold mb-3"
            style={{
              color: "#ffffff",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              lineHeight: "1.2",
            }}
          >
            Signal Archive
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: "1.05rem", lineHeight: "1.6" }}>
            Browse all opportunity signals. New signals are curated every 24 hours.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs" style={{ color: "#71717a" }}>
            <Calendar className="size-3.5" />
            <span>Last updated: Jul 29, 2026</span>
            <span style={{ opacity: 0.3 }}>|</span>
            <TrendingUp className="size-3.5" />
            <span>{archiveSignals.length} signals available</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {archiveSignals.map((s, i) => (
            <Link
              key={s.slug}
              href={`/signal/${s.slug}`}
              className="card-hover stagger-card block"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(168,85,247,0.12)",
                borderRadius: "12px",
                padding: "24px",
                animationDelay: `${i * 60}ms`,
              }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="inline-block text-xs font-semibold"
                      style={{
                        background: "rgba(168,85,247,0.1)",
                        color: "#d946ef",
                        borderRadius: "999px",
                        padding: "2px 12px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {s.tag}
                    </span>
                    <span style={{ color: "#71717a", fontSize: "0.75rem" }}>
                      {s.date}
                    </span>
                  </div>

                  <h3
                    className="font-semibold mb-2"
                    style={{ color: "#ffffff", fontSize: "1.15rem" }}
                  >
                    {s.title}
                  </h3>

                  <p
                    style={{
                      color: "#a1a1aa",
                      fontSize: "0.9rem",
                      lineHeight: "1.6",
                    }}
                  >
                    {s.desc}
                  </p>

                  <p className="mt-3" style={{ color: "#71717a", fontSize: "0.75rem" }}>
                    {s.meta}
                  </p>
                </div>

                <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                  <div className="text-right">
                    <div
                      className="font-bold odometer"
                      style={{ color: "#a855f7", fontSize: "1.5rem" }}
                    >
                      {s.number}
                    </div>
                    <div
                      className="text-xs font-semibold"
                      style={{
                        color: s.trend === "Surging" ? "#a855f7" : "#d946ef",
                      }}
                    >
                      {s.trend === "Surging" ? "\u2191" : "\u23f3"} {s.trend}
                    </div>
                  </div>
                  <ArrowRight className="size-5 shrink-0" style={{ color: "#71717a" }} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div
          className="mt-12 text-center p-8"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(168,85,247,0.15)",
            borderRadius: "12px",
          }}
        >
          <p className="mb-4" style={{ color: "#a1a1aa" }}>
            Signals are refreshed daily. Check back tomorrow for new opportunities.
          </p>
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2"
            style={{ padding: "12px 28px" }}
          >
            Back to Today&apos;s Signals <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
