// Génère les 20 images hero des articles de blog (fal.ai flux-pro v1.1).
// Sortie : public/images/blog/{slug}.jpg. Clé lue depuis clickzou-v2/.env.local.
import { readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const ENV = "C:/Users/jc/Documents/CLICKZOU/2- SITE CLICKZOU/SITE IA/clickzou-v2/.env.local";
const key = readFileSync(ENV, "utf8").match(/^\s*FAL_KEY\s*=\s*(.+?)\s*$/m)[1].replace(/^["']|["']$/g, "");

const IMAGES = {
  "isolation-toiture-exterieur-sarking": "Realistic construction photo of roof exterior insulation (sarking): rigid insulation boards installed over wooden rafters before the tile covering, sunny day, professional architectural photography",
  "prix-refection-toiture-m2": "Realistic photo of a French house roof renovation in progress with terracotta tiles and scaffolding, sunny, professional architectural photography",
  "renovation-toiture-guide": "Realistic photo of a beautifully renovated terracotta tiled roof on a French house near Toulouse, blue sky, professional architectural photography",
  "entretien-toiture-calendrier": "Realistic photo of a professional roofer inspecting and maintaining a terracotta tiled roof, safety harness, daylight, professional photography",
  "prix-charpente-neuve-m2": "Realistic photo of a brand new timber roof frame structure being assembled, fresh wooden beams and trusses, blue sky, professional photography",
  "gouttiere-zinc-vs-pvc": "Realistic close-up photo of a zinc rain gutter along a roof edge next to terracotta tiles, professional architectural photography",
  "declaration-prealable-travaux-toiture": "Realistic photo of a French suburban house with a terracotta tiled roof seen from outside, sunny, professional architectural photography",
  "pergola-bois-vs-alu": "Realistic photo of a wooden pergola over a sunny terrace with garden furniture, warm light, professional architectural photography",
  "signes-charpente-a-renover": "Realistic photo of an old damaged timber roof frame in an attic with cracked beams and woodworm traces, dim daylight, professional photography",
  "isolation-combles-perdus-ou-amenages": "Realistic photo of attic insulation with mineral wool between rafters in a converted loft, professional architectural photography",
  "types-de-tuiles-comparatif": "Realistic photo of several types of terracotta roof tiles laid side by side (canal, roman, flat), close-up, professional photography",
  "quand-refaire-sa-toiture": "Realistic photo of an aged worn terracotta tiled roof with some missing and mossy tiles, professional photography",
  "inspection-toiture-checklist": "Realistic photo of a roofer on a tiled roof inspecting it with a clipboard, safety gear, daylight, professional photography",
  "cout-renovation-toiture-complete": "Realistic photo of a complete roof renovation site with fresh terracotta tiles and scaffolding around a house, professional photography",
  "entretien-gouttieres-frequence": "Realistic photo of gloved hands removing leaves from a roof gutter, maintenance, daylight, professional photography",
  "reglementation-fenetre-toit-voisinage": "Realistic photo of a modern roof window (skylight) installed in a terracotta tiled roof, exterior view, blue sky, professional photography",
  "prix-pergola-bois-sur-mesure": "Realistic photo of a custom wooden pergola on a sunny terrace of a French house, warm light, professional architectural photography",
  "charpente-traditionnelle-vs-fermette": "Realistic photo of a traditional timber roof frame interior with exposed wooden beams and rafters, daylight, professional photography",
  "meilleur-isolant-toiture": "Realistic photo of various roof insulation material samples (wood fiber, mineral wool, rigid boards) arranged together, professional photography",
  "tuiles-canal-vs-mecaniques": "Realistic close-up photo of canal terracotta roof tiles on a Mediterranean-style roof near Toulouse, warm light, professional photography",
};

async function gen(slug, prompt) {
  const r = await fetch("https://fal.run/fal-ai/flux-pro/v1.1", {
    method: "POST",
    headers: { Authorization: `Key ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, image_size: "landscape_16_9" }),
  });
  if (!r.ok) throw new Error(`${slug}: HTTP ${r.status}`);
  const url = (await r.json()).images[0].url;
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  const out = join(root, "public", "images", "blog", `${slug}.jpg`);
  await writeFile(out, buf);
  console.log(`OK ${slug} (${(buf.length / 1024).toFixed(0)} Ko)`);
}

await mkdir(join(root, "public", "images", "blog"), { recursive: true });
for (const [slug, prompt] of Object.entries(IMAGES)) {
  try { await gen(slug, prompt); } catch (e) { console.error("ERREUR", e.message); }
}
console.log("Terminé.");
