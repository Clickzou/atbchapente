import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false },
  alternates: { canonical: "/politique-de-confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
      <h1 className="text-3xl font-bold text-anthracite">Politique de confidentialité</h1>
      <div className="mt-6 space-y-4 text-foreground/80">
        <p className="rounded-lg border border-orange/30 bg-orange/5 p-4 text-sm">
          ⚙️ Contenu à compléter (données collectées via le formulaire, durée de
          conservation, droits RGPD, cookies) à partir du site actuel.
        </p>
        <p>
          Les informations transmises via le formulaire de contact sont utilisées
          uniquement pour répondre à votre demande et ne sont jamais cédées à des
          tiers.
        </p>
      </div>
    </section>
  );
}
