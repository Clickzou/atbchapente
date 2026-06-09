import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { services, site, routes } from "@/lib/site";
import { serviceContent } from "@/lib/services";
import type { ContentBlock } from "@/lib/articles/types";
import ArticleRenderer from "@/components/ArticleRenderer";
import ZoneMap from "@/components/ZoneMap";
import IconsBackground from "@/components/IconsBackground";

// Images par section, déclarées par slug de service. `match` est comparé (en
// minuscules, "inclut") au titre du H2. La position gauche/droite est alternée
// automatiquement selon l'ordre d'apparition des sections illustrées.
// Pour répliquer la mise en page sur un autre service : ajouter ses entrées ici.
// `side` (optionnel) fige le côté de l'image ; sinon alternance auto.
type SectionImage = { match: string; src: string; bg?: string; side?: "left" | "right" };
const SECTION_IMAGES: Record<string, SectionImage[]> = {
  "creation-charpente-bois-renovation": [
    { match: "création d'une charpente bois neuve", src: "/images/realisations/creation-charpente.jpg" },
    { match: "rénovation et renforcement", src: "/images/renovation-charpente-bois.jpg" },
    { match: "extension et surélévation", src: "/images/extension-charpente-bois.jpg" },
    { match: "pourquoi choisir", src: "/images/realisations/zone-intervention-atb-construction.jpg", bg: "#F9EBDE" },
  ],
  "isolation-toiture": [
    { match: "isolation des combles perdus", src: "/images/realisations/IMG-20250403-WA0018.jpg", side: "right" },
    { match: "quels isolants pour votre toiture", src: "/images/isolation-toit.jpg", side: "left" },
    { match: "votre artisan pour l'isolation", src: "/images/realisations/isolation-toiture-zone-intervention-toulouse.jpg", side: "right", bg: "#F9EBDE" },
  ],
  "pose-changement-gouttieres-zinc": [
    { match: "la pose neuve de gouttières", src: "/images/gouttiere-zinc.jpg", side: "right" },
    { match: "remplacement et rénovation de gouttières", src: "/images/remplacement-gouttiere.jpg", side: "left" },
  ],
  "pose-remaniement-tuiles": [
    { match: "le remaniement et la réfection", src: "/images/refection-tuiles.jpg", side: "right" },
  ],
  // Les autres services seront renseignés page par page.
};

// Sections « bénéfices » : le texte (titre + paragraphes) à gauche, et les items
// de la liste rendus en cartes à icône à droite. Indexé par slug ; `match` est
// comparé (minuscules, "inclut") au titre H2.
// `icon` (optionnel) remplace l'icône cyclée par une icône unique pour toutes
// les cartes de la section (utile pour des « composants » plutôt que bénéfices).
type BenefitConf = { match: string; icon?: ReactNode };
const SECTION_BENEFITS: Record<string, BenefitConf[]> = {
  "isolation-toiture": [{ match: "pourquoi isoler sa toiture" }],
  "pose-changement-gouttieres-zinc": [
    {
      match: "le rôle des gouttières",
      // Goutte d'eau (zinguerie / évacuation)
      icon: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />,
    },
  ],
};

// Sections « grille de cartes » : les items d'une liste deviennent des cartes
// (icône + titre = label **gras** de l'item + texte = reste). En pleine largeur.
// `split` : texte à gauche, cartes à droite (sinon grille pleine largeur).
// `centered` : intro + callout centrés (grille pleine largeur).
type ListCardsConf = {
  match: string;
  icon?: ReactNode;
  split?: boolean;
  centered?: boolean;
};
const SECTION_LISTCARDS: Record<string, ListCardsConf[]> = {
  "pose-changement-gouttieres-zinc": [
    {
      match: "les signes d'usure",
      // Triangle d'alerte
      icon: <path d="M12 3l9 16H3z M12 10v4 M12 17h.01" />,
    },
  ],
  "pose-remaniement-tuiles": [
    {
      match: "la couverture en tuiles",
      split: true,
      // Toit en tuiles (rangées)
      icon: <path d="M3 11l9-7 9 7M5 10v10h14V10M5 13.5h14M5 17h14" />,
    },
    {
      match: "quand faut-il remanier",
      centered: true,
      // Triangle d'alerte
      icon: <path d="M12 3l9 16H3z M12 10v4 M12 17h.01" />,
    },
  ],
};

