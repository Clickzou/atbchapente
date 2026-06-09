"use client";

import { useEffect, useRef, useState, useMemo, type ReactNode } from "react";
import Link from "next/link";

// Carte de la zone découpée par commune. Recherche d'une ville (surbrillance
// clignotante), et clic sur une commune -> page "Charpentier couvreur à {Ville}".

type ZoneCommune = {
  name: string;
  slug: string;
  d: string;
  cx: number;
  cy: number;
  role?: "main" | "base";
};
type ZoneData = { width: number; height: number; communes: ZoneCommune[] };
type Hover = { name: string; cx: number; cy: number } | null;

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

// Lien cible d'une commune (Toulouse/Bessières -> accueil, sinon page ville).
const hrefFor = (c: ZoneCommune) =>
  c.role ? "/" : `/charpentier-couvreur/${c.slug}`;

// `split` : dispose le texte + la recherche + la légende dans une colonne de
// gauche et la carte à droite (centrées verticalement). Sinon : empilé, centré.
export default function ZoneMap({
  split = false,
  heading,
  intro,
}: {
  split?: boolean;
  heading?: string;
  intro?: ReactNode;
} = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ZoneData | null>(null);
  const [hover, setHover] = useState<Hover>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          fetch("/data/zone-map.json").then((r) => r.json()).then(setData).catch(() => {});
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const matches = useMemo(() => {
    if (!data || query.trim().length < 2) return [];
    const q = norm(query);
    return data.communes.filter((c) => norm(c.name).includes(q)).slice(0, 8);
  }, [data, query]);

  // Surbrillance live de la meilleure correspondance pendant la saisie.
  useEffect(() => {
    setSelected(matches.length ? matches[0].slug : null);
  }, [matches]);

  const labels = data?.communes.filter((c) => c.role) ?? [];
  const selectedCommune = data?.communes.find((c) => c.slug === selected) ?? null;

  // Recherche
  const searchEl = (
    <div className={`relative max-w-md ${split ? "" : "mx-auto"} mb-3`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Votre ville ? (ex. Bouloc, Grenade…)"
        className="w-full rounded-full border border-black/10 bg-white px-5 py-3 text-sm shadow-sm focus:border-orange focus:outline-none"
        aria-label="Rechercher votre commune"
      />
      {matches.length > 0 && query.trim().length >= 2 && (
        <ul className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-black/5 bg-white py-1 shadow-lg">
          {matches.map((c) => (
            <li key={c.slug}>
              <Link
                href={hrefFor(c)}
                onMouseEnter={() => setSelected(c.slug)}
                className="flex items-center justify-between px-4 py-2 text-sm hover:bg-muted"
              >
                <span className="font-medium text-anthracite">{c.name}</span>
                <span className="text-xs text-orange">Voir →</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  // Légende
  const legendEl = (
    <p className={`mb-4 text-sm text-foreground/60 ${split ? "" : "text-center"}`}>
      Survolez ou recherchez une commune ·{" "}
      {data ? data.communes.length : "—"} villes couvertes dans un rayon de ~30 km
      autour de Bessières
    </p>
  );

  // Carte (SVG)
  const mapEl = (
    <div
      className="relative w-full overflow-hidden rounded-2xl bg-transparent"
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
            {data.communes.map((c, i) => (
              <a key={c.slug + i} href={hrefFor(c)} aria-label={`Charpentier couvreur à ${c.name}`}>
                <path
                  d={c.d}
                  className={`zm-shape ${
                    c.role === "main" ? "is-main" : c.role === "base" ? "is-base" : ""
                  } ${selected === c.slug ? "is-selected" : ""}`}
                  onMouseEnter={() => setHover({ name: c.name, cx: c.cx, cy: c.cy })}
                />
              </a>
            ))}

            {/* Labels permanents Toulouse / Bessières */}
            {labels.map((c) => {
              const text = c.role === "base" ? `${c.name} · siège` : c.name;
              const w = text.length * 7 + 18;
              const fill = c.role === "main" ? "var(--orange)" : "var(--anthracite-dark)";
              return (
                <g key={`lbl-${c.slug}`} pointerEvents="none">
                  <circle cx={c.cx} cy={c.cy} r={4} fill="#fff" />
                  <g transform={`translate(${c.cx}, ${c.cy + 8})`}>
                    <rect x={-w / 2} y={4} width={w} height={20} rx={5} fill={fill} />
                    <text x={0} y={18} textAnchor="middle" fill="#fff" fontSize={12} fontWeight={700}>
                      {text}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Label de la commune recherchée (clignotante) */}
            {selectedCommune && !selectedCommune.role && (
              <g pointerEvents="none">
                <g transform={`translate(${selectedCommune.cx}, ${selectedCommune.cy})`}>
                  {(() => {
                    const w = selectedCommune.name.length * 7 + 18;
                    return (
                      <>
                        <rect x={-w / 2} y={-30} width={w} height={22} rx={5} fill="var(--orange-dark)" />
                        <text x={0} y={-15} textAnchor="middle" fill="#fff" fontSize={13} fontWeight={700}>
                          {selectedCommune.name}
                        </text>
                      </>
                    );
                  })()}
                </g>
              </g>
            )}

            {/* Tooltip au survol */}
            {hover && (
              <g pointerEvents="none">
                {(() => {
                  const w = Math.max(60, hover.name.length * 7 + 16);
                  const x = Math.min(data.width - w / 2 - 4, Math.max(w / 2 + 4, hover.cx));
                  const above = hover.cy > 34;
                  const y = above ? hover.cy - 30 : hover.cy + 14;
                  return (
                    <g transform={`translate(${x}, ${y})`}>
                      <rect x={-w / 2} y={0} width={w} height={22} rx={5} fill="var(--orange)" />
                      <text x={0} y={15} textAnchor="middle" fill="#fff" fontSize={13} fontWeight={700}>
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
  );

  // Disposition « split » : texte + recherche + légende à gauche, carte à droite.
  if (split) {
    return (
      <div ref={ref} className="w-full">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="lg:order-1">
            {heading && (
              <h2 className="text-3xl font-bold text-anthracite">{heading}</h2>
            )}
            {intro && (
              <div className="mt-4 [&_p]:text-foreground/70">{intro}</div>
            )}
            <div className="mt-6">
              {searchEl}
              {legendEl}
            </div>
          </div>
          <div className="lg:order-2">{mapEl}</div>
        </div>
      </div>
    );
  }

  // Disposition par défaut : empilée et centrée.
  return (
    <div ref={ref} className="mx-auto w-full max-w-3xl">
      {searchEl}
      {legendEl}
      {mapEl}
    </div>
  );
}
