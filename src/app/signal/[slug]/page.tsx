"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface SignalData {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  strength: string;
  coreJudgment: string;
  sections: { heading: string; body: string }[];
  sources: { label: string; url: string }[];
  related: { title: string; slug: string }[];
  redditPosts?: { title: string; subreddit: string; ups: number; permalink: string }[];
  newsItems?: { title: string; source: string; summary: string; url: string }[];
  generatedAt?: string;
}

const signalsData: Record<string, SignalData> = {
  "webgpu-tutorials": {
    slug: "webgpu-tutorials",
    title: "WebGPU Tutorials",
    subtitle: "Developer interest is climbing while high-quality beginner content remains scarce. Early movers can capture search demand before the window closes.",
    tag: "Content Goldmine",
    strength: "Strong (87%)",
    coreJudgment: "The WebGPU API is reaching production readiness across Chrome, Edge, and Safari. Search volume for tutorials has surged 340% in 90 days, but the supply of quality beginner-level content is critically thin. Creators who publish structured, hands-on tutorials now will own the top search results for years.",
    sections: [
      {
        heading: "Trend Data",
        body: "Google Trends shows a 340% increase in 'WebGPU tutorial' searches over the past quarter. Reddit discussions in r/webdev and r/GraphicsProgramming have tripled in engagement. GitHub repos tagged 'webgpu' gained 2.4K new stars this month alone. The trajectory mirrors the early WebGL adoption curve from 2011, but at 3x the velocity.",
      },
      {
        heading: "Industry Background",
        body: "WebGPU is the successor to WebGL, providing direct access to GPU compute shaders from JavaScript. Major browser engines (Chromium, WebKit) shipped stable implementations in 2024-2025. The API unlocks real-time ray tracing, ML inference, and particle simulations in the browser. Adoption is being driven by game engines (Babylon.js, Three.js), AI tooling (transformers.js), and creative coding communities.",
      },
      {
        heading: "Behavioral Drivers",
        body: "Three forces are converging: (1) Browser support finally stabilized, removing the 'wait for compatibility' blocker. (2) AI/ML developers need GPU access in-browser for on-device inference, creating demand beyond graphics. (3) The game dev community is migrating from WebGL and needs migration guides. Most existing content targets advanced users; the beginner gap is where traffic will flow.",
      },
      {
        heading: "Timing Assessment",
        body: "The window is approximately 2-4 weeks for maximum advantage. After that, larger tech publications will begin publishing their own tutorials. The optimal strategy is to publish 3-5 foundational tutorials (setup, first triangle, compute shaders, ML inference, game integration) with SEO-optimized titles. Content published now will accumulate backlinks and domain authority before competition arrives.",
      },
    ],
    sources: [
      { label: "Google Trends - WebGPU", url: "https://trends.google.com/trends/explore?q=webgpu+tutorial" },
      { label: "WebGPU Specification (W3C)", url: "https://www.w3.org/TR/webgpu/" },
      { label: "r/webdev Discussion Thread", url: "https://www.reddit.com/r/webdev/" },
      { label: "Babylon.js WebGPU Docs", url: "https://doc.babylonjs.com/setup/support/webGPU" },
    ],
    related: [
      { title: "AI Agent Workflows", slug: "ai-agent-workflows" },
      { title: "TypeScript Pattern Matching", slug: "typescript-pattern-matching" },
      { title: "EU AI Act Compliance", slug: "eu-ai-act-compliance" },
    ],
  },
  "eu-ai-act-compliance": {
    slug: "eu-ai-act-compliance",
    title: "EU AI Act Compliance",
    subtitle: "Teams are actively searching for practical checklists, audits, and lightweight tools as the compliance deadline approaches.",
    tag: "Product Opportunity",
    strength: "Very Strong (92%)",
    coreJudgment: "The EU AI Act enforcement timeline is driving urgent demand for compliance tooling. Companies need practical, lightweight solutions: checklists, audit templates, risk classification tools. Builders who ship these now will capture enterprise budget allocated specifically for AI governance.",
    sections: [
      {
        heading: "Trend Data",
        body: "Search volume for 'EU AI Act compliance' has risen 220% since Q1 2026. Enterprise job postings for 'AI compliance officer' roles increased 180%. GitHub repos for AI governance frameworks gained 1.8K stars. The demand is concentrated in EU-based companies but expanding globally as non-EU firms prepare for extraterritorial applicability.",
      },
      {
        heading: "Industry Background",
        body: "The EU AI Act is the world's first comprehensive AI regulation, categorizing AI systems by risk level (minimal, limited, high, unacceptable). High-risk systems face strict requirements: risk assessment, data governance, transparency, human oversight. Enforcement phases begin throughout 2026-2027, with fines up to 7% of global revenue for violations.",
      },
      {
        heading: "Behavioral Drivers",
        body: "Compliance deadlines are forcing action. Companies that delayed preparation are now in panic mode, searching for ready-to-use tools rather than theoretical frameworks. The gap is not in legal analysis (law firms cover that) but in practical engineering tooling: automated risk classifiers, audit log generators, model card templates, and compliance checklists that developers can self-serve.",
      },
      {
        heading: "Timing Assessment",
        body: "The window is approximately 1 month before large consultancies and SaaS platforms flood the market. The optimal play is a freemium tool: free checklist + risk classifier, paid audit reports and team workflows. Target AI/ML engineering teams on LinkedIn and Hacker News. Enterprise budget is already approved and waiting to be spent.",
      },
    ],
    sources: [
      { label: "EU AI Act Official Text", url: "https://artificialintelligenceact.eu/" },
      { label: "Google Trends - EU AI Act", url: "https://trends.google.com/trends/explore?q=eu+ai+act+compliance" },
      { label: "GitHub: AI Governance Tools", url: "https://github.com/topics/ai-governance" },
    ],
    related: [
      { title: "WebGPU Tutorials", slug: "webgpu-tutorials" },
      { title: "AI Agent Workflows", slug: "ai-agent-workflows" },
      { title: "TypeScript Pattern Matching", slug: "typescript-pattern-matching" },
    ],
  },
  "ai-agent-workflows": {
    slug: "ai-agent-workflows",
    title: "AI Agent Workflows",
    subtitle: "Demand is shifting from broad AI news toward repeatable, role-specific workflows. Content bridging theory to practice wins.",
    tag: "Info Arbitrage",
    strength: "Strong (78%)",
    coreJudgment: "The AI conversation has moved from 'what are agents' to 'how do I build a specific agent for my role.' There is a content gap for practical, step-by-step workflow guides: sales prospecting agents, support triage agents, code review agents. Creators who publish role-specific playbooks will capture high-intent search traffic.",
    sections: [
      {
        heading: "Trend Data",
        body: "Searches for 'AI agent workflow' increased 185% in 90 days. Reddit threads in r/LocalLLaMA and r/OpenAI discussing agent architectures doubled. GitHub repos tagged 'ai-agent' crossed 15K total. The interest is no longer experimental — developers are building production agents and need operational guidance.",
      },
      {
        heading: "Industry Background",
        body: "AI agents are autonomous systems that plan, execute, and iterate on multi-step tasks using LLMs as reasoning engines. The ecosystem includes orchestration frameworks (LangGraph, CrewAI, AutoGen), tool-use protocols (MCP, function calling), and memory systems (vector DBs, knowledge graphs). The technology is mature enough for production but the playbook for specific use cases doesn't exist yet.",
      },
      {
        heading: "Behavioral Drivers",
        body: "Three forces: (1) Frameworks like CrewAI and LangGraph made agent building accessible to mid-level developers. (2) Companies want AI automation but don't know which workflows to automate first. (3) Existing content is either too abstract (research papers) or too basic (what is an agent). The gap is in the middle: specific, repeatable, role-based workflows with code.",
      },
      {
        heading: "Timing Assessment",
        body: "The window is approximately 3 weeks. Major AI publications are beginning to cover agents but haven't yet produced deep, role-specific guides. The strategy: pick 3-5 high-value roles (sales, support, engineering, marketing, finance), publish one complete workflow per role with GitHub repo + video. SEO will compound as the market matures.",
      },
    ],
    sources: [
      { label: "Google Trends - AI Agent", url: "https://trends.google.com/trends/explore?q=ai+agent+workflow" },
      { label: "LangGraph Documentation", url: "https://langchain-ai.github.io/langgraph/" },
      { label: "r/LocalLLaMA Agent Discussions", url: "https://www.reddit.com/r/LocalLLaMA/" },
    ],
    related: [
      { title: "WebGPU Tutorials", slug: "webgpu-tutorials" },
      { title: "EU AI Act Compliance", slug: "eu-ai-act-compliance" },
      { title: "TypeScript Pattern Matching", slug: "typescript-pattern-matching" },
    ],
  },
  "typescript-pattern-matching": {
    slug: "typescript-pattern-matching",
    title: "TypeScript Pattern Matching",
    subtitle: "Discussions around TC39 pattern matching proposal are accelerating. Tutorial content and dev tooling have a narrow window.",
    tag: "Traffic Breakout",
    strength: "Moderate (71%)",
    coreJudgment: "The TC39 pattern matching proposal is gaining momentum toward Stage 3. Developer interest is spiking but there is almost no quality content explaining the proposal, its implications, or how to use it today via polyfills. Early content will dominate search as adoption grows.",
    sections: [
      {
        heading: "Trend Data",
        body: "GitHub issues and stars on the TC39 proposal repo surged 156% this quarter. Hacker News submissions about pattern matching hit the front page 3 times in 60 days. Twitter/X discussions among TypeScript team members indicate Stage 3 advancement is imminent. Search volume for 'typescript pattern matching' is climbing sharply.",
      },
      {
        heading: "Industry Background",
        body: "Pattern matching is a language feature that allows declarative branching based on the shape and content of data. The TC39 proposal brings syntax similar to Rust's match or Scala's case classes to JavaScript. It would replace complex if-else chains and switch statements with concise, exhaustive, type-safe patterns. TypeScript would gain full type narrowing support.",
      },
      {
        heading: "Behavioral Drivers",
        body: "Developers coming from Rust, Scala, and Elixir are evangelizing pattern matching. The functional programming community is pushing hard for adoption. The proposal addresses a real pain point: deeply nested conditional logic is error-prone and verbose. As the proposal advances, the demand for tutorials, migration guides, and comparison articles will explode.",
      },
      {
        heading: "Timing Assessment",
        body: "The window is narrow — approximately 10 days for first-mover advantage. Once the proposal hits Stage 3, major publications will cover it. The play: publish a comprehensive guide (what it is, why it matters, how to use it today with ts-pattern library, migration examples from switch/match). Pair with a GitHub repo of examples for backlink acquisition.",
      },
    ],
    sources: [
      { label: "TC39 Proposal Repository", url: "https://github.com/tc39/proposal-pattern-matching" },
      { label: "ts-pattern Library", url: "https://github.com/gvergnaud/ts-pattern" },
      { label: "Google Trends - Pattern Matching", url: "https://trends.google.com/trends/explore?q=typescript+pattern+matching" },
    ],
    related: [
      { title: "WebGPU Tutorials", slug: "webgpu-tutorials" },
      { title: "AI Agent Workflows", slug: "ai-agent-workflows" },
      { title: "EU AI Act Compliance", slug: "eu-ai-act-compliance" },
    ],
  },
};

