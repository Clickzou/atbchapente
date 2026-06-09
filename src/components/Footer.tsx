import Link from "next/link";
import Image from "next/image";
import { mainNav, services, site, routes } from "@/lib/site";
import CookieSettingsButton from "@/components/CookieSettingsButton";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="bg-anthracite-dark text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-4 lg:px-8">
        {/* Marque */}
        <div className="lg:col-span-1">
          <Image
            src="/images/logo-atb-charpente.png"
            alt="ATB Charpente"
            width={160}
            height={160}
            className="mb-4 h-16 w-auto rounded bg-white/95 p-1"
          />
          <p className="text-sm leading-relaxed">{site.description}</p>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
            Nos prestations
          </h3>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="hover:text-orange">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={routes.cornerstone} className="font-semibold text-white hover:text-orange">
                Charpentier Toulouse
              </Link>
            </li>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-orange">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
            Contact
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              {site.contact.postalCode} {site.contact.addressLocality}
            </li>
            <li>
              <a href={site.contact.phoneHref} className="hover:text-orange">
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-orange">
                {site.contact.email}
              </a>
            </li>
            <li className="pt-2 text-white/60">Zone : {site.zone}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 sm:flex-row lg:px-8">
          <p>© {year} {site.name}. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-orange">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="hover:text-orange">
              Politique de confidentialité
            </Link>
            <CookieSettingsButton />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-white/50 lg:px-8">
          <a
            href="https://clickzou.fr/creation-site-internet-vitrine-artisan/"
            target="_blank"
            rel="noopener"
            className="hover:text-orange"
          >
            Création site internet artisan
          </a>{" "}
          par Clickzou
        </p>
      </div>
    </footer>
  );
}
