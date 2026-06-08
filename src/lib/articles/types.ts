/* ── Définitions de types pour les articles de blog ATB Charpente ──
 * Réplique adaptée du système Clickzou (publication progressive, blocs typés). */

export type BlogCategory =
  | "Charpente"
  | "Couverture"
  | "Zinguerie"
  | "Isolation"
  | "Rénovation toiture"
  | "Pergola & extérieur"
  | "Conseils & entretien"
  | "Prix & devis"
  | "Réglementation & aides";

/** Statut de publication pour le déploiement progressif du contenu. */
export type PublishStatus = "draft" | "scheduled" | "published";

/** Intention de recherche — sert à éviter la cannibalisation. */
export type SearchIntent =
  | "informational"
  | "transactional"
  | "commercial"
  | "navigational";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "callout"; text: string; variant?: "info" | "warning" | "tip" }
  | { type: "quote"; text: string; author?: string }
  | { type: "cta"; text: string; href: string; label: string }
  | { type: "faq"; items: { question: string; answer: string }[] };

export interface BlogArticle {
  slug: string;
  title: string;
  metaTitle: string; // < 60 caractères
  metaDescription: string; // < 155 caractères
  excerpt: string;
  category: BlogCategory;
  primaryKeyword: string; // mot-clé cible (anti-cannibalisation)
  intent: SearchIntent;
  tags: string[];
  date: string; // ISO YYYY-MM-DD
  updated?: string;
  author: string;
  readTime: string;
  heroImage?: string;
  heroImageAlt?: string;
  content: ContentBlock[];
  relatedSlugs: string[]; // maillage interne
  /** Statut — défaut "published" (rétrocompatibilité). */
  status?: PublishStatus;
  /** Date de publication programmée — article masqué jusqu'à cette date (ISO). */
  publishDate?: string;
  /** noindex,follow — pour libérer le budget de crawl sur pages à faible valeur. */
  noindex?: boolean;
}

export const categoryColors: Record<BlogCategory, string> = {
  "Charpente": "bg-amber-100 text-amber-800",
  "Couverture": "bg-orange-100 text-orange-800",
  "Zinguerie": "bg-slate-100 text-slate-700",
  "Isolation": "bg-emerald-100 text-emerald-800",
  "Rénovation toiture": "bg-rose-100 text-rose-700",
  "Pergola & extérieur": "bg-lime-100 text-lime-800",
  "Conseils & entretien": "bg-sky-100 text-sky-800",
  "Prix & devis": "bg-violet-100 text-violet-700",
  "Réglementation & aides": "bg-teal-100 text-teal-800",
};
