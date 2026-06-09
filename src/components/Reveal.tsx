"use client";

import { useEffect, useRef } from "react";

// Animation d'entrée au scroll : ajoute la classe `is-in` quand l'élément entre
// dans l'écran (une seule fois). Le style d'apparition est porté par les classes
// CSS `reveal` (élément simple) ou `reveal-stagger` (enfants décalés), cf. globals.css.
export default function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Rejoué à chaque entrée dans l'écran. Déclenché quand la section est
    // confortablement visible (rootMargin bas négatif) pour que l'effet soit vu.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          el.classList.toggle("is-in", e.isIntersecting);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -18% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
