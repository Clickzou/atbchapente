"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-semibold text-green-800">Merci, votre message a bien été envoyé !</p>
        <p className="mt-1 text-sm text-green-700">Nous vous recontactons rapidement.</p>
      </div>
    );
  }

  const field =
    "w-full rounded-lg border border-black/10 px-4 py-3 text-sm focus:border-orange focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="nom" required placeholder="Nom *" className={field} />
        <input name="telephone" required placeholder="Téléphone *" className={field} />
      </div>
      <input type="email" name="email" required placeholder="Email *" className={field} />
      <input name="sujet" placeholder="Sujet (charpente, toiture…)" className={field} />
      <textarea
        name="message"
        required
        rows={5}
        placeholder="Votre message *"
        className={field}
      />
      <label className="flex items-start gap-2 text-xs text-foreground/60">
        <input type="checkbox" required className="mt-0.5" />
        <span>
          J&apos;accepte que mes informations soient utilisées pour être recontacté(e),
          conformément à la politique de confidentialité.
        </span>
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-orange px-7 py-3.5 font-semibold text-white transition-colors hover:bg-orange-dark disabled:opacity-60"
      >
        {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">
          Une erreur est survenue. Réessayez ou appelez-nous directement.
        </p>
      )}
    </form>
  );
}
