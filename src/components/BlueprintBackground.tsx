"use client";

import { useEffect, useRef } from "react";

// Fond « plan d'architecte » : esquisse de charpente (ferme, poutres, pannes,
// chevrons) + plan de toiture + lignes de cotation + repères techniques, qui se
// dessinent progressivement. Parallaxe douce au scroll (JS natif). Décoratif.
export default function BlueprintBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Déclenche (et rejoue) le tracé quand la section entre dans l'écran.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          el.classList.toggle("is-visible", e.isIntersecting);
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => io.disconnect();
    }

    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = window.innerHeight / 2 - center; // <0 au-dessus, >0 en dessous
      const shift = Math.max(-30, Math.min(30, offset * 0.05));
      el.style.setProperty("--bp-shift", `${shift.toFixed(1)}px`);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="atb-blueprint-bg" aria-hidden>
      <div className="bp-parallax">
        <svg
          viewBox="0 0 1440 600"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* ── Structure principale : grande ferme de charpente (décentrée) ── */}
          <g
            className="bp-main"
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
          >
            <path d="M780 440 H1320" />
            <path d="M780 451 H1320" />
            <path d="M780 440 L1050 150" />
            <path d="M1320 440 L1050 150" />
            <path d="M1050 150 V440" />
            <path d="M1050 440 L905 295" />
            <path d="M1050 440 L1195 295" />
          </g>

          {/* ── Lignes secondaires : pannes, plan de toiture, chevrons, axes ── */}
          <g
            className="bp-secondary"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          >
            {/* pannes (parallèles à l'entrait) */}
            <path d="M855 360 H1245" />
            <path d="M938 270 H1162" />
            <path d="M1013 190 H1037" />

            {/* plan de toiture en vue de dessus (chevrons + arêtiers) */}
            <path d="M120 520 H540 V300 H120 Z" />
            <path d="M120 410 H540" />
            <path d="M180 300 V520" />
            <path d="M240 300 V520" />
            <path d="M300 300 V520" />
            <path d="M360 300 V520" />
            <path d="M420 300 V520" />
            <path d="M480 300 V520" />
            <path d="M120 300 L210 410" />
            <path d="M540 300 L450 410" />
            <path d="M120 520 L210 410" />
            <path d="M540 520 L450 410" />

            {/* axes / repères du plan de travail */}
            <path d="M0 545 H1440" />
            <path d="M1385 60 V560" />
          </g>

          {/* ── Cotation : lignes de mesure et flèches ── */}
          <g
            className="bp-dim"
            strokeWidth="0.9"
            vectorEffect="non-scaling-stroke"
          >
            {/* cote horizontale sous la ferme */}
            <path d="M780 452 V492" />
            <path d="M1320 452 V492" />
            <path d="M790 482 H1310" />
            <path d="M790 482 l12 -5 M790 482 l12 5" />
            <path d="M1310 482 l-12 -5 M1310 482 l-12 5" />

            {/* cote verticale (hauteur de ferme) */}
            <path d="M736 150 H772" />
            <path d="M736 440 H772" />
            <path d="M748 160 V430" />
            <path d="M748 160 l-5 12 M748 160 l5 12" />
            <path d="M748 430 l-5 -12 M748 430 l5 -12" />

            {/* cote du plan de toiture */}
            <path d="M120 540 V566" />
            <path d="M540 540 V566" />
            <path d="M130 558 H530" />
            <path d="M130 558 l12 -5 M130 558 l12 5" />
            <path d="M530 558 l-12 -5 M530 558 l-12 5" />
          </g>

          {/* ── Repères techniques (cibles / nœuds) ── */}
          <g className="bp-marker" strokeWidth="1" vectorEffect="non-scaling-stroke">
            <circle cx="1050" cy="150" r="7" />
            <path d="M1040 150 H1060 M1050 140 V160" strokeWidth="0.8" />
            <circle cx="780" cy="440" r="5" />
            <circle cx="1320" cy="440" r="5" />
            <circle cx="330" cy="410" r="6" />
            <path d="M320 410 H340 M330 400 V420" strokeWidth="0.8" />
          </g>
        </svg>
      </div>
    </div>
  );
}
