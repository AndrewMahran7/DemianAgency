import type { MetadataRoute } from "next";
import { absoluteUrl, publicRoutes, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];

  return publicRoutes.map((path) => ({
    url: absoluteUrl(path)!,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/insurance") ? 0.8 : 0.6,
  }));
}
