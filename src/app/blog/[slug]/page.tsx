import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import {
  getArticleBySlug,
  getAllPublishedSlugs,
  getRelatedArticles,
  isPublished,
} from "@/lib/articles";
import { categoryColors } from "@/lib/articles/types";
import ArticleRenderer from "@/components/ArticleRenderer";

const isLocal = process.env.NODE_ENV !== "production";

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

  const related = getRelatedArticles(article);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    image: article.heroImage ? `${site.url}${article.heroImage}` : undefined,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/images/logo-atb-charpente.png` },
    },
    mainEntityOfPage: `${site.url}/blog/${article.slug}`,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* En-tête */}
      <header className="bg-anthracite-dark text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
          <nav className="mb-4 text-sm text-white/60">
            <Link href="/" className="hover:text-orange">Accueil</Link> /{" "}
            <Link href="/blog" className="hover:text-orange">Blog</Link> /{" "}
            <span className="text-white/90">{article.category}</span>
          </nav>
          {article.status === "draft" && (
            <span className="mb-3 inline-block rounded-full bg-orange px-3 py-1 text-xs font-semibold">
              Brouillon (visible en dev uniquement)
            </span>
          )}
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{article.title}</h1>
          <p className="mt-4 text-sm text-white/60">
            {article.author} · {article.readTime} ·{" "}
            {new Date(article.date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </header>

      {article.heroImage && (
        <div className="relative mx-auto -mt-8 aspect-video max-w-4xl overflow-hidden rounded-xl px-0">
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt ?? article.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 56rem"
          />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <ArticleRenderer blocks={article.content} />
      </div>

      {/* Maillage interne */}
      {related.length > 0 && (
        <aside className="border-t border-black/5 bg-muted">
          <div className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
            <h2 className="mb-6 text-xl font-bold text-anthracite">À lire aussi</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="rounded-lg border border-black/5 bg-white p-4 transition-shadow hover:shadow-md"
                >
                  <span
                    className={`mb-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${categoryColors[r.category]}`}
                  >
                    {r.category}
                  </span>
                  <p className="font-semibold text-anthracite">{r.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      )}
    </article>
  );
}
