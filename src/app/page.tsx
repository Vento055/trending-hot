"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

const signals = [
  {
    tag: "Content Goldmine",
    tagBg: "#e8f5e0",
    tagText: "#2d6e1e",
    title: "WebGPU Tutorials",
    number: "+340%",
    trend: "↑ Surging",
    trendColor: "#2d6e1e",
    desc: "Developer interest is climbing while high-quality beginner content remains scarce. Early movers can capture search demand.",
    meta: "⏳ Window: ~2 weeks  🎯 Confidence: 87%",
  },
  {
    tag: "Product Opportunity",
    tagBg: "#fff3e0",
    tagText: "#c77800",
    title: "EU AI Act Compliance",
    number: "+220%",
    trend: "↑ Surging",
    trendColor: "#2d6e1e",
    desc: "Teams are actively searching for practical checklists, audits, and lightweight tools as the compliance deadline approaches.",
    meta: "⏳ Window: ~1 month  🎯 Confidence: 92%",
  },
  {
    tag: "Info Arbitrage",
    tagBg: "#e8eaf5",
    tagText: "#3a3d8a",
    title: "AI Agent Workflows",
    number: "+185%",
    trend: "↑ Surging",
    trendColor: "#2d6e1e",
    desc: "Demand is shifting from broad AI news toward repeatable, role-specific workflows. Content bridging theory to practice wins.",
    meta: "⏳ Window: ~3 weeks  🎯 Confidence: 78%",
  },
  {
    tag: "Traffic Breakout",
    tagBg: "#fce4ec",
    tagText: "#b0003a",
    title: "TypeScript Pattern Matching",
    number: "+156%",
    trend: "⏳ Spike",
    trendColor: "#c77800",
    desc: "Discussions around TC39 pattern matching proposal are accelerating. Tutorial content and dev tooling have a narrow window.",
    meta: "⏳ Window: ~10 days  🎯 Confidence: 71%",
  },
];

const keywords = [
  { rank: 1, name: "WebGPU", volume: "82K", icon: "🔥" },
  { rank: 2, name: "EU AI Act", volume: "67K", icon: "↑" },
  { rank: 3, name: "GPT-6", volume: "145K", icon: "🔥" },
  { rank: 4, name: "Rust 2026", volume: "38K", icon: "↑" },
  { rank: 5, name: "AI Agents", volume: "94K", icon: "🔥" },
  { rank: 6, name: "TypeScript 6.0", volume: "51K", icon: "↑" },
  { rank: 7, name: "Bun 2.0", volume: "29K", icon: "🌊" },
  { rank: 8, name: "Zig", volume: "22K", icon: "🌊" },
];

const faqs = [
  ["What is an opportunity signal?", "An opportunity signal connects rising attention with a practical action — such as content to publish, a product to validate, or a market to watch. Instead of just showing what's trending, we tell you why it matters and what to do."],
  ["Where does the trend data come from?", "Trending Hot monitors public trend signals from sources including Google Trends and Reddit, then organizes them into a clear daily view with context and actionable insight."],
  ["How often are signals updated?", "The free experience is designed around a fresh daily signal brief, so you can scan the market without living in a dashboard. New signals are curated every 24 hours."],
  ["Do I need a credit card to start?", "No. The free tier is available without a credit card and includes the core daily signal experience. Upgrade only when you need deeper analysis."],
  ["Who is Trending Hot built for?", "It is built for creators, founders, marketers, researchers, and anyone who needs to spot demand before a market becomes crowded."],
];

