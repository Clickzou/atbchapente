"use client";

import { useRef } from "react";
import Image from "next/image";

export type PhotoCard = { src: string; alt: string; title: string };

// Carrousel horizontal de cartes photo + légende (défilement tactile + flèches).
export default function PhotoCarousel({ items }: { items: PhotoCard[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it) => (
          <div
            key={it.title}
            data-card
            className="group flex w-[80%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm sm:w-[46%] md:w-[38%] lg:w-[31%]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={it.src}
                alt={it.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 80vw, 24rem"
              />
            </div>
            <p className="p-5 text-sm font-medium text-anthracite">{it.title}</p>
          </div>
        ))}
      </div>

      {/* Flèches (desktop) */}
      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Précédent"
        className="absolute left-2 top-[38%] hidden -translate-y-1/2 rounded-full bg-white p-3 text-anthracite shadow-lg ring-1 ring-black/5 transition-colors hover:text-orange lg:block"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Suivant"
        className="absolute right-2 top-[38%] hidden -translate-y-1/2 rounded-full bg-white p-3 text-anthracite shadow-lg ring-1 ring-black/5 transition-colors hover:text-orange lg:block"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
