// Auto-publication d'UNE photo sur la fiche Google Business (GitHub Actions).
// 1. Génère une photo (fal.ai) illustrant le métier (charpente/couverture).
// 2. L'ajoute à la fiche via l'API v4 media (PHOTO, catégorie ADDITIONAL).
//
// Env requis : FAL_KEY, GBP_CLIENT_ID, GBP_CLIENT_SECRET, GBP_REFRESH_TOKEN,
//   GBP_ACCOUNT_ID, GBP_LOCATION_ID.

const {
  FAL_KEY,
  GBP_CLIENT_ID,
  GBP_CLIENT_SECRET,
  GBP_REFRESH_TOKEN,
  GBP_ACCOUNT_ID,
  GBP_LOCATION_ID,
} = process.env;

for (const k of ["FAL_KEY", "GBP_CLIENT_ID", "GBP_CLIENT_SECRET", "GBP_REFRESH_TOKEN", "GBP_ACCOUNT_ID", "GBP_LOCATION_ID"]) {
  if (!process.env[k]) throw new Error(`${k} manquant`);
}

const SCENES = [
  "timber roof frame structure being assembled by carpenters on a French house",
  "new clay tile roof on a house near Toulouse, bright daylight",
  "zinc gutters and roof edge detail, clean craftsmanship",
  "roof window (skylight) freshly installed in a wooden roof frame",
  "traditional wooden charpente interior of an attic, exposed beams",
  "renovation of an old roof, before/after craftsmanship, French countryside",
  "carpenter working on a wooden frame, tools and timber, professional",
  "tiled roof of a stone house in the Toulouse region, blue sky",
];
const scene = SCENES[Math.floor(Math.random() * SCENES.length)];
console.log("Scène photo :", scene);

// 1. Image via fal.ai
const r = await fetch("https://fal.run/fal-ai/flux-pro/v1.1", {
  method: "POST",
  headers: { Authorization: `Key ${FAL_KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    prompt: `Realistic professional architectural photograph: ${scene}. Natural daylight, high detail, sharp, no text, no watermark, no people faces.`,
    image_size: "landscape_4_3",
  }),
});
if (!r.ok) throw new Error(`fal.ai HTTP ${r.status} ${await r.text()}`);
const imageUrl = (await r.json()).images?.[0]?.url;
if (!imageUrl) throw new Error("Aucune image générée.");
console.log("Image générée.");

// 2. Access token
const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    client_id: GBP_CLIENT_ID,
    client_secret: GBP_CLIENT_SECRET,
    refresh_token: GBP_REFRESH_TOKEN,
    grant_type: "refresh_token",
  }),
});
const tokenJson = await tokenRes.json();
if (!tokenJson.access_token) throw new Error("Token GBP invalide : " + JSON.stringify(tokenJson));

// 3. Ajout de la photo à la fiche
const pubRes = await fetch(
  `https://mybusiness.googleapis.com/v4/accounts/${GBP_ACCOUNT_ID}/locations/${GBP_LOCATION_ID}/media`,
  {
    method: "POST",
    headers: { Authorization: `Bearer ${tokenJson.access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      mediaFormat: "PHOTO",
      sourceUrl: imageUrl,
      locationAssociation: { category: "ADDITIONAL" },
    }),
  }
);
const pubText = await pubRes.text();
if (!pubRes.ok) throw new Error(`Ajout photo GBP échoué (HTTP ${pubRes.status}): ${pubText}`);
console.log("✓ Photo ajoutée à la fiche Google Business.");
