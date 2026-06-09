// Fond animé évoquant le métier de charpentier : rangée de fermes de toit qui
// défilent lentement (effet « tracé » au chargement) + fines particules de sciure
// qui descendent. CSS/SVG pur, décoratif, derrière le contenu (aria-hidden).
const TRUSSES = Array.from({ length: 40 });

// Particules de sciure — valeurs fixes (pas d'aléatoire → pas de mismatch SSR).
const DUST = [
  { left: "8%", top: "10%", delay: "0s", dur: "9s", size: 5 },
  { left: "18%", top: "40%", delay: "2.5s", dur: "11s", size: 4 },
  { left: "27%", top: "65%", delay: "1.2s", dur: "8s", size: 6 },
  { left: "36%", top: "20%", delay: "3.5s", dur: "10s", size: 4 },
  { left: "45%", top: "55%", delay: "0.6s", dur: "12s", size: 5 },
  { left: "54%", top: "30%", delay: "2s", dur: "9s", size: 4 },
  { left: "63%", top: "70%", delay: "4s", dur: "11s", size: 6 },
  { left: "72%", top: "15%", delay: "1.6s", dur: "8.5s", size: 5 },
  { left: "81%", top: "50%", delay: "3s", dur: "10.5s", size: 4 },
  { left: "90%", top: "35%", delay: "0.9s", dur: "9.5s", size: 5 },
];

export default function TradeBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Fermes de toit (charpente) */}
      <svg
        className="absolute left-0 top-1/2 h-40 -translate-y-1/2"
        width="6400"
        height="160"
        viewBox="0 0 6400 160"
        fill="none"
      >
        <g
          className="trade-trusses"
          stroke="var(--anthracite)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.12"
        >
          {TRUSSES.map((_, i) => {
            const x = i * 160;
            return (
              <g
                key={i}
                className="trade-truss"
                style={{ animationDelay: `${(i % 10) * 0.12}s` }}
              >
                <path d={`M${x} 130 L${x + 80} 26 L${x + 160} 130`} />
                <path d={`M${x} 130 L${x + 160} 130`} />
                <path d={`M${x + 80} 26 L${x + 80} 130`} />
                <path d={`M${x + 80} 130 L${x + 40} 78`} />
                <path d={`M${x + 80} 130 L${x + 120} 78`} />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Sciure / copeaux */}
      <div className="trade-dust absolute inset-0">
        {DUST.map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-orange/50"
            style={{
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size,
              animationDelay: d.delay,
              animationDuration: d.dur,
            }}
          />
        ))}
      </div>
    </div>
  );
}
