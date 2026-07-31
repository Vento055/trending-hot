import { ExternalLink, Check, Plus, Minus } from "lucide-react";
import { ListingLayout } from "../ListingLayout";
import type {
  ToolComparisonData,
  ToolItem,
} from "@/lib/listing/types";

/**
 * 模板E：工具对比榜（Server Component）
 *
 * 使用 ListingLayout 包裹，渲染：
 * - 引言段落（由 ListingLayout 处理）
 * - 工具对比大卡片列表（tools）：rank / name / rating / bestFor / features / pricing / pros & cons / website
 * - 方法论段落（methodology）
 * - FAQ 与 Related 由 ListingLayout 处理
 */
export function ToolComparisonTemplate({
  data,
}: {
  data: ToolComparisonData;
}) {
  const {
    toolCategory,
    useCase,
    year,
    tools,
    methodology,
    faqs,
    related,
    tldr,
    toc,
    author,
    introduction,
  } = data;

  return (
    <ListingLayout
      title={`Best ${toolCategory} for ${useCase} [${year}]`}
      subtitle={`A side-by-side comparison of the top ${tools.length} ${toolCategory.toLowerCase()} for ${useCase.toLowerCase()} — covering features, pricing, pros, and cons.`}
      author={author}
      tldr={tldr}
      toc={toc}
      introduction={introduction}
      faqs={faqs}
      related={related}
    >
      {/* ===== Tools ranking ===== */}
      <section id="ranking" className="scroll-mt-24">
        <h2
          className="text-2xl font-extrabold sm:text-3xl"
          style={{ color: "#0a2a1f" }}
        >
          Top {tools.length} {toolCategory} Compared
        </h2>
        <p className="mt-3 text-sm" style={{ color: "#6b7b71" }}>
          Each tool is broken down by rating, key features, pricing, and a
          candid look at its pros and cons.
        </p>

        <div className="mt-8 flex flex-col gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.rank} tool={tool} />
          ))}
        </div>
      </section>

      {/* ===== Methodology ===== */}
      <section id="methodology" className="mt-16 scroll-mt-24">
        <h2
          className="text-2xl font-extrabold sm:text-3xl"
          style={{ color: "#0a2a1f" }}
        >
          Methodology
        </h2>
        <p
          className="mt-4 text-base leading-relaxed"
          style={{ color: "#2d3a32" }}
        >
          {methodology}
        </p>
      </section>
    </ListingLayout>
  );
}

/**
 * 单个工具对比大卡片
 */
function ToolCard({ tool }: { tool: ToolItem }) {
  const fullStars = Math.max(0, Math.min(5, Math.round(tool.rating)));
  const emptyStars = 5 - fullStars;
  // 前三名徽章使用亮绿底，其余使用深墨绿底，形成视觉层级
  const isTopRank = tool.rank <= 3;

  return (
    <article
      className="rounded-2xl border p-6 transition-shadow duration-200 hover:shadow-md"
      style={{ backgroundColor: "#ffffff", borderColor: "#e8efe5" }}
    >
      {/* Header: rank badge + name + rating */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-extrabold"
            style={
              isTopRank
                ? { backgroundColor: "#7ddc3f", color: "#0a2a1f" }
                : { backgroundColor: "#0a2a1f", color: "#7ddc3f" }
            }
            aria-label={`Rank ${tool.rank}`}
          >
            {tool.rank}
          </span>
          <h3
            className="text-xl font-extrabold sm:text-2xl"
            style={{ color: "#0a2a1f" }}
          >
            {tool.name}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="text-lg leading-none"
            style={{ color: "#7ddc3f", letterSpacing: "0.05em" }}
            aria-hidden="true"
          >
            {"★".repeat(fullStars)}
            {"☆".repeat(emptyStars)}
          </span>
          <span
            className="text-sm font-bold"
            style={{ color: "#2d3a32" }}
          >
            {tool.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* bestFor tag */}
      <div className="mt-4">
        <span
          className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
          style={{ backgroundColor: "#e8f5e0", color: "#2d6e1e" }}
        >
          Best for: {tool.bestFor}
        </span>
      </div>

      {/* Features */}
      <div className="mt-5">
        <h4
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: "#0a2a1f" }}
        >
          Features
        </h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {tool.features.map((feature, i) => (
            <li
              key={i}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm"
              style={{ backgroundColor: "#f3f5f0", color: "#2d3a32" }}
            >
              <Check
                className="h-3.5 w-3.5 shrink-0"
                style={{ color: "#7ddc3f" }}
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Pricing */}
      <div className="mt-5 flex flex-wrap items-baseline gap-2">
        <span
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: "#0a2a1f" }}
        >
          Pricing
        </span>
        <span
          className="rounded-lg px-2.5 py-1 text-base font-bold"
          style={{ backgroundColor: "#e8f5e0", color: "#0a2a1f" }}
        >
          {tool.pricing}
        </span>
      </div>

      {/* Pros / Cons — two columns, stack on mobile */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {/* Pros */}
        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: "#f3f5f0" }}
        >
          <h4
            className="text-sm font-bold"
            style={{ color: "#2d6e1e" }}
          >
            Pros
          </h4>
          <ul className="mt-2 space-y-1.5">
            {tool.pros.map((pro, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm leading-relaxed"
                style={{ color: "#2d6e1e" }}
              >
                <Plus
                  className="mt-0.5 h-3.5 w-3.5 shrink-0"
                  style={{ color: "#2d6e1e" }}
                />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: "#f3f5f0" }}
        >
          <h4
            className="text-sm font-bold"
            style={{ color: "#ef4444" }}
          >
            Cons
          </h4>
          <ul className="mt-2 space-y-1.5">
            {tool.cons.map((con, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm leading-relaxed"
                style={{ color: "#ef4444" }}
              >
                <Minus
                  className="mt-0.5 h-3.5 w-3.5 shrink-0"
                  style={{ color: "#ef4444" }}
                />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Website link */}
      <div className="mt-5 border-t pt-4" style={{ borderColor: "#e8efe5" }}>
        <a
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline"
          style={{ color: "#0a2a1f" }}
        >
          Visit Website
          <ExternalLink className="h-3.5 w-3.5" style={{ color: "#7ddc3f" }} />
        </a>
      </div>
    </article>
  );
}
