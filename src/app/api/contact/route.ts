import { NextResponse } from "next/server";

// Envoi d'email via Resend. Configuration (Vercel) :
//  - RESEND_API_KEY : clé API Resend.
//  - CONTACT_TO (optionnel) : destinataire (défaut axelcharpente@yahoo.fr).
//  - CONTACT_FROM (optionnel) : expéditeur sur un domaine vérifié dans Resend
//    (défaut "ATB Charpente <onboarding@resend.dev>" pour test ; à remplacer par
//    une adresse @atb-charpente.fr une fois le domaine vérifié).
// Sans RESEND_API_KEY, la demande est simplement journalisée (pas de blocage).
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

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: process.env.CONTACT_FROM ?? "ATB Charpente <onboarding@resend.dev>",
        to: process.env.CONTACT_TO ?? "axelcharpente@yahoo.fr",
        replyTo: email,
        subject,
        text: body,
      });
      if (error) {
        console.error("[contact] Resend error:", error);
        return NextResponse.json({ error: "Envoi impossible" }, { status: 502 });
      }
    } else {
      // Pas de clé configurée : on journalise (utile en dev / avant Resend).
      console.log("[contact]", subject, "\n", body);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
