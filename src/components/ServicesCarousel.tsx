"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/site";

// Carrousel pleine largeur des prestations (défilement horizontal + flèches).
export default function ServicesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : 360;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4 lg:px-[100px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/${s.slug}`}
            data-card
            className="group flex w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-md sm:w-[46%] lg:w-[calc((100%-4.5rem)/4)]"
          >
            <div className="relative h-52 overflow-hidden">
              <Image
                src={s.image}
                alt={s.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 82vw, 24rem"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-semibold text-anthracite group-hover:text-orange">
                {s.heading}
              </h3>
              <p className="mt-2 flex-1 text-sm text-foreground/70">{s.excerpt}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-orange">
                En savoir plus →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Flèches */}
      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Précédent"
        className="absolute left-[58px] top-1/2 hidden -translate-y-1/2 rounded-full bg-white p-3 text-anthracite shadow-lg ring-1 ring-black/5 transition-colors hover:text-orange lg:block"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Suivant"
        className="absolute right-[58px] top-1/2 hidden -translate-y-1/2 rounded-full bg-white p-3 text-anthracite shadow-lg ring-1 ring-black/5 transition-colors hover:text-orange lg:block"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
