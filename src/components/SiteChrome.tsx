"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";
import LeadPopup from "./LeadPopup";

// Le dashboard (/dashboard) n'affiche pas l'en-tête / pied de page marketing.
function isDashboard(pathname: string | null) {
  return !!pathname && pathname.startsWith("/dashboard");
}

export function SiteHeader() {
  return isDashboard(usePathname()) ? null : <Header />;
}

export function SiteFooterAndExtras() {
  if (isDashboard(usePathname())) return null;
  return (
    <>
      <Footer />
      <CookieBanner />
      <LeadPopup />
    </>
  );
}