export default function SignalPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>("");
  const [data, setData] = useState<SignalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"generated" | "static">("static");

  useEffect(() => {
    paramsPromise.then((p) => {
      setSlug(p.slug);
      document.title = `${p.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} - Signal Analysis`;

      fetch(`/api/articles/${p.slug}`)
        .then((res) => {
          if (!res.ok) throw new Error("Article not found");
          return res.json();
        })
        .then((article: SignalData) => {
          setData(article);
          setSource("generated");
        })
        .catch(() => {
          setData(signalsData[p.slug] || null);
          setSource("static");
        })
        .finally(() => setLoading(false));
    });
  }, [paramsPromise]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-[5%] py-20 text-center">
        <div className="animate-pulse" style={{ color: "#71717a" }}>Loading signal analysis...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-3xl px-[5%] py-20 text-center">
        <h1 className="text-2xl font-bold mb-4" style={{ color: "#ffffff" }}>Signal Not Found</h1>
        <p style={{ color: "#a1a1aa" }} className="mb-6">This signal analysis hasn&apos;t been published yet.</p>
        <Link href="/" className="btn-primary inline-block" style={{ padding: "12px 28px" }}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-[5%] py-12">
      {/* Back link */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm mb-8 transition hover:text-white" style={{ color: "#71717a" }}>
        <ArrowLeft className="size-4" /> Back to Signals
      </Link>

      {/* Title + Subtitle */}
      <h1 className="font-bold mb-3" style={{ color: "#ffffff", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: "1.2" }}>
        {data.title}
      </h1>
      <p className="mb-6" style={{ color: "#a1a1aa", fontSize: "1.05rem", lineHeight: "1.6" }}>
        {data.subtitle}
      </p>

      {/* Tag + Strength + Source Badge */}
      <div className="flex items-center gap-3 mb-8 flex-wrap">
        <span
          className="badge-hover inline-block text-xs font-semibold"
          style={{
            background: "rgba(168,85,247,0.12)",
            color: "#d946ef",
            borderRadius: "999px",
            padding: "4px 14px",
          }}
        >
          {data.tag}
        </span>
        <span
          className="text-xs font-medium"
          style={{
            color: "#a855f7",
            border: "1px solid rgba(168,85,247,0.2)",
            borderRadius: "999px",
            padding: "3px 12px",
          }}
        >
          Signal Strength: {data.strength}
        </span>
        {source === "generated" && (
          <span
            className="text-xs"
            style={{
              color: "#22c55e",
              border: "1px solid rgba(34,197,94,0.3)",
              borderRadius: "999px",
              padding: "3px 12px",
              background: "rgba(34,197,94,0.08)",
            }}
          >
            AI Generated
          </span>
        )}
      </div>

      {/* Core Judgment */}
      <div
        className="mb-10 p-6"
        style={{
          background: "rgba(168,85,247,0.06)",
          border: "1px solid rgba(168,85,247,0.15)",
          borderRadius: "12px",
        }}
      >
        <p className="text-xs font-semibold mb-3" style={{ color: "#a855f7", letterSpacing: "0.05em" }}>
          CORE JUDGMENT
        </p>
        <p className="font-medium" style={{ color: "#ffffff", fontSize: "1.05rem", lineHeight: "1.7" }}>
          {data.coreJudgment}
        </p>
      </div>

      {/* Analysis Sections */}
      <div className="space-y-8 mb-10">
        {data.sections.map((section, i) => (
          <div key={i}>
            <h2 className="font-bold mb-3" style={{ color: "#ffffff", fontSize: "1.15rem" }}>
              {section.heading}
            </h2>
            <p style={{ color: "#a1a1aa", fontSize: "0.95rem", lineHeight: "1.75" }}>
              {section.body}
            </p>
          </div>
        ))}
      </div>

      {/* Reddit Sources (if generated) */}
      {data.redditPosts && data.redditPosts.length > 0 && (
        <div className="mb-10">
          <h2 className="font-bold mb-4" style={{ color: "#ffffff", fontSize: "1.15rem" }}>
            Reddit Discussions
          </h2>
          <div className="flex flex-col gap-2">
            {data.redditPosts.map((post, i) => (
              <a
                key={i}
                href={`https://reddit.com${post.permalink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
                style={{
                  color: "#a855f7",
                  fontSize: "0.9rem",
                  padding: "10px 16px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(168,85,247,0.1)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ color: "#71717a" }}>{"\u2192"}</span>
                <span className="truncate">[{post.subreddit}] {post.title}</span>
                <span style={{ color: "#71717a", marginLeft: "auto", whiteSpace: "nowrap" }}>
                  {post.ups.toLocaleString()} upvotes
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* News Sources (if generated) */}
      {data.newsItems && data.newsItems.length > 0 && (
        <div className="mb-10">
          <h2 className="font-bold mb-4" style={{ color: "#ffffff", fontSize: "1.15rem" }}>
            News Coverage
          </h2>
          <div className="flex flex-col gap-2">
            {data.newsItems.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
                style={{
                  color: "#a855f7",
                  fontSize: "0.9rem",
                  padding: "10px 16px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(168,85,247,0.1)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ color: "#71717a" }}>{"\u2192"}</span>
                <span className="truncate">[{item.source}] {item.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Sources */}
      <div className="mb-10">
        <h2 className="font-bold mb-4" style={{ color: "#ffffff", fontSize: "1.15rem" }}>
          Sources
        </h2>
        <div className="flex flex-col gap-2">
          {data.sources.map((source, i) => (
            <a
              key={i}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
              style={{
                color: "#a855f7",
                fontSize: "0.9rem",
                padding: "10px 16px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(168,85,247,0.1)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ color: "#71717a" }}>{"\u2192"}</span>
              {source.label}
            </a>
          ))}
        </div>
      </div>

      {/* Related */}
      <div className="mb-10">
        <h2 className="font-bold mb-4" style={{ color: "#ffffff", fontSize: "1.15rem" }}>
          Related Signals
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {data.related.map((item) => (
            <Link
              key={item.slug}
              href={`/signal/${item.slug}`}
              className="card-hover block p-4"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(168,85,247,0.12)",
                borderRadius: "10px",
              }}
            >
              <span className="text-sm font-medium" style={{ color: "#ffffff" }}>
                {item.title}
              </span>
              <p className="text-xs mt-1" style={{ color: "#71717a" }}>
                View analysis {"\u2192"}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="text-center p-8"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(168,85,247,0.15)",
          borderRadius: "12px",
        }}
      >
        <p className="mb-4" style={{ color: "#a1a1aa" }}>
          Want more signals like this?
        </p>
        <Link href="/" className="btn-primary inline-flex items-center gap-2" style={{ padding: "12px 28px" }}>
          Explore All Signals <ArrowRight className="size-4" />
        </Link>
      </div>

      {data.generatedAt && (
        <p className="text-center mt-6 text-xs" style={{ color: "#71717a" }}>
          Generated on {new Date(data.generatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      )}
    </div>
  );
}
