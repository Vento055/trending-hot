"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Calendar, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";

interface SignalItem {
  slug: string;
  title: string;
  tag: string;
  number: string;
  trend: string;
  desc: string;
  meta: string;
}

const FALLBACK_SIGNALS: SignalItem[] = [
  {
    slug: "webgpu-tutorials",
    title: "WebGPU Tutorials",
    tag: "Content Goldmine",
    number: "+340%",
    trend: "Surging",
    desc: "Developer interest is climbing while high-quality beginner content remains scarce. Early movers can capture search demand.",
    meta: "Window: ~2 weeks  |  Confidence: 87%",
  },
  {
    slug: "eu-ai-act-compliance",
    title: "EU AI Act Compliance",
    tag: "Product Opportunity",
    number: "+220%",
    trend: "Surging",
    desc: "Teams are actively searching for practical checklists, audits, and lightweight tools as the compliance deadline approaches.",
    meta: "Window: ~1 month  |  Confidence: 92%",
  },
  {
    slug: "ai-agent-workflows",
    title: "AI Agent Workflows",
    tag: "Info Arbitrage",
    number: "+185%",
    trend: "Surging",
    desc: "Demand is shifting from broad AI news toward repeatable, role-specific workflows. Content bridging theory to practice wins.",
    meta: "Window: ~3 weeks  |  Confidence: 78%",
  },
  {
    slug: "typescript-pattern-matching",
    title: "TypeScript Pattern Matching",
    tag: "Traffic Breakout",
    number: "+156%",
    trend: "Spike",
    desc: "Discussions around TC39 pattern matching proposal are accelerating. Tutorial content and dev tooling have a narrow window.",
    meta: "Window: ~10 days  |  Confidence: 71%",
  },
];

const FILTER_TABS = ["All", "China Signal", "Product Opportunity", "Content Goldmine", "Info Arbitrage", "Traffic Breakout"];
const ITEMS_PER_PAGE = 10;

export default function SignalsArchivePage() {
  const [signals, setSignals] = useState<SignalItem[]>(FALLBACK_SIGNALS);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    async function loadSignals() {
      try {
        const res = await fetch("/api/signals", { signal: AbortSignal.timeout(10000) });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setSignals(data);
          }
        }
      } catch (e) {
        console.error("Failed to load signals:", e);
      } finally {
        setLoading(false);
      }
    }
    loadSignals();
  }, []);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const filteredSignals = activeFilter === "All"
    ? signals
    : signals.filter((s) => s.tag === activeFilter);

  const totalPages = Math.ceil(filteredSignals.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSignals = filteredSignals.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            <span>Last updated: {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            <span style={{ opacity: 0.3 }}>|</span>
            <TrendingUp className="size-3.5" />
            <span>{signals.length} signals available</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mb-8 flex flex-wrap gap-3">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab;
            const isChina = tab === "China Signal";
            const count = tab === "All" ? signals.length : signals.filter((s) => s.tag === tab).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className="transition-all duration-200"
                style={{
                  padding: "6px 18px",
                  borderRadius: "999px",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: isActive ? "#ffffff" : "#a1a1aa",
                  background: isActive
                    ? (isChina ? "linear-gradient(135deg, #a855f7, #d946ef)" : "#a855f7")
                    : "rgba(255,255,255,0.05)",
                  border: isActive
                    ? (isChina ? "1px solid #d946ef" : "1px solid #a855f7")
                    : "1px solid rgba(168,85,247,0.15)",
                  boxShadow: isActive
                    ? (isChina ? "0 0 16px rgba(217,70,239,0.35)" : "0 0 16px rgba(168,85,247,0.3)")
                    : "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "rgba(168,85,247,0.35)";
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "rgba(168,85,247,0.15)";
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                  }
                }}
              >
                {tab}
                {count > 0 && (
                  <span
                    style={{
                      marginLeft: "6px",
                      fontSize: "0.7rem",
                      opacity: 0.7,
                    }}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <span className="text-sm" style={{ color: "#71717a" }}>Loading signals...</span>
          </div>
        ) : filteredSignals.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <span className="text-sm" style={{ color: "#71717a" }}>No signals found for this filter.</span>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {currentSignals.map((s, i) => {
                const isChina = s.tag === "China Signal";
                return (
                  <Link
                    key={s.slug}
                    href={`/signal/${s.slug}`}
                    className="card-hover stagger-card block"
                    style={{
                      background: isChina
                        ? "rgba(168,85,247,0.04)"
                        : "rgba(255,255,255,0.03)",
                      border: isChina
                        ? "1px solid rgba(217,70,239,0.18)"
                        : "1px solid rgba(168,85,247,0.12)",
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
                              background: isChina
                                ? "rgba(217,70,239,0.15)"
                                : "rgba(168,85,247,0.1)",
                              color: isChina ? "#d946ef" : "#d946ef",
                              borderRadius: "999px",
                              padding: "2px 12px",
                              letterSpacing: "0.04em",
                            }}
                          >
                            {isChina ? "\u25C6 " : ""}{s.tag}
                          </span>
                          <span className="text-xs font-medium" style={{ color: "#71717a" }}>
                            #{startIndex + i + 1}
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
                            style={{
                              color: isChina ? "#d946ef" : "#a855f7",
                              fontSize: "1.5rem",
                            }}
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
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-4 py-2 text-sm transition-all"
                  style={{
                    color: currentPage === 1 ? "#3f3f46" : "#a1a1aa",
                    background: currentPage === 1 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(168,85,247,0.12)",
                    borderRadius: "8px",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  }}
                >
                  <ChevronLeft className="size-4" /> Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className="transition-all"
                    style={{
                      minWidth: "40px",
                      height: "40px",
                      padding: "0 8px",
                      fontSize: "0.9rem",
                      fontWeight: currentPage === pageNum ? 700 : 500,
                      color: currentPage === pageNum ? "#ffffff" : "#a1a1aa",
                      background: currentPage === pageNum ? "#a855f7" : "rgba(255,255,255,0.05)",
                      border: currentPage === pageNum ? "1px solid #a855f7" : "1px solid rgba(168,85,247,0.12)",
                      borderRadius: "8px",
                      boxShadow: currentPage === pageNum ? "0 0 16px rgba(168,85,247,0.3)" : "none",
                      cursor: "pointer",
                    }}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-4 py-2 text-sm transition-all"
                  style={{
                    color: currentPage === totalPages ? "#3f3f46" : "#a1a1aa",
                    background: currentPage === totalPages ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(168,85,247,0.12)",
                    borderRadius: "8px",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  }}
                >
                  Next <ChevronRight className="size-4" />
                </button>
              </div>
            )}

            {/* Page info */}
            <div className="mt-4 text-center text-xs" style={{ color: "#71717a" }}>
              Page {currentPage} of {totalPages} - Showing {currentSignals.length} of {filteredSignals.length} signals
              {activeFilter !== "All" && ` (filtered: ${activeFilter})`}
            </div>
          </>
        )}

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
