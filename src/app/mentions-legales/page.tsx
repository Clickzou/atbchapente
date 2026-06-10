import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false },
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-16 pt-28 lg:px-8">
      <h1 className="text-3xl font-bold text-anthracite">Mentions légales</h1>

      <div className="mt-8 space-y-6 text-foreground/80">
        <div>
          <h2 className="text-lg font-semibold text-anthracite">Éditeur du site</h2>
          <p className="mt-2">
            {site.name} — {site.legal.form}
            {site.legal.capital ? ` au capital de ${site.legal.capital}` : ""}
            <br />
            {site.street}, {site.contact.postalCode} {site.contact.addressLocality}, France
            <br />
            {site.legal.rcs}
            <br />
            SIRET : {site.legal.siret} — APE {site.legal.ape}
            <br />
            TVA intracommunautaire : {site.legal.vat}
            <br />
            Directeur de la publication : {site.legal.director}
            <br />
            Téléphone :{" "}
            <a href={site.contact.phoneHref} className="text-orange hover:underline">
              {site.contact.phone}
            </a>
            <br />
            E-mail :{" "}
            <a href={`mailto:${site.contact.email}`} className="text-orange hover:underline">
              {site.contact.email}
            </a>
          </p>
          {!site.legal.capital && (
            <p className="mt-2 rounded-lg border border-orange/30 bg-orange/5 p-3 text-sm">
              ⚙️ À compléter : montant du capital social (obligatoire pour une SARL).
            </p>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-anthracite">Hébergement</h2>
          <p className="mt-2">
            Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
            États-Unis — vercel.com.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-anthracite">Propriété intellectuelle</h2>
          <p className="mt-2">
            L&apos;ensemble des contenus du site (textes, photos, logo, éléments graphiques)
            est la propriété de {site.name}, sauf mention contraire. Toute reproduction
            ou représentation, totale ou partielle, sans autorisation préalable est
            interdite.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-anthracite">Données personnelles</h2>
          <p className="mt-2">
            Le traitement de vos données personnelles est décrit dans notre{" "}
            <Link href="/politique-de-confidentialite" className="text-orange hover:underline">
              politique de confidentialité
            </Link>
            . Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et
            de suppression de vos données en écrivant à {site.contact.email}.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-anthracite">Responsabilité</h2>
          <p className="mt-2">
            {site.name} s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusées sur
            le site mais ne saurait être tenue responsable des erreurs ou omissions, ni
            de l&apos;usage qui en est fait.
          </p>
        </div>
      </div>
    </section>
  );
}
