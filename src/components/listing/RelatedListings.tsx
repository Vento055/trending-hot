import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { RelatedListing } from "@/lib/listing/types";

/**
 * 相关榜单推荐组件（Server Component）
 * 渲染底部 3-5 个卡片链接网格
 */
export function RelatedListings({ items }: { items: RelatedListing[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="px-[5%] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2
          className="text-xl font-extrabold sm:text-2xl"
          style={{ color: "#0a2a1f" }}
        >
          Related Rankings
        </h2>
        <p className="mt-2 text-sm" style={{ color: "#6b7b71" }}>
          Keep exploring with these curated lists
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block rounded-xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7ddc3f] hover:shadow-md"
              style={{ backgroundColor: "#fbfdf8", borderColor: "#e8efe5" }}
            >
              <h3
                className="font-bold leading-snug transition-colors group-hover:text-[#0a2a1f]"
                style={{ color: "#2d3a32", fontSize: "1rem" }}
              >
                {item.title}
              </h3>
              {item.description ? (
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "#6b7b71" }}
                >
                  {item.description}
                </p>
              ) : null}
              <span
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold"
                style={{ color: "#0a2a1f" }}
              >
                Read more
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
