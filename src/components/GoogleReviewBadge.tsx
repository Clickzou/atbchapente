import { site } from "@/lib/site";

// Badge « Avis Google 5 étoiles » cliquable vers la fiche GMB. Conçu pour les
// headers sombres (texte blanc). Étoiles dorées pleines.
export default function GoogleReviewBadge() {
  return (
    <a
      href={site.reviews.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-fit items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/20"
      aria-label={`Avis Google ${site.reviews.rating} sur 5 — voir la fiche`}
    >
      <span className="flex gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.02 6.09 20.16l1.13-6.57L2.45 8.94l6.6-.96z" />
          </svg>
        ))}
      </span>
      <span className="text-sm font-semibold text-white">
        {site.reviews.rating} · Avis Google certifiés
      </span>
    </a>
  );
}
