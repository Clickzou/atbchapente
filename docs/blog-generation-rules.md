# Règles de rédaction d'un article de blog ATB Charpente (à suivre par les agents)

Tu rédiges UN article de blog pour le site ATB Charpente (artisan charpentier-couvreur basé à Bessières, intervenant sur **Toulouse** et sa métropole). Objectif SEO : capter des requêtes **informationnelles/longue-traîne** liées à la toiture autour de Toulouse, SANS cannibaliser les pages services (ne pas sur-cibler les head terms « charpentier Toulouse », « isolation toiture Toulouse » etc. — rester sur l'angle long-tail du sujet donné).

## Fichier à créer
`src/lib/articles/posts/{slug}.ts` avec EXACTEMENT cette forme :
```ts
import type { BlogArticle } from "../types";

export const article: BlogArticle = {
  slug: "{slug}",
  title: "{title}",
  metaTitle: "...",          // < 60 caractères, contient le mot-clé
  metaDescription: "...",    // < 155 caractères, mot-clé + bénéfice + incitation
  excerpt: "...",            // 1-2 phrases d'accroche
  category: "{category}",    // valeur EXACTE fournie
  primaryKeyword: "{primaryKeyword}",
  intent: "{intent}",
  tags: ["...", "..."],      // 3 à 5 tags
  date: "2026-06-10",
  author: "ATB Charpente",
  readTime: "8 min",         // estime selon la longueur
  heroImage: "/images/blog/{slug}.jpg",
  heroImageAlt: "...",       // description de l'image
  status: "published",
  relatedSlugs: ["...", "...", "..."], // 3 slugs CONNEXES pris dans la liste fournie (jamais le slug courant)
  content: [ /* ContentBlock[] */ ],
};
```

## Type ContentBlock (déjà défini dans `../types`)
- `{ type: "paragraph"; text: string }`  — markdown **gras** supporté, PAS de liens
- `{ type: "heading"; level: 2 | 3; text: string }`
- `{ type: "list"; ordered?: boolean; items: string[] }`
- `{ type: "callout"; text: string; variant?: "info" | "warning" | "tip" }`
- `{ type: "quote"; text: string; author?: string }`
- `{ type: "cta"; text: string; href: string; label: string }`
- `{ type: "faq"; items: { question: string; answer: string }[] }`

## Exigences de contenu
- **≥ 2200 mots** dans `content` (un gate de build refuse < 2000). Vise 2200-2700.
- Structure claire en **H2/H3**, ton expert, pédagogique, rassurant, orienté artisan.
- Traite le sujet en profondeur et répond à l'intention de recherche (`informational` = guide complet ; `commercial` = comparatif/prix avec aide à la décision).
- Mentionne **Toulouse / la Haute-Garonne / le climat local / les tuiles canal du Sud-Ouest** quand c'est naturel (ancrage local), et **ATB Charpente** 1-2 fois, sans sur-optimiser.
- Inclure : 2-3 `callout` (info/warning/tip), 1 `quote` (author « L'équipe ATB Charpente »), plusieurs `list` (dont au moins une `ordered` si pertinent), et 1 bloc `faq` (5-6 Q/R).
- Terminer `content` par un bloc `cta` : `{ type:"cta", text:"...", href:"/contact-charpentier", label:"Demander un devis gratuit" }`.

## Contraintes techniques (impératif)
- Français impeccable, tous les accents. Chaînes entre **guillemets doubles** "...".
- À l'intérieur des chaînes, utilise l'apostrophe typographique **’** (U+2019), jamais l'apostrophe droite `'`, pour ne pas casser les chaînes.
- Le fichier doit compiler (TS valide). `relatedSlugs` ne contient que des slugs RÉELS de la liste.
- N'écris QUE ce fichier. Ne touche à aucun autre fichier.

## Liste des slugs existants (pour `relatedSlugs`, choisis-en 3 connexes)
renover-charpente-ancienne, isolation-toiture-exterieur-sarking, prix-refection-toiture-m2, renovation-toiture-guide, entretien-toiture-calendrier, prix-charpente-neuve-m2, gouttiere-zinc-vs-pvc, declaration-prealable-travaux-toiture, pergola-bois-vs-alu, signes-charpente-a-renover, isolation-combles-perdus-ou-amenages, types-de-tuiles-comparatif, quand-refaire-sa-toiture, inspection-toiture-checklist, cout-renovation-toiture-complete, entretien-gouttieres-frequence, reglementation-fenetre-toit-voisinage, prix-pergola-bois-sur-mesure, charpente-traditionnelle-vs-fermette, meilleur-isolant-toiture, tuiles-canal-vs-mecaniques
