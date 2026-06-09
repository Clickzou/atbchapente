"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { site, routes, services } from "@/lib/site";

// Diaporama plein écran : chaque slide présente UN service (image + titre + lien).
// Seul le 1er titre est un <h1> (porte le mot-clé principal) ; les autres sont des
// <div>. Tous les titres restent dans le DOM (fondu) pour préserver le H1 (SEO).
const heroTitles = [
  "Charpentier à Toulouse : création & rénovation de charpente bois",
  "Isolation de toiture à Toulouse & confort thermique",
  "Gouttières zinc & zinguerie à Toulouse",
  "Couverture & remaniement de toiture en tuiles",
  "Pose de fenêtre de toit & aménagement de combles",
  "Création de pergola en bois sur mesure",
];

const slides = services.map((s, i) => ({
  src: s.image,
  title: heroTitles[i] ?? s.heading,
  excerpt: s.excerpt,
  href: `/${s.slug}`,
  label: s.title,
}));

const DELAY = 5000;
const titleClass =
  "absolute inset-0 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl";

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const active = slides[index];

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length),
    [],
  );

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), DELAY);
    return () => clearInterval(id);
  }, [index]);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-anthracite-dark text-white">
      {/* Slides en fond */}
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-45" : "opacity-0"
          }`}
        />
      ))}

      {/* Voile dégradé pour la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-r from-anthracite-dark/85 via-anthracite-dark/45 to-transparent" />

      {/* Contenu */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 lg:px-8">
        {/* H1 unique de la page (étiquette), constant et toujours visible */}
        <h1 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange">
          {site.baseline}
        </h1>

        {/* Titres par slide (fondu) — NON sémantiques (aucun Hn) */}
        <div className="relative mb-5 min-h-[150px] sm:min-h-[190px] lg:min-h-[230px]">
          {slides.map((slide, i) => (
            <p
              key={i}
              aria-hidden={i !== index}
              className={`${titleClass} transition-opacity duration-700 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            >
              {slide.title}
            </p>
          ))}
        </div>

        {/* Accroche du service actif */}
        <p className="max-w-2xl text-lg text-white/85">{active.excerpt}</p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={active.href}
            className="rounded-full bg-orange px-7 py-3.5 font-semibold text-white transition-colors hover:bg-orange-dark"
          >
            Découvrir : {active.label}
          </Link>
          <Link
            href={routes.contact}
            className="rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            Demander un devis gratuit
          </Link>
        </div>
      </div>

      {/* Flèches */}
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Service précédent"
        className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/30 p-3 text-white backdrop-blur transition-colors hover:bg-black/50 sm:block"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Service suivant"
        className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/30 p-3 text-white backdrop-blur transition-colors hover:bg-black/50 sm:block"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Points */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Voir : ${slide.label}`}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-8 bg-orange" : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
