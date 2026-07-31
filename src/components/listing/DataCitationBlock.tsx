"use client";

import { useState } from "react";
import { Quote, Copy, Check } from "lucide-react";

interface DataCitationBlockProps {
  title: string;
  url: string;
  year: string;
}

type TabKey = "apa" | "mla" | "html";

const TABS: { key: TabKey; label: string }[] = [
  { key: "apa", label: "APA" },
  { key: "mla", label: "MLA" },
  { key: "html", label: "HTML embed" },
];

/**
 * 数据引用区块（Client Component）
 * 提供 APA / MLA / HTML embed 三种引用格式标签页，
 * 每种格式可一键复制到剪贴板。
 */
export function DataCitationBlock({ title, url, year }: DataCitationBlockProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("apa");
  const [copiedKey, setCopiedKey] = useState<TabKey | null>(null);

  const citations: Record<TabKey, string> = {
    apa: `Trending Hot. (${year}). ${title}. Retrieved from ${url}`,
    mla: `"Trending Hot." ${title}, ${year}, ${url}.`,
    html: `<blockquote cite="${url}"><p>${title}. Trending Hot, ${year}.</p><a href="${url}">Trending Hot</a></blockquote>`,
  };

  const handleCopy = async (key: TabKey) => {
    try {
      await navigator.clipboard.writeText(citations[key]);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // 剪贴板不可用时静默失败，避免阻塞渲染
    }
  };

  return (
    <div
      className="rounded-2xl border p-6 sm:p-8"
      style={{
        backgroundColor: "#f3f5f0",
        borderColor: "#e8efe5",
        borderRadius: "16px",
      }}
    >
      <div className="flex items-center gap-2">
        <Quote className="h-5 w-5" style={{ color: "#7ddc3f" }} />
        <h2
          className="text-xl font-extrabold sm:text-2xl"
          style={{ color: "#0a2a1f" }}
        >
          Cite This Data
        </h2>
      </div>
      <p className="mt-2 text-sm" style={{ color: "#6b7b71" }}>
        Use one of the formats below to cite this statistics page.
      </p>

      {/* Tabs */}
      <div className="mt-5 flex flex-wrap gap-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors"
              style={{
                backgroundColor: isActive ? "#0a2a1f" : "#ffffff",
                color: isActive ? "#fbfdf8" : "#6b7b71",
                border: "1px solid #e8efe5",
              }}
              aria-pressed={isActive}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Citation content + copy */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <code
          className="block flex-1 overflow-x-auto whitespace-pre-wrap break-words rounded-xl p-4 text-sm leading-relaxed"
          style={{
            backgroundColor: "#ffffff",
            color: "#2d3a32",
            border: "1px solid #e8efe5",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          }}
        >
          {citations[activeTab]}
        </code>
        <button
          type="button"
          onClick={() => handleCopy(activeTab)}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-colors"
          style={{
            backgroundColor: copiedKey === activeTab ? "#7ddc3f" : "#0a2a1f",
            color: copiedKey === activeTab ? "#0a2a1f" : "#fbfdf8",
          }}
        >
          {copiedKey === activeTab ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copiedKey === activeTab ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
