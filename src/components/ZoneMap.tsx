"use client";

// Carte interactive de la zone d'intervention autour de Toulouse.
// Les communes sont positionnées selon leurs coordonnées réelles (projection
// simple corrigée en longitude). Au survol d'un point, le nom de la ville
// apparaît. Toulouse est mise en avant avec un halo.

type Commune = { name: string; lat: number; lng: number; main?: boolean };

const COMMUNES: Commune[] = [
  { name: "Toulouse", lat: 43.6045, lng: 1.444, main: true },
  { name: "L'Union", lat: 43.6553, lng: 1.4869 },
  { name: "Saint-Jean", lat: 43.6586, lng: 1.5006 },
  { name: "Balma", lat: 43.6107, lng: 1.4998 },
  { name: "Montrabé", lat: 43.6406, lng: 1.5347 },
  { name: "Castelmaurou", lat: 43.6669, lng: 1.5419 },
  { name: "Montastruc-la-Conseillère", lat: 43.6936, lng: 1.5736 },
  { name: "Verfeil", lat: 43.6553, lng: 1.65 },
  { name: "Saint-Sulpice-la-Pointe", lat: 43.7722, lng: 1.69 },
  { name: "Buzet-sur-Tarn", lat: 43.7733, lng: 1.5378 },
  { name: "Bessières", lat: 43.7969, lng: 1.6028 },
  { name: "Villemur-sur-Tarn", lat: 43.8678, lng: 1.5025 },
  { name: "Fronton", lat: 43.8389, lng: 1.3889 },
  { name: "Castelnau-d'Estrétefonds", lat: 43.805, lng: 1.345 },
  { name: "Grenade", lat: 43.7728, lng: 1.2964 },
  { name: "Montauban", lat: 44.0181, lng: 1.355 },
];

// Projection (équirectangulaire corrigée). Marges en % pour l'aération.
const LAT_MID = 43.8;
const K = Math.cos((LAT_MID * Math.PI) / 180);
const PAD = 10;

const projected = COMMUNES.map((c) => ({ ...c, px: c.lng * K, py: c.lat }));
const xs = projected.map((p) => p.px);
const ys = projected.map((p) => p.py);
const minX = Math.min(...xs);
const maxX = Math.max(...xs);
const minY = Math.min(...ys);
const maxY = Math.max(...ys);

function pos(p: { px: number; py: number }) {
  const fx = (p.px - minX) / (maxX - minX);
  const fy = (maxY - p.py) / (maxY - minY); // nord en haut
  return {
    left: PAD + fx * (100 - 2 * PAD),
    top: PAD + fy * (100 - 2 * PAD),
  };
}

const points = projected.map((p) => ({ ...p, ...pos(p) }));
const toulouse = points.find((p) => p.main)!;

export default function ZoneMap() {
  return (
    <div className="relative mx-auto aspect-[5/6] w-full max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-br from-muted to-white ring-1 ring-black/5 sm:aspect-[4/5]">
      {/* trame de fond façon carte */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(58,58,60,0.12) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* lignes rayonnant depuis Toulouse + cercles de zone */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <circle
          cx={toulouse.left}
          cy={toulouse.top}
          r="22"
          fill="none"
          stroke="var(--color-orange)"
          strokeWidth="0.25"
          strokeDasharray="1.5 1.5"
          opacity="0.45"
        />
        <circle
          cx={toulouse.left}
          cy={toulouse.top}
          r="40"
          fill="none"
          stroke="var(--color-orange)"
          strokeWidth="0.25"
          strokeDasharray="1.5 1.5"
          opacity="0.3"
        />
        {points
          .filter((p) => !p.main)
          .map((p) => (
            <line
              key={p.name}
              x1={toulouse.left}
              y1={toulouse.top}
              x2={p.left}
              y2={p.top}
              stroke="var(--color-orange)"
              strokeWidth="0.3"
              opacity="0.25"
            />
          ))}
      </svg>

      {/* marqueurs */}
      {points.map((p) => (
        <div
          key={p.name}
          className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${p.left}%`, top: `${p.top}%` }}
        >
          {p.main ? (
            <>
              {/* Toulouse : halo + point + label permanent */}
              <span className="absolute left-1/2 top-1/2 -z-10 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-orange/30" />
              <span className="block h-4 w-4 rounded-full bg-orange ring-4 ring-orange/25" />
              <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-anthracite px-2 py-0.5 text-xs font-semibold text-white">
                Toulouse
              </span>
            </>
          ) : (
            <button
              type="button"
              className="block cursor-default"
              aria-label={p.name}
            >
              <span className="block h-3 w-3 rounded-full bg-orange/80 ring-2 ring-white transition-transform group-hover:scale-125 group-focus:scale-125" />
              <span className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-anthracite px-2 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus:opacity-100">
                {p.name}
              </span>
            </button>
          )}
        </div>
      ))}

      {/* légende */}
      <div className="absolute bottom-3 left-3 rounded-md bg-white/80 px-3 py-1.5 text-xs text-foreground/70 backdrop-blur">
        Survolez une ville · rayon ~30 km autour de Toulouse
      </div>
    </div>
  );
}
