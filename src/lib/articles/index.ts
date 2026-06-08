import type { BlogArticle } from "./types";
import { charpenteArticles } from "./charpente";

// Registre central des articles. Chaque fichier de catégorie exporte un tableau
// d'articles ; on les agrège ici. Le cron d'auto-publication ajoute de nouveaux
// fichiers/entrées puis commit (cf. ATB_SEO_MASTER.md).
export const allArticles: BlogArticle[] = [
  ...charpenteArticles,
  // ...couvertureArticles, ...isolationArticles, etc. (ajoutés au fil de l'eau)
];

const articleMap = new Map(allArticles.map((a) => [a.slug, a]));

// En dev, on affiche aussi les drafts et les articles programmés (prévisualisation).
const isLocal = process.env.NODE_ENV !== "production";

/** Article visible en production (publié, ou programmé dont la date est passée). */
export function isPublished(article: BlogArticle): boolean {
  if (!article.status || article.status === "published") return true;
  if (article.status === "scheduled" && article.publishDate) {
    return new Date(article.publishDate) <= new Date();
  }
  return false;
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
