import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import { site, routes } from "@/lib/site";
import Gallery from "@/components/Gallery";
import GoogleReviewBadge from "@/components/GoogleReviewBadge";

export const metadata: Metadata = {
  title: "Réalisations – Charpentier à Toulouse & Bessières",
  description:
    "Découvrez en photos les réalisations d'ATB Charpente à Toulouse et ses environs : charpentes, couverture, tuiles, gouttières zinc, isolation et pergolas.",
  alternates: { canonical: routes.realisations },
};

// Visuels à exclure de la galerie (ne sont pas des chantiers réels) :
// fondateur, image « zone d'intervention », photos stock (iStock), visuels FAQ.
const EXCLUDE = /^(axel|zone-|istock-|question-)/i;

function getPhotos() {
  const dir = path.join(process.cwd(), "public", "images", "realisations");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .filter((f) => !EXCLUDE.test(f))
      .sort();
  } catch {
    return [];
  }
}

export default function RealisationsPage() {
  const photos = getPhotos();

  return (
    <>
      <section className="bg-anthracite-dark text-white">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Nos réalisations</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Un aperçu de nos chantiers de charpente, couverture et zinguerie
            réalisés {site.zone}.
          </p>
          <div className="mt-6">
            <GoogleReviewBadge />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <Gallery photos={photos} />

        <div className="mt-12 text-center">
          <Link
            href={routes.contact}
            className="inline-block rounded-full bg-orange px-7 py-3.5 font-semibold text-white transition-colors hover:bg-orange-dark"
          >
            Demander un devis gratuit
          </Link>
        </div>
      </section>
    </>
  );
}
