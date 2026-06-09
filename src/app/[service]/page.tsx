import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { services, site, routes } from "@/lib/site";
import { serviceContent } from "@/lib/services";
import type { ContentBlock } from "@/lib/articles/types";
import ArticleRenderer from "@/components/ArticleRenderer";
import ZoneMap from "@/components/ZoneMap";

// Image illustrant certaines sections (gauche ou droite du texte), par titre de H2.
function sectionImageFor(
  heading: string,
): { src: string; side: "left" | "right"; bg?: string } | null {
  const h = heading.toLowerCase();
  if (h.includes("création d'une charpente bois neuve"))
    return { src: "/images/charpente-neuve.jpg", side: "left" };
  if (h.includes("rénovation et renforcement"))
    return { src: "/images/renovation-charpente-bois.jpg", side: "right" };
  if (h.includes("extension et surélévation"))
    return { src: "/images/extension-charpente-bois.jpg", side: "left" };
  if (h.includes("pourquoi choisir"))
    return {
      src: "/images/realisations/zone-intervention-atb-construction.jpg",
      side: "right",
      bg: "#F9EBDE",
    };
  return null;
}

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
  "creation-charpente-bois-renovation": "croquis-charpente.jpg",
  "isolation-toiture": "croquis-maison.jpg",
  "pose-changement-gouttieres-zinc": "croquis-toiture.jpg",
  "pose-remaniement-tuiles": "croquis-toiture.jpg",
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
  const isZone = (g: ContentBlock[]) =>
    g[0].type === "heading" && /zone d.intervention/i.test(g[0].text);
  const zoneGroup = groups.find(isZone) ?? null;
  const mainGroups = groups.filter((g) => !isZone(g));

  // Sections à fonds alternés (cartes types, H2, FAQ, zone)
  const sections: { kind: "cards" | "blocks" | "faq" | "zone"; blocks?: ContentBlock[] }[] = [];
  if (isCharpente) sections.push({ kind: "cards" });
  for (const g of mainGroups) sections.push({ kind: "blocks", blocks: g });
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
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
                  <div className="lg:order-1">
                    <h2 className="text-3xl font-bold text-anthracite">
                      Zone d&apos;intervention
                    </h2>
                    {zoneGroup && (
                      <div className="mt-4 [&_p]:text-foreground/70">
                        <ArticleRenderer blocks={zoneGroup.slice(1)} />
                      </div>
                    )}
                  </div>
                  <div className="lg:order-2">
                    <ZoneMap />
                  </div>
                </div>
              </div>
            </section>
          );
        }
        const head = s.blocks![0];
        const img = head.type === "heading" ? sectionImageFor(head.text) : null;
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
