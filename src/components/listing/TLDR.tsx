import { Lightbulb } from "lucide-react";

/**
 * TLDR 摘要组件（Server Component）
 * 渲染为带亮绿左竖线的卡片，背景灰白 #f3f5f0
 */
export function TLDR({ items }: { items: string[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div
      className="relative overflow-hidden rounded-xl px-5 py-4 sm:px-6 sm:py-5"
      style={{ backgroundColor: "#f3f5f0" }}
    >
      <span
        className="absolute left-0 top-0 h-full w-1"
        style={{ backgroundColor: "#7ddc3f" }}
        aria-hidden="true"
      />

      <div className="flex items-center gap-2">
        <Lightbulb className="h-4 w-4" style={{ color: "#0a2a1f" }} />
        <h2
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: "#0a2a1f" }}
        >
          TL;DR
        </h2>
      </div>

      <ul className="mt-3 space-y-2.5">
        {items.map((text, i) => (
          <li
            key={i}
            className="flex gap-2.5 text-sm leading-relaxed"
            style={{ color: "#2d3a32" }}
          >
            <span
              className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: "#7ddc3f" }}
              aria-hidden="true"
            />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
