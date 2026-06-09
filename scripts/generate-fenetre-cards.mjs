// Génère 4 photos (fal.ai flux-pro v1.1) pour les cartes "Types et modèles" de
// la page Fenêtre de toit. La clé FAL_KEY est lue depuis le projet clickzou-v2
// (jamais stockée ni committée ici). Sortie : public/images/fenetres/*.jpg
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
  throw new Error("FAL_KEY introuvable dans .env.local");
}

const FAL_KEY = readFalKey();

const CARDS = [
  {
    name: "rotation",
    prompt:
      "Realistic interior photo of a modern center-pivot (rotation) roof window installed in a sloped attic ceiling with exposed wooden beams, soft natural daylight pouring in, cozy converted loft, professional architectural photography, high detail",
  },
  {
    name: "projection",
    prompt:
      "Realistic interior photo of a top-hung projection roof window (sash swings outward) on a tiled roof attic, bright airy converted loft with clear outside view, natural daylight, professional architectural photography, high detail",
  },
  {
    name: "combinees",
    prompt:
      "Realistic interior photo of several combined roof windows side by side forming a wall of light in a large bright attic room with exposed wooden roof structure, abundant natural light, modern Scandinavian interior, professional architectural photography, high detail",
  },
  {
    name: "volet",
    prompt:
      "Realistic interior photo of a modern roof window with an integrated roller blind / shutter partially lowered in a converted attic bedroom, soft filtered light, cozy contemporary interior, professional architectural photography, high detail",
  },
];

async function gen({ name, prompt }) {
  const res = await fetch("https://fal.run/fal-ai/flux-pro/v1.1", {
    method: "POST",
    headers: {
      Authorization: `Key ${FAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, image_size: "landscape_4_3" }),
  });
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status} ${await res.text()}`);
  const data = await res.json();
  const url = data?.images?.[0]?.url;
  if (!url) throw new Error(`${name}: pas d'URL d'image`);
  const img = await fetch(url);
  const buf = Buffer.from(await img.arrayBuffer());
  const out = join(root, "public", "images", "fenetres", `${name}.jpg`);
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, buf);
  console.log(`OK ${name} -> ${out} (${(buf.length / 1024).toFixed(0)} Ko)`);
}

await mkdir(join(root, "public", "images", "fenetres"), { recursive: true });
for (const c of CARDS) {
  try {
    await gen(c);
  } catch (e) {
    console.error("ERREUR", e.message);
  }
}
console.log("Terminé.");
