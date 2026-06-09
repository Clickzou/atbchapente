// Génère UNE image fal.ai (flux-pro v1.1). Usage : node scripts/generate-one-image.mjs <outRelPath> "<prompt>"
// La clé FAL_KEY est lue depuis clickzou-v2/.env.local (jamais committée ici).
import { readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const ENV_PATH =
  "C:/Users/jc/Documents/CLICKZOU/2- SITE CLICKZOU/SITE IA/clickzou-v2/.env.local";

function readFalKey() {
  const txt = readFileSync(ENV_PATH, "utf8");
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^\s*FAL_KEY\s*=\s*(.+?)\s*$/);
    if (m) return m[1].replace(/^["']|["']$/g, "");
  }
  throw new Error("FAL_KEY introuvable");
}

const [, , outRel, prompt] = process.argv;
if (!outRel || !prompt) throw new Error("Args manquants : <outRelPath> <prompt>");

const res = await fetch("https://fal.run/fal-ai/flux-pro/v1.1", {
  method: "POST",
  headers: { Authorization: `Key ${readFalKey()}`, "Content-Type": "application/json" },
  body: JSON.stringify({ prompt, image_size: "landscape_4_3" }),
});
if (!res.ok) throw new Error(`HTTP ${res.status} ${await res.text()}`);
const url = (await res.json())?.images?.[0]?.url;
if (!url) throw new Error("Pas d'URL d'image");
const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
const out = join(root, outRel);
await mkdir(dirname(out), { recursive: true });
await writeFile(out, buf);
console.log(`OK -> ${out} (${(buf.length / 1024).toFixed(0)} Ko)`);
