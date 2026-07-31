import Link from "next/link";
import { AuthorMeta } from "./AuthorMeta";
import { TLDR } from "./TLDR";
import { TableOfContents } from "./TableOfContents";
import { CTASection } from "./CTASection";
import type { PageShellProps } from "@/lib/listing/types";

/**
 * 通用页面外壳（Server Component）
 * 包含：最外层容器、H1、副标题、AuthorMeta、TLDR、目录锚点、
 * 子内容容器（max-w-4xl）、底部 CTA + Footer 链接
 */
export function PageShell({
  title,
  subtitle,
  author,
  tldr,
  toc,
  children,
}: PageShellProps) {
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
      <header className="px-[5%] pb-8 pt-16 sm:pt-20">
        <div className="mx-auto max-w-4xl">
          <h1
            className="font-extrabold"
            style={{
              color: "#0a2a1f",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>

          {subtitle ? (
            <p
              className="mt-4 text-base sm:text-lg"
              style={{ color: "#6b7b71", lineHeight: 1.6 }}
            >
              {subtitle}
            </p>
          ) : null}

          <div className="mt-5">
            <AuthorMeta author={author} />
          </div>

          <div className="mt-6">
            <TLDR items={tldr} />
          </div>
        </div>
      </header>

      {/* ===== Body: main content + TOC sidebar ===== */}
      <div className="px-[5%] pb-4">
        <div className="mx-auto flex max-w-6xl gap-8">
          {/* Desktop sticky TOC sidebar */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-20">
              <TableOfContents items={toc} variant="sidebar" />
            </div>
          </aside>

          {/* Main content */}
          <div className="min-w-0 max-w-4xl flex-1">
            {/* Mobile collapsible TOC */}
            <div className="mb-6 lg:hidden">
              <TableOfContents items={toc} variant="inline" />
            </div>

            {children}
          </div>
        </div>
      </div>

      {/* ===== CTA ===== */}
      <CTASection />

      {/* ===== Footer links ===== */}
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
