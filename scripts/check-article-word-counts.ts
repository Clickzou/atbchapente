/* ── Contrôle du nombre de mots des articles ──
 * Tout article VISIBLE en production (status=published, ou scheduled dont la date
 * est passée) doit contenir >= MIN mots. Empêche le « scaled content abuse »
 * (contenu mince généré en masse → pénalité Google).
 *
 * Usage :
 *   npx tsx scripts/check-article-word-counts.ts             # défaut : articles visibles
 *   npx tsx scripts/check-article-word-counts.ts --status=all   # inclut drafts
 *   npx tsx scripts/check-article-word-counts.ts --min=2000
 *
 * Code de sortie 1 si un article visible est sous le seuil.
 */
import type { BlogArticle, ContentBlock } from "../src/lib/articles/types";
import { allArticles, isPublished } from "../src/lib/articles";

const MIN = Number(process.argv.find((a) => a.startsWith("--min="))?.split("=")[1] ?? 2000);
const includeAll = process.argv.includes("--status=all");

function countWords(blocks: ContentBlock[]): number {
  let text = "";
  for (const b of blocks) {
    switch (b.type) {
      case "paragraph":
      case "heading":
      case "callout":
      case "quote":
        text += " " + b.text;
        break;
      case "list":
        text += " " + b.items.join(" ");
        break;
      case "cta":
        text += " " + b.text + " " + b.label;
        break;
      case "faq":
        text += " " + b.items.map((i) => i.question + " " + i.answer).join(" ");
        break;
      // image : pas de texte de corps
    }
  }
  return text.replace(/\*\*/g, "").trim().split(/\s+/).filter(Boolean).length;
}

const toCheck: BlogArticle[] = includeAll ? allArticles : allArticles.filter(isPublished);

let failures = 0;
for (const a of toCheck) {
  const words = countWords(a.content);
  if (words < MIN) {
    failures++;
    console.error(`✗ ${a.slug} — ${words} mots (< ${MIN}) [${a.status ?? "published"}]`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} article(s) sous le seuil de ${MIN} mots.`);
  process.exit(1);
}
console.log(`✓ ${toCheck.length} article(s) vérifié(s) — tous >= ${MIN} mots.`);
