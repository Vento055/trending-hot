"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, TrendingUp } from "lucide-react";

interface TrendData {
  slug: string;
  name: string;
  volume: string;
  source: string;
  rank: number;
  sparkline: number[];
  summary: string;
  category: string;
  trendTag: { type: string; value?: string };
  analysisWhy: string;
  analysisMeaning: string;
  faqAnswers: { question: string; answer: string }[];
  relatedTrends: { name: string; slug: string }[];
  generatedAt: string;
}

function Sparkline({ data, width = 120, height = 32 }: { data: number[]; width?: number; height?: number }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");
  const trendUp = data[data.length - 1] > data[0];
  const strokeColor = trendUp ? "#a855f7" : "#d946ef";

  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill="url(#sparkGrad)"
      />
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((v, i) => {
        const cx = (i / (data.length - 1)) * width;
        const cy = height - ((v - min) / range) * height;
        if (i === data.length - 1) {
          return <circle key={i} cx={cx} cy={cy} r="3" fill={strokeColor} />;
        }
        return null;
      })}
    </svg>
  );
}

function getTrendTagDisplay(trendTag: { type: string; value?: string } | undefined) {
  if (!trendTag || trendTag.type === "none") return null;
  if (trendTag.type === "surge") {
    return { icon: "🔥", label: `+${trendTag.value || "50"}%`, bg: "rgba(239,68,68,0.15)", color: "#f87171" };
  }
  if (trendTag.type === "streak") {
    return { icon: "📈", label: `${trendTag.value || "2"} weeks`, bg: "rgba(168,85,247,0.15)", color: "#c084fc" };
  }
  if (trendTag.type === "new") {
    return { icon: "🆕", label: "New", bg: "rgba(34,197,94,0.15)", color: "#4ade80" };
  }
  return null;
}

