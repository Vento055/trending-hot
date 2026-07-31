import { Calendar, Clock } from "lucide-react";
import type { AuthorMeta as AuthorMetaType } from "@/lib/listing/types";

/**
 * 作者信息组件（Server Component）
 * 渲染头像占位 + 姓名 + 角色 + 更新日期 + 阅读时长
 */
export function AuthorMeta({ author }: { author: AuthorMetaType }) {
  const initials = author.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
      style={{ color: "#6b7b71" }}
    >
      <div className="flex items-center gap-2">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
          style={{ backgroundColor: "#0a2a1f", color: "#7ddc3f" }}
          aria-hidden="true"
        >
          {initials}
        </span>
        <span className="font-semibold" style={{ color: "#2d3a32" }}>
          {author.name}
        </span>
      </div>

      {author.role ? (
        <>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span className="hidden sm:inline">{author.role}</span>
        </>
      ) : null}

      <span className="flex items-center gap-1">
        <Calendar className="h-3.5 w-3.5" />
        {author.date}
      </span>

      <span className="flex items-center gap-1">
        <Clock className="h-3.5 w-3.5" />
        {author.readTime}
      </span>
    </div>
  );
}
