// Envoie un e-mail (Resend) après la publication automatique d'un article.
// Appelé par le workflow APRÈS commit/push. Non bloquant : n'échoue jamais le job.
// Lit ART_SLUG / ART_TITLE (env, posés par le step de génération) pour éviter tout
// souci de shell avec les apostrophes des titres français.
// Env : RESEND_API_KEY, PUBLICATION_NOTIFY_EMAIL (défaut CONTACT_TO), CONTACT_FROM.

const slug = process.env.ART_SLUG?.trim();
const title = process.env.ART_TITLE?.trim() || slug;

if (!slug) {
  console.log("Pas d'article à notifier (slug vide).");
  process.exit(0);
}

const key = process.env.RESEND_API_KEY;
if (!key) {
  console.log("RESEND_API_KEY absent — notification e-mail ignorée.");
  process.exit(0);
}

const to =
  process.env.PUBLICATION_NOTIFY_EMAIL || process.env.CONTACT_TO || "axelcharpente@yahoo.fr";
const from = process.env.CONTACT_FROM || "ATB Charpente <onboarding@resend.dev>";
const url = `https://atb-charpente.fr/blog/${slug}`;

const html = `
  <div style="font-family:system-ui,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1f2937">
    <p style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#ea7a1e;font-weight:600;margin:0">
      Blog ATB Charpente
    </p>
    <h1 style="font-size:20px;margin:6px 0 12px">Nouvel article publié</h1>
    <p style="font-size:16px;font-weight:600;margin:0 0 4px">${title}</p>
    <p style="font-size:13px;color:#6b7280;margin:0 0 18px">slug : ${slug}</p>
    <a href="${url}" style="display:inline-block;background:#ea7a1e;color:#fff;text-decoration:none;font-weight:600;padding:10px 20px;border-radius:9999px">
      Voir l'article
    </a>
    <p style="font-size:12px;color:#9ca3af;margin-top:20px">${url}</p>
  </div>`;

try {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject: `Nouvel article publié : ${title}`, html }),
  });
  if (!res.ok) console.warn("Resend échec:", res.status, await res.text());
  else console.log("E-mail de publication envoyé à", to);
} catch (e) {
  console.warn("Resend erreur:", e.message);
}
process.exit(0);
