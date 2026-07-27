import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://trending-hot.vercel.app", lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: "https://trending-hot.vercel.app/about", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