// Sections « timeline » : la liste (ordonnée) d'étapes devient une frise
// verticale numérotée et reliée. Indexé par slug.
const SECTION_TIMELINE: Record<string, string[]> = {
  "pose-remaniement-tuiles": ["la pose de tuiles neuves"],
};

// Par service : fragment de titre H2 dont le contenu alimente la section carte
// de zone (sous le titre « Zone d'intervention »). Évite une section en double.
const ZONE_HEADINGS: Record<string, string> = {
  "pose-changement-gouttieres-zinc": "vos gouttières zinc à toulouse",
  "pose-remaniement-tuiles": "couvreur à toulouse",
  "creation-fenetre-de-toit-bois": "pose de fenêtre de toit à toulouse",
  "creation-pergola-bois": "création de pergola en bois à toulouse",
};

// Sépare le label en gras de tête (« **Titre** reste ») du reste du texte.
function splitLabel(text: string): { label: string; rest: string } {
  const m = text.match(/^\*\*([^*]+)\*\*\s*([\s\S]*)$/);
  return m ? { label: m[1], rest: m[2] } : { label: "", rest: text };
}

// Rendu minimal du gras **…** dans une chaîne (pour le texte des cartes).
function renderInline(text: string): ReactNode {
  return text.split(/\*\*(.+?)\*\*/g).map((p, idx) =>
    idx % 2 === 1 ? (
      <strong key={idx} className="font-semibold text-anthracite">
        {p}
      </strong>
    ) : (
      p
    ),
  );
}

// Icônes (cyclées) pour les cartes de bénéfices.
const BENEFIT_ICONS: ReactNode[] = [
  // Pertes de chaleur (thermomètre)
  <path key="t" d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />,
  // Confort été / hiver (soleil)
  <g key="s">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </g>,
  // Économies (euro)
  <path key="e" d="M18 7a6 6 0 1 0 0 10M4 10h8M4 14h8" />,
  // Protection (bouclier)
  <path key="p" d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />,
  // Valorisation (maison + flèche haut)
  <g key="v">
    <path d="M3 11l9-8 9 8M5 10v10h14V10" />
    <path d="M9.5 15.5L12 13l2.5 2.5M12 13v5" />
  </g>,
];

// Sections « comparaison » : deux sous-parties H3 affichées en deux cartes côte
// à côte (avec puces ✓). `recommended` met en avant l'une des cartes (liseré).
type CompareConf = {
  match: string;
  badges?: [string, string];
  recommended?: 0 | 1;
  /** Index de la carte dont la liste est affichée en « inconvénients » (✗). */
  consCard?: 0 | 1;
  /** Icônes dédiées (sinon COMPARE_ICONS par défaut). */
  icons?: [ReactNode, ReactNode];
};
const SECTION_COMPARE: Record<string, CompareConf[]> = {
  "isolation-toiture": [
    {
      match: "quelle solution choisir",
      badges: ["Performance maximale", "Plus économique"],
      recommended: 0,
      consCard: 1,
    },
  ],
  "pose-changement-gouttieres-zinc": [
    {
      match: "pourquoi choisir le zinc",
      icons: [
        // Durabilité (bouclier)
        <path key="d" d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />,
        // Esthétique (éclat)
        <path key="e" d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />,
      ],
    },
  ],
};

// Sections « duo » : deux H2 consécutifs fusionnés en une seule section à deux
// cartes côte à côte. Chaque paire = [match du 1er H2, match du 2e H2].
const SECTION_DUO: Record<string, [string, string][]> = {
  "isolation-toiture": [["les bénéfices concrets", "aides financières"]],
};

// Icônes (par index de carte) pour les sections comparaison.
const COMPARE_ICONS: ReactNode[] = [
  // Par l'extérieur (toit + couches)
  <path key="ext" d="M3 14l9-7 9 7M6 12.5V20M18 12.5V20M3 20h18M9 9.5l3-2.3 3 2.3" />,
  // Par l'intérieur (maison)
  <g key="int">
    <path d="M3 11l9-8 9 8M5 10v10h14V10" />
    <path d="M9 20v-6h6v6" />
  </g>,
];

