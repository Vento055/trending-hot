import { ListingLayout } from "../ListingLayout";
import { BarChart3, Quote, Lightbulb } from "lucide-react";
import type { StatisticsData } from "@/lib/listing/types";

/** 将标题转换为 URL-safe 的锚点 id */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * 模板B：数据统计榜（Server Component）
 * 使用 ListingLayout 包裹，渲染：
 * - 引言段落（由 ListingLayout 处理）
 * - 每个子主题（subTopics）作为章节：标题 + 数据点网格 + 可选 insight
 * - 方法论段落
 * FAQ 和 Related 由 ListingLayout 处理
 */
export function StatisticsTemplate({ data }: { data: StatisticsData }) {
  return (
    <ListingLayout
      title={`${data.industry} Statistics ${data.year}`}
      subtitle={`The most important ${data.industry.toLowerCase()} statistics for ${data.year}, organized by theme and sourced from public data.`}
      author={data.author}
      tldr={data.tldr}
      toc={data.toc}
      introduction={data.introduction}
      faqs={data.faqs}
      related={data.related}
    >
      {/* ===== Sub-topic chapters ===== */}
      <div className="mt-2 flex flex-col gap-12">
        {data.subTopics.map((topic, idx) => {
          const sectionId = slugify(topic.title);
          return (
            <section
              key={sectionId}
              id={sectionId}
              className="scroll-mt-24"
              style={{
                borderTop: idx === 0 ? "none" : "1px solid #e8efe5",
                paddingTop: idx === 0 ? 0 : "3rem",
              }}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6" style={{ color: "#7ddc3f" }} />
                <h3
                  className="text-2xl font-extrabold sm:text-3xl"
                  style={{ color: "#0a2a1f" }}
                >
                  {topic.title}
                </h3>
              </div>

              {/* Data points grid */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {topic.dataPoints.map((point, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border p-5"
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: "#e8efe5",
                      borderRadius: "16px",
                    }}
                  >
                    <p
                      className="font-extrabold leading-tight"
                      style={{
                        color: "#0a2a1f",
                        fontSize: "2rem",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {point.value}
                    </p>
                    <p
                      className="mt-2 text-sm font-medium leading-snug"
                      style={{ color: "#6b7b71" }}
                    >
                      {point.label}
                    </p>
                    <p
                      className="mt-3 text-xs leading-relaxed"
                      style={{ color: "#9ba89e" }}
                    >
                      Source: {point.source}
                    </p>
                  </div>
                ))}
              </div>

              {/* Optional insight */}
              {topic.insight ? (
                <div
                  className="relative mt-6 overflow-hidden rounded-xl px-5 py-4"
                  style={{ backgroundColor: "#f3f5f0" }}
                >
                  <span
                    className="absolute left-0 top-0 h-full w-1"
                    style={{ backgroundColor: "#7ddc3f" }}
                    aria-hidden="true"
                  />
                  <div className="flex items-start gap-2">
                    <Lightbulb
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
                        Insight:{" "}
                      </span>
                      {topic.insight}
                    </p>
                  </div>
                </div>
              ) : null}
            </section>
          );
        })}
      </div>

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
