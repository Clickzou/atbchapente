// Auto-publication d'UN post Google Business Profile (appelé par GitHub Actions).
// 1. Génère le texte du post (API Claude) — contexte ATB Charpente, sujet varié.
// 2. Génère une image (fal.ai) — best-effort.
// 3. Publie le post sur la fiche GBP (API v4 localPosts) via OAuth refresh token.
//
// Pas de commit/build : le post part directement sur Google.
//
// Env requis : ANTHROPIC_API_KEY, FAL_KEY (optionnel),
//   GBP_CLIENT_ID, GBP_CLIENT_SECRET, GBP_REFRESH_TOKEN, GBP_ACCOUNT_ID, GBP_LOCATION_ID.

const {
  ANTHROPIC_API_KEY,
  FAL_KEY,
  GBP_CLIENT_ID,
  GBP_CLIENT_SECRET,
  GBP_REFRESH_TOKEN,
  GBP_ACCOUNT_ID,
  GBP_LOCATION_ID,
} = process.env;

for (const k of [
  "ANTHROPIC_API_KEY",
  "GBP_CLIENT_ID",
  "GBP_CLIENT_SECRET",
  "GBP_REFRESH_TOKEN",
  "GBP_ACCOUNT_ID",
  "GBP_LOCATION_ID",
]) {
  if (!process.env[k]) throw new Error(`${k} manquant`);
}

// Sujets possibles — on en tire un au hasard pour varier les posts.
const TOPICS = [
  "création de charpente bois sur-mesure",
  "rénovation d'une charpente ancienne",
  "remplacement / réfection de toiture",
  "pose et entretien de gouttières zinc",
  "isolation de toiture et confort thermique",
  "pose de fenêtres de toit (Velux)",
  "traitement et entretien préventif de charpente",
  "charpente traditionnelle vs fermette",
  "couverture en tuiles : conseils et longévité",
  "préparer sa toiture avant l'hiver",
  "aménagement de combles",
  "zinguerie et étanchéité du toit",
];
const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];

const SYSTEM = `Tu es responsable de la communication locale d'ATB Charpente, entreprise de charpente, couverture et zinguerie basée à Bessières et intervenant autour de Toulouse. Tu rédiges un post pour la fiche Google Business Profile : ton professionnel et accessible, ancrage local (Toulouse / Bessières / Haute-Garonne), 80 à 150 mots, une accroche concrète + une valeur ou un conseil utile + une invitation à contacter pour un devis. PAS de hashtags. Pas d'emojis. Pas de promesse exagérée ni de chiffre inventé. Réponds UNIQUEMENT avec le texte du post, sans titre, sans guillemets, sans markdown.`;

console.log("Sujet du post :", topic);

// 1. Texte via Claude
const res = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "x-api-key": ANTHROPIC_API_KEY,
    "anthropic-version": "2023-06-01",
    "content-type": "application/json",
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-6",
    max_tokens: 600,
    system: SYSTEM,
    messages: [{ role: "user", content: `Rédige le post du jour sur le thème : ${topic}.` }],
  }),
});
if (!res.ok) throw new Error(`Anthropic HTTP ${res.status} ${await res.text()}`);
const data = await res.json();
let summary = data.content.map((c) => c.text || "").join("").trim();
summary = summary.replace(/^["«»]+|["«»]+$/g, "").trim();
if (summary.length < 40) throw new Error("Texte de post trop court / invalide.");
console.log(`Texte généré (${summary.length} car.).`);

// 2. Image via fal.ai (best-effort)
let imageUrl = null;
if (FAL_KEY) {
  try {
    const r = await fetch("https://fal.run/fal-ai/flux-pro/v1.1", {
      method: "POST",
      headers: { Authorization: `Key ${FAL_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `Realistic professional photograph illustrating "${topic}" — timber roof frame, tiles or zinc gutters on a French house near Toulouse, daylight, architectural photography, high detail, no text, no watermark`,
        image_size: "landscape_4_3",
      }),
    });
    if (r.ok) {
      imageUrl = (await r.json()).images?.[0]?.url ?? null;
      console.log("Image générée :", imageUrl ? "ok" : "aucune");
    } else {
      console.warn("Image fal.ai échouée:", r.status);
    }
  } catch (e) {
    console.warn("Image fal.ai erreur:", e.message);
  }
}

// 3. Access token GBP
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

// 4. Publication
const body = {
  languageCode: "fr",
  summary,
  topicType: "STANDARD",
  callToAction: { actionType: "LEARN_MORE", url: "https://atb-charpente.fr/" },
};
if (imageUrl) body.media = [{ mediaFormat: "PHOTO", sourceUrl: imageUrl }];

const pubRes = await fetch(
  `https://mybusiness.googleapis.com/v4/accounts/${GBP_ACCOUNT_ID}/locations/${GBP_LOCATION_ID}/localPosts`,
  {
    method: "POST",
    headers: { Authorization: `Bearer ${tokenJson.access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }
);
const pubText = await pubRes.text();
if (!pubRes.ok) throw new Error(`Publication GBP échouée (HTTP ${pubRes.status}): ${pubText}`);
console.log("✓ Post publié sur la fiche Google Business.");
