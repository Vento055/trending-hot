import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const BASE_URL = "https://trending-hot.com";

/**
 * Transform old format route path to new format URL.
 * Based on redirect rules in next.config.ts:
 *   /stats/:slug     -> /:slug-statistics  (reverse for sitemap)
 *   /trends/:slug    -> /:slug-trends       (reverse for sitemap)
 *   /countries/:slug -> /most-visited-websites-in-:slug  (reverse for sitemap)
 *   /companies/:slug -> direct page
 *   /tools/:slug     -> direct page
 *   /trends/:slug    -> /trending-:slug     (listing pages)
 */
function transformUrl(routePath: string): string {
  if (routePath === "") return "";

  // /xxx-statistics -> /stats/xxx (3 statistics pages)
  if (routePath.endsWith("-statistics")) {
    const slug = routePath.slice(0, -"-statistics".length);
    return `/stats/${slug}`;
  }

  // /trending-xxx -> /trends/xxx (listing pages: beauty-products, pet-products)
  if (routePath.startsWith("trending-") && !routePath.includes("/")) {
    const slug = routePath.slice("trending-".length);
    return `/trends/${slug}`;
  }

  // /xxx-trends -> /trends/xxx (micro-trend articles)
  if (routePath.endsWith("-trends")) {
    const slug = routePath.slice(0, -"-trends".length);
    return `/trends/${slug}`;
  }

  // /most-visited-websites-in-xxx -> /countries/xxx (20 country pages)
  if (routePath.startsWith("most-visited-websites-in-")) {
    const slug = routePath.slice("most-visited-websites-in-".length);
    return `/countries/${slug}`;
  }

  // /fastest-growing-ai-startups -> /companies/fastest-growing-ai-startups
  if (routePath === "fastest-growing-ai-startups") {
    return "/companies/fastest-growing-ai-startups";
  }

  // /top-fintech-startups -> /companies/top-fintech-startups
  if (routePath === "top-fintech-startups") {
    return "/companies/top-fintech-startups";
  }

  // /best-ai-xxx -> /tools/best-ai-xxx
  if (routePath.startsWith("best-ai-")) {
    return `/tools/${routePath}`;
  }

  return `/${routePath}`;
}

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

  // -- Static pages: dynamically scan src/app for page.tsx files --
  const appDir = path.join(process.cwd(), "src", "app");

  // Home page (src/app/page.tsx -> /)
  if (fs.existsSync(path.join(appDir, "page.tsx"))) {
    pages.push({
      url: BASE_URL,
      lastModified: new Date(),
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

      // Skip excluded routes, route groups, private folders, dynamic routes
      if (EXCLUDED_DIRS.has(entry.name)) continue;
      if (entry.name.startsWith("(")) continue;
      if (entry.name.startsWith("_")) continue;
      if (entry.name.startsWith("[")) continue;

      const routePath = basePath ? `${basePath}/${entry.name}` : entry.name;
      const fullPath = path.join(dir, entry.name);

      // Check if this directory has a page.tsx (it's a route)
      if (fs.existsSync(path.join(fullPath, "page.tsx"))) {
        const url = transformUrl(routePath);
        const config = getRouteConfig(routePath);
        pages.push({
          url: `${BASE_URL}${url}`,
          lastModified: new Date(),
          changeFrequency: config.changeFrequency,
          priority: config.priority,
        });
      }

      // Recurse into subdirectories (e.g., guides/)
      scanPages(fullPath, routePath);
    }
  }

  scanPages(appDir, "");

  // -- Dynamic signal article pages - reads from data/articles/ --
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

  // -- Dynamic trend detail pages - reads from data/trend-analysis/ --
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
