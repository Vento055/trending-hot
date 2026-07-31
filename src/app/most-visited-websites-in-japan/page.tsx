import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMockData } from "@/lib/listing/mock-data";
import { WebsiteListTemplate } from "@/components/listing/templates/WebsiteListTemplate";
import type { WebsiteListData } from "@/lib/listing/types";

const SLUG = "most-visited-websites-in-japan";

export const metadata: Metadata = {
  // 标题经由根 layout 的 title.template（"%s | Trending Hot"）拼接
  // 最终呈现：Most Visited Websites in Japan [2026] | Trending Hot
  title: "Most Visited Websites in Japan [2026]",
  description:
    "Discover the 50 most visited websites in Japan in 2026, ranked by estimated monthly visits. See how Yahoo Japan, Google, YouTube, Amazon and more compare.",
  alternates: {
    canonical: `/${SLUG}`,
  },
  openGraph: {
    title: "Most Visited Websites in Japan [2026] | Trending Hot",
    description:
      "Discover the 50 most visited websites in Japan in 2026, ranked by estimated monthly visits. See how Yahoo Japan, Google, YouTube, Amazon and more compare.",
    url: `https://trending-hot.com/${SLUG}`,
    siteName: "Trending Hot",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Most Visited Websites in Japan [2026] | Trending Hot",
    description:
      "Discover the 50 most visited websites in Japan in 2026, ranked by estimated monthly visits. See how Yahoo Japan, Google, YouTube, Amazon and more compare.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  const data = getMockData(SLUG);

  if (!data) {
    notFound();
  }

  // 断言为 WebsiteListData 类型并交给模板渲染
  const websiteData = data as WebsiteListData;

  return <WebsiteListTemplate data={websiteData} />;
}
