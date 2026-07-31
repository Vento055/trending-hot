import { PageShell } from "./PageShell";
import { FAQSection } from "./FAQSection";
import { RelatedListings } from "./RelatedListings";
import type { ListingLayoutProps } from "@/lib/listing/types";

/**
 * 榜单页整合组件（Server Component）
 * 组合 PageShell 外壳 + 引言 + 主体内容(children) + FAQ + 相关榜单
 */
export function ListingLayout({
  title,
  subtitle,
  author,
  tldr,
  toc,
  introduction,
  children,
  faqs,
  related,
}: ListingLayoutProps) {
  return (
    <PageShell
      title={title}
      subtitle={subtitle}
      author={author}
      tldr={tldr}
      toc={toc}
    >
      {/* ===== Introduction ===== */}
      <section id="introduction" className="scroll-mt-24">
        <h2
          className="text-2xl font-extrabold sm:text-3xl"
          style={{ color: "#0a2a1f" }}
        >
          Introduction
        </h2>
        <p
          className="mt-4 text-base leading-relaxed"
          style={{ color: "#2d3a32" }}
        >
          {introduction}
        </p>
      </section>

      {/* ===== Main listing content (table / cards rendered by page) ===== */}
      <div className="mt-12">{children}</div>

      {/* ===== FAQ ===== */}
      <div id="faq" className="mt-4 scroll-mt-24">
        <FAQSection items={faqs} />
      </div>

      {/* ===== Related ===== */}
      <div id="related" className="scroll-mt-24">
        <RelatedListings items={related} />
      </div>
    </PageShell>
  );
}
