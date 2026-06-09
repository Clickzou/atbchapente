import Link from "next/link";
import Image from "next/image";
import { site, routes } from "@/lib/site";
import HeroSlider from "@/components/HeroSlider";
import ServicesCarousel from "@/components/ServicesCarousel";
import ContactForm from "@/components/ContactForm";

const faq = [
  {
    q: "Quels travaux de toiture réalise ATB Charpente ?",
    a: "Nous réalisons la création et la rénovation de charpente bois, la couverture et le remaniement de tuiles, la pose et le changement de gouttières zinc, l'isolation de toiture, la pose de fenêtres de toit et la création de pergolas en bois.",
  },
  {
    q: "Dans quel secteur intervenez-vous autour de Toulouse ?",
    a: "ATB Charpente intervient à Toulouse et dans un rayon de 30 km autour de Bessières, soit près de 180 communes (L'Union, Balma, Grenade, Fronton, Saint-Sulpice-la-Pointe…).",
  },
  {
    q: "Le devis est-il gratuit ?",
    a: "Oui. Chaque devis est gratuit, détaillé et sans engagement. Nous nous déplaçons pour évaluer votre projet et vous conseiller.",
  },
  {
    q: "Êtes-vous couverts par une garantie décennale ?",
    a: "Oui, ATB Charpente est un artisan assuré et qualifié : tous nos travaux sont couverts par la garantie décennale.",
  },
  {
    q: "Combien de temps dure une rénovation de toiture ?",
    a: "De quelques jours pour une intervention ciblée (traitement, remaniement) à environ deux semaines pour une rénovation complète, selon l'ampleur du chantier.",
  },
  {
    q: "Quel budget prévoir pour une charpente ou une réfection de toiture ?",
    a: "Le prix dépend de la surface, des matériaux et de l'état existant. Seul un devis sur mesure, après visite, permet de donner un chiffre fiable — il est gratuit.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
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
          className="pointer-events-none absolute left-[50px] top-[calc(50%-50px)] hidden w-[29%] max-w-md -translate-y-1/2 opacity-20 lg:block"
        />
        <Image
          src="/images/croquis-pergola.jpg"
          alt=""
          width={520}
          height={400}
          className="pointer-events-none absolute right-[80px] top-[calc(50%+100px)] hidden w-[29%] max-w-md -translate-y-1/2 opacity-20 lg:block"
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

      {/* FAQ */}
      <section className="bg-muted">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange">
              FAQ
            </p>
            <h2 className="text-3xl font-bold text-anthracite">Questions fréquentes</h2>
          </div>
          <div className="space-y-3">
            {faq.map((f) => (
              <details
                key={f.q}
                className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"
              >
                <summary className="cursor-pointer font-semibold text-anthracite">
                  {f.q}
                </summary>
                <p className="mt-3 text-foreground/80">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="relative overflow-hidden bg-anthracite-dark">
        <Image
          src="/images/realisations/creation-charpente.jpg"
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
              Vous avez une question ?
              <br />
              Nous pouvons vous aider !
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
