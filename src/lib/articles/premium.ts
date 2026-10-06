import reglage from "./articles-premium.json";
import { editorialCalendar } from "./editorial-calendar";

/**
 * Articles réservés au pack Premium (décision de JC du 06/10/2026 : ATB est au pack
 * Croissance, l'espace client Clickzou lui montre les articles rédigés pour lui mais
 * ils ne paraissent pas tant qu'il n'est pas Premium).
 *
 * Concerne UNIQUEMENT les créneaux réservés du calendrier (sujets portant `date`,
 * articles rédigés à la main par Clickzou). Les sujets automatiques du robot
 * (sans `date`) ne sont pas touchés : il continue de les rédiger et de les publier.
 *
 * Réglage : `articles-premium.json` → `"publier": true` (commit + push) pour que ces
 * articles paraissent à leur date. Un FICHIER plutôt qu'une variable Vercel : le robot
 * GitHub (`scripts/publish-next-article.mjs`) doit lire le même réglage que le site.
 */
export const PUBLICATION_ARTICLES_PREMIUM: boolean = reglage.publier === true;

const SLUGS_RESERVES = new Set(editorialCalendar.filter((t) => !!t.date).map((t) => t.slug));

/** Vrai si l'article est un créneau réservé Clickzou ET que sa publication est coupée. */
export function estReservePremium(slug: string): boolean {
  return !PUBLICATION_ARTICLES_PREMIUM && SLUGS_RESERVES.has(slug);
}
