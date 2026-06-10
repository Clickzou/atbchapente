import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { site, routes, services } from "@/lib/site";
import { indexedCities } from "@/lib/zone-communes";
import { content, faq } from "@/lib/cornerstone-toulouse";
import type { ContentBlock } from "@/lib/articles/types";
import ArticleRenderer, { slugifyHeading } from "@/components/ArticleRenderer";
import PhotoCarousel from "@/components/PhotoCarousel";
import GoogleReviewBadge from "@/components/GoogleReviewBadge";

export const metadata: Metadata = {
  title: "Charpentier Toulouse – charpente, couverture & zinguerie",
  description:
    "Charpentier couvreur à Toulouse : création et rénovation de charpente bois, couverture, zinguerie et isolation de toiture. Artisan, garantie décennale, devis gratuit.",
  alternates: { canonical: routes.cornerstone },
};

const HERO = "/images/realisations/IMG-20250403-WA0010.jpg";

// Icônes des grandes cartes « Les services » (même ordre que les sous-titres H3).
const SERVICE_ICONS = [
  // Construction neuve — maison / charpente
  <path key="i0" d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />,
  // Rénovation — outil
  <path key="i1" d="M14 7l3 3M5 19l9-9 3 3-9 9H5v-3zM14 7l2-2a1.4 1.4 0 0 1 2 0l1 1a1.4 1.4 0 0 1 0 2l-2 2" />,
  // Extensions / surélévation — flèche montante + niveaux
  <path key="i2" d="M12 3l4 4h-3v6h-2V7H8l4-4zM4 16h16M4 20h16" />,
  // Couverture & zinguerie — toit
  <path key="i3" d="M3 11l9-7 9 7M5 10v9h14v-9M5 19h14" />,
  // Isolation / fenêtres de toit / pergola — soleil
  <path key="i4" d="M12 3v2M12 19v2M5 12H3M21 12h-2M6 6L5 5M18 6l1-1M6 18l-1 1M18 18l1 1M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />,
];

// Icônes des cartes « Problèmes fréquents » (reconnaître / réparer / prévenir).
const PROBLEME_ICONS = [
  // Reconnaître — loupe
  <path key="p0" d="M21 21l-4.3-4.3M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />,
  // Réparer — outil
  <path key="p1" d="M14 7l3 3M5 19l9-9 3 3-9 9H5v-3zM14 7l2-2a1.4 1.4 0 0 1 2 0l1 1a1.4 1.4 0 0 1 0 2l-2 2" />,
  // Prévenir — bouclier
  <path key="p2" d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3zM9 12l2 2 4-4" />,
];

// Photos des cartes « ce que fait un charpentier » (même ordre que la liste du contenu).
const METIER_CARD_PHOTOS = [
  { src: "/images/realisations/creation-charpente.jpg", alt: "Charpente bois neuve à Toulouse" },
  { src: "/images/realisations/IMG-20250403-WA0001.jpg", alt: "Rénovation de charpente ancienne" },
  { src: "/images/realisations/creation-projet-charpente.jpg", alt: "Ossature bois pour extension ou surélévation" },
  { src: "/images/realisations/creation-fenetre-bois.jpg", alt: "Aménagement de combles" },
];

