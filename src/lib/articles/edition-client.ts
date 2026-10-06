/**
 * Relecture des articles par le client, depuis son espace Clickzou
 * (clickzou.fr/espace-client, onglet « Articles programmés » — demande de JC du
 * 6 octobre 2026, sur le modèle d'Alps Ski Transfers et d'Un Seul Souffle).
 *
 * Le client modifie le TEXTE d'un article ; Clickzou enregistre ses
 * modifications dans `corrections-client.json` (commit GitHub sur main), et le
 * registre des articles les applique au chargement
 * (`allArticles = [...].map(appliquerCorrections)`).
 *
 * Modifiables : chapô (`excerpt`), paragraphes, intertitres H3, éléments de
 * liste, encadrés, citations, questions et réponses de la FAQ.
 * Verrouillés (absents de `champsEditables` et refusés par
 * `appliquerCorrections`) : titre (H1), metaTitle, metaDescription, slug, dates,
 * auteur, image, mot-clé, maillage (`relatedSlugs`), bloc d'appel à l'action et
 * intertitres H2, qui portent la structure de l'article et ses ancres. Les liens
 * `[ancre](/url)` éventuels sont contrôlés côté Clickzou : un texte qui en perd
 * ou en change un est refusé avant tout commit.
 *
 * L'import du JSON est en chemin RELATIF : ce fichier est aussi chargé hors
 * Next (script de contrôle des mots), où l'alias `@/` n'est pas garanti.
 */
import type { BlogArticle } from "./types";
import corrections from "./corrections-client.json";

export type ChampEditable = {
  /** Adresse du texte dans l'objet article : « content.4.text », « content.30.items.2.answer ». */
  chemin: string;
  /** Regroupement à l'écran : « Introduction », « Section 2 — <titre H2> », « Questions fréquentes ». */
  section: string;
  libelle: string;
  texte: string;
};

type CorrectionsClient = Record<string, { champs: Record<string, string>; modifieLe?: string; par?: string }>;

const EDITABLES = [
  /^excerpt$/,
  /^content\.\d+\.text$/,
  /^content\.\d+\.items\.\d+$/,
  /^content\.\d+\.items\.\d+\.(question|answer)$/,
];

/**
 * Contrôle complet d'un chemin sur un article donné : le motif, puis le type du
 * bloc visé. `content.0.text` a la même forme pour un H2 (verrouillé) que pour
 * un paragraphe (modifiable).
 */
function estEditableDans(a: BlogArticle, chemin: string): boolean {
  if (!EDITABLES.some((re) => re.test(chemin))) return false;
  const m = /^content\.(\d+)\.(.+)$/.exec(chemin);
  if (!m) return true; // excerpt
  const bloc = a.content[Number(m[1])];
  const reste = m[2];
  if (!bloc) return false;
  switch (bloc.type) {
    case "paragraph":
    case "callout":
    case "quote":
      return reste === "text";
    case "heading":
      return reste === "text" && bloc.level === 3;
    case "list":
      return /^items\.\d+$/.test(reste);
    case "faq":
      return /^items\.\d+\.(question|answer)$/.test(reste);
    default:
      return false;
  }
}

export function champsEditables(article: BlogArticle): ChampEditable[] {
  const champs: ChampEditable[] = [];
  const ajouter = (chemin: string, section: string, libelle: string, texte: unknown) => {
    if (typeof texte === "string" && texte.trim()) champs.push({ chemin, section, libelle, texte });
  };
  ajouter("excerpt", "Introduction", "Chapô", article.excerpt);

  // Les H2 ne sont pas modifiables : ils servent d'en-tête de section à l'écran.
  let section = "Début de l'article";
  let n = 0;
  article.content.forEach((b, bi) => {
    const base = `content.${bi}`;
    switch (b.type) {
      case "heading":
        if (b.level === 2) {
          n += 1;
          section = `Section ${n} — ${b.text}`;
        } else ajouter(`${base}.text`, section, "Intertitre", b.text);
        break;
      case "paragraph":
        ajouter(`${base}.text`, section, "Paragraphe", b.text);
        break;
      case "callout":
        ajouter(`${base}.text`, section, "Encadré", b.text);
        break;
      case "quote":
        ajouter(`${base}.text`, section, "Citation", b.text);
        break;
      case "list":
        b.items.forEach((t, i) => ajouter(`${base}.items.${i}`, section, `Liste — élément ${i + 1}`, t));
        break;
      case "faq":
        b.items.forEach((f, fi) => {
          ajouter(`${base}.items.${fi}.question`, "Questions fréquentes", `Question ${fi + 1}`, f.question);
          ajouter(`${base}.items.${fi}.answer`, "Questions fréquentes", `Réponse ${fi + 1}`, f.answer);
        });
        break;
    }
  });
  return champs.filter((c) => estEditableDans(article, c.chemin));
}

/** Pose un texte à son adresse, seulement si un texte s'y trouve déjà (pas de création de structure). */
function poser(objet: unknown, chemin: string, texte: string) {
  const etapes = chemin.split(".");
  let courant: unknown = objet;
  for (const e of etapes.slice(0, -1)) {
    if (courant === null || typeof courant !== "object") return;
    courant = (courant as Record<string, unknown>)[e];
  }
  const dernier = etapes.at(-1)!;
  if (courant && typeof courant === "object" && typeof (courant as Record<string, unknown>)[dernier] === "string") {
    (courant as Record<string, unknown>)[dernier] = texte;
  }
}

export function appliquerCorrections(a: BlogArticle): BlogArticle {
  const c = (corrections as CorrectionsClient)[a.slug];
  if (!c?.champs) return a;
  const copie = structuredClone(a);
  for (const [chemin, texte] of Object.entries(c.champs)) {
    if (estEditableDans(a, chemin) && typeof texte === "string") poser(copie, chemin, texte);
  }
  return copie;
}
