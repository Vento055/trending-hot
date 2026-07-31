import { ListingLayout } from "../ListingLayout";
import { TrendingUp, Sparkles, Quote } from "lucide-react";
import type { CategoryTrendData } from "@/lib/listing/types";

/**
 * 模板A：品类趋势榜（Server Component）
 * 使用 ListingLayout 包裹，渲染：
 * - 引言段落（由 ListingLayout 处理）
 * - 品类趋势列表（卡片网格，含 rank / definition / growthRate / representativeBrands / keyInsight）
 * - 方法论段落
 * FAQ 和 Related 由 ListingLayout 处理
 */
export function CategoryTrendTemplate({ data }: { data: CategoryTrendData }) {
  return (
    <ListingLayout
      title={`Top ${data.items.length} ${data.category} Trends in ${data.year}`}
      subtitle={`The fastest-growing ${data.category.toLowerCase()} categories, ranked by growth momentum and market signals.`}
      author={data.author}
      tldr={data.tldr}
      toc={data.toc}
      introduction={data.introduction}
      faqs={data.faqs}
      related={data.related}
    >
      {/* ===== Ranking ===== */}
      <section id="ranking" className="scroll-mt-24">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6" style={{ color: "#7ddc3f" }} />
          <h2
            className="text-2xl font-extrabold sm:text-3xl"
            style={{ color: "#0a2a1f" }}
          >
            Top {data.items.length} {data.category} Trends
          </h2>
        </div>
        <p className="mt-3 text-sm" style={{ color: "#6b7b71" }}>
          Ranked by year-over-year growth rate. Each entry includes a short
          definition, representative brands, and an editorial insight.
        </p>

        <div className="mt-8 flex flex-col gap-5">
          {data.items.map((item) => (
            <article
              key={item.rank}
              className="rounded-2xl border p-5 transition-shadow duration-200 hover:shadow-md sm:p-6"
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#e8efe5",
                borderRadius: "16px",
              }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                {/* Rank */}
                <div className="flex shrink-0 items-start sm:flex-col sm:items-center">
                  <span
                    className="font-extrabold leading-none"
                    style={{
                      color: "#6b7b71",
                      fontSize: "2.5rem",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {String(item.rank).padStart(2, "0")}
                  </span>
                </div>

                {/* Body */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3
                      className="text-xl font-bold leading-snug"
                      style={{ color: "#0a2a1f" }}
                    >
                      {item.name}
                    </h3>
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-bold"
                      style={{
                        backgroundColor: "#eaf7dd",
                        color: "#2d6e1e",
                      }}
                    >
                      <TrendingUp className="h-3.5 w-3.5" />
                      {item.growthRate}
                    </span>
                  </div>

                  <p
                    className="mt-3 text-sm leading-relaxed sm:text-base"
                    style={{ color: "#2d3a32" }}
                  >
                    {item.definition}
                  </p>

                  {/* Representative brands */}
                  {item.representativeBrands.length > 0 ? (
                    <div className="mt-4">
                      <p
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "#6b7b71" }}
                      >
                        Representative Brands
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.representativeBrands.map((brand) => (
                          <span
                            key={brand}
                            className="rounded-full px-3 py-1 text-xs font-medium"
                            style={{
                              backgroundColor: "#e8f5e0",
                              color: "#2d6e1e",
                              borderRadius: "999px",
                            }}
                          >
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {/* Key insight */}
                  {item.keyInsight ? (
                    <div
                      className="relative mt-4 overflow-hidden rounded-xl px-4 py-3"
                      style={{ backgroundColor: "#f3f5f0" }}
                    >
                      <span
                        className="absolute left-0 top-0 h-full w-1"
                        style={{ backgroundColor: "#7ddc3f" }}
                        aria-hidden="true"
                      />
                      <div className="flex items-start gap-2">
                        <Sparkles
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{ color: "#0a2a1f" }}
                        />
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "#2d3a32" }}
                        >
                          <span
                            className="font-semibold"
                            style={{ color: "#0a2a1f" }}
                          >
                            Key insight:{" "}
                          </span>
                          {item.keyInsight}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== Methodology ===== */}
      <section id="methodology" className="mt-16 scroll-mt-24">
        <div className="flex items-center gap-2">
          <Quote className="h-6 w-6" style={{ color: "#7ddc3f" }} />
          <h2
            className="text-2xl font-extrabold sm:text-3xl"
            style={{ color: "#0a2a1f" }}
          >
            Methodology
          </h2>
        </div>
        <p
          className="mt-4 text-base leading-relaxed"
          style={{ color: "#2d3a32" }}
        >
          {data.methodology}
        </p>
      </section>
    </ListingLayout>
  );
}
