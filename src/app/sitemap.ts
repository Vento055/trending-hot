import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const BASE_URL = "https://trending-hot.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/signals`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.3,
    },
    // 10 listing pages (SEO landing pages)
    {
      url: `${BASE_URL}/trending-beauty-products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/trending-pet-products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ai-statistics`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/social-media-statistics`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/fastest-growing-ai-startups`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/top-fintech-startups`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/most-visited-websites-in-japan`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/most-visited-websites-in-india`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/most-visited-websites-in-united-states`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/most-visited-websites-in-united-kingdom`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/most-visited-websites-in-germany`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/most-visited-websites-in-france`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/most-visited-websites-in-brazil`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/most-visited-websites-in-south-korea`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/most-visited-websites-in-australia`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/most-visited-websites-in-canada`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/most-visited-websites-in-mexico`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/most-visited-websites-in-indonesia`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/most-visited-websites-in-russia`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/most-visited-websites-in-italy`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/most-visited-websites-in-spain`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/most-visited-websites-in-netherlands`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/most-visited-websites-in-turkey`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/most-visited-websites-in-saudi-arabia`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/most-visited-websites-in-thailand`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/most-visited-websites-in-vietnam`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/best-ai-writing-tools-for-students`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/best-ai-tools-for-content-creation`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // 5 pillar guide pages (SEO hub pages)
    {
      url: `${BASE_URL}/guides/ai-trends-2026`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/tech-trends-2026`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/beauty-trends-2026`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/ecommerce-trends-2026`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/social-media-trends-2026`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Dynamic signal article pages - reads from data/articles/
  const articlesDir = path.join(process.cwd(), "data", "articles");
  const dynamicPages: MetadataRoute.Sitemap = [];
  try {
    if (fs.existsSync(articlesDir)) {
      const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".json"));
      for (const file of files) {
        const slug = file.replace(".json", "");
        const filePath = path.join(articlesDir, file);
        const stat = fs.statSync(filePath);
        let lastMod = stat.mtime;
        try {
          const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
          if (content.generatedAt) {
            lastMod = new Date(content.generatedAt);
          }
        } catch {}
        dynamicPages.push({
          url: `${BASE_URL}/signal/${slug}`,
          lastModified: lastMod,
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
  } catch (e) {
    console.error("Sitemap dynamic pages error:", e);
  }

  // Dynamic trend detail pages - reads from data/trend-analysis/
  const trendAnalysisDir = path.join(process.cwd(), "data", "trend-analysis");
  const trendPages: MetadataRoute.Sitemap = [];
  try {
    if (fs.existsSync(trendAnalysisDir)) {
      const trendFiles = fs.readdirSync(trendAnalysisDir).filter((f) => f.endsWith(".json"));
      for (const file of trendFiles) {
        const slug = file.replace(".json", "");
        const filePath = path.join(trendAnalysisDir, file);
        const stat = fs.statSync(filePath);
        let lastMod = stat.mtime;
        try {
          const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
          if (content.generatedAt) {
            lastMod = new Date(content.generatedAt);
          }
        } catch {}
        trendPages.push({
          url: `${BASE_URL}/trend/${slug}`,
          lastModified: lastMod,
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
  } catch (e) {
    console.error("Sitemap trend pages error:", e);
  }

  return [...staticPages, ...dynamicPages, ...trendPages];
}