// Cartes « types de charpente » (page charpente uniquement).
const CHARPENTE_TYPES = [
  {
    title: "La charpente traditionnelle",
    photo: "/images/realisations/iStock-1028706698.jpg",
    icon: "M6 52 L32 12 L58 52 Z M32 12 V52 M32 52 L19 34 M32 52 L45 34",
    text: "En bois massif (pannes, chevrons, arbalétriers), idéale pour les constructions de caractère, les grandes portées et les charpentes apparentes. Elle libère les combles et apporte un cachet chaleureux.",
  },
  {
    title: "La charpente à fermettes",
    photo: "/images/realisations/iStock-686911778.jpg",
    icon: "M6 50 H58 L32 16 Z M6 50 L32 34 M58 50 L32 34",
    text: "Préfabriquée en atelier, plus légère et économique, parfaite pour les constructions modernes. Des fermettes aménageables permettent de conserver des combles habitables.",
  },
  {
    title: "L'ossature bois",
    photo: "/images/realisations/iStock-1302464279.jpg",
    icon: "M10 54 V26 L32 10 L54 26 V54 Z M22 54 V32 M42 54 V32",
    text: "Écologique, isolante et rapide à monter : idéale pour les extensions, les surélévations et les maisons neuves. Elle s'intègre aux projets contemporains comme traditionnels.",
  },
];

// URLs identiques au WordPress actuel -> aucune redirection nécessaire pour les services.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

