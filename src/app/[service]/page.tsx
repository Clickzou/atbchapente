import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { services, site, routes } from "@/lib/site";
import { serviceContent } from "@/lib/services";
import ArticleRenderer from "@/components/ArticleRenderer";
import ZoneMap from "@/components/ZoneMap";

// URLs identiques au WordPress actuel -> aucune redirection nécessaire pour les services.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

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

      {/* Contenu */}
      <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        {body ? (
          <ArticleRenderer blocks={body} />
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
      </section>

      {/* Zone d'intervention (renforce le local + alimente le silo villes) */}
      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-anthracite">Zone d&apos;intervention</h2>
            <p className="mx-auto mt-3 max-w-2xl text-foreground/70">
              {data.title} à Toulouse et dans un rayon de 30 km (secteur Bessières).
            </p>
          </div>
          <ZoneMap />
        </div>
      </section>
    </>
  );
}
