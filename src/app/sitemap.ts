import type { MetadataRoute } from "next";
import { services, site, routes } from "@/lib/site";
import { getArticlesSorted } from "@/lib/articles";
import { indexedCities } from "@/lib/zone-communes";

export default function sitemap(): MetadataRoute.Sitemap {
  // Date de génération (build) utilisée comme `lastModified` pour les pages
  // sans date de contenu propre — aide les moteurs à planifier le crawl.
  const now = new Date();

  const staticPages = [
    "",
    routes.cornerstone,
    routes.realisations,
    routes.blog,
    routes.contact,
  ].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    // Cornerstone = cible SEO principale : priorité élevée (juste après l'accueil).
    priority: p === "" ? 1 : p === routes.cornerstone ? 0.9 : 0.8,
  }));

  const servicePages = services.map((s) => ({
    url: `${site.url}/${s.slug}`,
    lastModified: now,
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

  const cityPages = indexedCities.map((c) => ({
    url: `${site.url}/charpentier-couvreur/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...servicePages, ...articlePages, ...cityPages];
}
