import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import SignalContent from "./SignalContent";

export async function generateStaticParams() {
  const articlesDir = path.join(process.cwd(), "data", "articles");
  try {
    const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".json"));
    return files.map((f) => ({ slug: f.replace(".json", "") }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  // Default title from slug (fallback)
  let title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  let description = "AI-identified opportunity signal with trend analysis, behavioral drivers, and timing assessment.";

  try {
    const articlesDir = path.join(process.cwd(), "data", "articles");
    const filePath = path.join(articlesDir, `${slug}.json`);
    if (fs.existsSync(filePath)) {
      const article = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      // Use the article's actual title (preserves correct capitalization like GPT-5, DeepSeek)
      if (article.title) {
        title = article.title;
      }
      // Build meta description from subtitle, controlled to 150-160 chars
      if (article.subtitle) {
        let desc = article.subtitle;
        if (desc.length > 160) {
          // Truncate at word boundary, keep within 160 chars
          desc = desc.slice(0, 157);
          const lastSpace = desc.lastIndexOf(" ");
          if (lastSpace > 100) {
            desc = desc.slice(0, lastSpace) + "...";
          } else {
            desc = desc.slice(0, 157) + "...";
          }
        }
        description = desc;
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
      images: [{ url: "https://trending-hot.com/og-image.jpg", width: 1200, height: 630, alt: `${title} - Trending Hot` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Trending Hot`,
      description,
      images: ["https://trending-hot.com/og-image.jpg"],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let initialData: any = null;
  try {
    const articlesDir = path.join(process.cwd(), "data", "articles");
    const filePath = path.join(articlesDir, `${slug}.json`);
    if (fs.existsSync(filePath)) {
      initialData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch {}

  return <SignalContent params={params} initialData={initialData} />;
}