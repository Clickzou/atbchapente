import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conseils et actualités d'ATB Charpente sur la charpente, la couverture et la rénovation de toiture.",
  alternates: { canonical: "/blog" },
};

// Les articles seront importés depuis l'export WordPress (.wpress).
// Structure cible : src/content/blog/*.mdx ou data, avec routes /blog/[slug].
const articles: { slug: string; title: string; date: string; excerpt: string }[] = [];

export default function BlogPage() {
  return (
    <>
      <section className="bg-anthracite-dark text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Blog</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Conseils, guides et actualités autour de la charpente et de la toiture.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
        {articles.length === 0 ? (
          <p className="rounded-lg border border-orange/30 bg-orange/5 p-6 text-center text-foreground/70">
            ⚙️ Les articles seront importés depuis l&apos;export WordPress, en
            conservant les URLs existantes (redirections 301) pour préserver le
            référencement.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {/* mappé une fois le contenu importé */}
          </div>
        )}
      </section>
    </>
  );
}
