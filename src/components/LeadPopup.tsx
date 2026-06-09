"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Popup de captation : demande si l'internaute veut un service/devis ou un
// rendez-vous, avec prénom, nom, email et téléphone. Affichée une seule fois par
// session, après un court délai, et jamais sur la page contact.
type Status = "idle" | "sending" | "sent" | "error";
const KEY = "atb-lead-popup-seen";

export default function LeadPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [demande, setDemande] = useState<"devis" | "rendez-vous">("devis");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (pathname?.startsWith("/contact")) return;
    let seen = false;
    try {
      seen = !!sessionStorage.getItem(KEY);
    } catch {
      seen = false;
    }
    if (seen) return;
    const t = setTimeout(() => setOpen(true), 15000);
    return () => clearTimeout(t);
  }, [pathname]);

  const close = () => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ ...data, demande, source: "popup" }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
    } catch {
      setStatus("error");
    }
  }

  if (!open) return null;

  const field =
    "w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm focus:border-orange focus:outline-none";

  return (
    <div
      className="fixed inset-0 z-[95] flex items-end justify-center bg-black/50 p-4 backdrop-blur-sm sm:items-center"
      onClick={close}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Fermer"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-foreground/50 transition-colors hover:bg-muted hover:text-anthracite"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {status === "sent" ? (
          <div className="p-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5L20 7" />
              </svg>
            </div>
            <p className="text-lg font-bold text-anthracite">Merci !</p>
            <p className="mt-1 text-sm text-foreground/70">
              Votre demande est bien reçue, nous vous recontactons très vite.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-5 rounded-full bg-orange px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-dark"
            >
              Fermer
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange">
              ATB Charpente
            </p>
            <h2 className="mt-1 text-xl font-bold text-anthracite">
              Un projet de toiture ? Parlons-en.
            </h2>
            <p className="mt-1 text-sm text-foreground/70">
              Laissez-nous vos coordonnées, on vous rappelle gratuitement.
            </p>

            {/* Choix du type de demande */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { v: "devis", label: "Un devis / service" },
                { v: "rendez-vous", label: "Un rendez-vous" },
              ].map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() => setDemande(o.v as "devis" | "rendez-vous")}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    demande === o.v
                      ? "border-orange bg-orange text-white"
                      : "border-black/10 text-anthracite hover:border-orange/50"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input name="prenom" required placeholder="Prénom *" className={field} />
                <input name="nom" required placeholder="Nom *" className={field} />
              </div>
              <input type="email" name="email" required placeholder="Email *" className={field} />
              <input name="telephone" required placeholder="Téléphone *" className={field} />
              <label className="flex items-start gap-2 text-xs text-foreground/60">
                <input type="checkbox" required className="mt-0.5" />
                <span>
                  J&apos;accepte d&apos;être recontacté(e) conformément à la politique de
                  confidentialité.
                </span>
              </label>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-orange px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-dark disabled:opacity-60"
              >
                {status === "sending" ? "Envoi…" : "Être recontacté"}
              </button>
              {status === "error" && (
                <p className="text-sm text-red-600">
                  Une erreur est survenue. Réessayez ou appelez-nous.
                </p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
