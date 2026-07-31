"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "@/lib/listing/types";

/**
 * FAQ 折叠组件（Client Component）
 * 用 useState 控制展开/收起，ChevronDown 图标随状态旋转
 */
export function FAQSection({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <section className="px-[5%] py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h2
          className="text-center text-xl font-extrabold sm:text-2xl"
          style={{ color: "#0a2a1f" }}
        >
          Frequently Asked Questions
        </h2>

        <div className="mt-8 flex flex-col gap-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="overflow-hidden rounded-xl border transition-colors"
                style={{
                  borderColor: isOpen ? "#7ddc3f" : "#e8efe5",
                  backgroundColor: "#fbfdf8",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-sm font-semibold sm:text-base"
                    style={{ color: "#2d3a32" }}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    className="h-5 w-5 shrink-0 transition-transform duration-200"
                    style={{
                      color: "#0a2a1f",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                {isOpen ? (
                  <p
                    className="px-5 pb-4 text-sm leading-relaxed"
                    style={{ color: "#6b7b71" }}
                  >
                    {item.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
