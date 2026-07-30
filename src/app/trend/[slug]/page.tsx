import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import TrendContent from "./TrendContent";

const TREND_ANALYSIS_DIR = path.join(process.cwd(), "data", "trend-analysis");

export async function generateStaticParams() {
  try {
    if (!fs.existsSync(TREND_ANALYSIS_DIR)) return [];
    const files = fs.readdirSync(TREND_ANALYSIS_DIR).filter((f) => f.endsWith(".json"));
    return files.map((file) => ({
      slug: file.replace(".json", ""),
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let trendName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  let summary = `${trendName} is trending now. Discover why it's going viral and what it means for you.`;
  let description = summary;

  try {
    const filePath = path.join(TREND_ANALYSIS_DIR, `${slug}.json`);
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      if (data.name) {
        trendName = data.name;
      }
      if (data.summary) {
        summary = data.summary;
      }
      // Build a 120-160 character meta description
      const baseDesc = `${trendName} is trending right now. ${summary} Read our full analysis on why ${trendName.toLowerCase()} is going viral and what it means.`;
      description = baseDesc.slice(0, 160);
      if (description.length > 120 && description.lastIndexOf(" ") > 120) {
        description = description.slice(0, description.lastIndexOf(" ")) + ".";
      }
    }
  } catch {}

  // Layout template adds "| Trending Hot" automatically, so don't include it here
  const title = `${trendName} Trending Now — Why It's Going Viral & What It Means`;

  return {
    title,
    description,
    metadataBase: new URL("https://trending-hot.com"),
    alternates: {
      canonical: `/trend/${slug}`,
    },
    openGraph: {
      title: `${title} | Trending Hot`,
      description,
      url: `https://trending-hot.com/trend/${slug}`,
      siteName: "Trending Hot",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Trending Hot`,
      description,
    },
  };
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <TrendContent params={params} />;
}
