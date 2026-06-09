// Génère un pool de photos réalistes de chantier (charpente/toiture) via fal.ai
// (flux-pro v1.1) dans public/images/chantiers/. Assignées ensuite par ville.
//
// Usage :  FAL_KEY=xxx  node scripts/generate-city-images.mjs
import fs from "node:fs";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) {
  console.error("FAL_KEY manquante (export FAL_KEY=...)");
  process.exit(1);
}

const MODEL = "fal-ai/flux-pro/v1.1";
const OUT = path.join(process.cwd(), "public", "images", "chantiers");
fs.mkdirSync(OUT, { recursive: true });

const STYLE =
  "professional realistic photograph, construction site, natural daylight, high detail, sharp focus, no text, no watermark";

const PROMPTS = [
  "wooden roof frame (charpente) under construction on a new house, blue sky",
  "carpenter installing red clay roof tiles on a sloped roof",
  "installation of a zinc gutter on the edge of a house roof",
  "roof window (velux) being installed in a wooden attic roof",
  "construction of a wooden pergola in a garden terrace",
  "roof insulation work, insulation panels laid over wooden rafters (sarking)",
  "traditional timber king-post truss inside an attic, exposed beams",
  "house roof renovation with scaffolding, workers on the roof",
  "close-up of new wooden rafters and beams of a roof frame",
  "roofer working on a clay tile roof with tools",
  "new build house timber roof frame against a clear sky",
  "attic conversion with exposed wooden beams and a roof window",
  "zinc standing seam roofing detail on a modern house",
  "carpenter measuring a large wooden beam on a construction site",
  "modern wooden pergola with slatted roof in a backyard",
  "roof under construction with wooden battens and underlay membrane",
];

async function gen(i, prompt) {
  const res = await fetch(`https://fal.run/${MODEL}`, {
    method: "POST",
    headers: { Authorization: `Key ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: `${prompt}, ${STYLE}`,
      image_size: "landscape_4_3",
      num_images: 1,
      output_format: "jpeg",
      safety_tolerance: "5",
    }),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const json = await res.json();
  const url = json.images?.[0]?.url;
  if (!url) throw new Error("pas d'image renvoyée");
  const img = Buffer.from(await (await fetch(url)).arrayBuffer());
  const file = path.join(OUT, String(i + 1).padStart(2, "0") + ".jpg");
  fs.writeFileSync(file, img);
  console.log(`✓ ${path.basename(file)}`);
}

for (let i = 0; i < PROMPTS.length; i++) {
  try {
    await gen(i, PROMPTS[i]);
  } catch (e) {
    console.error(`✗ ${i + 1}: ${e.message}`);
  }
}
console.log("Terminé.");
