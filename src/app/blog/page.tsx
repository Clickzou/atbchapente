import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getArticlesSorted } from "@/lib/articles";
import { categoryColors } from "@/lib/articles/types";

export const metadata: Metadata = {
  title: "Blog — Conseils charpente, couverture & toiture",
  description:
    "Conseils, guides et actualités d'ATB Charpente sur la charpente, la couverture, la zinguerie et la rénovation de toiture à Toulouse.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const articles = getArticlesSorted();

  return (
    <>
      <section className="bg-anthracite-dark text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Blog</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Conseils, guides et actualités autour de la charpente, de la couverture
            et de la toiture à Toulouse et ses environs.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
        {articles.length === 0 ? (
          <p className="rounded-lg border border-orange/30 bg-orange/5 p-6 text-center text-foreground/70">
            Les premiers articles arrivent très prochainement.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                {a.heroImage && (
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={a.heroImage}
                      alt={a.heroImageAlt ?? a.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <span
                    className={`mb-2 inline-block w-fit rounded-full px-2 py-0.5 text-xs font-medium ${categoryColors[a.category]}`}
                  >
                    {a.category}
                  </span>
                  <h2 className="font-semibold text-anthracite group-hover:text-orange">
                    {a.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-foreground/70">{a.excerpt}</p>
                  <span className="mt-3 text-xs text-foreground/50">{a.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
