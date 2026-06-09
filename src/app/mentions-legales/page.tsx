import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false },
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-16 pt-28 lg:px-8">
      <h1 className="text-3xl font-bold text-anthracite">Mentions légales</h1>
      <div className="mt-6 space-y-4 text-foreground/80">
        <p className="rounded-lg border border-orange/30 bg-orange/5 p-4 text-sm">
          ⚙️ Contenu à compléter avec les informations légales exactes (raison
          sociale, SIRET, hébergeur, etc.) issues du site actuel.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-anthracite">Éditeur du site</h2>
        <p>ATB Charpente — Bessières (31660). [À compléter : SIRET, statut juridique.]</p>
        <h2 className="pt-4 text-xl font-semibold text-anthracite">Hébergement</h2>
        <p>Vercel Inc.</p>
      </div>
    </section>
  );
}
