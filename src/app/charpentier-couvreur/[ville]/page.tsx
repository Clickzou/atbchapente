import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { site, services, routes } from "@/lib/site";
import { cities, cityBySlug, type City } from "@/lib/zone-communes";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ ville: c.slug }));
}

// Photo de la ville : générée par fal.ai dans public/images/villes/{slug}.webp.
// Tant qu'elle n'existe pas, on retombe sur une image charpente par défaut.
function heroFor(slug: string) {
  const abs = path.join(process.cwd(), "public", "images", "villes", `${slug}.webp`);
  return fs.existsSync(abs)
    ? `/images/villes/${slug}.webp`
    : "/images/realisations/creation-charpente.jpg";
}

// Phrase sur la commune, variée selon sa taille réelle (unicité factuelle).
function populationSentence(c: City) {
  if (!c.population) return "";
  const hab = c.population.toLocaleString("fr-FR");
  if (c.population >= 5000)
    return `Avec ses quelque ${hab} habitants, ${c.name} est une commune dynamique de l'agglomération.`;
  if (c.population >= 1500)
    return `Commune d'environ ${hab} habitants, ${c.name} fait partie de notre zone d'intervention privilégiée.`;
  return `Village d'environ ${hab} habitants, ${c.name} bénéficie de notre proximité et de notre réactivité.`;
}

// 5 variantes d'introduction, choisies de façon déterministe par commune,
// pour éviter des pages au texte identique (anti-doorway).
function buildIntro(c: City): string {
  const v = [...c.slug].reduce((a, ch) => a + ch.charCodeAt(0), 0) % 5;
  const here = c.epci ? `${c.name}, au sein de ${c.epci},` : `${c.name}`;
  const variants = [
    `Vous cherchez un charpentier couvreur à ${c.name} ? ATB Charpente intervient à ${c.name} (${c.cp}) et dans toute son agglomération, à environ ${c.distToulouse} km de Toulouse, pour vos travaux de charpente, couverture et zinguerie, du neuf à la rénovation.`,
    `Besoin d'un charpentier ou d'un couvreur à ${c.name} ? Installée à Bessières, à seulement ${c.distBessieres} km de ${c.name}, ATB Charpente met 20 ans d'expérience au service de votre toiture : charpente bois, couverture en tuiles, zinguerie et isolation.`,
    `À ${here} ATB Charpente réalise vos travaux de toiture sur mesure. ${populationSentence(c)} Nous intervenons aussi bien pour la création que pour la rénovation de votre charpente et de votre couverture.`,
    `Charpentier couvreur de proximité, ATB Charpente accompagne les habitants de ${c.name} (${c.cp}) dans tous leurs projets de toiture : charpente traditionnelle, ossature bois, remaniement de tuiles, gouttières zinc, fenêtres de toit et pergolas en bois.`,
    `Pour vos travaux de charpente et de couverture à ${c.name}, faites confiance à un artisan local. À ${c.distToulouse} km de Toulouse, ATB Charpente conjugue savoir-faire traditionnel et garantie décennale pour un toit solide et durable.`,
  ];
  return variants[v];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ville: string }>;
}): Promise<Metadata> {
  const { ville } = await params;
  const city = cityBySlug.get(ville);
  if (!city) return {};
  return {
    title: `Charpentier couvreur à ${city.name} (${city.cp}) | ATB Charpente`,
    description: `Charpentier couvreur à ${city.name} : charpente, couverture, zinguerie, isolation de toiture et pergola. Artisan, garantie décennale, devis gratuit. Intervention rapide à ${city.name} et alentours.`,
    alternates: { canonical: `/charpentier-couvreur/${city.slug}` },
    // Anti-doorway : seules les villes à vraie demande sont indexées ; la longue
    // traîne reste crawlable (follow) mais hors index.
    robots: city.indexed ? undefined : { index: false, follow: true },
  };
}

