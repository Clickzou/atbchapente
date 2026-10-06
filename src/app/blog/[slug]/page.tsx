import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getArticleBySlug, getAllPublishedSlugs, isPublished } from "@/lib/articles";
import VueArticle from "@/components/VueArticle";

const isLocal = process.env.NODE_ENV !== "production";

// Publication programmée : un article daté dans le futur répond 404 jusqu'à sa
// date ; les pages se régénèrent au plus toutes les heures, il paraît donc à sa
// date sans redéploiement (le robot de publication redéploie aussi ce jour-là).
export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return getAllPublishedSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const url = `${site.url}/blog/${article.slug}`;
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: `/blog/${article.slug}` },
    robots: article.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      locale: "fr_FR",
      url,
      title: article.metaTitle,
      description: article.metaDescription,
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      images: article.heroImage ? [{ url: article.heroImage }] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || (!isPublished(article) && !isLocal)) notFound();

  return <VueArticle article={article} />;
}
