import type { MetadataRoute } from "next";
import { services, site, routes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", routes.realisations, routes.blog, routes.contact];
  const servicePages = services.map((s) => `/${s.slug}`);

  return [...staticPages, ...servicePages].map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.8,
  }));
}
