import { NextResponse } from "next/server";

// TODO: brancher l'envoi d'email réel (Resend recommandé).
// 1. npm i resend
// 2. Ajouter RESEND_API_KEY dans les variables d'environnement (Vercel).
// 3. Décommenter l'envoi ci-dessous.
export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Le formulaire de contact envoie { nom, email, telephone, sujet, message } ;
    // la popup envoie { prenom, nom, email, telephone, demande, source }.
    const { prenom, nom, email, telephone, sujet, message, demande, source } =
      data ?? {};

    // Validation minimale commune aux deux origines : un nom (ou prénom), un
    // email et un téléphone. Le message est facultatif (la popup n'en a pas).
    if ((!nom && !prenom) || !email || !telephone) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const fullName = [prenom, nom].filter(Boolean).join(" ").trim();
    const subject =
      source === "popup"
        ? `Popup — ${demande === "rendez-vous" ? "demande de rendez-vous" : "demande de devis"} de ${fullName}`
        : `Nouvelle demande${sujet ? ` (${sujet})` : ""} de ${fullName}`;
    const body = [
      `Nom : ${fullName}`,
      `Email : ${email}`,
      `Téléphone : ${telephone}`,
      sujet ? `Sujet : ${sujet}` : null,
      demande ? `Type de demande : ${demande}` : null,
      source ? `Origine : ${source}` : null,
      message ? `\n${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    // --- Envoi email (à activer une fois Resend configuré) ---
    // const { Resend } = await import("resend");
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "Site ATB Charpente <contact@atb-charpente.fr>",
    //   to: "axelcharpente@yahoo.fr",
    //   replyTo: email,
    //   subject,
    //   text: body,
    // });

    // En attendant la configuration de Resend, on log côté serveur.
    console.log("[contact]", subject, "\n", body);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
