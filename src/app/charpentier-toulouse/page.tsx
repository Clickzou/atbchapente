import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { site, routes, services } from "@/lib/site";
import { indexedCities } from "@/lib/zone-communes";
import { content, faq } from "@/lib/cornerstone-toulouse";
import ArticleRenderer from "@/components/ArticleRenderer";
import GoogleReviewBadge from "@/components/GoogleReviewBadge";

export const metadata: Metadata = {
  title: "Charpentier Toulouse – Charpente, couverture & zinguerie | ATB Charpente",
  description:
    "Charpentier couvreur à Toulouse : création et rénovation de charpente bois, couverture, zinguerie et isolation de toiture. Artisan, garantie décennale, devis gratuit.",
  alternates: { canonical: routes.cornerstone },
};

const HERO = "/images/realisations/IMG-20250403-WA0010.jpg";

export default function CharpentierToulousePage() {
  // Maillage descendant : meilleures villes (par population) vers la cornerstone.
  const topCities = [...indexedCities]
    .sort((a, b) => (b.population || 0) - (a.population || 0))
    .slice(0, 18);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RoofingContractor",
        name: `${site.name} — Charpentier couvreur à Toulouse`,
        description:
          "Charpentier couvreur à Toulouse : charpente bois, couverture, zinguerie et isolation de toiture.",
        telephone: site.contact.phone,
        areaServed: { "@type": "City", name: "Toulouse" },
        address: {
          "@type": "PostalAddress",
          addressLocality: site.contact.addressLocality,
          postalCode: site.contact.postalCode,
          addressCountry: "FR",
        },
        url: `${site.url}${routes.cornerstone}`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          reviewCount: "1",
        },
      },
      {
        "@type": "Article",
        headline: "Charpentier Toulouse : charpente, couverture & zinguerie",
        about: "Charpentier couvreur à Toulouse",
        author: { "@type": "Organization", name: site.name },
        publisher: { "@type": "Organization", name: site.name },
        mainEntityOfPage: `${site.url}${routes.cornerstone}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Charpentier Toulouse",
            item: `${site.url}${routes.cornerstone}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO landing */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-anthracite-dark text-white">
        <Image src={HERO} alt="Charpentier couvreur à Toulouse" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-anthracite-dark/90 via-anthracite-dark/55 to-anthracite-dark/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-28 lg:px-8">
          <nav className="mb-4 text-sm text-white/60">
            <Link href="/" className="hover:text-orange">Accueil</Link> /{" "}
            <span className="text-white/90">Charpentier Toulouse</span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange">
            Artisan charpentier-couvreur · Haute-Garonne
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Charpentier couvreur à Toulouse
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Création et rénovation de charpente bois, couverture en tuiles, zinguerie
            zinc et isolation de toiture à Toulouse et dans toute la métropole.
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

      {/* Contenu cornerstone */}
      <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <ArticleRenderer blocks={content} />
      </section>

      {/* Maillage descendant — 6 services */}
      <section className="bg-muted">
        <div className="mx-auto max-w-[1600px] px-4 py-16 lg:px-12">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-anthracite">
              Nos prestations à Toulouse
            </h2>
            <p className="mt-3 text-foreground/70">
              Un seul interlocuteur pour l&apos;ensemble de votre toiture, de la
              charpente aux finitions.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={`/images/services/${s.slug}.jpg`}
                    alt={`${s.title} à Toulouse`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-anthracite group-hover:text-orange">
                    {s.heading}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-foreground/70">{s.excerpt}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-orange">
                    En savoir plus →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Maillage descendant — meilleures villes */}
      <section>
        <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
          <h2 className="text-3xl font-bold text-anthracite">
            Charpentier couvreur autour de Toulouse
          </h2>
          <p className="mt-3 max-w-2xl text-foreground/70">
            Basés à Bessières, nous intervenons dans toute la métropole toulousaine et
            sa périphérie. Découvrez nos pages dédiées par commune :
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topCities.map((c) => (
              <Link
                key={c.slug}
                href={`/charpentier-couvreur/${c.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-black/5 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11zM12 10a1 1 0 1 0 0 .01" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-anthracite group-hover:text-orange">
                  Charpentier à {c.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
          <h2 className="text-3xl font-bold text-anthracite">
            Questions fréquentes — Charpentier Toulouse
          </h2>
          <div className="mt-6 space-y-3">
            {faq.map((f) => (
              <details key={f.question} className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer font-semibold text-anthracite">
                  {f.question}
                </summary>
                <p className="mt-3 text-foreground/80">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden bg-anthracite-dark text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Un projet de charpente ou de toiture à Toulouse ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Parlons-en. Visite et devis gratuits, sans engagement, partout sur la
            métropole toulousaine.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
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
        </div>
      </section>
    </>
  );
}