const navItems = [["About", "/about"], ["Privacy", "/privacy"], ["Contact", "/contact"]];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [activeTab, setActiveTab] = useState("All");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfdf8]" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      {/* ===== Navbar ===== */}
      <header
        className="fixed inset-x-0 top-0 z-50 bg-white transition-all"
        style={{
          borderBottom: "1px solid #e8efe5",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          backgroundColor: scrolled ? "rgba(255,255,255,0.9)" : "#ffffff",
        }}
      >
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-lg font-bold tracking-tight" style={{ color: "#0a2a1f" }}>
            TRENDING HOT
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map(([label, href]) => (
              <Link key={href} href={href} className="text-sm transition hover:text-[#0a2a1f]" style={{ color: "#6b7b71" }}>
                {label}
              </Link>
            ))}
            <a
              href="#signals"
              className="text-sm font-semibold transition hover:opacity-90"
              style={{ background: "#7ddc3f", color: "#0a2a1f", borderRadius: "8px", padding: "8px 20px" }}
            >
              Get Started →
            </a>
          </div>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{ color: "#0a2a1f" }}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
        {menuOpen && (
          <div className="border-t md:hidden" style={{ borderColor: "#e8efe5", background: "#fff" }}>
            <div className="flex flex-col gap-1 px-4 py-3">
              {navItems.map(([label, href]) => (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="py-2 text-sm" style={{ color: "#6b7b71" }}>
                  {label}
                </Link>
              ))}
              <a href="#signals" onClick={() => setMenuOpen(false)} className="mt-1 text-center text-sm font-semibold" style={{ background: "#7ddc3f", color: "#0a2a1f", borderRadius: "8px", padding: "10px 20px" }}>
                Get Started →
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ===== Hero ===== */}
        <section
          className="relative flex min-h-[90vh] items-center justify-center px-4 pt-14"
          style={{ background: "#0a2a1f" }}
        >
          <div className="mx-auto max-w-4xl text-center">
            {/* Trust badges */}
            <div className="mb-6 flex justify-center gap-3">
              {["📡 50+ Sources Daily", "🤖 AI Opportunity Signals"].map((badge) => (
                <span
                  key={badge}
                  className="text-xs font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "#b8d4c0",
                    borderRadius: "999px",
                    padding: "4px 14px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1
              className="font-extrabold text-white"
              style={{
                fontSize: "clamp(3.5rem, 7vw, 5.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: "1.1",
              }}
            >
              TRENDING HOT
            </h1>

            {/* Subtitle */}
            <p
              className="mt-6 font-normal"
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
                lineHeight: "1.6",
              }}
            >
              Discover tomorrow&apos;s money-making trends
              <br />
              before everyone else sees them.
            </p>

            {/* CTA */}
            <div className="mt-8">
              <a
                href="#signals"
                className="cta-on-dark inline-flex"
                style={{
                  background: "#7ddc3f",
                  color: "#0a2a1f",
                  fontWeight: 600,
                  fontSize: "1rem",
                  borderRadius: "12px",
                  padding: "14px 32px",
                  transition: "transform 0.2s ease, background-color 0.2s ease",
                }}
              >
                Explore Today&apos;s Signals <ArrowRight className="size-4" />
              </a>
            </div>

            {/* Example signals */}
            <p className="mt-10 text-xs" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem" }}>
              Recent signals: WebGPU tutorial gold rush / EU AI Act compliance tools
            </p>
          </div>
        </section>

        {/* ===== Trust Bar ===== */}
        <section className="flex items-center justify-center px-4" style={{ background: "#fff", height: "72px", borderBottom: "1px solid #e8efe5" }}>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm" style={{ color: "#6b7b71" }}>
            <span>Product Hunt</span>
            <span className="opacity-30">|</span>
            <span>Hacker News</span>
            <span className="opacity-30">|</span>
            <span>1,200+ signals monthly</span>
            <span className="opacity-30">|</span>
            <span>50+ data sources</span>
          </div>
        </section>

        {/* ===== Opportunity Signals ===== */}
        <section id="signals" className="px-4 py-16 sm:py-24" style={{ background: "#ffffff" }}>
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-bold" style={{ color: "#0a2a1f", fontSize: "2rem" }}>
              Today&apos;s Opportunity Signals
            </h2>
            <p className="mt-3 text-center" style={{ color: "#6b7b71" }}>
              AI-identified trends with money-making potential
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {signals.map((s) => (
                <div
                  key={s.title}
                  className="signal-card"
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e8efe5",
                    borderRadius: "16px",
                    padding: "24px",
                    transition: "border-color 0.2s ease, transform 0.2s ease",
                  }}
                >
                  {/* Tag */}
                  <span
                    className="tag-pill"
                    style={{ background: s.tagBg, color: s.tagText, borderRadius: "999px", padding: "2px 12px", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.04em" }}
                  >
                    {s.tag}
                  </span>

                  {/* Title */}
                  <h3 className="mt-2 font-semibold" style={{ color: "#0a2a1f", fontSize: "1.25rem", marginTop: "8px" }}>
                    {s.title}
                  </h3>

                  {/* Big number + trend */}
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="font-bold" style={{ color: "#0a2a1f", fontSize: "2rem" }}>{s.number}</span>
                    <span className="text-xs font-semibold" style={{ color: s.trendColor }}>{s.trend}</span>
                  </div>

                  {/* Description */}
                  <p className="mt-4" style={{ color: "#4a5b50", fontSize: "0.9rem", lineHeight: "1.5" }}>
                    {s.desc}
                  </p>

                  {/* Divider */}
                  <hr className="my-4" style={{ border: "none", borderTop: "1px solid #eef3eb" }} />

                  {/* Meta */}
                  <p style={{ color: "#6b7b71", fontSize: "0.8rem" }}>{s.meta}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Trending Keywords ===== */}
        <section className="px-4 py-16 sm:py-24" style={{ background: "#f3f5f0" }}>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-bold" style={{ color: "#0a2a1f", fontSize: "2rem" }}>
              Trending Keywords
            </h2>

            {/* Tabs */}
            <div className="mt-6 flex gap-6 border-b" style={{ borderColor: "#e8efe5" }}>
              {["All", "Google Trends", "Reddit"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="relative pb-3 text-sm font-medium transition"
                  style={{
                    color: activeTab === tab ? "#0a2a1f" : "#6b7b71",
                    borderBottom: activeTab === tab ? "2px solid #7ddc3f" : "none",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="mt-4">
              {keywords.map((kw) => (
                <div
                  key={kw.rank}
                  className="flex items-center justify-between transition"
                  style={{
                    height: "52px",
                    borderBottom: "1px solid #e8efe5",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8faf6")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm" style={{ color: "#6b7b71", width: "32px" }}>{kw.rank}</span>
                    <span className="text-base" style={{ color: "#0a2a1f", fontWeight: 500 }}>{kw.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold" style={{ color: "#2d3a32" }}>{kw.volume}</span>
                    <span className="text-sm">{kw.icon}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== How It Works ===== */}
        <section className="px-4 py-16 sm:py-24" style={{ background: "#ffffff" }}>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-10 sm:grid-cols-3">
              {[
                { icon: "📡", title: "Real-time Tracking", desc: "We monitor Google Trends and Reddit 24/7 to catch rising topics before they peak." },
                { icon: "🤖", title: "AI Analysis", desc: "Our AI clusters related activity into clear signals with momentum, timing, and context." },
                { icon: "✨", title: "Curated Signals", desc: "The strongest opportunities are distilled into a concise, action-ready daily brief." },
              ].map((step) => (
                <div key={step.title} className="text-center">
                  <div
                    className="mx-auto flex items-center justify-center text-2xl"
                    style={{ width: "64px", height: "64px", background: "#e8f5e0", borderRadius: "12px" }}
                  >
                    {step.icon}
                  </div>
                  <h3 className="mt-5 font-semibold" style={{ color: "#0a2a1f", fontSize: "1.125rem" }}>
                    {step.title}
                  </h3>
                  <p className="mt-2" style={{ color: "#6b7b71", fontSize: "0.9rem" }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Final CTA ===== */}
        <section className="px-4 py-20 text-center" style={{ background: "#0a2a1f" }}>
          <div className="mx-auto max-w-2xl">
            <h2 className="font-bold text-white" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
              Start spotting opportunities today
            </h2>
            <p className="mt-4" style={{ color: "rgba(255,255,255,0.7)" }}>
              Free to use. No signup required.
            </p>
            <a
              href="#signals"
              className="mt-8 inline-flex items-center gap-2"
              style={{
                background: "#7ddc3f",
                color: "#0a2a1f",
                fontWeight: 600,
                fontSize: "1rem",
                borderRadius: "12px",
                padding: "14px 32px",
                transition: "transform 0.2s ease",
              }}
            >
              Explore Today&apos;s Signals <ArrowRight className="size-4" />
            </a>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="px-4 py-16 sm:py-24" style={{ background: "#ffffff" }}>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-10 text-center font-bold" style={{ color: "#0a2a1f", fontSize: "2rem" }}>
              Frequently Asked Questions
            </h2>
            <div className="border-t" style={{ borderColor: "#e8efe5" }}>
              {faqs.map(([question, answer], index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={question} style={{ borderBottom: "1px solid #e8efe5" }}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between py-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-semibold" style={{ color: "#0a2a1f", fontSize: "1rem" }}>
                        {question}
                      </span>
                      <ChevronDown
                        className={`size-5 shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
                        style={{ color: "#6b7b71" }}
                      />
                    </button>
                    {isOpen && (
                      <p className="pb-5 pr-8" style={{ color: "#4a5b50", fontSize: "0.9rem", lineHeight: "1.6" }}>
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
      <footer className="px-4 py-10 text-center" style={{ background: "#0a2a1f" }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>
          © 2026 Trending Hot ·{" "}
          <Link href="/about" className="transition hover:text-[#7ddc3f]">About</Link>
          {" · "}
          <Link href="/privacy" className="transition hover:text-[#7ddc3f]">Privacy</Link>
          {" · "}
          <Link href="/contact" className="transition hover:text-[#7ddc3f]">Contact</Link>
        </p>
      </footer>
    </div>
  );
}
