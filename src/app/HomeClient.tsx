"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

/* ===== Odometer Counter Component (Enhanced) ===== */
function Counter({ value, duration = 600 }: { value: string; duration?: number }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const match = value.match(/(\d+(?:\.\d+)?)/);
          if (!match) {
            setDisplay(value);
            return;
          }
          const target = parseFloat(match[1]);
          const suffix = value.replace(match[1], "");
          const prefix = value.substring(0, match.index);
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            setDisplay(
              prefix +
                (Number.isInteger(target)
                  ? Math.round(current).toString()
                  : current.toFixed(1)) +
                suffix
            );
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className="odometer" style={{ fontWeight: 700, fontSize: "2rem", color: "#ffffff" }}>
      {display}
    </span>
  );
}

/* ===== Sparkline Component ===== */
function Sparkline({ data, width = 60, height = 16 }: { data: number[]; width?: number; height?: number }) {
  if (data.length < 2) return null;
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
    <svg width={width} height={height} className="shrink-0" style={{ overflow: "visible" }}>
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      {data.map((v, i) => {
        const cx = (i / (data.length - 1)) * width;
        const cy = height - ((v - min) / range) * height;
        if (i === data.length - 1) {
          return <circle key={i} cx={cx} cy={cy} r="2" fill={strokeColor} />;
        }
        return null;
      })}
    </svg>
  );
}

