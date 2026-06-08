import type { MetadataRoute } from "next";
import { services, site, routes } from "@/lib/site";
import { getArticlesSorted } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", routes.realisations, routes.blog, routes.contact].map(
    (p) => ({
      url: `${site.url}${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
    }),
  );

  const servicePages = services.map((s) => ({
    url: `${site.url}/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Articles publiés uniquement (exclut drafts et programmés futurs).
  const articlePages = getArticlesSorted()
    .filter((a) => !a.noindex)
    .map((a) => ({
      url: `${site.url}/blog/${a.slug}`,
      lastModified: a.updated ?? a.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticPages, ...servicePages, ...articlePages];
}
