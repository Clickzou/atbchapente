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

// Notre méthode (déroulé d'un chantier en 4 étapes).
const STEPS = [
  {
    title: "Étude & visite",
    text: "On échange sur votre projet et nous nous déplaçons pour évaluer votre toiture sur place.",
    icon: "M21 21l-4.3-4.3M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z",
  },
  {
    title: "Devis détaillé",
    text: "Un chiffrage clair, gratuit et sans engagement, avec les matériaux et le calendrier.",
    icon: "M9 12h6M9 16h6M9 8h2M7 3h7l4 4v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z",
  },
  {
    title: "Réalisation",
    text: "Un chantier soigné, propre et tenu dans les délais, mené par un interlocuteur unique.",
    icon: "M14 7l3 3M5 19l9-9 3 3-9 9H5v-3zM14 7l2-2a1.4 1.4 0 0 1 2 0l1 1a1.4 1.4 0 0 1 0 2l-2 2",
  },
  {
    title: "Réception & garantie",
    text: "Contrôle final de l'étanchéité et de la pose, puis remise de votre garantie décennale.",
    icon: "M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3zM9 12l2 2 4-4",
  },
];

// Avis clients. TODO: remplacer par de vrais avis (copier depuis la fiche Google).
// Laisser vide tant qu'aucun avis réel n'est disponible (on n'invente pas d'avis).
const TESTIMONIALS: { name: string; place: string; text: string }[] = [];
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

      {/* SEO — Charpentier couvreur à Toulouse (texte + lien cornerstone) */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange">
                Charpentier couvreur à Toulouse
              </p>
              <h2 className="text-3xl font-bold text-anthracite sm:text-4xl">
                Un savoir-faire complet pour votre toiture à Toulouse
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-foreground/80">
                <p>
                  À Toulouse comme dans toute la métropole, votre toit doit composer
                  avec un climat exigeant : fortes chaleurs estivales, orages et coups
                  de vent d&apos;autan. En tant que <strong>charpentier couvreur à
                  Toulouse</strong>, ATB Charpente conçoit, monte et rénove des
                  charpentes bois solides et des couvertures durables, adaptées au bâti
                  local — de la brique foraine aux tuiles canal et romanes du Sud-Ouest.
                </p>
                <p>
                  Charpente traditionnelle ou ossature bois, réfection de toiture,
                  zinguerie zinc, isolation, fenêtres de toit et pergolas : nous
                  réunissons l&apos;ensemble des métiers de la toiture sous la
                  responsabilité d&apos;un interlocuteur unique, avec garantie décennale
                  et respect des règles d&apos;urbanisme (PLU, Architectes des Bâtiments
                  de France) propres à la Haute-Garonne.
                </p>
              </div>
              <Link
                href={routes.cornerstone}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange px-7 py-3.5 font-semibold text-white transition-colors hover:bg-orange-dark"
              >
                Tout savoir : charpentier à Toulouse →
              </Link>
            </div>
            <ul className="grid gap-3">
              {[
                "Charpente bois : neuf, rénovation, extension & surélévation",
                "Couverture & remaniement de tuiles, démoussage",
                "Zinguerie zinc : gouttières, descentes, solins",
                "Isolation de toiture, fenêtres de toit & pergolas",
                "Artisan local, devis gratuit & garantie décennale",
              ].map((item) => (
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
          </div>
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

            <div className="mt-9">
              <Link
                href={routes.realisations}
                className="inline-block rounded-full bg-orange px-7 py-3.5 font-semibold text-white transition-colors hover:bg-orange-dark"
              >
                Découvrez nos réalisations
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* MÉTHODE — déroulé d'un chantier en 4 étapes */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange">
              Notre méthode
            </p>
            <h2 className="text-3xl font-bold text-anthracite sm:text-4xl">
              De votre idée à un toit livré, en 4 étapes
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className="relative flex flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
              >
                <span className="absolute right-5 top-5 text-4xl font-bold text-orange/15">
                  {i + 1}
                </span>
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange/10 text-orange">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.icon} />
                  </svg>
                </span>
                <h3 className="font-semibold text-anthracite">{s.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVIS — note Google réelle + témoignages (si disponibles) */}
      <section className="bg-muted">
        <div className="mx-auto max-w-5xl px-4 py-20 lg:px-8">
          <div className="text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange">
              Avis clients
            </p>
            <h2 className="text-3xl font-bold text-anthracite sm:text-4xl">
              Ils nous font confiance
            </h2>
            <a
              href={site.reviews.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-5 py-2.5 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.02 6.09 20.16l1.13-6.57L2.45 8.94l6.6-.96z" />
                  </svg>
                ))}
              </span>
              <span className="text-sm font-semibold text-anthracite">
                {site.reviews.rating} sur Google
              </span>
            </a>
          </div>

          {TESTIMONIALS.length > 0 && (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <figure
                  key={t.name}
                  className="flex flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
                >
                  <span className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M12 2l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.02 6.09 20.16l1.13-6.57L2.45 8.94l6.6-.96z" />
                      </svg>
                    ))}
                  </span>
                  <blockquote className="mt-3 flex-1 text-sm text-foreground/80">
                    « {t.text} »
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-anthracite">
                    {t.name}
                    <span className="font-normal text-foreground/60"> · {t.place}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
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
