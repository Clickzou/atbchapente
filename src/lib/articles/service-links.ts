import { services, type Service } from "@/lib/site";
import type { BlogArticle } from "./types";

// Maillage descendant blog → page service (canalise l'autorité thématique des
// articles vers les pages « argent »). Le service est déduit des mots-clés du
// slug / primaryKeyword / tags : pas de champ à maintenir par article, donc les
// articles auto-publiés par le cron sont mappés automatiquement.
// Ordre = du plus spécifique au plus générique (« meilleur-isolant-toiture »
// doit matcher isolation avant tuiles/toiture).
const RULES: { service: string; kw: RegExp }[] = [
  { service: "creation-pergola-bois", kw: /pergola/ },
  { service: "creation-fenetre-de-toit-bois", kw: /fenetre|fen[eê]tre|velux/ },
  { service: "pose-changement-gouttieres-zinc", kw: /goutti[eè]re|zingu/ },
  { service: "isolation-toiture", kw: /isolation|isolant|combles|sarking/ },
  { service: "creation-charpente-bois-renovation", kw: /charpente|fermette|ossature/ },
  { service: "pose-remaniement-tuiles", kw: /tuile|couverture|r[ée]fection|toiture|toit/ },
];

/** Page service la plus pertinente pour un article (ou null si aucune).
 * On s'appuie sur le slug + primaryKeyword (signaux focalisés). Les `tags`,
 * souvent multi-thèmes, sont volontairement écartés : ils provoquent des
 * faux positifs (un comparatif charpente taggé « isolation » serait mal classé). */
export function serviceForArticle(article: BlogArticle): Service | null {
  const hay = [article.slug, article.primaryKeyword].join(" ").toLowerCase();
  for (const rule of RULES) {
    if (rule.kw.test(hay)) {
      const match = services.find((s) => s.slug === rule.service);
      if (match) return match;
    }
  }
  return null;
}
