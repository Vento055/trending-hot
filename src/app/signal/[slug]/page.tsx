import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import SignalContent from "./SignalContent";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  let description = "AI-identified opportunity signal with trend analysis, behavioral drivers, and timing assessment.";

  try {
    const articlesDir = path.join(process.cwd(), "data", "articles");
    const filePath = path.join(articlesDir, `${slug}.json`);
    if (fs.existsSync(filePath)) {
      const article = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      if (article.subtitle) {
        description = article.subtitle.slice(0, 160);
      }
    }
  } catch {}

  return {
    title,
    description,
    metadataBase: new URL("https://trending-hot.com"),
    alternates: {
      canonical: `/signal/${slug}`,
    },
    openGraph: {
      title: `${title} | Trending Hot`,
      description,
      url: `https://trending-hot.com/signal/${slug}`,
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

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <SignalContent params={params} />;
}
