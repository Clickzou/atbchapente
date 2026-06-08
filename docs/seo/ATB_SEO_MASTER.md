# ATB SEO MASTER — Source de vérité SEO

> Document maître de la stratégie SEO d'ATB Charpente. Inspiré du système Clickzou
> (`SEO_MASTER_CLICKZOU.md`). Version 1.0 — 2026-06-08.

## 1. Vision & positionnement

- **Cible prioritaire : Toulouse** (fort volume de recherche) + agglomération.
- **Secondaire : Bessières** (adresse réelle / fiche Google, faible volume).
- Métier : charpente, couverture, zinguerie, isolation de toiture, pergola bois.
- Objectif organique : se positionner sur les requêtes **informationnelles long-tail**
  liées à la toiture pour capter du trafic, le convertir vers les pages services.

> Réalité à garder en tête : le **pack local** Toulouse est difficile (adresse à
> ~25 km). Le levier réaliste est l'**organique** (liens bleus) porté par le contenu.

## 2. Architecture SEO (3 niveaux)

```
Pages PILIER (transactionnel, head terms réservés)
 ├─ Pages services (URLs WordPress conservées)
 │   /creation-charpente-bois-renovation, /isolation-toiture,
 │   /pose-changement-gouttieres-zinc, /pose-remaniement-tuiles,
 │   /creation-fenetre-de-toit-bois, /creation-pergola-bois
 └─ Cornerstone « Charpentier Toulouse » (à créer)
        ▲ maillage interne (les articles pointent vers le pilier du cluster)
Pages SATELLITES (informationnel long-tail) = le BLOG
   /blog/[slug] — 104 articles sur 1 an (2/semaine)
```

## 3. Clusters sémantiques (9)

| Cluster (catégorie) | Pilier visé | Exemples de sujets |
|---|---|---|
| Charpente | `/creation-charpente-bois-renovation` | rénovation charpente ancienne, traitement bois |
| Couverture | `/pose-remaniement-tuiles` | types de tuiles, réfection toiture |
| Zinguerie | `/pose-changement-gouttieres-zinc` | gouttière zinc vs pvc, solins |
| Isolation | `/isolation-toiture` | sarking, aides, meilleur isolant |
| Rénovation toiture | cornerstone | rénovation complète, avant vente |
| Pergola & extérieur | `/creation-pergola-bois` | pergola bois vs alu, carport |
| Conseils & entretien | cornerstone | entretien annuel, démoussage |
| Prix & devis | pages services | prix au m², lire un devis |
| Réglementation & aides | cornerstone | MaPrimeRénov', déclaration préalable |

## 4. Règles éditoriales (NON négociables)

1. **≥ 2000 mots** par article visible en production (contrôlé par `npm run words:check`
   au `prebuild` — bloque le build sinon).
2. **Anti-cannibalisation** : un article satellite ne doit PAS cibler un *head term*
   réservé à une page service/pilier (cf. §5). Il cible une variation long-tail.
3. **Maillage interne** : ≥ 3 liens internes/article, dont **au moins 1 vers le pilier**
   du cluster + 2 vers des articles connexes (`relatedSlugs`).
4. **Angle local réel** : exemples concrets Toulouse / communes, pas du générique.
   Ne pas suroptimiser « Toulouse » dans 100 % des titres (spam local).
5. **Structure** : H1 unique, H2/H3 hiérarchisés, listes fréquentes, **FAQ** en fin
   d'article (bloc `faq` → schema FAQ), 200 premiers mots denses en mot-clé.
6. **Meta** : `metaTitle` < 60 car. (mot-clé en début), `metaDescription` < 155 car.
   avec bénéfice + CTA.
7. **Unicité** : aucun doublon de `slug` ni de `primaryKeyword` (vérifié au build).

## 5. Mots-clés réservés (head terms → pages services, jamais en blog)

- « charpentier toulouse », « charpente bois toulouse » → cornerstone / charpente
- « isolation toiture » → `/isolation-toiture`
- « gouttières zinc » → `/pose-changement-gouttieres-zinc`
- « pose tuiles », « couvreur toulouse » → `/pose-remaniement-tuiles`
- « fenêtre de toit », « velux » (transac.) → `/creation-fenetre-de-toit-bois`
- « pergola bois » → `/creation-pergola-bois`

## 6. Publication progressive

| Statut | Visible en dev | Visible en prod | Sitemap / index |
|---|---|---|---|
| `published` | ✓ | ✓ | ✓ |
| `scheduled` (date passée) | ✓ | ✓ | ✓ |
| `scheduled` (date future) | ✓ (aperçu) | ✗ (404) | ✗ |
| `draft` | ✓ (aperçu) | ✗ (404) | ✗ |

## 7. SEO technique

- `lang="fr"`, métadonnées via `generateMetadata`, canonical auto-référent.
- JSON-LD : `RoofingContractor` (layout global) + `Article` (chaque article).
- `sitemap.xml` dynamique (pages + services + articles publiés), `robots.txt`.
- Images optimisées `next/image` (WebP, lazy-load).

## 8. Pipeline d'auto-publication (cron — 2 articles/semaine)

Routine planifiée (`/schedule`) exécutée 2×/semaine :

1. Lit `src/lib/articles/editorial-calendar.ts`, prend les **2 prochains sujets**
   `status: "todo"` par numéro de semaine.
2. Pour chaque sujet : rédige un `BlogArticle` (≥ 2000 mots) selon §4, en s'appuyant
   sur la méthode des prompts Clickzou (plan MECE, FAQ, maillage planifié).
3. Ajoute l'article au fichier de catégorie (`charpente.ts`, etc.) avec
   `status: "scheduled"` + `publishDate`, renseigne `relatedSlugs`.
4. Passe le sujet à `status: "done"` dans le calendrier.
5. `npm run build` (le garde-fou `words:check` valide les ≥ 2000 mots) →
   **commit + push** → déploiement Vercel automatique.

> Garde-fou anti-pénalité Google « scaled content abuse » : le seuil 2000 mots +
> l'angle local + l'unicité de `primaryKeyword` rendent la production de masse
> **conforme** (contenu utile, original, à valeur ajoutée).

## 9. Fichiers clés

- `src/lib/articles/types.ts` — modèle `BlogArticle` + `ContentBlock`.
- `src/lib/articles/index.ts` — registre + visibilité (`isPublished`).
- `src/lib/articles/editorial-calendar.ts` — 104 sujets planifiés.
- `src/components/ArticleRenderer.tsx` — rendu des blocs.
- `scripts/check-article-word-counts.ts` — garde-fou 2000 mots.
- `src/app/blog/[slug]/page.tsx` — route article (meta + schema Article).
