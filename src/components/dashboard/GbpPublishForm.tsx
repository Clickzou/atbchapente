"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GbpPublishForm() {
  const router = useRouter();
  const [summary, setSummary] = useState("");
  const [ctaUrl, setCtaUrl] = useState("https://atb-charpente.fr/");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/dashboard/gbp/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary, ctaUrl: ctaUrl || undefined }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setFeedback({ type: "ok", msg: "Post publié sur la fiche Google ✔" });
        setSummary("");
        router.refresh();
      } else {
        setFeedback({ type: "err", msg: data.error || "Échec de la publication." });
      }
    } catch {
      setFeedback({ type: "err", msg: "Erreur réseau." });
    }
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <p className="font-semibold text-anthracite">Publier un post</p>
      <p className="mt-0.5 text-xs text-foreground/50">
        Le post apparaît sur votre fiche Google. 80–160 mots conseillés, sans hashtags.
      </p>

      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={6}
        maxLength={1500}
        placeholder="Rédigez votre actualité (offre, réalisation, conseil…)"
        className="mt-3 w-full rounded-lg border border-black/10 px-4 py-3 text-sm focus:border-orange focus:outline-none"
      />
      <div className="mt-1 flex items-center justify-between text-[11px] text-foreground/40">
        <span>{summary.length}/1500</span>
      </div>

      <label className="mt-3 block text-sm font-medium text-anthracite">
        Lien du bouton (« En savoir plus »)
        <input
          type="url"
          value={ctaUrl}
          onChange={(e) => setCtaUrl(e.target.value)}
          placeholder="https://atb-charpente.fr/"
          className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm focus:border-orange focus:outline-none"
        />
      </label>

      {feedback && (
        <p
          className={`mt-3 text-sm ${
            feedback.type === "ok" ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {feedback.msg}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || summary.trim().length < 20}
        className="mt-4 rounded-full bg-orange px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-dark disabled:opacity-50"
      >
        {loading ? "Publication…" : "Publier sur Google"}
      </button>
    </form>
  );
}
