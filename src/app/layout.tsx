import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { SiteHeader, SiteFooterAndExtras } from "@/components/SiteChrome";
import Analytics from "@/components/Analytics";

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
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.baseline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.baseline}`,
    description: site.description,
    images: [site.ogImage],
  },
  // Favicon / icônes : gérés par les conventions de fichiers dans app/
  // (favicon.ico, icon.png, apple-icon.png — générés depuis le logo ATB).
  // Vérification Google Search Console (renseigner NEXT_PUBLIC_GSC_VERIFICATION
  // dans les variables d'environnement Vercel ; sinon balise non rendue).
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
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
    streetAddress: site.street,
    addressLocality: site.contact.addressLocality,
    postalCode: site.contact.postalCode,
    addressRegion: site.contact.region,
    addressCountry: "FR",
  },
  areaServed: [
    { "@type": "City", name: "Toulouse" },
    { "@type": "City", name: "Bessières" },
  ],
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  hasMap: site.reviews.url,
  sameAs: [site.reviews.url],
  priceRange: site.priceRange,
  openingHoursSpecification: site.openingHours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.open,
    closes: h.close,
  })),
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
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooterAndExtras />
        <Analytics />
      </body>
    </html>
  );
}
