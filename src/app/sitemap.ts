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

  return [...staticPages, ...dynamicPages];
}
