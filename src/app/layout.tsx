import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import LeadPopup from "@/components/LeadPopup";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Charpentier couvreur à Toulouse | ATB Charpente",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    title: `${site.name} — ${site.baseline}`,
    description: site.description,
    url: site.url,
  },
  icons: {
    icon: "/images/favicon-atb-charpente.webp",
  },
};

// Données structurées schema.org — absentes du site WordPress (levier SEO local).
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}/images/logo-atb-charpente.png`,
  telephone: site.contact.phone,
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.contact.addressLocality,
    postalCode: site.contact.postalCode,
    addressRegion: site.contact.region,
    addressCountry: "FR",
  },
  areaServed: [
    { "@type": "City", name: "Toulouse" },
    { "@type": "City", name: "Bessières" },
  ],
  // TODO: ajouter geo (lat/lng), openingHours et sameAs (fiche Google) une fois confirmés.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <LeadPopup />
      </body>
    </html>
  );
}
