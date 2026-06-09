import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { site, services, routes } from "@/lib/site";
import { cities, cityBySlug } from "@/lib/zone-communes";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ ville: c.slug }));
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
      <section className="bg-anthracite-dark text-white">
        <div className="mx-auto max-w-4xl px-4 pb-16 pt-32 lg:px-8">
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

      <article className="mx-auto max-w-4xl px-4 py-14 lg:px-8">
        <p className="text-lg leading-relaxed text-foreground/85">
          Vous cherchez un <strong>charpentier couvreur à {city.name}</strong> ? ATB
          Charpente intervient à {city.name} et dans toute son agglomération, à environ{" "}
          {city.distToulouse} km de Toulouse, pour vos travaux de toiture neufs comme en
          rénovation. De la <strong>charpente bois</strong> à la{" "}
          <strong>couverture en tuiles</strong>, en passant par la zinguerie et
          l&apos;isolation, nous mettons 20 ans d&apos;expérience et un savoir-faire
          artisanal au service de votre toit.
        </p>

        {/* Prestations */}
        <h2 className="mt-12 text-2xl font-bold text-anthracite">
          Nos prestations à {city.name}
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/${s.slug}`}
                className="flex items-start gap-2.5 rounded-lg border border-black/5 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="mt-1 text-orange">→</span>
                <span>
                  <span className="font-semibold text-anthracite">{s.title}</span>
                  <span className="block text-sm text-foreground/70">{s.excerpt}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Pourquoi nous */}
        <h2 className="mt-12 text-2xl font-bold text-anthracite">
          Pourquoi choisir ATB Charpente à {city.name} ?
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            "20 ans d'expérience & plus de 130 chantiers réalisés",
            "Garantie décennale — artisan assuré et qualifié",
            "Un interlocuteur unique, de l'étude au chantier",
            "Devis gratuit, détaillé et sans engagement",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-foreground/85">
              <svg className="mt-0.5 shrink-0 text-orange" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Communes voisines (maillage) */}
        <h2 className="mt-12 text-2xl font-bold text-anthracite">
          Charpentier couvreur autour de {city.name}
        </h2>
        <p className="mt-3 text-foreground/80">
          Nous intervenons également dans les communes voisines de {city.name} :
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {city.neighbors.map((n) => (
            <Link
              key={n.slug}
              href={`/charpentier-couvreur/${n.slug}`}
              className="rounded-full border border-black/5 bg-muted px-4 py-2 text-sm text-anthracite transition-colors hover:bg-orange hover:text-white"
            >
              {n.name}
            </Link>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="mt-12 text-2xl font-bold text-anthracite">
          Questions fréquentes — {city.name}
        </h2>
        <div className="mt-5 space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="rounded-lg border border-black/5 bg-white p-4">
              <summary className="cursor-pointer font-semibold text-anthracite">
                {f.q}
              </summary>
              <p className="mt-2 text-foreground/80">{f.a}</p>
            </details>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-anthracite-dark p-8 text-center text-white">
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
