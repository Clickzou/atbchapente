// Auto-publication d'UN article de blog (appelé par le GitHub Action 2×/semaine).
// 1. Prend le prochain sujet `status: "todo"` du calendrier éditorial.
// 2. Génère l'article (API Claude) selon docs/blog-generation-rules.md.
// 3. Génère l'image hero (fal.ai).
// 4. Régénère le barrel posts/index.ts et marque le sujet `done`.
// Le workflow se charge ensuite du build (gate qualité), du commit et du push.
//
// Variables d'env requises : ANTHROPIC_API_KEY, FAL_KEY.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CAL = join(root, "src/lib/articles/editorial-calendar.ts");
const RULES = join(root, "docs/blog-generation-rules.md");
const POSTS = join(root, "src/lib/articles/posts");

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const FAL_KEY = process.env.FAL_KEY;
if (!ANTHROPIC_KEY) throw new Error("ANTHROPIC_API_KEY manquant");

// 1. Prochain sujet todo (ordre du fichier = ordre des semaines).
const calText = readFileSync(CAL, "utf8");
const lines = calText.split(/\r?\n/);
const idx = lines.findIndex((l) => /slug:\s*"/.test(l) && l.includes('"todo"'));
if (idx === -1) {
  console.log("Aucun sujet `todo` restant — calendrier épuisé. Rien à publier.");
  process.exit(0);
}
const line = lines[idx];
const get = (k) => (line.match(new RegExp(`${k}:\\s*"([^"]+)"`)) || [])[1];
const topic = {
  slug: get("slug"),
  title: get("title"),
  primaryKeyword: get("primaryKeyword"),
  category: get("category"),
  intent: get("intent"),
};
console.log("Sujet :", topic.slug, "—", topic.title);

// 2. Génération de l'article via l'API Claude.
const rules = readFileSync(RULES, "utf8");
const userPrompt = `${rules}

---
RÉDIGE MAINTENANT l'article pour ce sujet :
- slug : ${topic.slug}
- title : ${topic.title}
- primaryKeyword : ${topic.primaryKeyword}
- category : ${topic.category}
- intent : ${topic.intent}
- heroImage : /images/blog/${topic.slug}.jpg
- date : ${new Date().toISOString().slice(0, 10)}

Réponds UNIQUEMENT avec le contenu COMPLET du fichier TypeScript src/lib/articles/posts/${topic.slug}.ts (commençant par \`import type { BlogArticle } from "../types";\`). AUCUN texte avant/après, AUCUNE clôture markdown.`;

const res = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "x-api-key": ANTHROPIC_KEY,
    "anthropic-version": "2023-06-01",
    "content-type": "application/json",
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-6",
    max_tokens: 8192,
    messages: [{ role: "user", content: userPrompt }],
  }),
});
if (!res.ok) throw new Error(`Anthropic HTTP ${res.status} ${await res.text()}`);
let code = (await res.json()).content.map((c) => c.text || "").join("");
code = code.replace(/^```[a-z]*\n?/i, "").replace(/\n?```\s*$/i, "").trim() + "\n";
if (!code.includes("export const article")) throw new Error("Sortie modèle invalide");
await mkdir(POSTS, { recursive: true });
writeFileSync(join(POSTS, `${topic.slug}.ts`), code);
console.log("Article écrit.");

// 3. Image hero via fal.ai (best-effort : si échec, repli côté page article).
if (FAL_KEY) {
  try {
    const r = await fetch("https://fal.run/fal-ai/flux-pro/v1.1", {
      method: "POST",
      headers: { Authorization: `Key ${FAL_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `Realistic professional photo illustrating "${topic.title}" — roof, timber frame or tiles, French house near Toulouse, daylight, architectural photography, high detail`,
        image_size: "landscape_16_9",
      }),
    });
    if (r.ok) {
      const url = (await r.json()).images[0].url;
      const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
      await mkdir(join(root, "public/images/blog"), { recursive: true });
      writeFileSync(join(root, "public/images/blog", `${topic.slug}.jpg`), buf);
      console.log("Image générée.");
    } else console.warn("Image fal.ai échouée:", r.status);
  } catch (e) {
    console.warn("Image fal.ai erreur:", e.message);
  }
}

// 4. Régénère le barrel + marque le sujet done.
const toCamel = (s) => s.replace(/\.ts$/, "").replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const files = readdirSync(POSTS).filter((f) => f.endsWith(".ts") && f !== "index.ts").sort();
let barrel = '// Barrel des articles de blog (généré). 1 fichier par article dans ./\n';
barrel += 'import type { BlogArticle } from "../types";\n';
files.forEach((f) => (barrel += `import { article as ${toCamel(f)} } from "./${f.replace(/\.ts$/, "")}";\n`));
barrel += "\nexport const posts: BlogArticle[] = [\n";
files.forEach((f) => (barrel += `  ${toCamel(f)},\n`));
barrel += "];\n";
writeFileSync(join(POSTS, "index.ts"), barrel);

lines[idx] = line.replace('"todo"', '"done"');
writeFileSync(CAL, lines.join("\n"));
console.log("Barrel régénéré, sujet marqué done. OK.");
