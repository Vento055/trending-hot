import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * 底部 CTA 组件（Server Component）
 * 深墨绿背景 #0a2a1f，亮绿按钮 #7ddc3f，与首页 Final CTA 样式一致
 */
export function CTASection({
  title = "Want more data-driven insights?",
  description = "Explore the full collection of curated rankings, trend reports, and opportunity signals.",
  href = "/",
  label = "Explore More Rankings",
}: {
  title?: string;
  description?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="px-[5%] py-16 sm:py-20">
      <div
        className="mx-auto max-w-3xl rounded-2xl px-8 py-12 text-center sm:px-12 sm:py-14"
        style={{ backgroundColor: "#0a2a1f" }}
      >
        <h2
          className="font-extrabold"
          style={{
            color: "#fbfdf8",
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
        <p
          className="mx-auto mt-4 max-w-xl text-sm sm:text-base"
          style={{ color: "#a3b5aa", lineHeight: 1.6 }}
        >
          {description}
        </p>
        <Link
          href={href}
          className="cta-arrow mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold transition-transform hover:scale-[1.02] sm:text-base"
          style={{ backgroundColor: "#7ddc3f", color: "#0a2a1f" }}
        >
          {label}
          <ArrowRight className="h-4 w-4 cta-arrow-icon" />
        </Link>
      </div>
    </section>
  );
}
