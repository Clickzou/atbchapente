import { site } from "@/lib/site";

/**
 * Envoi des formulaires via Formspree (gratuit, sans backend) — comme Vie Animale.
 *
 * SETUP (une seule fois) :
 *   1. Compte gratuit sur https://formspree.io
 *   2. Créer un formulaire (ex. "ATB Charpente — Contact")
 *   3. Copier l'endpoint (type https://formspree.io/f/xxxxxxxx)
 *   4. Vercel → Settings → Environment Variables :
 *      NEXT_PUBLIC_FORMSPREE_ENDPOINT = l'URL copiée, puis Redeploy.
 *
 * Si l'endpoint n'est pas défini (ou si Formspree échoue), on retombe sur un
 * `mailto:` vers l'adresse de contact : le client mail du visiteur s'ouvre,
 * pré-rempli. Donc le formulaire marche dès maintenant, sans aucune config.
 */
// Endpoint Formspree d'ATB (compte Clickzou). La variable d'env reste prioritaire
// si on veut le changer sans toucher au code.
const FORMSPREE_DEFAULT = "https://formspree.io/f/xwvjqjjy";

export const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || FORMSPREE_DEFAULT;

export const CONTACT_EMAIL = site.contact.email;
// Adresse mise en copie (Cc) des demandes. Le destinataire principal (« To »)
// est configuré dans Formspree (jc@clickzou.fr) ; on met Axel en copie ici.
// NB : le Cc doit être DIFFÉRENT du destinataire Formspree, sinon Formspree
// refuse l'envoi (« address must be unique between to/cc »).
export const COPY_EMAIL = "axelcharpente@yahoo.fr";

export type SubmitResult =
  | { ok: true; mode: "formspree" | "mailto" }
  | { ok: false; error: string };

export async function submitForm(
  data: Record<string, string>,
  options: { subject: string; replyTo?: string },
): Promise<SubmitResult> {
  // Formspree configuré → envoi serveur (le visiteur ne voit pas son client mail).
  if (FORMSPREE_ENDPOINT) {
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: options.subject,
          _cc: COPY_EMAIL,
          ...(options.replyTo ? { _replyto: options.replyTo } : {}),
        }),
      });
      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        return { ok: false, error: msg || `HTTP ${res.status}` };
      }
      return { ok: true, mode: "formspree" };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : "Erreur réseau" };
    }
  }

  // Repli — pas d'endpoint : on ouvre la messagerie du visiteur.
  const body = Object.entries(data)
    .map(([k, v]) => `${k} : ${v}`)
    .join("\n");
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    options.subject,
  )}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
  return { ok: true, mode: "mailto" };
}