export interface SignalCard {
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

export interface KeywordItem {
  rank: number;
  name: string;
  slug: string;
  volume: string;
  source: string;
  sparkline: number[];
  summary?: string;
  category?: string;
  trendTag?: { type: string; value?: string };
}

const FALLBACK_KEYWORDS: KeywordItem[] = [
  { rank: 1, name: "WebGPU", slug: "webgpu", volume: "82K", source: "Google Trends", sparkline: [20, 35, 42, 55, 63, 70, 82] },
  { rank: 2, name: "EU AI Act", slug: "eu-ai-act", volume: "67K", source: "Google Trends", sparkline: [30, 28, 40, 48, 55, 60, 67] },
  { rank: 3, name: "GPT-6", slug: "gpt-6", volume: "145K", source: "Reddit", sparkline: [60, 75, 90, 105, 120, 135, 145] },
  { rank: 4, name: "Rust 2026", slug: "rust-2026", volume: "38K", source: "Google Trends", sparkline: [25, 27, 30, 33, 35, 36, 38] },
  { rank: 5, name: "AI Agents", slug: "ai-agents", volume: "94K", source: "Reddit", sparkline: [40, 52, 58, 70, 82, 88, 94] },
  { rank: 6, name: "TypeScript 6.0", slug: "typescript-6-0", volume: "51K", source: "Google Trends", sparkline: [32, 35, 38, 42, 46, 49, 51] },
  { rank: 7, name: "Bun 2.0", slug: "bun-2-0", volume: "29K", source: "Reddit", sparkline: [18, 20, 22, 24, 26, 28, 29] },
  { rank: 8, name: "Zig", slug: "zig", volume: "22K", source: "Google Trends", sparkline: [15, 18, 19, 20, 21, 22, 22] },
];

function generateSparkline(seed: number): number[] {
  const arr: number[] = [];
  let v = Math.max(10, seed * 0.3);
  for (let i = 0; i < 7; i++) {
    v = v + (Math.random() - 0.3) * v * 0.3;
    v = Math.max(5, v);
    arr.push(Math.round(v));
  }
  return arr;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const faqs = [
  [
    "What is an opportunity signal?",
    "An opportunity signal connects rising attention with a practical action — such as content to publish, a product to validate, or a market to watch. Instead of just showing what's trending, we tell you why it matters and what to do.",
  ],
  [
    "Where does the trend data come from?",
    "Trending Hot monitors public trend signals from sources including Google Trends and Reddit, then organizes them into a clear daily view with context and actionable insight.",
  ],
  [
    "How often are signals updated?",
    "The free experience is designed around a fresh daily signal brief, so you can scan the market without living in a dashboard. New signals are curated every 24 hours.",
  ],
  [
    "Do I need a credit card to start?",
    "No. The free tier is available without a credit card and includes the core daily signal experience. Upgrade only when you need deeper analysis.",
  ],
  [
    "Who is Trending Hot built for?",
    "It is built for creators, founders, marketers, researchers, and anyone who needs to spot demand before a market becomes crowded.",
  ],
];

const navItems = [
  ["About", "/about"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Contact", "/contact"],
];

export default function HomeClient({ initialSignals, initialChinaSignals, initialKeywords }: {
  initialSignals?: SignalCard[];
  initialChinaSignals?: SignalCard[];
  initialKeywords?: KeywordItem[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [activeTab, setActiveTab] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const [dynamicKeywords, setDynamicKeywords] = useState<KeywordItem[]>(initialKeywords || []);
  const [keywordsLoading, setKeywordsLoading] = useState(!initialKeywords || initialKeywords.length === 0);
  const [signals, setSignals] = useState<SignalCard[]>(initialSignals || FALLBACK_SIGNALS);
  const [signalsLoading, setSignalsLoading] = useState(false);
  const [chinaSignals, setChinaSignals] = useState<SignalCard[]>(initialChinaSignals || []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    async function loadData() {
      setKeywordsLoading(true);
      try {
        // Fetch trend analysis data (enriched with AI-generated summary, category, trend tags)
        let analysisMap: Record<string, any> = {};
        try {
          const analysisRes = await fetch("/api/trend-analysis", { signal: AbortSignal.timeout(10000) });
          if (analysisRes.ok) {
            const analysisData = await analysisRes.json();
            if (Array.isArray(analysisData)) {
              analysisData.forEach((a: any) => {
                if (a.slug) analysisMap[a.slug] = a;
              });
            }
          }
        } catch (e) {
          console.error("Trend analysis fetch failed:", e);
        }

        let trends: any[] = [];
        let reddit: any[] = [];
        try {
          const [trendsRes, redditRes] = await Promise.allSettled([
            fetch("/api/trends", { signal: AbortSignal.timeout(10000) }),
            fetch("/api/reddit", { signal: AbortSignal.timeout(10000) }),
          ]);
          if (trendsRes.status === "fulfilled" && trendsRes.value.ok) {
            trends = await trendsRes.value.json();
          }
          if (redditRes.status === "fulfilled" && redditRes.value.ok) {
            reddit = await redditRes.value.json();
          }
        } catch (e) {
          console.error("Trends/Reddit fetch failed:", e);
        }

        const googleItems: KeywordItem[] = (Array.isArray(trends) ? trends : [])
          .slice(0, 5)
          .map((t: any, i: number) => {
            const slug = slugify(t.title);
            const analysis = analysisMap[slug];
            return {
              rank: analysis?.rank || i + 1,
              name: t.title,
              slug,
              volume: t.traffic || "Trending",
              source: "Google Trends",
              sparkline: analysis?.sparkline || generateSparkline(parseInt(t.traffic) || 50),
              summary: analysis?.summary,
              category: analysis?.category,
              trendTag: analysis?.trendTag,
            };
          });

        const redditItems: KeywordItem[] = (Array.isArray(reddit) ? reddit : [])
          .slice(0, 5)
          .map((r: any, i: number) => {
            const name = r.title.length > 30 ? r.title.slice(0, 27) + "..." : r.title;
            const slug = slugify(r.title);
            const analysis = analysisMap[slug];
            return {
              rank: analysis?.rank || i + 6,
              name,
              slug,
              volume: `${(r.ups > 1000 ? (r.ups / 1000).toFixed(1) + "K" : r.ups.toString())}`,
              source: "Reddit",
              sparkline: analysis?.sparkline || generateSparkline(r.ups / 100),
              summary: analysis?.summary,
              category: analysis?.category,
              trendTag: analysis?.trendTag,
            };
          });

        // If we have analysis data, use it as primary source (sorted by rank)
        const analysisItems: KeywordItem[] = Object.values(analysisMap)
          .sort((a: any, b: any) => (a.rank || 999) - (b.rank || 999))
          .slice(0, 10)
          .map((a: any) => ({
            rank: a.rank,
            name: a.name,
            slug: a.slug,
            volume: a.volume,
            source: a.source,
            sparkline: a.sparkline || generateSparkline(50),
            summary: a.summary,
            category: a.category,
            trendTag: a.trendTag,
          }));

        const merged = analysisItems.length > 0 ? analysisItems : [...googleItems, ...redditItems];
        if (merged.length > 0) {
          setDynamicKeywords(merged);
        }
      } catch (e) {
        console.error("Failed to load keywords:", e);
      } finally {
        setKeywordsLoading(false);
      }
    }
    loadData();
  }, []);

  // Fetch dynamic signals from /api/signals
  useEffect(() => {
    async function loadSignals() {
      setSignalsLoading(true);
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
        setSignalsLoading(false);
      }
    }
    loadSignals();
  }, []);

  // Fetch China Signal articles separately for the homepage section
  useEffect(() => {
    async function loadChinaSignals() {
      try {
        const res = await fetch("/api/signals", { signal: AbortSignal.timeout(10000) });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const china = data.filter((s: SignalCard) => s.tag === "China Signal").slice(0, 3);
            if (china.length > 0) {
              setChinaSignals(china);
            }
          }
        }
      } catch (e) {
        console.error("Failed to load China signals:", e);
      }
    }
    loadChinaSignals();
  }, []);

  const keywords = dynamicKeywords.length > 0 ? dynamicKeywords : FALLBACK_KEYWORDS;

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", backgroundColor: "#0a0a10" }}
    >
      {/* ===== Navbar (2. Glassmorphism) ===== */}
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: scrolled ? "rgba(10,10,16,0.75)" : "rgba(10,10,16,0.4)",
          borderBottom: scrolled ? "1px solid rgba(168,85,247,0.1)" : "1px solid transparent",
        }}
      >
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-[5%] sm:px-[6%]">
          <Link href="/" className="text-lg font-bold tracking-tight" style={{ color: "#ffffff" }}>
            TRENDING HOT
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-sm transition hover:text-white"
                style={{ color: "#71717a" }}
              >
                {label}
              </Link>
            ))}
            <a href="#signals" className="btn-primary text-sm" style={{ padding: "8px 20px" }}>
              Get Started
            </a>
          </div>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{ color: "#ffffff" }}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
        {menuOpen && (
          <div
            className="md:hidden"
            style={{
              backdropFilter: "blur(16px) saturate(180%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%)",
              backgroundColor: "rgba(10,10,16,0.9)",
              borderBottom: "1px solid rgba(168,85,247,0.1)",
            }}
          >
            <div className="flex flex-col gap-1 px-[5%] py-3">
              {navItems.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 text-sm"
                  style={{ color: "#71717a" }}
                >
                  {label}
                </Link>
              ))}
              <a
                href="#signals"
                onClick={() => setMenuOpen(false)}
                className="btn-primary mt-1 text-center text-sm"
                style={{ padding: "10px 20px" }}
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ===== Hero (1. Strong Grid + 3. Glow Orbs) ===== */}
        <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-[5%] pt-14 hero-grid">
          {/* Glow Orb 1 - Left top */}
          <div
            className="glow-orb-1 pointer-events-none absolute"
            style={{
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(100,60,180,0.08) 40%, transparent 70%)",
              filter: "blur(80px)",
              top: "10%",
              left: "-10%",
            }}
          />
          {/* Glow Orb 2 - Right middle */}
          <div
            className="glow-orb-2 pointer-events-none absolute"
            style={{
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(100,100,220,0.12) 0%, rgba(80,60,200,0.06) 40%, transparent 70%)",
              filter: "blur(70px)",
              top: "40%",
              right: "-8%",
            }}
          />
          {/* Glow Orb 3 - Bottom center */}
          <div
            className="glow-orb-3 pointer-events-none absolute"
            style={{
              width: "350px",
              height: "350px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(217,70,239,0.1) 0%, rgba(150,50,200,0.05) 40%, transparent 70%)",
              filter: "blur(80px)",
              bottom: "5%",
              left: "40%",
            }}
          />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {/* Trust badges */}
            <div className="mb-6 flex justify-center gap-3">
              {["50+ Sources Daily", "AI Opportunity Signals"].map((badge) => (
                <span
                  key={badge}
                  className="badge-hover text-xs font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#a1a1aa",
                    borderRadius: "999px",
                    padding: "4px 14px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Title with gradient text */}
            <h1
              className="font-extrabold"
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                letterSpacing: "-0.02em",
                lineHeight: "1.15",
              }}
            >
              <span style={{ color: "#ffffff" }}>Discover What's </span>
              <span className="gradient-text">Trending</span>
              <span style={{ color: "#ffffff" }}> : Daily Signals on AI Tools, Models & Developer Ecosystem</span>
            </h1>

            {/* Subtitle */}
            <p
              className="mt-6 font-normal"
              style={{
                color: "#a1a1aa",
                fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
                lineHeight: "1.6",
              }}
            >
              Track what's rising in AI. Daily intelligence on new tools, model updates, and developer trends
              <br />
              before everyone else sees them.
            </p>

            {/* CTA */}
            <div className="mt-8">
              <a
                href="#signals"
                className="btn-primary glow-pulse cta-arrow inline-flex items-center gap-2"
                style={{
                  fontSize: "1.1rem",
                  padding: "16px 40px",
                  borderRadius: "12px",
                }}
              >
                Explore Today&apos;s Signals <ArrowRight className="size-5 cta-arrow-icon" />
              </a>
            </div>

            {/* Example signals - dynamic */}
            <p className="mt-10 text-xs" style={{ color: "#71717a", fontSize: "0.8rem" }}>
              Recent signals: {signalsLoading
                ? "Loading latest signals..."
                : signals.slice(0, 3).map((s) => s.title).join(" / ")}
            </p>
          </div>
        </section>

        {/* ===== Trust Bar ===== */}
        <section className="flex items-center justify-center px-[5%]" style={{ height: "72px" }}>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm" style={{ color: "#71717a" }}>
            <span>Product Hunt</span>
            <span style={{ opacity: 0.3 }}>|</span>
            <span>Hacker News</span>
            <span style={{ opacity: 0.3 }}>|</span>
            <span>1,200+ signals monthly</span>
            <span style={{ opacity: 0.3 }}>|</span>
            <span>50+ data sources</span>
          </div>
        </section>

        {/* ===== Opportunity Signals (5. Border Beam + 7. 3D Tilt) ===== */}
        <section id="signals" className="px-[5%] py-20 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <h2
              className="text-center font-bold"
              style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 3vw, 1.75rem)" }}
            >
              Opportunity Signals
            </h2>
            <p className="mt-3 text-center" style={{ color: "#71717a", fontSize: "0.9rem" }}>
              AI-identified trends with money-making potential
            </p>
            <div className="mt-4 flex justify-center">
              <Link
                href="/signals"
                className="btn-secondary inline-flex items-center gap-2 text-sm"
                style={{ padding: "8px 20px" }}
              >
                View Archive
              </Link>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {signals.slice(0, 4).map((s, i) => (
                <Link
                  key={s.title}
                  href={`/signal/${s.slug}`}
                  className="border-beam-card tilt-card stagger-card cursor-pointer block"
                  style={{
                    padding: "24px",
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  {/* Tag */}
                  <span
                    className="badge-hover inline-block"
                    style={{
                      background: "rgba(168,85,247,0.1)",
                      color: "#d946ef",
                      borderRadius: "999px",
                      padding: "2px 12px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {s.tag}
                  </span>

                  {/* Title */}
                  <h3 className="mt-3 font-semibold" style={{ color: "#ffffff", fontSize: "1.25rem" }}>
                    {s.title}
                  </h3>

                  {/* Big number with counter */}
                  <div className="mt-3 flex items-baseline gap-3">
                    <Counter value={s.number} />
                    <span
                      className="text-xs font-semibold"
                      style={{ color: s.trend === "Surging" ? "#a855f7" : "#d946ef" }}
                    >
                      {s.trend === "Surging" ? "\u2191" : "\u23f3"} {s.trend}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-4" style={{ color: "#a1a1aa", fontSize: "0.9rem", lineHeight: "1.5" }}>
                    {s.desc}
                  </p>

                  {/* Meta */}
                  <p className="mt-4" style={{ color: "#71717a", fontSize: "0.75rem" }}>
                    {s.meta}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section transition */}
        <div className="section-transition" />

        {/* ===== China Signals Section ===== */}
        {chinaSignals.length > 0 && (
          <section className="px-[5%] py-20 sm:py-24">
            <div className="mx-auto max-w-5xl">
              <div className="flex items-center gap-3 mb-2">
                <span
                  style={{
                    fontSize: "1.1rem",
                    filter: "drop-shadow(0 0 8px rgba(217,70,239,0.4))",
                  }}
                >
                  {"◆"}
                </span>
                <h2
                  className="font-bold"
                  style={{
                    color: "#ffffff",
                    fontSize: "clamp(1.5rem, 3vw, 1.75rem)",
                  }}
                >
                  China Signals
                </h2>
              </div>
              <p className="text-xs" style={{ color: "#71717a" }}>
                Tech trends and opportunities from Chinese developer communities and news sources
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {chinaSignals.map((s, i) => (
                  <Link
                    key={s.slug}
                    href={`/signal/${s.slug}`}
                    className="stagger-card tilt-card cursor-pointer block"
                    style={{
                      background: "rgba(217,70,239,0.04)",
                      border: "1px solid rgba(217,70,239,0.15)",
                      borderRadius: "12px",
                      padding: "22px",
                      animationDelay: `${i * 80}ms`,
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.borderColor = "rgba(217,70,239,0.4)";
                      e.currentTarget.style.boxShadow = "0 0 28px rgba(217,70,239,0.12), 0 8px 24px rgba(0,0,0,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "rgba(217,70,239,0.15)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <span
                      className="inline-block"
                      style={{
                        background: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(217,70,239,0.15))",
                        color: "#d946ef",
                        borderRadius: "999px",
                        padding: "2px 12px",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {"◆"} China Signal
                    </span>

                    <h3
                      className="mt-3 font-semibold"
                      style={{ color: "#ffffff", fontSize: "1.05rem", lineHeight: "1.3" }}
                    >
                      {s.title}
                    </h3>

                    <div className="mt-2 flex items-baseline gap-2">
                      <span
                        className="font-bold"
                        style={{ color: "#d946ef", fontSize: "1.3rem" }}
                      >
                        {s.number}
                      </span>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: "#a855f7" }}
                      >
                        {s.trend === "Surging" ? "↑" : "⏳"} {s.trend}
                      </span>
                    </div>

                    <p
                      className="mt-3"
                      style={{
                        color: "#a1a1aa",
                        fontSize: "0.82rem",
                        lineHeight: "1.5",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {s.desc}
                    </p>

                    <p className="mt-3" style={{ color: "#71717a", fontSize: "0.7rem" }}>
                      {s.meta}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/signals"
                  className="btn-secondary inline-flex items-center gap-2 text-sm"
                  style={{ padding: "8px 20px" }}
                >
                  View All China Signals <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Section transition */}
        <div className="section-transition" />

        {/* ===== Trending Keywords (Card Grid) ===== */}
        <section className="px-[5%] py-20 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <h2
              className="font-bold"
              style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 3vw, 1.75rem)" }}
            >
              Trending Keywords
            </h2>
            <p className="mt-2 text-xs" style={{ color: "#71717a" }}>
              Google Trends refreshes daily, Reddit updates in real-time
            </p>

            {/* Pill Tabs */}
            <div className="mt-6 flex gap-3">
              {["All", "Google Trends", "Reddit"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="transition-all duration-200"
                  style={{
                    padding: "6px 18px",
                    borderRadius: "999px",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: activeTab === tab ? "#ffffff" : "#a1a1aa",
                    background: activeTab === tab ? "#a855f7" : "rgba(255,255,255,0.05)",
                    border: activeTab === tab ? "1px solid #a855f7" : "1px solid rgba(168,85,247,0.15)",
                    boxShadow: activeTab === tab ? "0 0 16px rgba(168,85,247,0.3)" : "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab) {
                      e.currentTarget.style.borderColor = "rgba(168,85,247,0.35)";
                      e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab) {
                      e.currentTarget.style.borderColor = "rgba(168,85,247,0.15)";
                      e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                    }
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Card Grid */}
            {keywordsLoading && dynamicKeywords.length === 0 ? (
              <div className="mt-8 flex items-center justify-center h-32">
                <span className="text-sm" style={{ color: "#71717a" }}>Loading trends...</span>
              </div>
            ) : (
            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {keywords
                .filter((kw) => activeTab === "All" || kw.source === activeTab)
                .map((kw, i) => (
                  <Link
                    key={kw.rank}
                    href={`/trend/${kw.slug}`}
                    className="stagger-card tilt-card cursor-pointer block"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(168,85,247,0.12)",
                      borderRadius: "12px",
                      padding: "20px",
                      animationDelay: `${i * 60}ms`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.borderColor = "rgba(168,85,247,0.3)";
                      e.currentTarget.style.boxShadow = "0 0 24px rgba(168,85,247,0.1), 0 4px 16px rgba(0,0,0,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "rgba(168,85,247,0.12)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Category Tag + Trend Tag Row */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      {kw.trendTag && kw.trendTag.type !== "none" && (
                        <span
                          className="inline-flex items-center gap-0.5 text-xs font-semibold"
                          style={{
                            padding: "2px 8px",
                            borderRadius: "999px",
                            background: kw.trendTag.type === "surge" ? "rgba(239,68,68,0.15)"
                              : kw.trendTag.type === "streak" ? "rgba(168,85,247,0.15)"
                              : "rgba(34,197,94,0.15)",
                            color: kw.trendTag.type === "surge" ? "#f87171"
                              : kw.trendTag.type === "streak" ? "#c084fc"
                              : "#4ade80",
                          }}
                        >
                          {kw.trendTag.type === "surge" ? "\uD83D\uDD25" : kw.trendTag.type === "streak" ? "\uD83D\uDCC8" : "\uD83C\uDD95"}
                          {kw.trendTag.type === "surge" ? (kw.trendTag.value || "")
                            : kw.trendTag.type === "streak" ? `${kw.trendTag.value || "2"}w`
                            : "New"}
                        </span>
                      )}
                      {kw.category && (
                        <span
                          className="inline-block text-xs font-medium"
                          style={{
                            padding: "2px 8px",
                            borderRadius: "999px",
                            background: kw.category === "AI" ? "rgba(168,85,247,0.15)"
                              : kw.category === "E-commerce" ? "rgba(34,197,94,0.15)"
                              : kw.category === "Social Media" ? "rgba(59,130,246,0.15)"
                              : kw.category === "Entertainment" ? "rgba(245,158,11,0.15)"
                              : kw.category === "China Signal" ? "rgba(217,70,239,0.15)"
                              : kw.category === "Tech" ? "rgba(168,85,247,0.12)"
                              : "rgba(161,161,170,0.15)",
                            color: kw.category === "AI" ? "#c084fc"
                              : kw.category === "E-commerce" ? "#4ade80"
                              : kw.category === "Social Media" ? "#60a5fa"
                              : kw.category === "Entertainment" ? "#fbbf24"
                              : kw.category === "China Signal" ? "#d946ef"
                              : kw.category === "Tech" ? "#a855f7"
                              : "#a1a1aa",
                          }}
                        >
                          {kw.category}
                        </span>
                      )}
                    </div>

                    {/* Keyword Name */}
                    <span className="font-bold text-base" style={{ color: "#ffffff" }}>
                      {kw.name}
                    </span>

                    {/* Volume */}
                    <div className="mt-1 flex items-baseline gap-2">
                      <Counter value={kw.volume} duration={400} />
                      <span className="text-xs" style={{ color: "#71717a" }}>searches</span>
                    </div>

                    {/* Sparkline */}
                    <div className="mt-3">
                      <Sparkline data={kw.sparkline} width={120} height={20} />
                    </div>

                    {/* One-line Summary */}
                    {kw.summary && (
                      <p className="mt-2 text-xs leading-relaxed" style={{ color: "#a1a1aa", fontSize: "0.75rem" }}>
                        {kw.summary}
                      </p>
                    )}

                    {/* Source Tag + Rank */}
                    <div className="mt-3 flex items-center justify-between">
                      <span
                        className="inline-block text-xs font-medium"
                        style={{
                          padding: "2px 10px",
                          borderRadius: "999px",
                          background: kw.source === "Google Trends" ? "rgba(168,85,247,0.12)" : "rgba(217,70,239,0.12)",
                          color: kw.source === "Google Trends" ? "#a855f7" : "#d946ef",
                        }}
                      >
                        {kw.source}
                      </span>
                      <span className="text-xs font-bold" style={{ color: "#71717a" }}>
                        #{kw.rank}
                      </span>
                    </div>
                    {/* Heat Progress Bar */}
                    <div
                      className="mt-3 h-1 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${Math.min(100, (kw.rank <= 3 ? 90 - kw.rank * 10 : 60 - kw.rank * 3))}%`,
                          background: kw.rank <= 3
                            ? "linear-gradient(90deg, #a855f7, #d946ef)"
                            : "linear-gradient(90deg, #7c3aed, #a855f7)",
                          boxShadow: "0 0 8px rgba(168,85,247,0.4)",
                        }}
                      />
                    </div>
                  </Link>
                ))}
            </div>
            )}
          </div>
        </section>

        {/* Section transition */}
        <div className="section-transition" />

        {/* ===== How It Works (Compact 3-column) ===== */}
        <section className="px-[5%] py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <h2
              className="mb-8 text-center font-bold"
              style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 3vw, 1.75rem)" }}
            >
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                {
                  num: "01",
                  title: "Real-time Tracking",
                  desc: "We monitor Google Trends and Reddit 24/7 to catch rising topics before they peak.",
                },
                {
                  num: "02",
                  title: "AI Analysis",
                  desc: "Our AI clusters related activity into clear signals with momentum, timing, and context.",
                },
                {
                  num: "03",
                  title: "Curated Signals",
                  desc: "The strongest opportunities are distilled into a concise, action-ready daily brief.",
                },
              ].map((step, i) => (
                <div
                  key={step.title}
                  className="stagger-card flex items-start gap-4"
                  style={{
                    animationDelay: `${i * 80}ms`,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(168,85,247,0.12)",
                    borderRadius: "10px",
                    padding: "18px 20px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(168,85,247,0.3)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(168,85,247,0.12)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  <span
                    className="shrink-0 font-bold"
                    style={{
                      fontSize: "1.5rem",
                      background: "linear-gradient(135deg, #a855f7, #d946ef)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      lineHeight: "1",
                      minWidth: "32px",
                    }}
                  >
                    {step.num}
                  </span>
                  <div>
                    <h3 className="font-bold" style={{ color: "#e5e5e5", fontSize: "0.95rem" }}>
                      {step.title}
                    </h3>
                    <p className="mt-1" style={{ color: "#a1a1aa", fontSize: "0.82rem", lineHeight: "1.5" }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Final CTA ===== */}
        <section className="px-[5%] py-24 text-center">
          <div
            className="mx-auto max-w-2xl rounded-12px p-12"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(168,85,247,0.15)",
              borderRadius: "12px",
              boxShadow: "0 0 40px rgba(168,85,247,0.08)",
            }}
          >
            <h2
              className="font-bold"
              style={{ color: "#ffffff", fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Start spotting opportunities today
            </h2>
            <p className="mt-4" style={{ color: "#a1a1aa" }}>
              Free to use. No signup required.
            </p>
            <a
              href="#signals"
              className="btn-primary glow-pulse cta-arrow mt-8 inline-flex items-center gap-2"
              style={{ padding: "16px 40px", fontSize: "1.1rem", borderRadius: "12px" }}
            >
              Explore Today&apos;s Signals <ArrowRight className="size-5 cta-arrow-icon" />
            </a>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="px-[5%] py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <h2
              className="mb-10 text-center font-bold"
              style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 3vw, 1.75rem)" }}
            >
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col gap-3">
              {faqs.map(([question, answer], index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={question}
                    className="transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.borderColor = "rgba(168,85,247,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left"
                      aria-expanded={isOpen}
                      style={{ background: "transparent" }}
                    >
                      <span className="font-semibold" style={{ color: "#e5e5e5", fontSize: "0.95rem" }}>
                        {question}
                      </span>
                      <span
                        className="shrink-0 transition-transform duration-200"
                        style={{
                          color: "#a855f7",
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          display: "inline-block",
                        }}
                      >
                        {"\u2228"}
                      </span>
                    </button>
                    {isOpen && (
                      <p
                        className="px-5 pb-4"
                        style={{ color: "#a1a1aa", fontSize: "0.9rem", lineHeight: "1.7" }}
                      >
                        {answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="px-[5%] py-10 text-center" style={{ borderTop: "1px solid rgba(168,85,247,0.1)" }}>
        <p style={{ color: "#71717a", fontSize: "0.8rem" }}>
          {"\u00A9"} 2026 Trending Hot {" \u00B7 "}{" "}
          <Link href="/about" className="transition hover:text-[#a855f7]">
            About
          </Link>
          {" \u00B7 "}
          <Link href="/privacy" className="transition hover:text-[#a855f7]">
            Privacy
          </Link>
          {" \u00B7 "}
          <Link href="/terms" className="transition hover:text-[#a855f7]">
            Terms
          </Link>
          {" \u00B7 "}
          <Link href="/contact" className="transition hover:text-[#a855f7]">
            Contact
          </Link>
        </p>
      </footer>
    </div>
  );
}