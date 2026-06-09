import Link from "next/link";
import Image from "next/image";
import { services, communes, site, routes } from "@/lib/site";
import HeroSlider from "@/components/HeroSlider";
import BlueprintBackground from "@/components/BlueprintBackground";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      {/* HERO — diaporama plein écran, un slide par service */}
      <HeroSlider />

      {/* SERVICES */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/60 to-white py-20">
        <BlueprintBackground />
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal className="reveal-stagger mb-12 text-center">
            <h2 className="text-3xl font-bold text-anthracite">Nos prestations</h2>
            <p className="mx-auto mt-3 max-w-2xl text-foreground/70">
              Un interlocuteur unique pour l&apos;ensemble de vos travaux de toiture.
            </p>
          </Reveal>
          <Reveal className="reveal-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="group overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-anthracite group-hover:text-orange">
                  {s.heading}
                </h3>
                <p className="mt-2 text-sm text-foreground/70">{s.excerpt}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-orange">
                  En savoir plus →
                </span>
              </div>
            </Link>
          ))}
          </Reveal>
        </div>
      </section>

      {/* A PROPOS */}
      <section className="bg-muted">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 lg:grid-cols-2 lg:px-8">
          <div className="relative h-80 overflow-hidden rounded-xl lg:h-96">
            <Image
              src="/images/axel-fondateur.webp"
              alt="Axel, fondateur d'ATB Charpente"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-anthracite">
              Un artisan charpentier de proximité
            </h2>
            <p className="mt-4 text-foreground/80">
              Fondée par Axel, ATB Charpente met son savoir-faire au service des
              particuliers et professionnels {site.zone}. De la charpente
              traditionnelle à la couverture en passant par la zinguerie, chaque
              chantier est mené avec rigueur et passion du travail bien fait.
            </p>
            <p className="mt-4 text-foreground/80">
              Devis gratuit, conseils personnalisés et accompagnement de A à Z.
            </p>
            <Link
              href={routes.contact}
              className="mt-6 inline-block rounded-full bg-orange px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-dark"
            >
              Contactez-nous
            </Link>
          </div>
        </div>
      </section>

      {/* ZONE D'INTERVENTION */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-anthracite">Zone d&apos;intervention</h2>
          <p className="mx-auto mt-3 max-w-2xl text-foreground/70">
            ATB Charpente intervient à Toulouse et dans un rayon de 30 km (secteur
            Bessières).
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {communes.map((c) => (
            <span
              key={c}
              className="rounded-full border border-black/5 bg-muted px-4 py-2 text-sm text-anthracite"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-anthracite-dark">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-14 text-center lg:flex-row lg:px-8 lg:text-left">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Un projet de charpente ou de toiture ?
            </h2>
            <p className="mt-2 text-white/70">
              Contactez-nous pour un devis gratuit et sans engagement.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href={site.contact.phoneHref}
              className="rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white hover:bg-white/10"
            >
              {site.contact.phone}
            </a>
            <Link
              href={routes.contact}
              className="rounded-full bg-orange px-7 py-3.5 font-semibold text-white hover:bg-orange-dark"
            >
              Devis gratuit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
