"use client";

import { useState, useEffect } from "react";
import { ChevronDown, List } from "lucide-react";
import type { TOCItem } from "@/lib/listing/types";

/**
 * 目录锚点组件（Client Component）
 * - variant="sidebar": 桌面端 sticky 侧边栏列表，当前章节高亮
 * - variant="inline": 移动端折叠面板，点击展开
 */
export function TableOfContents({
  items,
  variant = "sidebar",
}: {
  items: TOCItem[];
  variant?: "sidebar" | "inline";
}) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  const renderItem = (item: TOCItem) => {
    const isActive = activeId === item.id;
    const paddingInline = item.level && item.level > 1 ? "pl-6" : "pl-0";
    return (
      <li key={item.id}>
        <a
          href={`#${item.id}`}
          onClick={(e) => handleClick(e, item.id)}
          className={`block border-l-2 py-1.5 pr-2 text-sm transition-colors ${paddingInline}`}
          style={{
            borderColor: isActive ? "#7ddc3f" : "#e8efe5",
            color: isActive ? "#0a2a1f" : "#6b7b71",
            fontWeight: isActive ? 600 : 400,
          }}
        >
          {item.title}
        </a>
      </li>
    );
  };

  if (variant === "inline") {
    return (
      <div
        className="overflow-hidden rounded-xl border"
        style={{ borderColor: "#e8efe5", backgroundColor: "#f3f5f0" }}
      >
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
          aria-expanded={mobileOpen}
        >
          <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#0a2a1f" }}>
            <List className="h-4 w-4" />
            Table of Contents
          </span>
          <ChevronDown
            className="h-4 w-4 shrink-0 transition-transform duration-200"
            style={{
              color: "#0a2a1f",
              transform: mobileOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>
        {mobileOpen ? (
          <ul className="space-y-0.5 px-4 pb-3">{items.map(renderItem)}</ul>
        ) : null}
      </div>
    );
  }

  return (
    <nav>
      <p
        className="mb-3 text-xs font-bold uppercase tracking-wider"
        style={{ color: "#0a2a1f" }}
      >
        On this page
      </p>
      <ul className="space-y-0.5">{items.map(renderItem)}</ul>
    </nav>
  );
}
