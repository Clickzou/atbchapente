"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Bannière de consentement aux cookies (RGPD). Choix mémorisé en localStorage.
// Tant qu'aucun choix n'est fait, aucun cookie de mesure ne doit être déposé.
const KEY = "atb-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      /* localStorage indisponible : ne rien afficher */
    }
    // Réouverture depuis le footer (« Gestion des cookies »).
    const open = () => setVisible(true);
    window.addEventListener("atb-open-cookies", open);
    return () => window.removeEventListener("atb-open-cookies", open);
  }, []);

  const decide = (value: "accepted" | "refused") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    // Permet à la mesure d'audience de se charger immédiatement à l'acceptation.
    if (value === "accepted") window.dispatchEvent(new Event("atb-cookie-accepted"));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] px-4 pb-4">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-black/10 bg-white p-5 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-foreground/80">
          Nous utilisons des cookies pour mesurer l&apos;audience et améliorer votre
          expérience. Vous pouvez les accepter ou les refuser.{" "}
          <Link
            href="/politique-de-confidentialite"
            className="font-medium text-orange hover:underline"
          >
            En savoir plus
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide("refused")}
            className="rounded-full border border-black/15 px-5 py-2 text-sm font-semibold text-anthracite transition-colors hover:bg-muted"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-full bg-orange px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-dark"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
