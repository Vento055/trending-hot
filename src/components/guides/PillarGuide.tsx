import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FAQSection } from "@/components/listing/FAQSection";
import type { FAQItem } from "@/lib/listing/types";

export interface ClusterArticle {
  title: string;
  href: string;
  description: string;
}

export interface RelatedGuide {
  title: string;
  href: string;
  description?: string;
}

interface PillarGuideProps {
  title: string;
  subtitle: string;
  clusters: ClusterArticle[];
  faqs: FAQItem[];
  related: RelatedGuide[];
}

/**
 * Pillar Guide 布局组件（Server Component）
 * 品类总览页：H1 + 副标题 + Cluster 卡片网格 + 完整文章列表 + FAQ + 相关 Guide
 * FAQ 折叠复用现有 client 组件 FAQSection，保持与全站一致的交互样式。
 */
export function PillarGuide({
  title,
  subtitle,
  clusters,
  faqs,
  related,
}: PillarGuideProps) {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#fbfdf8",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        color: "#2d3a32",
      }}
    >
      {/* ===== Header ===== */}
      <header className="px-[5%] pb-10 pt-20 sm:pt-24">
        <div className="mx-auto max-w-5xl">
          <nav
            className="mb-5 flex items-center gap-2 text-sm"
            style={{ color: "#6b7b71" }}
          >
            <Link href="/" className="transition hover:text-[#0a2a1f]">
              Home
            </Link>
            <span>/</span>
            <span style={{ color: "#0a2a1f" }}>Guides</span>
          </nav>

          <h1
            className="font-extrabold"
            style={{
              color: "#0a2a1f",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>

          <p
            className="mt-4"
            style={{ color: "#6b7b71", fontSize: "1.2rem", lineHeight: 1.6 }}
          >
            {subtitle}
          </p>
        </div>
      </header>

      {/* ===== Trend Map: Cluster Cards Grid ===== */}
      <section className="px-[5%] py-10">
        <div className="mx-auto max-w-5xl">
          <h2
            className="text-2xl font-extrabold"
            style={{ color: "#0a2a1f" }}
          >
            Trend Map
          </h2>
          <p className="mt-2 text-sm" style={{ color: "#6b7b71" }}>
            Explore every sub-trend in this category. Each card links to a
            deep-dive article with data, analysis, and rankings.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {clusters.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group block rounded-2xl border border-[#e8efe5] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7ddc3f] hover:shadow-md"
                style={{ backgroundColor: "#ffffff" }}
              >
                <h3
                  className="font-semibold"
                  style={{
                    color: "#0a2a1f",
                    fontSize: "1.25rem",
                    lineHeight: 1.3,
                  }}
                >
                  {article.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "#4a5b50" }}
                >
                  {article.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#7ddc3f] group-hover:text-[#5cb52e]">
                  Read more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Complete Article List ===== */}
      <section className="px-[5%] py-10">
        <div className="mx-auto max-w-5xl">
          <h2
            className="text-2xl font-extrabold"
            style={{ color: "#0a2a1f" }}
          >
            All Articles in This Guide
          </h2>
          <p className="mt-2 text-sm" style={{ color: "#6b7b71" }}>
            A complete index of every article covered in this pillar guide.
          </p>

          <ul className="mt-6 flex flex-col">
            {clusters.map((article, index) => (
              <li
                key={article.href}
                style={{
                  borderBottom:
                    index === clusters.length - 1
                      ? "none"
                      : "1px solid #e8efe5",
                }}
              >
                <Link
                  href={article.href}
                  className="group flex items-center justify-between gap-4 py-3.5"
                >
                  <span
                    className="font-medium transition-colors group-hover:text-[#0a2a1f]"
                    style={{ color: "#2d3a32" }}
                  >
                    {article.title}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
                    style={{ color: "#7ddc3f" }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== FAQ (reuses site-wide collapsible style) ===== */}
      <FAQSection items={faqs} />

      {/* ===== Related Guides ===== */}
      <section className="px-[5%] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2
            className="text-xl font-extrabold sm:text-2xl"
            style={{ color: "#0a2a1f" }}
          >
            Related Guides
          </h2>
          <p className="mt-2 text-sm" style={{ color: "#6b7b71" }}>
            Continue exploring with these pillar guides
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group block rounded-xl border border-[#e8efe5] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7ddc3f] hover:shadow-md"
                style={{ backgroundColor: "#fbfdf8" }}
              >
                <h3
                  className="font-bold leading-snug"
                  style={{ color: "#2d3a32", fontSize: "1rem" }}
                >
                  {item.title}
                </h3>
                {item.description ? (
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "#6b7b71" }}
                  >
                    {item.description}
                  </p>
                ) : null}
                <span
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold"
                  style={{ color: "#0a2a1f" }}
                >
                  Explore guide
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer
        className="px-[5%] py-10 text-center"
        style={{ borderTop: "1px solid #e8efe5" }}
      >
        <p className="text-xs" style={{ color: "#6b7b71" }}>
          {"\u00A9"} 2026 Trending Hot {" \u00B7 "}{" "}
          <Link href="/about" className="transition hover:text-[#0a2a1f]">
            About
          </Link>
          {" \u00B7 "}
          <Link href="/privacy" className="transition hover:text-[#0a2a1f]">
            Privacy
          </Link>
          {" \u00B7 "}
          <Link href="/terms" className="transition hover:text-[#0a2a1f]">
            Terms
          </Link>
          {" \u00B7 "}
          <Link href="/contact" className="transition hover:text-[#0a2a1f]">
            Contact
          </Link>
        </p>
      </footer>
    </div>
  );
}
