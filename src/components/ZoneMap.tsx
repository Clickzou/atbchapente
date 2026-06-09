"use client";

import { useEffect, useRef } from "react";
import { zoneMap } from "@/lib/zone-map-data";

// Carte vectorielle stylisée (façon Securinfor) : silhouette réelle de la
// Haute-Garonne + communes qui rayonnent depuis Toulouse. Au survol d'une
// commune, son nom s'affiche. Animations déclenchées à l'entrée à l'écran.

const { width: W, height: H, path, communes } = zoneMap;
const toulouse = communes.find((c) => c.main)!;

type Pt = { name: string; x: number; y: number; main?: boolean };

function bezier(a: Pt, b: Pt) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy) || 1;
  const curv = Math.min(dist * 0.14, 48);
  const cx = (a.x + b.x) / 2 + (-dy / dist) * curv;
  const cy = (a.y + b.y) / 2 + (dx / dist) * curv;
  return `M${a.x},${a.y} Q${cx.toFixed(1)},${cy.toFixed(1)} ${b.x},${b.y}`;
}

const others = communes.filter((c) => !c.main);

export default function ZoneMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) el.classList.toggle("is-visible", e.isIntersecting);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="atb-zone mx-auto w-full max-w-2xl">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Carte de la zone d'intervention autour de Toulouse (Haute-Garonne)"
      >
        {/* Silhouette de la Haute-Garonne */}
        <path
          d={path}
          fill="var(--anthracite)"
          stroke="#ffffff"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* Courbes rayonnant depuis Toulouse */}
        {others.map((c, i) => (
          <path
            key={`l-${c.name}`}
            className="zm-line"
            d={bezier(toulouse, c)}
            fill="none"
            stroke="var(--orange)"
            strokeWidth={1.4}
            strokeLinecap="round"
            style={{ animationDelay: `${0.3 + i * 0.08}s` }}
          />
        ))}

        {/* Communes (point + étiquette au survol) */}
        {others.map((c, i) => {
          const tw = c.name.length * 6.7 + 18;
          const flip = c.y < 46; // étiquette dessous si trop haut
          return (
            <g key={c.name} className="zm-commune" tabIndex={0}>
              <circle
                className="zm-dot"
                cx={c.x}
                cy={c.y}
                r={4.5}
                fill="var(--orange)"
                stroke="#fff"
                strokeWidth={1.5}
                style={{ animationDelay: `${0.9 + i * 0.08}s` }}
              />
              <g className="zm-tip" transform={`translate(${c.x}, ${c.y})`}>
                <rect
                  x={-tw / 2}
                  y={flip ? 12 : -34}
                  width={tw}
                  height={22}
                  rx={5}
                  fill="var(--anthracite-dark)"
                />
                <text
                  x={0}
                  y={flip ? 27 : -19}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize={13}
                  fontWeight={600}
                >
                  {c.name}
                </text>
              </g>
            </g>
          );
        })}

        {/* Toulouse : halo + repère charpente + label permanent */}
        <circle className="zm-halo" cx={toulouse.x} cy={toulouse.y} r={10} fill="var(--orange)" />
        <path
          d={`M${toulouse.x - 10},${toulouse.y + 4} L${toulouse.x},${toulouse.y - 9} L${toulouse.x + 10},${toulouse.y + 4} Z`}
          fill="var(--orange)"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
        <g transform={`translate(${toulouse.x}, ${toulouse.y})`}>
          <rect x={-34} y={10} width={68} height={22} rx={5} fill="var(--orange)" />
          <text x={0} y={25} textAnchor="middle" fill="#fff" fontSize={13} fontWeight={700}>
            Toulouse
          </text>
        </g>
      </svg>

      <p className="mt-4 text-center text-sm text-foreground/60">
        Survolez une ville · intervention dans un rayon de ~30 km autour de Toulouse
      </p>
    </div>
  );
}
