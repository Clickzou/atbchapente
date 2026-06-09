import Link from "next/link";
import Image from "next/image";
import { site, routes } from "@/lib/site";
import HeroSlider from "@/components/HeroSlider";
import ServicesCarousel from "@/components/ServicesCarousel";
import BlueprintBackground from "@/components/BlueprintBackground";
import Reveal from "@/components/Reveal";
import ZoneMap from "@/components/ZoneMap";

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
        </div>
        {/* Carrousel pleine largeur */}
        <div className="relative z-10 mt-4">
          <ServicesCarousel />
        </div>
      </section>

      {/* A PROPOS */}
      <section className="bg-muted">
        <Reveal className="reveal-stagger mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 lg:grid-cols-2 lg:gap-16 lg:px-8">
          {/* Visuel encadré + carte flottante */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -left-4 -top-4 h-full w-full rounded-2xl border-2 border-orange/40"
            />
            <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-xl lg:h-[520px]">
              <Image
                src="/images/axel-fondateur.webp"
                alt="Axel, fondateur d'ATB Charpente"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lg ring-1 ring-black/5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange/10 text-orange">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" strokeLinejoin="round" />
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold text-anthracite">Garantie décennale</p>
                <p className="text-xs text-foreground/60">Artisan assuré & qualifié</p>
              </div>
            </div>
          </div>

          {/* Texte */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange">
              À propos
            </p>
            <h2 className="text-3xl font-bold text-anthracite sm:text-4xl">
              Un artisan charpentier de proximité
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground/80">
              Fondée par Axel, ATB Charpente met son savoir-faire au service des
              particuliers et professionnels {site.zone}. De la charpente
              traditionnelle à la couverture en passant par la zinguerie, chaque
              chantier est mené avec rigueur et passion du travail bien fait.
            </p>

            <ul className="mt-7 grid gap-3">
              {[
                "Charpente, couverture & zinguerie",
                "Un interlocuteur unique, de A à Z",
                "Travail soigné & sur-mesure",
                "Devis gratuit & conseils personnalisés",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-foreground/85">
                  <svg
                    className="mt-0.5 shrink-0 text-orange"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                href={routes.contact}
                className="inline-block rounded-full bg-orange px-7 py-3.5 font-semibold text-white transition-colors hover:bg-orange-dark"
              >
                Contactez-nous
              </Link>
              <a
                href={site.contact.phoneHref}
                className="font-semibold text-anthracite transition-colors hover:text-orange"
              >
                {site.contact.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ZONE D'INTERVENTION */}
      <section className="relative overflow-hidden py-20">
        {/* Croquis décoratifs de part et d'autre de la carte (grand écran) */}
        <Image
          src="/images/croquis-toiture.jpg"
          alt=""
          width={520}
          height={400}
          className="pointer-events-none absolute left-[50px] top-[calc(50%-50px)] hidden w-[24%] max-w-sm -translate-y-1/2 opacity-20 lg:block"
        />
        <Image
          src="/images/croquis-pergola.jpg"
          alt=""
          width={520}
          height={400}
          className="pointer-events-none absolute right-[80px] top-[calc(50%+50px)] hidden w-[24%] max-w-sm -translate-y-1/2 opacity-20 lg:block"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-anthracite">Zone d&apos;intervention</h2>
            <p className="mx-auto mt-3 max-w-2xl text-foreground/70">
              ATB Charpente intervient à Toulouse et dans un rayon de 30 km (secteur
              Bessières).
            </p>
          </div>
          {/* Carte interactive de la zone (découpée par commune) */}
          <ZoneMap />
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
