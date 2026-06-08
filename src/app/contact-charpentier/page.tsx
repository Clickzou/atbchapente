import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & devis gratuit – Charpentier à Toulouse",
  description:
    "Contactez ATB Charpente pour un devis gratuit : charpente, couverture, zinguerie et rénovation de toiture à Toulouse et ses environs.",
  alternates: { canonical: "/contact-charpentier" },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-anthracite-dark text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Contactez-nous</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Un projet, une question ? Demandez votre devis gratuit et sans engagement.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-anthracite">Coordonnées</h2>
          <ul className="mt-6 space-y-4 text-foreground/80">
            <li>
              <span className="font-semibold text-anthracite">Téléphone : </span>
              <a href={site.contact.phoneHref} className="text-orange hover:underline">
                {site.contact.phone}
              </a>
            </li>
            <li>
              <span className="font-semibold text-anthracite">Email : </span>
              <a href={`mailto:${site.contact.email}`} className="text-orange hover:underline">
                {site.contact.email}
              </a>
            </li>
            <li>
              <span className="font-semibold text-anthracite">Secteur : </span>
              {site.contact.addressLocality} ({site.contact.postalCode}) — {site.zone}
            </li>
          </ul>
          <p className="mt-8 text-sm text-foreground/60">
            Du lundi au vendredi. Réponse sous 24/48h.
          </p>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm lg:p-8">
          <h2 className="mb-6 text-2xl font-bold text-anthracite">Votre demande</h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
