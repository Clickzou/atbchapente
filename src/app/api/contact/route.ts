import { NextResponse } from "next/server";

// TODO: brancher l'envoi d'email réel (Resend recommandé).
// 1. npm i resend
// 2. Ajouter RESEND_API_KEY dans les variables d'environnement (Vercel).
// 3. Décommenter l'envoi ci-dessous.
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { nom, email, telephone, message } = data ?? {};

    if (!nom || !email || !telephone || !message) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // --- Envoi email (à activer une fois Resend configuré) ---
    // const { Resend } = await import("resend");
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "Site ATB Charpente <contact@atb-charpente.fr>",
    //   to: "axelcharpente@yahoo.fr",
    //   replyTo: email,
    //   subject: `Nouvelle demande de ${nom}`,
    //   text: `Nom: ${nom}\nEmail: ${email}\nTéléphone: ${telephone}\n\n${message}`,
    // });

    // En attendant la configuration, on log côté serveur.
    console.log("[contact] nouvelle demande:", { nom, email, telephone });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
