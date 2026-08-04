import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/signals": ["./data/signals.json", "./data/articles/**/*.json"],
    "/signal/[slug]": ["./data/articles/**/*.json", "./data/signals.json"],
    "/api/articles/[slug]": ["./data/articles/**/*.json"],
    "/api/trend-analysis/[slug]": ["./data/trend-analysis/**/*.json"],
  },
  async redirects() {
    return [
      // Domain canonicalization: non-www -> www
      {
        source: "/:path*",
        has: [{ type: "host", value: "trending-hot.com" }],
        destination: "https://www.trending-hot.com/:path*",
        permanent: true,
      },
      // /trends/:slug -> /:slug-trends (12 micro-trend articles)
      {
        source: "/trends/:slug",
        destination: "/:slug-trends",
        permanent: true,
      },
      // /stats/:slug -> /:slug-statistics (3 statistics pages)
      {
        source: "/stats/:slug",
        destination: "/:slug-statistics",
        permanent: true,
      },
      // /countries/:slug -> /most-visited-websites-in-:slug (20 country pages)
      {
        source: "/countries/:slug",
        destination: "/most-visited-websites-in-:slug",
        permanent: true,
      },
      // /companies/:slug -> direct page (company ranking pages)
      {
        source: "/companies/fastest-growing-ai-startups",
        destination: "/fastest-growing-ai-startups",
        permanent: true,
      },
      {
        source: "/companies/top-fintech-startups",
        destination: "/top-fintech-startups",
        permanent: true,
      },
      // /tools/:slug -> direct page (tool comparison pages)
      {
        source: "/tools/best-ai-writing-tools-for-students",
        destination: "/best-ai-writing-tools-for-students",
        permanent: true,
      },
      {
        source: "/tools/best-ai-tools-for-content-creation",
        destination: "/best-ai-tools-for-content-creation",
        permanent: true,
      },
      // /trends/:slug for listing pages that use "trending-" prefix
      {
        source: "/trends/beauty-products",
        destination: "/trending-beauty-products",
        permanent: true,
      },
      {
        source: "/trends/pet-products",
        destination: "/trending-pet-products",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;