// Croquis (dessin au trait) associé à chaque service.
const CROQUIS: Record<string, string> = {
  "creation-charpente-bois-renovation": "charpente-neuve.jpg",
  "isolation-toiture": "isolation-toiture.jpg",
  "pose-changement-gouttieres-zinc": "gouttiere-toit.jpg",
  "pose-remaniement-tuiles": "couverture-tuile.jpg",
  "creation-fenetre-de-toit-bois": "croquis-maison.jpg",
  "creation-pergola-bois": "croquis-pergola.jpg",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const data = getService(service);
  if (!data) return {};
  return {
    title: data.seoTitle,
    description: data.metaDescription,
    alternates: { canonical: `/${data.slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const data = getService(service);
  if (!data) notFound();

  const body = serviceContent[data.slug];
  const croquis = CROQUIS[data.slug] ?? "croquis-charpente.jpg";
  const isCharpente = data.slug === "creation-charpente-bois-renovation";

  // Découpage du contenu : intro (avant le 1er H2), groupes par H2, FAQ et CTA
  // isolés, et le groupe « zone d'intervention » extrait pour la section carte.
  const allBlocks = body ?? [];
  const faqBlock = allBlocks.find((b) => b.type === "faq");
  const ctaBlock = allBlocks.find((b) => b.type === "cta");
  const contentBlocks = allBlocks.filter(
    (b) => b.type !== "faq" && b.type !== "cta",
  );
  const firstH2 = contentBlocks.findIndex(
    (b) => b.type === "heading" && b.level === 2,
  );
  const intro = firstH2 === -1 ? contentBlocks : contentBlocks.slice(0, firstH2);
  const groups: ContentBlock[][] = [];
  for (const b of firstH2 === -1 ? [] : contentBlocks.slice(firstH2)) {
    if (b.type === "heading" && b.level === 2) groups.push([b]);
    else if (groups.length) groups[groups.length - 1].push(b);
  }
  const zoneHeading = ZONE_HEADINGS[data.slug];
  const isZone = (g: ContentBlock[]) =>
    g[0].type === "heading" &&
    (/zone d.intervention/i.test(g[0].text) ||
      (!!zoneHeading && g[0].text.toLowerCase().includes(zoneHeading)));
  const zoneGroup = groups.find(isZone) ?? null;
  const mainGroups = groups.filter((g) => !isZone(g));

  // Sections à fonds alternés (cartes types, H2, FAQ, zone). Pour les sections
  // « blocks », on attache l'image éventuelle (alternance gauche/droite auto).
  const imgConf = SECTION_IMAGES[data.slug] ?? [];
  const benefitConf = SECTION_BENEFITS[data.slug] ?? [];
  const compareConf = SECTION_COMPARE[data.slug] ?? [];
  const duoConf = SECTION_DUO[data.slug] ?? [];
  const listCardsConf = SECTION_LISTCARDS[data.slug] ?? [];
  const timelineConf = SECTION_TIMELINE[data.slug] ?? [];
  let imgCount = 0;
  const sections: {
    kind:
      | "cards"
      | "blocks"
      | "faq"
      | "zone"
      | "benefits"
      | "compare"
      | "duo"
      | "listcards"
      | "timeline";
    blocks?: ContentBlock[];
    img?: { src: string; side: "left" | "right"; bg?: string };
    compare?: CompareConf;
    duoBlocks?: ContentBlock[][];
    benefitIcon?: ReactNode;
    listIcon?: ReactNode;
    listSplit?: boolean;
    listCentered?: boolean;
  }[] = [];
  if (isCharpente) sections.push({ kind: "cards" });
  const consumed = new Set<number>();
  for (let gi = 0; gi < mainGroups.length; gi++) {
    if (consumed.has(gi)) continue;
    const g = mainGroups[gi];
    const head = g[0];
    const headText = head.type === "heading" ? head.text.toLowerCase() : "";

    // Duo : fusion de deux H2 consécutifs en une section à deux cartes.
    const duo = duoConf.find(([a]) => headText.includes(a));
    const next = mainGroups[gi + 1];
    const nextText =
      next && next[0].type === "heading" ? next[0].text.toLowerCase() : "";
    if (duo && next && nextText.includes(duo[1])) {
      sections.push({ kind: "duo", duoBlocks: [g, next] });
      consumed.add(gi + 1);
      continue;
    }

    const cmp = compareConf.find((c) => headText.includes(c.match));
    if (cmp) {
      sections.push({ kind: "compare", blocks: g, compare: cmp });
      continue;
    }
    const ben = benefitConf.find((c) => headText.includes(c.match));
    if (ben) {
      sections.push({ kind: "benefits", blocks: g, benefitIcon: ben.icon });
      continue;
    }
    const lc = listCardsConf.find((c) => headText.includes(c.match));
    if (lc) {
      sections.push({
        kind: "listcards",
        blocks: g,
        listIcon: lc.icon,
        listSplit: lc.split,
        listCentered: lc.centered,
      });
      continue;
    }
    if (timelineConf.some((m) => headText.includes(m))) {
      sections.push({ kind: "timeline", blocks: g });
      continue;
    }
    const conf = imgConf.find((c) => headText.includes(c.match));
    let img;
    if (conf) {
      img = {
        src: conf.src,
        bg: conf.bg,
        side: (conf.side ?? (imgCount % 2 === 0 ? "left" : "right")) as
          | "left"
          | "right",
      };
      imgCount++;
    }
    sections.push({ kind: "blocks", blocks: g, img });
  }
  if (faqBlock) sections.push({ kind: "faq" });
  sections.push({ kind: "zone" });

  return (
    <>
      {/* HERO landing — comme la home et les articles */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-anthracite-dark text-white">
        <Image src={data.heroImage ?? data.image} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-anthracite-dark/90 via-anthracite-dark/55 to-anthracite-dark/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-28 lg:px-8">
          <nav className="mb-4 text-sm text-white/60">
            <Link href="/" className="hover:text-orange">Accueil</Link> /{" "}
            <span className="text-white/90">{data.title}</span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange">
            Charpentier couvreur à Toulouse
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {data.heading}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">{data.excerpt}</p>
          <div className="mt-8 flex flex-wrap gap-4">
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
          </div>
        </div>
      </section>

      {/* Intro — texte à gauche, croquis à droite, pleine largeur */}
      <section className="mx-auto max-w-[1600px] px-4 py-16 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-14">
          <div>
            {intro.length ? (
              <ArticleRenderer blocks={intro} />
            ) : (
              <p className="text-foreground/80">
                {site.name} réalise vos travaux de {data.title.toLowerCase()} {site.zone}.
              </p>
            )}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={routes.contact}
                className="rounded-full bg-orange px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-dark"
              >
                Demander un devis
              </Link>
              <Link
                href={routes.realisations}
                className="rounded-full border border-anthracite/20 px-6 py-3 font-semibold text-anthracite transition-colors hover:bg-muted"
              >
                Voir nos réalisations
              </Link>
            </div>
          </div>
          <div className="lg:sticky lg:top-28">
            <Image
              src={`/images/${croquis}`}
              alt={`Croquis — ${data.title.toLowerCase()} à Toulouse`}
              width={900}
              height={650}
              className="h-auto w-full rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Sections — fonds alternés (cartes types, H2, FAQ, zone) */}
      {sections.map((s, i) => {
        const bg = i % 2 === 0 ? "bg-muted" : "";
        if (s.kind === "cards") {
          return (
            <section key={i} className={bg}>
              <div className="mx-auto max-w-[1600px] px-4 py-16 lg:px-12">
                <div className="mb-10 max-w-2xl">
                  <h2 className="text-3xl font-bold text-anthracite">
                    Les différents types de charpente bois
                  </h2>
                  <p className="mt-3 text-foreground/70">
                    Plusieurs familles de charpente existent, chacune adaptée à un
                    projet, un budget et une esthétique. Nous vous conseillons sur la
                    solution la plus pertinente.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  {CHARPENTE_TYPES.map((t) => (
                    <div
                      key={t.title}
                      className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm"
                    >
                      <div className="relative h-44">
                        <Image
                          src={t.photo}
                          alt={t.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="p-6">
                        <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-orange/10 text-orange">
                          <svg width="22" height="22" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d={t.icon} />
                          </svg>
                        </span>
                        <h3 className="text-lg font-semibold text-anthracite">{t.title}</h3>
                        <p className="mt-2 text-sm text-foreground/70">{t.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }
        if (s.kind === "duo") {
          return (
            <section key={i} className={bg}>
              <div className="mx-auto max-w-[1600px] px-4 py-14 lg:px-12">
                <div className="grid gap-6 md:grid-cols-2 md:items-stretch">
                  {s.duoBlocks!.map((grp, k) => {
                    const title = grp[0].type === "heading" ? grp[0].text : "";
                    const rest = grp.slice(1);
                    return (
                      <div
                        key={k}
                        className="flex flex-col rounded-2xl border border-black/5 bg-white p-7 shadow-sm"
                      >
                        <h2 className="text-2xl font-bold text-anthracite">
                          {title}
                        </h2>
                        <div className="mt-3">
                          <ArticleRenderer blocks={rest} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }
        if (s.kind === "compare") {
          const blocks = s.blocks!;
          const h2 = blocks[0];
          const firstH3 = blocks.findIndex(
            (b) => b.type === "heading" && b.level === 3,
          );
          const intro = firstH3 === -1 ? blocks.slice(1) : blocks.slice(1, firstH3);
          const subs: ContentBlock[][] = [];
          for (const b of firstH3 === -1 ? [] : blocks.slice(firstH3)) {
            if (b.type === "heading" && b.level === 3) subs.push([b]);
            else if (subs.length) subs[subs.length - 1].push(b);
          }
          return (
            <section key={i} className={bg}>
              <div className="mx-auto max-w-[1600px] px-4 py-14 lg:px-12">
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className="text-3xl font-bold text-anthracite">
                    {h2.type === "heading" ? h2.text : ""}
                  </h2>
                  {intro.length > 0 && (
                    <div className="mt-3 [&_p]:text-foreground/70">
                      <ArticleRenderer blocks={intro} />
                    </div>
                  )}
                </div>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  {subs.map((sub, k) => {
                    const title = sub[0].type === "heading" ? sub[0].text : "";
                    const listB = sub.find((b) => b.type === "list");
                    const paras = sub.slice(1).filter((b) => b.type !== "list");
                    const advs =
                      listB && listB.type === "list" ? listB.items : [];
                    const recommended = s.compare?.recommended === k;
                    const badge = s.compare?.badges?.[k];
                    const isCons = s.compare?.consCard === k;
                    return (
                      <div
                        key={k}
                        className={`relative flex flex-col rounded-2xl border bg-white p-7 shadow-sm ${
                          recommended
                            ? "border-orange ring-1 ring-orange/30"
                            : "border-black/5"
                        }`}
                      >
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange/10 text-orange">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {s.compare?.icons?.[k] ??
                              COMPARE_ICONS[k % COMPARE_ICONS.length]}
                          </svg>
                        </span>
                        {badge && (
                          <span
                            className={`mt-4 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                              recommended
                                ? "bg-orange text-white"
                                : "bg-muted text-foreground/70"
                            }`}
                          >
                            {badge}
                          </span>
                        )}
                        <h3 className="mt-3 text-xl font-bold text-anthracite">
                          {title}
                        </h3>
                        {paras.length > 0 && (
                          <div className="mt-2 [&_p]:text-sm [&_p]:text-foreground/70">
                            <ArticleRenderer blocks={paras} />
                          </div>
                        )}
                        {advs.length > 0 && (
                          <>
                            <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-foreground/50">
                              {isCons ? "À prendre en compte" : "Avantages"}
                            </p>
                            <ul className="mt-2 space-y-2">
                              {advs.map((a, j) => (
                                <li
                                  key={j}
                                  className="flex items-start gap-2 text-sm text-foreground/80"
                                >
                                  <svg
                                    className={`mt-0.5 shrink-0 ${isCons ? "text-red-500" : "text-orange"}`}
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    {isCons ? (
                                      <path d="M6 6l12 12M18 6L6 18" />
                                    ) : (
                                      <path d="M5 12l5 5L20 7" />
                                    )}
                                  </svg>
                                  <span>{a}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }
        if (s.kind === "timeline") {
          const blocks = s.blocks!;
          const listIdx = blocks.findIndex((b) => b.type === "list");
          const preList = listIdx === -1 ? blocks : blocks.slice(0, listIdx);
          const listBlock = listIdx === -1 ? undefined : blocks[listIdx];
          const postList = listIdx === -1 ? [] : blocks.slice(listIdx + 1);
          const items =
            listBlock && listBlock.type === "list" ? listBlock.items : [];
          return (
            <section key={i} className={`relative overflow-hidden ${bg}`}>
              <IconsBackground tone="dark" />
              <div className="relative z-10 mx-auto max-w-3xl px-4 py-14 lg:px-8">
                <ArticleRenderer blocks={preList} />
                <ol className="mt-8">
                  {items.map((it, k) => {
                    const { label, rest } = splitLabel(it);
                    const last = k === items.length - 1;
                    return (
                      <li key={k} className="flex gap-5">
                        <div className="flex flex-col items-center">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
                            {k + 1}
                          </span>
                          {!last && <span className="my-1 w-0.5 flex-1 bg-orange/25" />}
                        </div>
                        <div className={last ? "pt-1.5" : "pb-8 pt-1.5"}>
                          {label && (
                            <h3 className="font-semibold text-anthracite">{label}</h3>
                          )}
                          <p className="text-foreground/75">{renderInline(rest)}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
                {postList.length > 0 && (
                  <div className="mt-4">
                    <ArticleRenderer blocks={postList} />
                  </div>
                )}
              </div>
            </section>
          );
        }
        if (s.kind === "listcards") {
          const blocks = s.blocks!;
          const listIdx = blocks.findIndex((b) => b.type === "list");
          const preList = listIdx === -1 ? blocks : blocks.slice(0, listIdx);
          const listBlock = listIdx === -1 ? undefined : blocks[listIdx];
          const postList = listIdx === -1 ? [] : blocks.slice(listIdx + 1);
          const items =
            listBlock && listBlock.type === "list" ? listBlock.items : [];
          const cardEls = items.map((it, k) => {
            const { label, rest } = splitLabel(it);
            return (
              <div
                key={k}
                className="flex flex-col rounded-2xl border border-black/5 bg-white p-6 text-left shadow-sm"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-orange/10 text-orange">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {s.listIcon}
                  </svg>
                </span>
                {label && (
                  <h3 className="font-semibold text-anthracite">{label}</h3>
                )}
                <p className="mt-2 text-sm text-foreground/70">
                  {renderInline(rest)}
                </p>
              </div>
            );
          });

          if (s.listSplit) {
            return (
              <section key={i} className={bg}>
                <div className="mx-auto max-w-[1600px] px-4 py-14 lg:px-12">
                  <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
                    <div className="lg:order-1">
                      <ArticleRenderer blocks={preList} />
                      {postList.length > 0 && (
                        <div className="mt-6">
                          <ArticleRenderer blocks={postList} />
                        </div>
                      )}
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:order-2">
                      {cardEls}
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          const textWrap = s.listCentered
            ? "mx-auto max-w-3xl text-center"
            : "max-w-3xl";
          return (
            <section key={i} className={bg}>
              <div className="mx-auto max-w-[1600px] px-4 py-14 lg:px-12">
                <div className={textWrap}>
                  <ArticleRenderer blocks={preList} />
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {cardEls}
                </div>
                {postList.length > 0 && (
                  <div className={`mt-8 ${textWrap}`}>
                    <ArticleRenderer blocks={postList} />
                  </div>
                )}
              </div>
            </section>
          );
        }
        if (s.kind === "benefits") {
          const blocks = s.blocks!;
          const listBlock = blocks.find((b) => b.type === "list");
          const textBlocks = blocks.filter((b) => b.type !== "list");
          const items =
            listBlock && listBlock.type === "list" ? listBlock.items : [];
          return (
            <section key={i} className={bg}>
              <div className="mx-auto max-w-[1600px] px-4 py-14 lg:px-12">
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
                  <div>
                    <ArticleRenderer blocks={textBlocks} />
                  </div>
                  <div className="grid gap-4">
                    {items.map((it, k) => (
                      <div
                        key={k}
                        className="flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange">
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {s.benefitIcon ?? BENEFIT_ICONS[k % BENEFIT_ICONS.length]}
                          </svg>
                        </span>
                        <p className="text-sm text-foreground/80">{renderInline(it)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        }
        if (s.kind === "faq") {
          return (
            <section key={i} className={bg}>
              <div className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
                <h2 className="text-2xl font-bold text-anthracite">
                  Questions fréquentes
                </h2>
                <div className="mt-6">
                  <ArticleRenderer blocks={[faqBlock!]} />
                </div>
              </div>
            </section>
          );
        }
        if (s.kind === "zone") {
          return (
            <section key={i} className="bg-muted">
              <div className="mx-auto max-w-[1600px] px-4 py-16 lg:px-12">
                <ZoneMap
                  split
                  heading="Zone d'intervention"
                  intro={
                    zoneGroup ? (
                      <ArticleRenderer blocks={zoneGroup.slice(1)} />
                    ) : undefined
                  }
                />
              </div>
            </section>
          );
        }
        const head = s.blocks![0];
        const img = s.img;
        if (img) {
          return (
            <section
              key={i}
              className={img.bg ? "" : bg}
              style={img.bg ? { backgroundColor: img.bg } : undefined}
            >
              <div className="mx-auto max-w-[1600px] px-4 py-14 lg:px-12">
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
                  <div className={`order-2 ${img.side === "left" ? "lg:order-1" : "lg:order-2"}`}>
                    <Image
                      src={img.src}
                      alt={head.type === "heading" ? head.text : ""}
                      width={900}
                      height={650}
                      className={`h-auto w-full rounded-2xl${img.bg ? " mix-blend-multiply" : ""}`}
                    />
                  </div>
                  <div className={`order-1 ${img.side === "left" ? "lg:order-2" : "lg:order-1"}`}>
                    <ArticleRenderer blocks={s.blocks!} />
                  </div>
                </div>
              </div>
            </section>
          );
        }
        return (
          <section key={i} className={bg}>
            <div className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
              <ArticleRenderer blocks={s.blocks!} />
            </div>
          </section>
        );
      })}

      {/* CTA final */}
      {ctaBlock && (
        <section className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
          <ArticleRenderer blocks={[ctaBlock]} />
        </section>
      )}
    </>
  );
}
