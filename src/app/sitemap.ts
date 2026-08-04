import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const BASE_URL = "https://www.trending-hot.com";

function getRouteConfig(
  routePath: string
): { priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" } {
  if (routePath === "") return { priority: 1.0, changeFrequency: "daily" };
  if (routePath === "signals") return { priority: 0.9, changeFrequency: "daily" };
  if (routePath.startsWith("guides/"))
    return { priority: 0.9, changeFrequency: "weekly" };
  if (
    routePath.endsWith("-statistics") ||
    routePath.startsWith("trending-") ||
    routePath === "fastest-growing-ai-startups" ||
    routePath === "top-fintech-startups" ||
    routePath.startsWith("best-ai-") ||
    routePath.startsWith("most-visited-websites-in-")
  ) {
    return { priority: 0.8, changeFrequency: "weekly" };
  }
  if (routePath.endsWith("-trends"))
    return { priority: 0.7, changeFrequency: "weekly" };
  if (["about", "contact"].includes(routePath))
    return { priority: 0.5, changeFrequency: "monthly" };
  if (["privacy", "terms"].includes(routePath))
    return { priority: 0.4, changeFrequency: "yearly" };
  if (routePath === "search")
    return { priority: 0.3, changeFrequency: "weekly" };
  return { priority: 0.6, changeFrequency: "monthly" };
}

// Directories to exclude from sitemap scanning
const EXCLUDED_DIRS = new Set(["api", "blog", "signal", "trend"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [];

  const appDir = path.join(process.cwd(), "src", "app");

  // Home page
  const homePagePath = path.join(appDir, "page.tsx");
  if (fs.existsSync(homePagePath)) {
    const stat = fs.statSync(homePagePath);
    pages.push({
      url: BASE_URL,
      lastModified: stat.mtime,
      changeFrequency: "daily",
      priority: 1.0,
    });
  }

  function scanPages(dir: string, basePath: string) {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      if (EXCLUDED_DIRS.has(entry.name)) continue;
      if (entry.name.startsWith("(")) continue;
      if (entry.name.startsWith("_")) continue;
      if (entry.name.startsWith("[")) continue;

      const routePath = basePath ? `${basePath}/${entry.name}` : entry.name;
      const fullPath = path.join(dir, entry.name);

      if (fs.existsSync(path.join(fullPath, "page.tsx"))) {
        // Use the route path directly as the canonical URL (no reversal)
        const url = `/${routePath}`;
        const config = getRouteConfig(routePath);
        const pageStat = fs.statSync(path.join(fullPath, "page.tsx"));
        pages.push({
          url: `${BASE_URL}${url}`,
          lastModified: pageStat.mtime,
          changeFrequency: config.changeFrequency,
          priority: config.priority,
        });
      }

      scanPages(fullPath, routePath);
    }
  }

  scanPages(appDir, "");

  // Dynamic signal article pages
  const articlesDir = path.join(process.cwd(), "data", "articles");
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
        pages.push({
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

  // Dynamic trend detail pages
  const trendAnalysisDir = path.join(process.cwd(), "data", "trend-analysis");
  try {
    if (fs.existsSync(trendAnalysisDir)) {
      const trendFiles = fs.readdirSync(trendAnalysisDir).filter((f) =>
        f.endsWith(".json")
      );
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
        pages.push({
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

  return pages;
}