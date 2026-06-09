"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { categoryColors, type BlogCategory } from "@/lib/articles/types";

// Élément allégé d'article (pas de contenu) pour le listing + filtre catégorie.
export type BlogCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readTime: string;
  heroImage?: string;
  heroImageAlt?: string;
};

const ALL = "Toutes";

export default function BlogList({ articles }: { articles: BlogCard[] }) {
  const [active, setActive] = useState<string>(ALL);

  // Catégories réellement présentes (avec compteur), pour ne pas afficher de
  // filtre vide. Ordre = ordre d'apparition des articles (déjà triés par date).
  const categories = useMemo(() => {
    const counts = new Map<BlogCategory, number>();
    for (const a of articles) counts.set(a.category, (counts.get(a.category) ?? 0) + 1);
    return [...counts.entries()].map(([name, count]) => ({ name, count }));
  }, [articles]);

  const filtered = useMemo(
    () => (active === ALL ? articles : articles.filter((a) => a.category === active)),
    [articles, active],
  );

  if (articles.length === 0) {
    return (
      <p className="rounded-lg border border-orange/30 bg-orange/5 p-6 text-center text-foreground/70">
        Les premiers articles arrivent très prochainement.
      </p>
    );
  }

  const chip = (name: string, count: number, isActive: boolean) => (
    <button
      key={name}
      type="button"
      onClick={() => setActive(name)}
      aria-pressed={isActive}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
        isActive
          ? "border-orange bg-orange text-white"
          : "border-black/10 bg-white text-anthracite hover:border-orange/50 hover:text-orange"
      }`}
    >
      {name}
      <span className={`ml-1.5 ${isActive ? "text-white/70" : "text-foreground/40"}`}>
        {count}
      </span>
    </button>
  );

  return (
    <>
      {/* Filtres par catégorie */}
      <div className="mb-10 flex flex-wrap gap-2.5">
        {chip(ALL, articles.length, active === ALL)}
        {categories.map((c) => chip(c.name, c.count, active === c.name))}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
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
    </>
  );
}