export default async function VillePage({
  params,
}: {
  params: Promise<{ ville: string }>;
}) {
  const { ville } = await params;
  const city = cityBySlug.get(ville);
  if (!city) notFound();

  const faq = [
    {
      q: `ATB Charpente intervient-elle à ${city.name} ?`,
      a: `Oui. ${city.name} (${city.cp}) fait partie de notre zone d'intervention, à environ ${city.distBessieres} km de notre atelier de Bessières et ${city.distToulouse} km de Toulouse. Nous nous y déplaçons pour tous vos travaux de charpente, couverture et zinguerie.`,
    },
    {
      q: `Quels travaux de toiture réalisez-vous à ${city.name} ?`,
      a: `Création et rénovation de charpente bois, couverture et remaniement de tuiles, pose et changement de gouttières zinc, isolation de toiture, pose de fenêtres de toit et création de pergolas en bois.`,
    },
    {
      q: `Comment obtenir un devis pour des travaux à ${city.name} ?`,
      a: `Contactez-nous par téléphone au ${site.contact.phone} ou via le formulaire en ligne. Le devis est gratuit, détaillé et sans engagement.`,
    },
    {
      q: `Faut-il une autorisation pour refaire sa toiture à ${city.name} ?`,
      a: `La réfection à l'identique ne nécessite en général qu'une déclaration préalable de travaux en mairie de ${city.name}. Nous vous conseillons sur les démarches selon votre projet.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RoofingContractor",
        name: `${site.name} — Charpentier couvreur à ${city.name}`,
        description: `Charpentier couvreur à ${city.name} : charpente, couverture, zinguerie, isolation de toiture.`,
        telephone: site.contact.phone,
        areaServed: { "@type": "City", name: city.name },
        address: {
          "@type": "PostalAddress",
          addressLocality: site.contact.addressLocality,
          postalCode: site.contact.postalCode,
          addressCountry: "FR",
        },
        url: `${site.url}/charpentier-couvreur/${city.slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: `Charpentier couvreur à ${city.name}`,
            item: `${site.url}/charpentier-couvreur/${city.slug}`,
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

      {/* En-tête */}
      <section className="relative overflow-hidden bg-anthracite-dark text-white">
        <Image
          src={heroFor(city.slug)}
          alt={`Charpentier couvreur à ${city.name}`}
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-32 lg:px-8">
          <nav className="mb-4 text-sm text-white/60">
            <Link href="/" className="hover:text-orange">Accueil</Link> /{" "}
            <span className="text-white/90">Charpentier couvreur à {city.name}</span>
          </nav>
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Charpentier couvreur à {city.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Charpente, couverture, zinguerie et isolation de toiture à {city.name} (
            {city.cp}). Artisan, garantie décennale, devis gratuit.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-5xl px-4 py-14 lg:px-8">
        <p className="text-lg leading-relaxed text-foreground/85">{buildIntro(city)}</p>

        {/* Infos clés — cartes mettant en valeur les données réelles */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            city.population && {
              icon: (
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 .01M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              ),
              value: city.population.toLocaleString("fr-FR"),
              label: "habitants",
            },
            {
              icon: <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11zM12 10a1 1 0 1 0 0 .01" />,
              value: `${city.distToulouse} km`,
              label: "de Toulouse",
            },
            {
              icon: <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />,
              value: `${city.distBessieres} km`,
              label: "de notre atelier",
            },
            {
              icon: (
                <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3zM9 12l2 2 4-4" />
              ),
              value: "Décennale",
              label: "artisan assuré",
            },
          ]
            .filter(Boolean)
            .map((f, i) => {
              const card = f as { icon: React.ReactNode; value: string; label: string };
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-black/5 bg-white p-5 text-center shadow-sm"
                >
                  <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-orange/10 text-orange">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {card.icon}
                    </svg>
                  </span>
                  <p className="text-lg font-bold text-anthracite">{card.value}</p>
                  <p className="text-xs text-foreground/60">{card.label}</p>
                </div>
              );
            })}
        </div>

        {/* Prestations — cartes */}
        <h2 className="mt-14 text-2xl font-bold text-anthracite">
          Nos prestations à {city.name}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="group flex flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11l9-8 9 8M5 9.5V21h14V9.5" />
                </svg>
              </span>
              <h3 className="font-semibold text-anthracite group-hover:text-orange">
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-foreground/70">{s.excerpt}</p>
              <span className="mt-4 text-sm font-semibold text-orange">En savoir plus →</span>
            </Link>
          ))}
        </div>

        {/* À propos — panneau */}
        <div className="mt-14 rounded-2xl bg-muted p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-anthracite">
            Votre charpentier couvreur de proximité à {city.name}
          </h2>
          <p className="mt-4 text-foreground/80">
            {city.name} ({city.cp})
            {city.population
              ? ` compte environ ${city.population.toLocaleString("fr-FR")} habitants`
              : ""}
            {city.epci ? ` et fait partie de ${city.epci}` : ""}, dans le département de{" "}
            {city.departement || "la Haute-Garonne"}. Située à environ {city.distToulouse}{" "}
            km de Toulouse et {city.distBessieres} km de notre atelier de Bessières, la
            commune bénéficie d&apos;une intervention rapide d&apos;ATB Charpente pour la
            création comme la rénovation de votre toiture : charpente bois, couverture en
            tuiles, zinguerie et isolation.
          </p>
        </div>

        {/* Pourquoi nous — cartes */}
        <h2 className="mt-14 text-2xl font-bold text-anthracite">
          Pourquoi choisir ATB Charpente à {city.name} ?
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {[
            { t: "20 ans d'expérience", d: "Plus de 130 chantiers réalisés autour de Toulouse." },
            { t: "Garantie décennale", d: "Artisan assuré et qualifié, travaux garantis." },
            { t: "Interlocuteur unique", d: "Un seul contact, de l'étude au chantier." },
            { t: "Devis gratuit", d: "Détaillé et sans engagement, sous 24/48h." },
          ].map((item) => (
            <div
              key={item.t}
              className="flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p className="font-semibold text-anthracite">{item.t}</p>
                <p className="mt-1 text-sm text-foreground/70">{item.d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Communes voisines — cartes (maillage) */}
        <h2 className="mt-14 text-2xl font-bold text-anthracite">
          Charpentier couvreur autour de {city.name}
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {city.neighbors.map((n) => (
            <Link
              key={n.slug}
              href={`/charpentier-couvreur/${n.slug}`}
              className="group flex items-center gap-3 rounded-xl border border-black/5 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11zM12 10a1 1 0 1 0 0 .01" />
                </svg>
              </span>
              <span className="text-sm font-medium text-anthracite group-hover:text-orange">
                Charpentier à {n.name}
              </span>
            </Link>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="mt-14 text-2xl font-bold text-anthracite">
          Questions fréquentes — {city.name}
        </h2>
        <div className="mt-6 space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer font-semibold text-anthracite">
                {f.q}
              </summary>
              <p className="mt-3 text-foreground/80">{f.a}</p>
            </details>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 overflow-hidden rounded-2xl bg-anthracite-dark p-8 text-center text-white sm:p-10">
          <h2 className="text-2xl font-bold">Un projet de toiture à {city.name} ?</h2>
          <p className="mt-2 text-white/70">
            Contactez ATB Charpente pour un devis gratuit et sans engagement.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href={routes.contact}
              className="rounded-full bg-orange px-7 py-3.5 font-semibold text-white transition-colors hover:bg-orange-dark"
            >
              Demander un devis
            </Link>
            <a
              href={site.contact.phoneHref}
              className="rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white hover:bg-white/10"
            >
              {site.contact.phone}
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
