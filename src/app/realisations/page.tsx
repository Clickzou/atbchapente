import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Découvrez en photos les réalisations d'ATB Charpente : charpentes, couverture, tuiles, gouttières zinc, isolation et pergolas.",
  alternates: { canonical: "/realisations" },
};

function getPhotos() {
  const dir = path.join(process.cwd(), "public", "images", "realisations");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
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
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Nos réalisations</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Un aperçu de nos chantiers de charpente, couverture et zinguerie
            réalisés {site.zone}.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((file, i) => (
            <div
              key={file}
              className="relative aspect-square overflow-hidden rounded-lg bg-muted"
            >
              <Image
                src={`/images/realisations/${file}`}
                alt={`Réalisation ATB Charpente ${i + 1}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading={i < 8 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-orange px-7 py-3.5 font-semibold text-white transition-colors hover:bg-orange-dark"
          >
            Demander un devis gratuit
          </Link>
        </div>
      </section>
    </>
  );
}
