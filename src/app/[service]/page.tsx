import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { services, site, routes } from "@/lib/site";

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

  return (
    <>
      {/* En-tête de page */}
      <section className="relative overflow-hidden bg-anthracite-dark text-white">
        <Image src={data.image} alt="" fill className="object-cover opacity-25" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <nav className="mb-4 text-sm text-white/60">
            <Link href="/" className="hover:text-orange">
              Accueil
            </Link>{" "}
            / <span className="text-white/90">{data.title}</span>
          </nav>
          <h1 className="max-w-3xl text-4xl font-bold sm:text-5xl">{data.heading}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{data.excerpt}</p>
        </div>
      </section>

      {/* Contenu — placeholder, sera remplacé par le texte réel issu du .wpress */}
      <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <div className="prose prose-neutral max-w-none">
          <p className="text-foreground/80">
            {site.name} réalise vos travaux de {data.title.toLowerCase()} {site.zone}.
            Cette page reprendra le contenu détaillé du service (descriptif,
            étapes, matériaux, exemples) issu du site actuel.
          </p>
          <p className="mt-4 rounded-lg border border-orange/30 bg-orange/5 p-4 text-sm text-foreground/70">
            ⚙️ Contenu de démonstration — à remplacer par le texte réel une fois
            l&apos;export WordPress fourni.
          </p>
        </div>

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
    </>
  );
}
