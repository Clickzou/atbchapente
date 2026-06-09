"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

// Vraie carte (Leaflet + OpenStreetMap) de la zone d'intervention autour de
// Toulouse. Chaque commune est un marqueur ; le nom s'affiche au survol.
// Toulouse est mise en avant (plus gros + label permanent).

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

export default function ZoneMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any;

    (async () => {
      const L = await import("leaflet");
      if (cancelled || !ref.current) return;

      map = L.map(ref.current, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "&copy; OpenStreetMap",
      }).addTo(map);

      // Cercle indicatif ~30 km autour de Toulouse
      const toulouse = COMMUNES.find((c) => c.main)!;
      L.circle([toulouse.lat, toulouse.lng], {
        radius: 30000,
        color: "#ed7d1a",
        weight: 1,
        fillColor: "#ed7d1a",
        fillOpacity: 0.05,
        dashArray: "6 6",
      }).addTo(map);

      for (const c of COMMUNES) {
        const marker = L.circleMarker([c.lat, c.lng], {
          radius: c.main ? 9 : 6,
          color: "#ffffff",
          weight: 2,
          fillColor: c.main ? "#d96d0f" : "#ed7d1a",
          fillOpacity: 1,
        }).addTo(map);
        marker.bindTooltip(c.name, {
          direction: "top",
          offset: [0, -6],
          permanent: !!c.main,
          className: "atb-tip",
        });
      }

      const bounds = L.latLngBounds(
        COMMUNES.map((c) => [c.lat, c.lng] as [number, number]),
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    })();

    return () => {
      cancelled = true;
      if (map) map.remove();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="z-0 h-[460px] w-full overflow-hidden rounded-2xl ring-1 ring-black/10 sm:h-[540px]"
      aria-label="Carte de la zone d'intervention autour de Toulouse"
    />
  );
}