function getCategoryColor(category: string): { bg: string; color: string } {
  const map: Record<string, { bg: string; color: string }> = {
    "AI": { bg: "rgba(168,85,247,0.15)", color: "#c084fc" },
    "E-commerce": { bg: "rgba(34,197,94,0.15)", color: "#4ade80" },
    "Social Media": { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
    "Entertainment": { bg: "rgba(245,158,11,0.15)", color: "#fbbf24" },
    "China Signal": { bg: "rgba(217,70,239,0.15)", color: "#d946ef" },
    "Tech": { bg: "rgba(168,85,247,0.12)", color: "#a855f7" },
    "Other": { bg: "rgba(161,161,170,0.15)", color: "#a1a1aa" },
  };
  return map[category] || map["Other"];
}

export default function TrendContent({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string>("");
  const [data, setData] = useState<TrendData | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number>(0);

  useEffect(() => {
    paramsPromise.then((p) => {
      setSlug(p.slug);
      fetch(`/api/trend-analysis/${p.slug}`)
        .then((res) => {
          if (!res.ok) throw new Error("Trend not found");
          return res.json();
        })
        .then((trend: TrendData) => {
          setData(trend);
        })
        .catch(() => {
          setData(null);
        })
        .finally(() => setLoading(false));
    });
  }, [paramsPromise]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-[5%] py-20 text-center">
        <div className="animate-pulse" style={{ color: "#71717a" }}>
          Loading trend analysis...
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-3xl px-[5%] py-20 text-center">
        <h1 className="text-2xl font-bold mb-4" style={{ color: "#ffffff" }}>
          Trend Not Found
        </h1>
        <p style={{ color: "#a1a1aa" }} className="mb-6">
          This trend analysis hasn&apos;t been generated yet.
        </p>
        <Link
          href="/"
          className="btn-primary inline-block"
          style={{ padding: "12px 28px" }}
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const tagDisplay = getTrendTagDisplay(data.trendTag);
  const catColor = getCategoryColor(data.category);

  // Build FAQPage JSON-LD structured data
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqAnswers.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-[5%] py-12">
      {/* JSON-LD Structured Data for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm mb-8 transition hover:text-white"
        style={{ color: "#a1a1aa" }}
      >
        <ArrowLeft size={16} />
        Back to Trending Hot
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {tagDisplay && (
            <span
              className="inline-flex items-center gap-1 text-sm font-semibold"
              style={{
                padding: "4px 12px",
                borderRadius: "999px",
                background: tagDisplay.bg,
                color: tagDisplay.color,
              }}
            >
              {tagDisplay.icon} {tagDisplay.label}
            </span>
          )}
          <span
            className="inline-flex items-center gap-1 text-sm font-medium"
            style={{
              padding: "4px 12px",
              borderRadius: "999px",
              background: catColor.bg,
              color: catColor.color,
            }}
          >
            {data.category}
          </span>
          <span
            className="inline-flex items-center gap-1 text-sm"
            style={{ color: "#71717a" }}
          >
            <TrendingUp size={14} />
            Rank #{data.rank}
          </span>
        </div>

        <h1
          className="text-3xl md:text-4xl font-bold mb-3"
          style={{ color: "#ffffff" }}
        >
          {data.name}
        </h1>

        <p className="text-lg leading-relaxed" style={{ color: "#a1a1aa" }}>
          {data.summary}
        </p>

        {/* Stats row */}
        <div
          className="flex flex-wrap items-center gap-6 mt-6 p-4"
          style={{
            borderRadius: "12px",
            border: "1px solid rgba(168,85,247,0.2)",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <div>
            <div className="text-xs uppercase tracking-wide mb-1" style={{ color: "#71717a" }}>
              Search Volume
            </div>
            <div className="text-xl font-bold" style={{ color: "#ffffff" }}>
              {data.volume}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide mb-1" style={{ color: "#71717a" }}>
              Source
            </div>
            <div className="text-sm font-medium" style={{ color: "#a1a1aa" }}>
              {data.source}
            </div>
          </div>
          <div className="ml-auto">
            <Sparkline data={data.sparkline} width={120} height={32} />
          </div>
        </div>
      </header>

      {/* Analysis Section 1: Why Is It Trending */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: "#ffffff" }}
        >
          Why Is {data.name} Trending Right Now?
        </h2>
        <div
          className="p-6"
          style={{
            borderRadius: "12px",
            border: "1px solid rgba(168,85,247,0.15)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <p
            className="leading-relaxed"
            style={{ color: "#a1a1aa", fontSize: "1rem", lineHeight: "1.8" }}
          >
            {data.analysisWhy}
          </p>
        </div>
      </section>

      {/* Analysis Section 2: What This Means */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: "#ffffff" }}
        >
          What This Means
        </h2>
        <div
          className="p-6"
          style={{
            borderRadius: "12px",
            border: "1px solid rgba(168,85,247,0.15)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <p
            className="leading-relaxed"
            style={{ color: "#a1a1aa", fontSize: "1rem", lineHeight: "1.8" }}
          >
            {data.analysisMeaning}
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: "#ffffff" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {data.faqAnswers.map((faq, index) => (
            <div
              key={index}
              style={{
                borderRadius: "12px",
                border: openFaq === index
                  ? "1px solid rgba(168,85,247,0.4)"
                  : "1px solid rgba(255,255,255,0.1)",
                background: openFaq === index
                  ? "rgba(168,85,247,0.08)"
                  : "rgba(255,255,255,0.05)",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                className="w-full flex items-center justify-between gap-4 p-4 text-left"
              >
                <span
                  className="font-medium"
                  style={{ color: "#e5e5e5", fontSize: "0.95rem" }}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  style={{
                    color: "#a1a1aa",
                    flexShrink: 0,
                    transform: openFaq === index ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </button>
              {openFaq === index && (
                <div className="px-4 pb-4">
                  <p
                    className="leading-relaxed"
                    style={{ color: "#a1a1aa", fontSize: "0.9rem", lineHeight: "1.7" }}
                  >
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Related Trends */}
      {data.relatedTrends && data.relatedTrends.length > 0 && (
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "#ffffff" }}
          >
            Related Trends
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.relatedTrends.map((related, index) => (
              <Link
                key={index}
                href={`/trend/${related.slug}`}
                className="flex items-center justify-between gap-2 p-4 transition group"
                style={{
                  borderRadius: "12px",
                  border: "1px solid rgba(168,85,247,0.15)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <span
                  className="font-medium text-sm"
                  style={{ color: "#a1a1aa" }}
                >
                  {related.name}
                </span>
                <ArrowLeft
                  size={16}
                  className="rotate-180 transition group-hover:translate-x-1"
                  style={{ color: "#a855f7" }}
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer info */}
      <footer
        className="pt-8 mt-8 text-center text-xs"
        style={{
          color: "#71717a",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <p>
          Analysis generated on{" "}
          {new Date(data.generatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {" "}by Trending Hot AI Signal Engine
        </p>
        <p className="mt-2">
          Data source: {data.source} · This analysis is AI-generated for informational purposes only.
        </p>
      </footer>
    </div>
  );
}
