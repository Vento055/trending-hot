import { ArrowUp, ArrowDown } from "lucide-react";
import { ListingLayout } from "../ListingLayout";
import type { WebsiteListData, WebsiteItem } from "@/lib/listing/types";

/**
 * 模板D：国别网站榜（Server Component）
 * 用 ListingLayout 包裹，渲染网站列表表格 + 方法论。
 * FAQ 和 Related 由 ListingLayout 处理。
 * 移动端表格横向滚动，字体>=16px，点击区域>=44px。
 */

function WebsiteRow({ website }: { website: WebsiteItem }) {
  const isPositive = website.changeValue >= 0;

  return (
    <tr
      className="transition-colors duration-150 hover:bg-[#f8faf6]"
      style={{ borderTop: "1px solid #e8efe5" }}
    >
      <td
        className="px-4 py-4 align-top text-base font-extrabold tabular-nums"
        style={{ color: "#c3ccc4" }}
      >
        {website.rank}
      </td>
      <td
        className="px-4 py-4 align-top text-base font-bold"
        style={{ color: "#0a2a1f" }}
      >
        {website.name}
      </td>
      <td className="px-4 py-4 align-top">
        <span
          className="inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{ backgroundColor: "#e8f5e0", color: "#2d6e1e" }}
        >
          {website.type}
        </span>
      </td>
      <td
        className="px-4 py-4 text-right align-top text-base font-semibold tabular-nums"
        style={{ color: "#2d3a32" }}
      >
        {website.monthlyVisits}
      </td>
      <td className="px-4 py-4 text-right align-top">
        <span
          className="inline-flex items-center justify-end gap-1 whitespace-nowrap text-base font-semibold"
          style={{ color: isPositive ? "#2d6e1e" : "#ef4444" }}
        >
          {isPositive ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
          {website.change}
        </span>
      </td>
      <td
        className="px-4 py-4 align-top text-sm leading-relaxed"
        style={{ color: "#6b7b71" }}
      >
        {website.description}
      </td>
    </tr>
  );
}

export function WebsiteListTemplate({ data }: { data: WebsiteListData }) {
  const {
    country,
    year,
    websites,
    methodology,
    faqs,
    related,
    tldr,
    toc,
    author,
    introduction,
  } = data;

  const title = `Most Visited Websites in ${country} [${year}]`;
  const subtitle = `The ${websites.length} most visited websites in ${country} in ${year}, ranked by estimated monthly visits.`;

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
          Top {websites.length} Most Visited Websites in {country}
        </h2>
        <p className="mt-2 text-sm" style={{ color: "#6b7b71" }}>
          Ranked by estimated monthly visits for {year}
        </p>

        <div
          className="mt-6 overflow-x-auto rounded-xl border"
          style={{ borderColor: "#e8efe5", backgroundColor: "#fbfdf8" }}
        >
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr style={{ backgroundColor: "#f3f5f0" }}>
                <th
                  scope="col"
                  className="px-4 py-3 text-xs font-bold uppercase tracking-wider"
                  style={{ color: "#6b7b71" }}
                >
                  Rank
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-xs font-bold uppercase tracking-wider"
                  style={{ color: "#6b7b71" }}
                >
                  Website
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-xs font-bold uppercase tracking-wider"
                  style={{ color: "#6b7b71" }}
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider"
                  style={{ color: "#6b7b71" }}
                >
                  Monthly Visits
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider"
                  style={{ color: "#6b7b71" }}
                >
                  Change
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-xs font-bold uppercase tracking-wider"
                  style={{ color: "#6b7b71" }}
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {websites.map((website) => (
                <WebsiteRow key={website.rank} website={website} />
              ))}
            </tbody>
          </table>
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
