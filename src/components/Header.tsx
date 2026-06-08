"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { mainNav, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="Accueil ATB Charpente">
          <Image
            src="/images/logo-atb-charpente.png"
            alt="ATB Charpente"
            width={150}
            height={150}
            className="h-14 w-auto"
            priority
          />
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-1 xl:flex">
          {mainNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-orange ${
                  active ? "text-orange" : "text-anthracite"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-dark sm:inline-block"
          >
            Devis gratuit
          </Link>

          {/* Bouton menu mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2 text-anthracite xl:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <nav className="border-t border-black/5 bg-white xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-anthracite hover:bg-muted hover:text-orange"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-orange px-5 py-3 text-center text-base font-semibold text-white"
            >
              Devis gratuit
            </Link>
            <a
              href={site.contact.phoneHref}
              className="mt-2 px-3 py-3 text-center text-sm text-anthracite"
            >
              📞 {site.contact.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
