import type { Metadata } from "next";
import { getArticlesSorted } from "@/lib/articles";
import BlogList, { type BlogCard } from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Blog — Conseils charpente, couverture & toiture",
  description:
    "Conseils, guides et actualités d'ATB Charpente sur la charpente, la couverture, la zinguerie et la rénovation de toiture à Toulouse.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  // DTO allégé (sans le contenu) pour le composant client de listing/filtre.
  const articles: BlogCard[] = getArticlesSorted().map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    readTime: a.readTime,
    heroImage: a.heroImage,
    heroImageAlt: a.heroImageAlt,
  }));

  return (
    <>
      <section className="bg-anthracite-dark text-white">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Blog</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Conseils, guides et actualités autour de la charpente, de la couverture
            et de la toiture à Toulouse et ses environs.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
        <BlogList articles={articles} />
      </section>
    </>
  );
}
