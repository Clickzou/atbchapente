"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

// Fond d'icônes « métier » animées (contour SVG) : dessin progressif, flottement,
// respiration d'opacité, légère rotation et parallaxe au scroll (JS natif).
// Réparties dans la section, très discrètes (opacité ~6-14 %).

type Icon = {
  paths: string[];
  top: string;
  left: string;
  size: number;
  float: number;
  breathe: number;
  draw: number;
  rot: boolean;
  speed: number;
};

const ICONS: Icon[] = [
  // Charpente traditionnelle (ferme)
  { paths: ["M6 52 L32 12 L58 52 Z", "M32 12 V52", "M32 52 L19 34", "M32 52 L45 34"], top: "13%", left: "3%", size: 96, float: 11, breathe: 8, draw: 6, rot: false, speed: 0.18 },
  // Marteau
  { paths: ["M22 16 H44 V25 H22 Z", "M33 25 L24 52"], top: "64%", left: "11%", size: 54, float: 9, breathe: 7, draw: 5, rot: true, speed: 0.26 },
  // Scie circulaire
  { paths: ["M44 32 A16 16 0 1 1 12 32 A16 16 0 1 1 44 32", "M42 28 H58 V38 H50"], top: "16%", left: "82%", size: 112, float: 13, breathe: 9, draw: 7, rot: false, speed: 0.1 },
  // Équerre de menuisier
  { paths: ["M16 14 V50 H50", "M24 22 V44 H46"], top: "72%", left: "73%", size: 70, float: 10, breathe: 6.5, draw: 5.5, rot: true, speed: 0.2 },
  // Plan de toiture
  { paths: ["M10 22 H54 V46 H10 Z", "M10 22 L32 36 L54 22", "M32 36 V46"], top: "7%", left: "47%", size: 60, float: 12, breathe: 7.5, draw: 6.5, rot: false, speed: 0.16 },
  // Maison à ossature bois
  { paths: ["M10 54 V26 L32 10 L54 26 V54 Z", "M22 54 V34", "M42 54 V34", "M12 27 L32 39 L52 27"], top: "76%", left: "37%", size: 86, float: 14, breathe: 8.5, draw: 7.5, rot: false, speed: 0.12 },
  // Poutre en bois
  { paths: ["M8 42 L48 26 L56 30 L16 46 Z", "M48 26 V34", "M16 46 V54 L56 38 V30"], top: "42%", left: "90%", size: 100, float: 9.5, breathe: 6, draw: 4.5, rot: true, speed: 0.22 },
];

export default function IconsBackground({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const icons = Array.from(root.querySelectorAll<HTMLElement>(".ai-icon"));
    let raf = 0;
    const update = () => {
      const rect = root.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = window.innerHeight / 2 - center;
      for (const el of icons) {
        const s = parseFloat(el.dataset.speed || "0");
        el.style.setProperty("--p", `${(offset * s * 0.3).toFixed(1)}px`);
      }
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`atb-icons-bg${tone === "dark" ? " is-dark" : ""}`}
      aria-hidden
      style={
        {
          "--icons-stroke": tone === "dark" ? "var(--anthracite)" : "#ffffff",
        } as CSSProperties
      }
    >
      {ICONS.map((ic, i) => {
        const iconStyle = {
          top: ic.top,
          left: ic.left,
          width: ic.size,
          height: ic.size,
          animationDuration: `${ic.breathe}s`,
        } as CSSProperties;
        const svgStyle = {
          "--dur": `${ic.draw}s`,
          "--delay": `${(i * 0.5).toFixed(1)}s`,
        } as CSSProperties;
        const inner = (
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgStyle}>
            {ic.paths.map((d, j) => (
              <path key={j} d={d} />
            ))}
          </svg>
        );
        return (
          <div key={i} className="ai-icon" data-speed={ic.speed} style={iconStyle}>
            <div className="ai-float" style={{ animationDuration: `${ic.float}s` }}>
              {ic.rot ? <div className="ai-rot">{inner}</div> : inner}
            </div>
          </div>
        );
      })}
    </div>
  );
}
