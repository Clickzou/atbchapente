import type { BlogArticle } from "./types";
import { charpenteArticles } from "./charpente";
import { posts } from "./posts";
import { appliquerCorrections } from "./edition-client";

// Registre central des articles. On agrège l'article-template (`charpente.ts`)
// et tous les posts du dossier `posts/` (1 fichier par article). Le cron
// d'auto-publication dépose un nouveau fichier dans `posts/` (cf. ATB_SEO_MASTER.md).
// Les corrections du client (relecture depuis l'espace client Clickzou,
// `corrections-client.json`) sont appliquées ici, une fois : tout le site lit
// donc le texte relu.
export const allArticles: BlogArticle[] = [...charpenteArticles, ...posts].map(appliquerCorrections);

const articleMap = new Map(allArticles.map((a) => [a.slug, a]));

// En dev, on affiche aussi les drafts et les articles programmés (prévisualisation).
const isLocal = process.env.NODE_ENV !== "production";

/**
 * La date du jour à Paris, en AAAA-MM-JJ. Pas `toISOString()` (date UTC) : entre
 * minuit et 2 h à Paris, un article daté du jour paraîtrait avec du retard.
 */
export function aujourdhuiParis(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** Date de parution d'un article (AAAA-MM-JJ) : `publishDate` s'il existe, sinon `date`. */
export function dateDeParution(article: BlogArticle): string {
  return (article.publishDate ?? article.date).slice(0, 10);
}

/**
 * Article visible en production : pas brouillon, et date de parution atteinte
 * à Paris. Publication programmée (demande de JC, 6 octobre 2026) : un article
 * rédigé à l'avance porte sa date future et reste invisible — blog, sitemap,
 * maillage, page article en 404 — jusqu'à ce jour-là. Il n'est lisible avant
 * que par l'aperçu signé (`/blog/apercu/<slug>`).
 */
export function isPublished(article: BlogArticle): boolean {
  if (article.status === "draft") return false;
  return dateDeParution(article) <= aujourdhuiParis();
}

/** Articles rédigés et datés dans le futur (prochain à paraître en premier). */
export function getArticlesProgrammes(): BlogArticle[] {
  return allArticles
    .filter((a) => a.status !== "draft" && !isPublished(a))
    .sort((a, b) => dateDeParution(a).localeCompare(dateDeParution(b)));
}

/** Visible en dev local : publiés + drafts + programmés. */
function isVisibleLocally(article: BlogArticle): boolean {
  return isPublished(article) || isLocal;
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articleMap.get(slug);
}

export function getRelatedArticles(article: BlogArticle): BlogArticle[] {
  return article.relatedSlugs
    .map((s) => articleMap.get(s))
    .filter((a): a is BlogArticle => !!a && isPublished(a));
}

/** Articles triés par date décroissante — prod : publiés ; local : tous. */
export function getArticlesSorted(): BlogArticle[] {
  return [...allArticles]
    .filter(isLocal ? isVisibleLocally : isPublished)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Slugs publiés (pour generateStaticParams — exclut drafts et programmés futurs). */
export function getAllPublishedSlugs(): string[] {
  return allArticles.filter(isPublished).map((a) => a.slug);
}

/** Tous les slugs visibles en dev (inclut drafts). */
export function getAllLocalSlugs(): string[] {
  return allArticles.map((a) => a.slug);
}
