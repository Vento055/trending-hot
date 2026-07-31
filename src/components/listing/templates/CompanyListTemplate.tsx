import { ExternalLink } from "lucide-react";
import { ListingLayout } from "../ListingLayout";
import type { CompanyListData, CompanyItem } from "@/lib/listing/types";

/**
 * 模板C：公司/品牌榜（Server Component）
 * 用 ListingLayout 包裹，渲染公司列表（表格/列表混合样式）+ 方法论。
 * FAQ 和 Related 由 ListingLayout 处理。
 */

function CompanyRow({ company }: { company: CompanyItem }) {
  const initial = company.name.charAt(0).toUpperCase();

  return (
    <article
      className="border-b transition-colors duration-150 hover:bg-[#f8faf6]"
      style={{ borderColor: "#e8efe5" }}
    >
      {/* ===== Desktop: grid row ===== */}
      <div className="hidden items-center gap-6 px-5 py-5 md:grid md:grid-cols-[3rem_minmax(0,1fr)_9rem_9rem_6rem]">
        {/* Rank */}
        <div
          className="text-3xl font-extrabold leading-none tabular-nums"
          style={{ color: "#c3ccc4" }}
        >
          {company.rank}
        </div>

        {/* Logo + name + description */}
        <div className="flex min-w-0 items-start gap-3">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold uppercase"
            style={{ backgroundColor: "#0a2a1f", color: "#ffffff" }}
            aria-hidden="true"
          >
            {initial}
          </span>
          <div className="min-w-0">
            <h3
              className="text-base font-bold leading-snug"
              style={{ color: "#0a2a1f" }}
            >
              {company.name}
            </h3>
            <p
              className="mt-1 text-sm leading-relaxed"
              style={{ color: "#6b7b71" }}
            >
              {company.description}
            </p>
          </div>
        </div>

        {/* Key metric (highlighted) */}
        <div className="text-right">
          <div
            className="text-lg font-extrabold leading-tight"
            style={{ color: "#7ddc3f" }}
          >
            {company.keyMetric}
          </div>
          <div
            className="mt-0.5 text-xs leading-snug"
            style={{ color: "#6b7b71" }}
          >
            {company.keyMetricLabel}
          </div>
        </div>

        {/* Founded + funding */}
        <div className="text-sm leading-relaxed">
          {company.founded ? (
            <div style={{ color: "#2d3a32" }}>Est. {company.founded}</div>
          ) : null}
          {company.funding ? (
            <div style={{ color: "#6b7b71" }}>{company.funding}</div>
          ) : null}
        </div>

        {/* Website */}
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-end gap-1 text-sm font-semibold transition-colors hover:text-[#7ddc3f]"
          style={{ color: "#0a2a1f" }}
        >
          Visit
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* ===== Mobile: stacked card ===== */}
      <div className="px-5 py-5 md:hidden">
        <div className="flex items-start gap-3">
          <div
            className="text-2xl font-extrabold leading-none tabular-nums"
            style={{ color: "#c3ccc4", minWidth: "1.5rem" }}
          >
            {company.rank}
          </div>
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold uppercase"
            style={{ backgroundColor: "#0a2a1f", color: "#ffffff" }}
            aria-hidden="true"
          >
            {initial}
          </span>
          <div className="min-w-0 flex-1">
            <h3
              className="text-base font-bold leading-snug"
              style={{ color: "#0a2a1f" }}
            >
              {company.name}
            </h3>
            <p
              className="mt-1 text-sm leading-relaxed"
              style={{ color: "#6b7b71" }}
            >
              {company.description}
            </p>
          </div>
        </div>

        {/* Key metric */}
        <div className="mt-3 flex items-baseline gap-2 pl-[4.5rem]">
          <span
            className="text-xl font-extrabold"
            style={{ color: "#7ddc3f" }}
          >
            {company.keyMetric}
          </span>
          <span className="text-xs" style={{ color: "#6b7b71" }}>
            {company.keyMetricLabel}
          </span>
        </div>

        {/* Meta + website */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 pl-[4.5rem] text-sm">
          {company.founded ? (
            <span style={{ color: "#2d3a32" }}>Est. {company.founded}</span>
          ) : null}
          {company.funding ? (
            <span style={{ color: "#6b7b71" }}>{company.funding}</span>
          ) : null}
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold transition-colors hover:text-[#7ddc3f]"
            style={{ color: "#0a2a1f" }}
          >
            Visit
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function CompanyListTemplate({ data }: { data: CompanyListData }) {
  const {
    industry,
    year,
    companies,
    methodology,
    faqs,
    related,
    tldr,
    toc,
    author,
    introduction,
  } = data;

  const title = `Top ${companies.length} ${industry} Companies in ${year}`;
  const subtitle = `A ranked list of the leading ${industry.toLowerCase()} companies, measured by their key performance metrics for ${year}.`;

  return (
    <ListingLayout
      title={title}
      subtitle={subtitle}
      author={author}
      tldr={tldr}
      toc={toc}
      introduction={introduction}
      faqs={faqs}
      related={related}
    >
      {/* ===== Ranking ===== */}
      <section id="ranking" className="scroll-mt-24">
        <h2
          className="text-2xl font-extrabold sm:text-3xl"
          style={{ color: "#0a2a1f" }}
        >
          Top {companies.length} {industry} Companies
        </h2>
        <p className="mt-2 text-sm" style={{ color: "#6b7b71" }}>
          Ranked by{" "}
          {companies[0]?.keyMetricLabel.toLowerCase() ?? "key metric"}
        </p>

        <div
          className="mt-6 overflow-hidden rounded-xl border"
          style={{ backgroundColor: "#fbfdf8", borderColor: "#e8efe5" }}
        >
          {companies.map((company) => (
            <CompanyRow key={company.rank} company={company} />
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
