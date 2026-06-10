import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { site, routes } from "@/lib/site";
import {
  getArticleBySlug,
  getAllPublishedSlugs,
  getRelatedArticles,
  isPublished,
} from "@/lib/articles";
import { serviceForArticle } from "@/lib/articles/service-links";
import { categoryColors } from "@/lib/articles/types";
import ArticleRenderer from "@/components/ArticleRenderer";
import IconsBackground from "@/components/IconsBackground";
import GoogleReviewBadge from "@/components/GoogleReviewBadge";

const isLocal = process.env.NODE_ENV !== "production";

// Repli si un article n'a pas d'image d'en-tête (générable ensuite via fal.ai).
const DEFAULT_HERO = "/images/realisations/creation-charpente.jpg";

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
  const service = serviceForArticle(article);
  const hero = article.heroImage ?? DEFAULT_HERO;
  const dateStr = new Date(article.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}${routes.blog}` },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: `${site.url}/blog/${article.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* HERO landing — identique aux pages villes (plein écran + réassurance) */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-anthracite-dark text-white">
        <Image src={hero} alt={article.heroImageAlt ?? article.title} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-anthracite-dark/90 via-anthracite-dark/55 to-anthracite-dark/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-28 lg:px-8">
          <nav className="mb-4 text-sm text-white/60">
            <Link href="/" className="hover:text-orange">Accueil</Link> /{" "}
            <Link href={routes.blog} className="hover:text-orange">Blog</Link> /{" "}
            <span className="text-white/90">{article.category}</span>
          </nav>
          {article.status === "draft" && (
            <span className="mb-3 inline-block rounded-full bg-orange px-3 py-1 text-xs font-semibold">
              Brouillon (visible en dev uniquement)
            </span>
          )}
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange">
            {article.category}
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">{article.excerpt}</p>
          <p className="mt-3 text-sm text-white/60">
            {article.author} · {article.readTime} · {dateStr}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={routes.contact}
              className="rounded-full bg-orange px-7 py-3.5 font-semibold text-white transition-colors hover:bg-orange-dark"
            >
              Demander un devis gratuit
            </Link>
            <a
              href={site.contact.phoneHref}
              className="rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              {site.contact.phone}
            </a>
          </div>

          {/* Réassurance */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <div>
              <p className="text-3xl font-bold text-orange">20<span className="text-xl"> ans</span></p>
              <p className="text-sm text-white/70">d&apos;expérience</p>
            </div>
            <span className="h-10 w-px bg-white/20" aria-hidden />
            <div>
              <p className="text-3xl font-bold text-orange">130<span className="text-xl">+</span></p>
              <p className="text-sm text-white/70">chantiers réalisés</p>
            </div>
            <span className="hidden h-10 w-px bg-white/20 sm:block" aria-hidden />
            <div className="flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15 backdrop-blur">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange">
                <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm font-semibold text-white">Garantie décennale</span>
            </div>
            <GoogleReviewBadge />
          </div>
        </div>
      </section>

      {/* Contenu de l'article, sur fond d'icônes métier animé (comme section 1 villes) */}
      <section className="relative overflow-hidden">
        <IconsBackground tone="dark" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 lg:px-8">
          <ArticleRenderer blocks={article.content} />
        </div>
      </section>

      {/* Maillage descendant — prestation liée + pilier Toulouse */}
      {service && (
        <section className="bg-muted">
          <div className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
            <div className="flex flex-col items-start gap-5 rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-orange">
                  Notre prestation
                </p>
                <p className="mt-1 text-lg font-semibold text-anthracite">
                  {service.heading}
                </p>
                <p className="mt-1 text-sm text-foreground/70">{service.excerpt}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  href={`/${service.slug}`}
                  className="rounded-full bg-orange px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-dark"
                >
                  Découvrir la prestation
                </Link>
                <Link
                  href={routes.cornerstone}
                  className="rounded-full border border-black/10 px-6 py-3 font-semibold text-anthracite transition-colors hover:border-orange hover:text-orange"
                >
                  Charpentier à Toulouse
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Maillage interne — à lire aussi */}
      {related.length > 0 && (
        <section>
          <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold text-anthracite">À lire aussi</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  {r.heroImage && (
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={r.heroImage}
                        alt={r.heroImageAlt ?? r.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <span
                      className={`mb-2 inline-block w-fit rounded-full px-2 py-0.5 text-xs font-medium ${categoryColors[r.category]}`}
                    >
                      {r.category}
                    </span>
                    <p className="font-semibold text-anthracite group-hover:text-orange">
                      {r.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
