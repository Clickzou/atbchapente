// Génère un hero UNIQUE par ville indexée (fal.ai flux-pro) -> URL d'image propre
// par page. Lit la liste des villes indexées et produit public/images/villes/{slug}.jpg
//
// Usage :  FAL_KEY=xxx  node scripts/generate-city-heroes.mjs
import fs from "node:fs";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) {
  console.error("FAL_KEY manquante");
  process.exit(1);
}
const MODEL = "fal-ai/flux-pro/v1.1";
const OUT = path.join(process.cwd(), "public", "images", "villes");
fs.mkdirSync(OUT, { recursive: true });

const LIST = JSON.parse(
  fs.readFileSync("C:/Users/jc/AppData/Local/Temp/atb-extract/indexed-cities.json", "utf8"),
);

const STYLE =
  "professional realistic photograph, construction site, natural daylight, high detail, sharp focus, no text, no watermark";
const SCENES = [
  "wooden roof frame (charpente) under construction on a house, blue sky",
  "carpenter installing red clay roof tiles on a sloped roof",
  "installation of a zinc gutter on the edge of a house roof",
  "roof window (velux) being installed in a wooden attic roof",
  "construction of a wooden pergola on a garden terrace",
  "roof insulation panels laid over wooden rafters (sarking)",
  "traditional timber king-post truss inside an attic, exposed beams",
  "house roof renovation with scaffolding, workers on the roof",
  "close-up of new wooden rafters and beams of a roof frame",
  "roofer working on a clay tile roof with tools",
  "new build house timber roof frame against a clear sky",
  "attic conversion with exposed wooden beams and a roof window",
  "zinc standing seam roofing detail on a modern house",
  "carpenter measuring a wooden beam on a construction site",
  "modern wooden pergola with slatted roof in a backyard",
  "roof under construction with wooden battens and underlay membrane",
];

async function gen(slug, prompt) {
  const res = await fetch(`https://fal.run/${MODEL}`, {
    method: "POST",
    headers: { Authorization: `Key ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: `${prompt}, ${STYLE}`,
      image_size: "landscape_16_9",
      num_images: 1,
      output_format: "jpeg",
      safety_tolerance: "5",
    }),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const json = await res.json();
  const url = json.images?.[0]?.url;
  if (!url) throw new Error("pas d'image");
  const img = Buffer.from(await (await fetch(url)).arrayBuffer());
  fs.writeFileSync(path.join(OUT, `${slug}.jpg`), img);
}

let done = 0;
for (let i = 0; i < LIST.length; i++) {
  const c = LIST[i];
  const file = path.join(OUT, `${c.slug}.jpg`);
  if (fs.existsSync(file)) {
    done++;
    continue;
  } // reprise si interrompu
  try {
    await gen(c.slug, SCENES[i % SCENES.length]);
    done++;
    process.stdout.write(`✓ ${c.slug} (${done}/${LIST.length})\n`);
  } catch (e) {
    console.error(`✗ ${c.slug}: ${e.message}`);
  }
}
console.log("Terminé :", done, "heros.");
