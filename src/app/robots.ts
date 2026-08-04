import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Primary search crawlers (allow all)
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      // AI search crawlers — allowed for discovery and citation.
      // Content-Signal header (externally via Cloudflare) controls training use independently.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      // Google Extended — Gemini training only, does not affect search ranking
      { userAgent: "Google-Extended", disallow: "/" },
      // Catch-all
      { userAgent: "*", allow: "/" },
    ],
    sitemap: "https://www.trending-hot.com/sitemap.xml",
  };
}