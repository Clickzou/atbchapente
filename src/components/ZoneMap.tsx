"use client";

import { useEffect, useRef, useState } from "react";

// Carte de la zone d'intervention découpée PAR COMMUNE (façon Securinfor).
// Toutes les communes dans 30 km autour de Bessières, contours réels.
// Au survol d'une commune : surbrillance + nom. Données chargées à la volée.

type ZoneCommune = {
  name: string;
  d: string;
  cx: number;
  cy: number;
  role?: "main" | "base";
  big?: boolean;
};
type ZoneData = { width: number; height: number; communes: ZoneCommune[] };

type Hover = { name: string; cx: number; cy: number } | null;

export default function ZoneMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ZoneData | null>(null);
  const [hover, setHover] = useState<Hover>(null);

  // Chargement à la volée quand la section approche de l'écran.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          fetch("/data/zone-map.json")
            .then((r) => r.json())
            .then(setData)
            .catch(() => {});
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const labels = data?.communes.filter((c) => c.role || c.big) ?? [];

  return (
    <div ref={ref} className="mx-auto w-full max-w-3xl">
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-white ring-1 ring-black/5"
        style={{ aspectRatio: data ? `${data.width} / ${data.height}` : "1 / 1" }}
      >
        {!data && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-foreground/40">
            Chargement de la carte…
          </div>
        )}

        {data && (
          <svg
            viewBox={`0 0 ${data.width} ${data.height}`}
            className="block h-full w-full"
            role="img"
            aria-label="Carte de la zone d'intervention : communes dans 30 km autour de Bessières"
            onMouseLeave={() => setHover(null)}
          >
            {/* Communes */}
            {data.communes.map((c, i) => (
              <path
                key={c.name + i}
                d={c.d}
                className={`zm-shape ${
                  c.role === "main" ? "is-main" : c.role === "base" ? "is-base" : ""
                }`}
                onMouseEnter={() => setHover({ name: c.name, cx: c.cx, cy: c.cy })}
              />
            ))}

            {/* Labels permanents — grandes villes (texte) + Toulouse/Bessières (pastille) */}
            {labels.map((c) => {
              if (c.role) {
                const text = c.role === "base" ? `${c.name} · siège` : c.name;
                const w = text.length * 7 + 18;
                const fill = c.role === "main" ? "var(--orange)" : "var(--anthracite-dark)";
                return (
                  <g key={`lbl-${c.name}`} pointerEvents="none">
                    <circle cx={c.cx} cy={c.cy} r={4} fill="#fff" />
                    <g transform={`translate(${c.cx}, ${c.cy + 8})`}>
                      <rect x={-w / 2} y={4} width={w} height={20} rx={5} fill={fill} />
                      <text x={0} y={18} textAnchor="middle" fill="#fff" fontSize={12} fontWeight={700}>
                        {text}
                      </text>
                    </g>
                  </g>
                );
              }
              // grande ville : libellé texte contouré, lisible sur la carte
              return (
                <text
                  key={`lbl-${c.name}`}
                  className="zm-biglabel"
                  x={c.cx}
                  y={c.cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  pointerEvents="none"
                >
                  {c.name}
                </text>
              );
            })}

            {/* Tooltip au survol */}
            {hover && (
              <g pointerEvents="none">
                {(() => {
                  const w = Math.max(60, hover.name.length * 7 + 16);
                  const x = Math.min(
                    data.width - w / 2 - 4,
                    Math.max(w / 2 + 4, hover.cx),
                  );
                  const above = hover.cy > 34;
                  const y = above ? hover.cy - 30 : hover.cy + 14;
                  return (
                    <g transform={`translate(${x}, ${y})`}>
                      <rect
                        x={-w / 2}
                        y={0}
                        width={w}
                        height={22}
                        rx={5}
                        fill="var(--orange)"
                      />
                      <text
                        x={0}
                        y={15}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize={13}
                        fontWeight={700}
                      >
                        {hover.name}
                      </text>
                    </g>
                  );
                })()}
              </g>
            )}
          </svg>
        )}
      </div>

      <p className="mt-4 text-center text-sm text-foreground/60">
        Survolez une commune · {data ? data.communes.length : "—"} villes couvertes dans
        un rayon de ~30 km autour de Bessières
      </p>
    </div>
  );
}
