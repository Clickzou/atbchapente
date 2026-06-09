import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { site, routes } from "@/lib/site";
import { cities, cityBySlug, type City } from "@/lib/zone-communes";
import { cityContent } from "@/lib/city-content";
import ServicesCarousel from "@/components/ServicesCarousel";
import ContactForm from "@/components/ContactForm";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ ville: c.slug }));
}

// Photo d'en-tête : image dédiée à la ville si elle existe
// (public/images/villes/{slug}.webp), sinon une photo du pool de chantiers
// (fal.ai) assignée de façon déterministe, sinon un repli par défaut.
const POOL_SIZE = 16;
function heroFor(slug: string) {
  const ville = path.join(process.cwd(), "public", "images", "villes", `${slug}.webp`);
  if (fs.existsSync(ville)) return `/images/villes/${slug}.webp`;
  const idx = [...slug].reduce((a, ch) => a + ch.charCodeAt(0), 0) % POOL_SIZE;
  const n = String(idx + 1).padStart(2, "0");
  const pool = path.join(process.cwd(), "public", "images", "chantiers", `${n}.jpg`);
  if (fs.existsSync(pool)) return `/images/chantiers/${n}.jpg`;
  return "/images/realisations/creation-charpente.jpg";
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

// Court sous-titre unique (varié par commune) pour la section prestations.
function prestaSubtitle(c: City): string {
  const v = [...c.slug].reduce((a, ch) => a + ch.charCodeAt(0), 0) % 5;
  return [
    `Tous vos travaux de toiture à ${c.name}, réalisés par un artisan local et qualifié.`,
    `De la charpente à la couverture, ATB Charpente couvre l'ensemble de vos besoins à ${c.name}.`,
    `Charpente, couverture, zinguerie et isolation : un interlocuteur unique à ${c.name}.`,
    `Un savoir-faire complet et sur mesure au service des toitures de ${c.name}.`,
    `Création comme rénovation : votre toiture entre de bonnes mains à ${c.name}.`,
  ][v];
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
      a: `La réfection à l'identique ne nécessite en général qu'une déclaration préalable de travaux en mairie de ${city.name}. Pour une surélévation ou une modification de l'aspect (matériau, couleur des tuiles), des règles d'urbanisme locales (PLU) peuvent s'appliquer : nous vous conseillons sur les démarches selon votre projet.`,
    },
    {
      q: `Quel est le prix d'une charpente ou d'une réfection de toiture à ${city.name} ?`,
      a: `Le tarif dépend de la surface, de la pente, de l'état de l'existant, du type de tuiles et de l'accès au chantier. À ${city.name}, chaque devis est établi sur mesure après une visite gratuite, pour un prix juste et sans surprise.`,
    },
    {
      q: `Intervenez-vous en urgence à ${city.name} (fuite, tempête) ?`,
      a: `Oui. Après un coup de vent, une tempête ou en cas de fuite à ${city.name}, nous intervenons rapidement pour une mise hors d'eau et la réparation de votre toiture. Contactez-nous au ${site.contact.phone}.`,
    },
    {
      q: `À quelle fréquence entretenir sa toiture à ${city.name} ?`,
      a: `Un contrôle tous les ans et un démoussage tous les 5 à 10 ans prolongent nettement la durée de vie de votre couverture. Le climat de la région toulousaine (fortes chaleurs, orages) favorise mousses et déplacements de tuiles : un entretien régulier évite les infiltrations.`,
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

      {/* HERO landing — plein écran, comme la home, avec réassurance */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-anthracite-dark text-white">
        <Image
          src={heroFor(city.slug)}
          alt={`Charpentier couvreur à ${city.name}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-anthracite-dark/90 via-anthracite-dark/55 to-anthracite-dark/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-28 lg:px-8">
          <nav className="mb-4 text-sm text-white/60">
            <Link href="/" className="hover:text-orange">Accueil</Link> /{" "}
            <span className="text-white/90">Charpentier couvreur à {city.name}</span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange">
            Charpentier couvreur · {city.cp}
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Charpentier couvreur à {city.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Charpente, couverture, zinguerie et isolation de toiture à {city.name}. Artisan
            de proximité, garantie décennale, devis gratuit et intervention rapide.
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
              <p className="text-3xl font-bold text-orange">
                20<span className="text-xl"> ans</span>
              </p>
              <p className="text-sm text-white/70">d&apos;expérience</p>
            </div>
            <span className="h-10 w-px bg-white/20" aria-hidden />
            <div>
              <p className="text-3xl font-bold text-orange">
                130<span className="text-xl">+</span>
              </p>
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
          </div>
        </div>
      </section>

      {/* Section 1 : texte à gauche, stats à droite — pleine largeur avec marges */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:items-stretch lg:gap-14">
          <div>
            {cityContent[city.slug] ? (
              <div className="space-y-4 text-lg leading-relaxed text-foreground/85">
                {cityContent[city.slug].map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : (
              <p className="text-lg leading-relaxed text-foreground/85">{buildIntro(city)}</p>
            )}
          </div>

          {/* Stats — cartes données réelles (remplissent la hauteur du texte) */}
          <div className="grid grid-cols-2 gap-4 lg:h-full lg:grid-rows-2">
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
                    className="flex h-full flex-col items-center justify-center rounded-2xl border border-black/5 bg-white p-5 text-center shadow-sm"
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
        </div>
      </section>

      {/* Section 2 — Nos prestations (carrousel pleine largeur, fond gris) */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-2xl px-4 text-center lg:px-8">
          <h2 className="text-2xl font-bold text-anthracite">
            Nos prestations à {city.name}
          </h2>
          <p className="mt-3 text-foreground/70">{prestaSubtitle(city)}</p>
        </div>
        <div className="mt-8">
          <ServicesCarousel />
        </div>
      </section>

      {/* Section 3 — Métier (pleine largeur : croquis à gauche, texte à droite) */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="order-2 lg:order-1">
              <Image
                src="/images/croquis-pergola.jpg"
                alt={`Croquis d'une réalisation de charpente à ${city.name}`}
                width={900}
                height={650}
                className="h-auto w-full rounded-xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl font-bold text-anthracite">
                Charpente, couverture et zinguerie à {city.name}
              </h2>
              <div className="mt-4 space-y-4 text-foreground/80">
            <p>
              En tant que charpentier couvreur intervenant à{" "}
              <Link href="/" className="font-medium text-orange hover:underline">
                Toulouse
              </Link>{" "}
              et jusqu&apos;à {city.name}, ATB Charpente couvre l&apos;ensemble de vos
              besoins de toiture, du gros œuvre à la finition.
            </p>
            <p>
              À {city.name}, nous réalisons la <strong>création et la rénovation de
              charpentes bois</strong> : charpente traditionnelle, fermettes et ossature
              bois. Nos charpentiers interviennent sur les constructions neuves comme sur
              la restauration de charpentes anciennes — renforcement, remplacement de
              pièces, traitement curatif contre les insectes xylophages (capricornes,
              vrillettes) et les champignons. Chaque ouvrage est dimensionné pour garantir
              la solidité et la durabilité de votre toiture.
            </p>
            <p>
              La <strong>couverture</strong> protège votre maison des intempéries. À{" "}
              {city.name}, nous posons et rénovons les toitures en tuiles — tuiles canal et
              romanes en terre cuite, typiques de la région toulousaine, comme les tuiles
              mécaniques. Réfection complète, remaniement, remplacement de tuiles cassées,
              démoussage et traitement hydrofuge : nous redonnons étanchéité et esthétique
              à votre toit, dans le respect du style local.
            </p>
            <p>
              Côté <strong>zinguerie</strong>, une bonne évacuation des eaux de pluie est
              indispensable. Nous installons et remplaçons vos gouttières en zinc, réputées
              pour leur durabilité, ainsi que les descentes, noues, solins et habillages de
              rives, et traitons les gouttières qui débordent ou fuient pour protéger
              durablement vos façades et fondations.
            </p>
            <p>
              Enfin, pour améliorer votre confort et réduire vos factures d&apos;énergie à{" "}
              {city.name}, nous assurons l&apos;<strong>isolation de toiture</strong> par
              l&apos;extérieur (sarking) ou des combles, la pose de{" "}
              <strong>fenêtres de toit</strong> et la création de{" "}
              <strong>pergolas en bois</strong> sur mesure.
            </p>
            <p>
              {city.name} ({city.cp})
              {city.population
                ? ` compte environ ${city.population.toLocaleString("fr-FR")} habitants`
                : ""}
              {city.epci ? ` et fait partie de ${city.epci}` : ""}, dans le département de{" "}
              {city.departement || "la Haute-Garonne"}. Située à environ {city.distToulouse}{" "}
              km de Toulouse et {city.distBessieres} km de notre atelier de Bessières, la
              commune bénéficie d&apos;une intervention rapide.
            </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi nous (fond gris clair) */}
      <section className="bg-muted">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
          <h2 className="text-2xl font-bold text-anthracite">
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
        </div>
      </section>

      {/* Communes voisines (fond blanc) */}
      <section>
        <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
          <h2 className="text-2xl font-bold text-anthracite">
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
        </div>
      </section>

      {/* FAQ (fond gris clair) */}
      <section className="bg-muted">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
          <h2 className="text-2xl font-bold text-anthracite">
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
        </div>
      </section>

      {/* CONTACT — fond = image d'en-tête de l'article */}
      <section className="relative overflow-hidden bg-anthracite-dark">
        <Image
          src={heroFor(city.slug)}
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <div className="w-full rounded-2xl bg-white p-8 shadow-xl sm:max-w-xl sm:p-10 lg:ml-auto">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange">
              Contactez-nous
            </p>
            <h2 className="text-3xl font-bold leading-tight text-anthracite sm:text-4xl">
              Un projet de toiture à {city.name} ?
            </h2>
            <p className="mt-3 text-foreground/70">
              Devis gratuit et sans engagement — réponse rapide.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