export default function CharpentierToulousePage() {
  // Maillage descendant : meilleures villes (par population) vers la cornerstone.
  const topCities = [...indexedCities]
    .sort((a, b) => (b.population || 0) - (a.population || 0))
    .slice(0, 18);

  // Sommaire : H2 du contenu cornerstone (ancres = mêmes slugs que l'ArticleRenderer).
  const toc = content
    .filter((b) => b.type === "heading" && b.level === 2)
    .map((b) => {
      const text = (b as { text: string }).text;
      return { text, id: slugifyHeading(text) };
    });

  // L'intro (avant le 1er H2) est mise en avant : texte à gauche, photo à droite.
  const firstH2 = content.findIndex((b) => b.type === "heading" && b.level === 2);
  const intro = firstH2 === -1 ? content : content.slice(0, firstH2);

  // 1re section H2 (« Comprendre le métier… ») : découpée par sous-titre H3 en
  // sections distinctes, chacune en 2 colonnes (prose à gauche, liste → cartes à droite).
  const secondH2 = content.findIndex(
    (b, i) => i > firstH2 && b.type === "heading" && b.level === 2,
  );
  const metierGroup =
    firstH2 === -1 ? [] : content.slice(firstH2, secondH2 === -1 ? undefined : secondH2);

  // 2e section H2 (« Les services… ») → grandes cartes design ; le reste suit en prose.
  const thirdH2 = content.findIndex(
    (b, i) => secondH2 !== -1 && i > secondH2 && b.type === "heading" && b.level === 2,
  );
  const servicesGroup =
    secondH2 === -1 ? [] : content.slice(secondH2, thirdH2 === -1 ? undefined : thirdH2);

  // 3e section H2 (« Comment choisir… ») : 1re partie en 2 colonnes (photo gauche /
  // texte droite), 2e partie (tarifs + devis) en deux grandes cartes.
  const fourthH2 = content.findIndex(
    (b, i) => thirdH2 !== -1 && i > thirdH2 && b.type === "heading" && b.level === 2,
  );
  const choisirGroup =
    thirdH2 === -1 ? [] : content.slice(thirdH2, fourthH2 === -1 ? undefined : fourthH2);

  // 4e section H2 (« Bien préparer son projet… ») → timeline (frise d'étapes).
  const fifthH2 = content.findIndex(
    (b, i) => fourthH2 !== -1 && i > fourthH2 && b.type === "heading" && b.level === 2,
  );
  const preparerGroup =
    fourthH2 === -1 ? [] : content.slice(fourthH2, fifthH2 === -1 ? undefined : fifthH2);
  // 5e section H2 (« Problèmes fréquents… ») → 3 cartes à icônes, fond gris clair.
  const sixthH2 = content.findIndex(
    (b, i) => fifthH2 !== -1 && i > fifthH2 && b.type === "heading" && b.level === 2,
  );
  const problemesGroup =
    fifthH2 === -1 ? [] : content.slice(fifthH2, sixthH2 === -1 ? undefined : sixthH2);

  // 6e section H2 (« Les matériaux… ») → texte à gauche, photo à droite.
  const seventhH2 = content.findIndex(
    (b, i) => sixthH2 !== -1 && i > sixthH2 && b.type === "heading" && b.level === 2,
  );
  const materiauxGroup =
    sixthH2 === -1 ? [] : content.slice(sixthH2, seventhH2 === -1 ? undefined : seventhH2);
  const afterMateriaux = seventhH2 === -1 ? [] : content.slice(seventhH2);

  // Conclusion (« ATB Charpente, votre charpentier de confiance… ») → centrée, fond crème.
  const conclusionProse = afterMateriaux.filter((b) => b.type !== "cta");
  const conclusionCta = afterMateriaux.find((b) => b.type === "cta");

  const firstProbH3 = problemesGroup.findIndex(
    (b) => b.type === "heading" && b.level === 3,
  );
  const problemesIntro =
    firstProbH3 === -1 ? problemesGroup : problemesGroup.slice(0, firstProbH3);
  const problemeCards: ServiceCard[] = [];
  let curProb: ServiceCard | null = null;
  for (const b of problemesGroup) {
    if (b.type === "heading" && b.level === 3) {
      curProb = { title: b.text, body: [], features: [], note: "" };
      problemeCards.push(curProb);
    } else if (curProb) {
      if (b.type === "list") curProb.features.push(...b.items);
      else if (b.type === "callout") curProb.note = b.text;
      else if (b.type === "paragraph") curProb.body.push(b);
    }
  }

  const firstPrepH3 = preparerGroup.findIndex(
    (b) => b.type === "heading" && b.level === 3,
  );
  const preparerIntro =
    firstPrepH3 === -1 ? preparerGroup : preparerGroup.slice(0, firstPrepH3);
  type Step = { title: string; blocks: ContentBlock[] };
  const preparerSteps: Step[] = [];
  let curStep: Step | null = null;
  for (const b of firstPrepH3 === -1 ? [] : preparerGroup.slice(firstPrepH3)) {
    if (b.type === "heading" && b.level === 3) {
      curStep = { title: b.text, blocks: [] };
      preparerSteps.push(curStep);
    } else if (curStep) curStep.blocks.push(b);
  }

  // Découpe : la partie « cartes » démarre au 2e H3 (« Comparer les tarifs… »).
  const choisirH3s = choisirGroup.flatMap((b, i) =>
    b.type === "heading" && b.level === 3 ? [i] : [],
  );
  const choisirCardsStart = choisirH3s.length >= 2 ? choisirH3s[1] : choisirGroup.length;
  const choisirTwoCol = choisirGroup.slice(0, choisirCardsStart);
  type ChoisirCard = { title: string; blocks: ContentBlock[] };
  const choisirCards: ChoisirCard[] = [];
  let curChoisir: ChoisirCard | null = null;
  for (const b of choisirGroup.slice(choisirCardsStart)) {
    if (b.type === "heading" && b.level === 3) {
      curChoisir = { title: b.text, blocks: [] };
      choisirCards.push(curChoisir);
    } else if (curChoisir) curChoisir.blocks.push(b);
  }

  const firstSvcH3 = servicesGroup.findIndex(
    (b) => b.type === "heading" && b.level === 3,
  );
  const servicesIntro =
    firstSvcH3 === -1 ? servicesGroup : servicesGroup.slice(0, firstSvcH3);
  type ServiceCard = { title: string; body: ContentBlock[]; features: string[]; note: string };
  const serviceCards: ServiceCard[] = [];
  let curSvc: ServiceCard | null = null;
  for (const b of servicesGroup) {
    if (b.type === "heading" && b.level === 3) {
      curSvc = { title: b.text, body: [], features: [], note: "" };
      serviceCards.push(curSvc);
    } else if (curSvc) {
      if (b.type === "list") curSvc.features.push(...b.items);
      else if (b.type === "callout") curSvc.note = b.text;
      else if (b.type === "paragraph") curSvc.body.push(b);
    }
  }

  // Regroupement en blocs par H3 (le H2 + son intro rejoignent le 1er bloc).
  const metierChunks: ContentBlock[][] = [];
  for (const b of metierGroup) {
    if (b.type === "heading" && b.level === 3) metierChunks.push([b]);
    else if (metierChunks.length === 0) metierChunks.push([b]);
    else metierChunks[metierChunks.length - 1].push(b);
  }
  if (
    metierChunks.length > 1 &&
    !metierChunks[0].some((b) => b.type === "heading" && b.level === 3)
  ) {
    metierChunks[1] = [...metierChunks[0], ...metierChunks[1]];
    metierChunks.shift();
  }
  const metierSections = metierChunks.map((chunk) => {
    const prose = chunk.filter((b) => b.type !== "list");
    const cards: string[] = [];
    for (const b of chunk) if (b.type === "list") cards.push(...b.items);
    return { prose, cards };
  });

  // 1re sous-section : intro centrée (H2 + 1er paragraphe), carrousel photos, puis
  // le bloc « Le rôle du charpentier » (H3 + paragraphes) sous le carrousel.
  const firstChunk = metierChunks[0] ?? [];
  const firstH3idx = firstChunk.findIndex(
    (b) => b.type === "heading" && b.level === 3,
  );
  const metierIntro = (firstH3idx === -1 ? firstChunk : firstChunk.slice(0, firstH3idx)).filter(
    (b) => b.type !== "list",
  );
  const metierBelow = (firstH3idx === -1 ? [] : firstChunk.slice(firstH3idx)).filter(
    (b) => b.type !== "list",
  );
  const metierCardLabels: string[] = [];
  for (const b of firstChunk) if (b.type === "list") metierCardLabels.push(...b.items);
  const metierCarousel = metierCardLabels.map((title, i) => ({
    title,
    src: METIER_CARD_PHOTOS[i]?.src ?? METIER_CARD_PHOTOS[0].src,
    alt: METIER_CARD_PHOTOS[i]?.alt ?? title,
  }));

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

      {/* Sommaire — pleine largeur, marge 100px à gauche/droite */}
      {toc.length > 1 && (
        <section className="px-4 pt-16 lg:px-[100px]">
          <nav
            aria-label="Sommaire"
            className="rounded-2xl border border-black/5 bg-muted/60 p-6 lg:p-8"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange">
              Sommaire
            </p>
            <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {toc.map((item, i) => (
                <li key={item.id} className="flex gap-2 text-sm">
                  <span className="font-semibold text-orange">{i + 1}.</span>
                  <a
                    href={`#${item.id}`}
                    className="text-anthracite underline-offset-4 hover:text-orange hover:underline"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </section>
      )}

      {/* Intro mise en avant — texte à gauche, photo à droite */}
      <section className="mx-auto max-w-[1600px] px-4 pb-16 pt-12 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <ArticleRenderer blocks={intro} />
          </div>
          <div className="relative mx-auto aspect-[4/3] w-[70%] overflow-hidden">
            <Image
              src="/images/charpentier-toulouse.jpg"
              alt="Charpentier couvreur à Toulouse — chantier ATB Charpente"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* « Comprendre le métier… » — une section par sous-titre H3 :
          prose à gauche, liste en cartes à icônes à droite */}
      {/* « Comprendre le métier » — intro centrée, carrousel de cartes photos, puis texte */}
      <section className="bg-muted">
        <div className="mx-auto max-w-[1600px] px-4 py-12 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <ArticleRenderer blocks={metierIntro} />
          </div>
          {metierCarousel.length > 0 && (
            <div className="mt-10">
              <PhotoCarousel items={metierCarousel} />
            </div>
          )}
          {metierBelow.length > 0 && (
            <div className="mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-center lg:gap-12">
              <div>
                <ArticleRenderer blocks={metierBelow} />
              </div>
              <div className="flex flex-col items-start gap-3 rounded-2xl border border-black/5 bg-white p-7 shadow-sm">
                <p className="text-lg font-semibold text-anthracite">
                  Un projet de charpente à Toulouse ?
                </p>
                <p className="text-sm text-foreground/70">
                  Visite et devis gratuits, sans engagement.
                </p>
                <Link
                  href={routes.contact}
                  className="mt-1 inline-flex rounded-full bg-orange px-7 py-3.5 font-semibold text-white transition-colors hover:bg-orange-dark"
                >
                  Demander un devis gratuit
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Autres sous-sections métier — 2 colonnes (prose / cartes à icônes) */}
      {metierSections.slice(1).map((sec, i) => (
        <section key={i}>
          <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-12 md:grid-cols-2 lg:gap-14 lg:px-12">
            <div>
              <ArticleRenderer blocks={sec.prose} />
            </div>
            {sec.cards.length > 0 && (
              <ul className="grid content-start gap-3 lg:pt-6">
                {sec.cards.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-black/5 bg-muted/50 p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </span>
                    <span className="text-sm font-medium text-anthracite">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}

      {/* « Les services… » — grandes cartes design, fond gris clair */}
      {serviceCards.length > 0 && (
        <section className="bg-muted">
          <div className="mx-auto max-w-[1600px] px-4 py-16 lg:px-12">
            <div className="mx-auto max-w-3xl text-center">
              <ArticleRenderer blocks={servicesIntro} />
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {serviceCards.map((card, i) => (
                <div
                  key={card.title}
                  className={`flex flex-col rounded-2xl border border-black/5 bg-white p-7 shadow-sm lg:p-8 ${
                    i === serviceCards.length - 1 && serviceCards.length % 2 === 1
                      ? "lg:col-span-2"
                      : ""
                  }`}
                >
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange/10 text-orange">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {SERVICE_ICONS[i] ?? SERVICE_ICONS[0]}
                    </svg>
                  </span>
                  <h3 className="text-xl font-bold text-anthracite">{card.title}</h3>
                  {card.body.length > 0 && (
                    <div className="mt-3">
                      <ArticleRenderer blocks={card.body} />
                    </div>
                  )}
                  {card.features.length > 0 && (
                    <ul className="mt-5 space-y-2.5">
                      {card.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-anthracite">
                          <svg className="mt-0.5 shrink-0 text-orange" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12l5 5L20 7" />
                          </svg>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {card.note && (
                    <p className="mt-5 rounded-xl border-l-4 border-orange bg-orange/5 p-4 text-sm text-foreground/80">
                      {card.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* « Comment choisir… » — partie 1 : photo à gauche, texte à droite */}
      {choisirTwoCol.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-4 py-16 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/choisir-charpentier-toulouse.jpg"
                alt="Choisir son charpentier à Toulouse : étude des plans et du devis"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <ArticleRenderer blocks={choisirTwoCol} />
            </div>
          </div>
        </section>
      )}

      {/* « Comment choisir… » — partie 2 : deux grandes cartes (tarifs / devis) */}
      {choisirCards.length > 0 && (
        <section className="bg-muted">
          <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-16 md:grid-cols-2 lg:px-12">
            {choisirCards.map((card) => (
              <div
                key={card.title}
                className="flex flex-col rounded-2xl border border-black/5 bg-white p-7 shadow-sm lg:p-8"
              >
                <h3 className="text-xl font-bold text-anthracite">{card.title}</h3>
                <div className="mt-3">
                  <ArticleRenderer blocks={card.blocks} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* « Bien préparer son projet… » — timeline (frise d'étapes numérotées) */}
      {preparerSteps.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-4 py-16 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <ArticleRenderer blocks={preparerIntro} />
          </div>
          <ol className="mx-auto mt-10 max-w-3xl">
            {preparerSteps.map((step, i) => (
              <li key={step.title} className="flex gap-5 sm:gap-6">
                <div className="flex flex-col items-center">
                  <span className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange text-lg font-bold text-white">
                    {i + 1}
                  </span>
                  {i < preparerSteps.length - 1 && (
                    <span className="mt-2 w-px flex-1 bg-orange/30" />
                  )}
                </div>
                <div className={i < preparerSteps.length - 1 ? "pb-10" : ""}>
                  <h3 className="text-xl font-bold text-anthracite">{step.title}</h3>
                  <div className="mt-2">
                    <ArticleRenderer blocks={step.blocks} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* « Problèmes fréquents… » — 3 cartes à icônes, fond gris clair */}
      {problemeCards.length > 0 && (
        <section className="bg-muted">
          <div className="mx-auto max-w-[1600px] px-4 py-16 lg:px-12">
            <div className="mx-auto max-w-3xl text-center">
              <ArticleRenderer blocks={problemesIntro} />
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {problemeCards.map((card, i) => (
                <div
                  key={card.title}
                  className="flex flex-col rounded-2xl border border-black/5 bg-white p-7 shadow-sm lg:p-8"
                >
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange/10 text-orange">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {PROBLEME_ICONS[i] ?? PROBLEME_ICONS[0]}
                    </svg>
                  </span>
                  <h3 className="text-xl font-bold text-anthracite">{card.title}</h3>
                  {card.body.length > 0 && (
                    <div className="mt-3">
                      <ArticleRenderer blocks={card.body} />
                    </div>
                  )}
                  {card.features.length > 0 && (
                    <ul className="mt-5 space-y-2.5">
                      {card.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-anthracite">
                          <svg className="mt-0.5 shrink-0 text-orange" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12l5 5L20 7" />
                          </svg>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {card.note && (
                    <p className="mt-5 rounded-xl border-l-4 border-orange bg-orange/5 p-4 text-sm text-foreground/80">
                      {card.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* « Les matériaux… » — texte à gauche, photo à droite */}
      {materiauxGroup.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-4 py-16 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div>
              <ArticleRenderer blocks={materiauxGroup} />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/materiaux-charpente-bois.jpg"
                alt="Bois de charpente : pin des Landes et douglas"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>
      )}

      {/* Conclusion — titre, texte et CTA centrés, fond crème */}
      {afterMateriaux.length > 0 && (
        <section className="bg-[#F9EBDE]">
          <div className="mx-auto max-w-3xl px-4 py-20 text-center lg:px-8">
            <ArticleRenderer blocks={conclusionProse} />
            {conclusionCta && conclusionCta.type === "cta" && (
              <div className="mt-6">
                <p className="mx-auto max-w-2xl text-foreground/80">{conclusionCta.text}</p>
                <Link
                  href={conclusionCta.href}
                  className="mt-6 inline-flex rounded-full bg-orange px-7 py-3.5 font-semibold text-white transition-colors hover:bg-orange-dark"
                >
                  {conclusionCta.label}
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

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
