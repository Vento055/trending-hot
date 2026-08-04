import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Trending Hot",
  description:
    "Learn about Trending Hot — an AI trend intelligence platform tracking signals from Google Trends, Reddit, Hacker News, and developer communities. Built by industry analysts.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-8">About Trending Hot</h1>

      <div className="space-y-10 text-muted-foreground">

        {/* ===== Analyst Background ===== */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Who We Are
          </h2>
          <p className="text-base leading-relaxed">
            Trending Hot is built and operated by AI industry analysts with a decade of combined
            experience tracking developer ecosystems, enterprise software trends, and emerging
            technology markets. Our team has contributed to open-source developer tools, published
            trend reports cited by top-tier media, and advised startups on product-market fit.
          </p>
          <p className="text-base leading-relaxed mt-3">
            We built this platform because we believe early trend detection should be accessible —
            not locked behind expensive enterprise dashboards. Every signal on Trending Hot is
            grounded in publicly observable data: search volume shifts, community discussion surges,
            product launches, and funding events.
          </p>
        </section>

        {/* ===== Methodology ===== */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Methodology</h2>
          <p className="text-base leading-relaxed">
            Our system continuously monitors public trend signals and applies a multi-layer
            analysis pipeline:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 text-sm">
            <li>
              <strong>Discovery:</strong> Every 24 hours, we scan Google Trends RSS feeds, Reddit
              (r/all, r/popular, r/programming, r/MachineLearning), Hacker News front-page
              stories, and Product Hunt launches for emerging keywords and topics.
            </li>
            <li>
              <strong>Signal Scoring:</strong> Each detected topic is assigned a confidence score
              (0–100%) based on search volume growth, community engagement velocity, and source
              diversity. Scores above 70% indicate a high-likelihood trend; above 85% is a
              confirmed breakout.
            </li>
            <li>
              <strong>Enrichment:</strong> High-confidence signals are enriched with AI-generated
              context (market background, timing assessment, stakeholder analysis) using
              DeepSeek&rsquo;s language models, then reviewed for factual accuracy before
              publication.
            </li>
            <li>
              <strong>Classification:</strong> Signals are tagged by opportunity type (Content
              Goldmine, Product Opportunity, Info Arbitrage, Traffic Breakout, China Signal) and
              trend stage (Sustained Rise, Short-Term Spike, Peaking, Brewing).
            </li>
          </ul>
        </section>

        {/* ===== Data Sources ===== */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Data Sources</h2>
          <p className="text-base leading-relaxed">
            All data is sourced from publicly accessible platforms. We do not use private APIs,
            paywalled data, or web scraping of proprietary content.
          </p>
          <div className="grid gap-3 mt-4 sm:grid-cols-2">
            {[
              { name: "Google Trends", desc: "Daily trending RSS feeds and keyword interest-over-time analytics", url: "https://trends.google.com/trending/rss?geo=US" },
              { name: "Reddit", desc: "r/all, r/popular, r/programming, r/MachineLearning hot posts", url: "https://www.reddit.com/r/all/hot.json" },
              { name: "Hacker News", desc: "Front-page stories and comment velocity (>100 comments)", url: "https://news.ycombinator.com/" },
              { name: "Product Hunt", desc: "Daily top launches and upvote momentum", url: "https://www.producthunt.com/" },
              { name: "Google News", desc: "Keyword-specific news RSS for recent coverage (30-day window)", url: "https://news.google.com/" },
              { name: "GitHub", desc: "Repository star growth and trending developer activity", url: "https://github.com/trending" },
            ].map((s) => (
              <div
                key={s.name}
                className="card-hover"
                style={{
                  borderRadius: "12px",
                  border: "1px solid rgba(168,85,247,0.15)",
                  background: "rgba(255,255,255,0.03)",
                  padding: "16px",
                }}
              >
                <h3 className="font-semibold text-foreground text-sm">{s.name}</h3>
                <p className="text-xs mt-1" style={{ color: "#71717a" }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Editorial Policy ===== */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Editorial Policy & Transparency
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>AI-Generated Content Disclosure:</strong> Signal summaries, trend analyses,
              and draft articles may be partially generated by large language models (DeepSeek).
              All AI-generated content is reviewed for factual accuracy, and sources are cited
              wherever possible. When evidence is insufficient, we explicitly state
              &ldquo;evidence is limited&rdquo; or &ldquo;no authoritative data available.&rdquo;
            </li>
            <li>
              <strong>No Fabrication:</strong> We never fabricate URLs, survey data, or source
              attributions. Every cited source is verifiable. Fallback data templates were removed
              from our pipeline (August 2026).
            </li>
            <li>
              <strong>No Pay-to-Play:</strong> Signal rankings are determined algorithmically. We
              do not accept payment for inclusion, ranking, or analysis content.
            </li>
            <li>
              <strong>Corrections:</strong> If you find an error, please contact us. We correct
              factual mistakes within 24 hours and append a correction notice.
            </li>
          </ul>
        </section>

        {/* ===== Contact ===== */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Contact</h2>
          <p className="text-base leading-relaxed">
            For questions, corrections, or partnership inquiries, reach out at{" "}
            <code className="text-sm px-1.5 py-0.5 rounded" style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7" }}>
              trendinghot.ai@gmail.com
            </code>
            .
          </p>
        </section>
      </div>
    </div>
  );
}