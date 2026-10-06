import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import VueArticle from "@/components/VueArticle";
import { getArticleBySlug, isPublished } from "@/lib/articles";
import { apercuValide } from "@/lib/articles/apercu";

/**
 * `/blog/apercu/{slug}?sig=…` — aperçu d'un article programmé, pour la
 * relecture par le client depuis son espace Clickzou (onglet « Articles
 * programmés »). Voir `src/lib/articles/apercu.ts`.
 *
 * Jamais indexable, par quatre verrous qui se complètent :
 *   - lien signé : sans signature valide → 404, rien ne fuit, pas même le titre ;
 *   - balise robots noindex/nofollow ici ;
 *   - en-tête X-Robots-Tag et Referrer-Policy no-referrer (next.config.ts) ;
 *   - absent du sitemap, sans JSON-LD ni canonical.
 *
 * Seule page publique qui montre un article non publié : c'est son rôle. Les
 * brouillons (`status: "draft"`) restent exclus.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Aperçu d'article",
  alternates: { canonical: null },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default async function ApercuArticle({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sig?: string | string[] }>;
}) {
  const { slug } = await params;
  const { sig } = await searchParams;
  const article = getArticleBySlug(slug);
  if (!article || article.status === "draft" || !apercuValide(article.slug, typeof sig === "string" ? sig : undefined)) notFound();

  // Déjà en ligne : l'aperçu n'a plus lieu d'être, on renvoie vers la vraie page.
  if (isPublished(article)) redirect(`/blog/${article.slug}`);

  return <VueArticle article={article} apercu />;
}
