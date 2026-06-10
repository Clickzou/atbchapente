"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

// Google Analytics 4, chargé UNIQUEMENT après consentement aux cookies (RGPD).
// L'ID est lu depuis NEXT_PUBLIC_GA_ID (variable d'env Vercel) : tant qu'il n'est
// pas défini, rien n'est chargé. Le chargement réagit aussi à l'acceptation en
// direct depuis la bannière (événement « atb-cookie-accepted »), sans rechargement.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    const check = () => {
      try {
        setAllowed(localStorage.getItem("atb-cookie-consent") === "accepted");
      } catch {
        setAllowed(false);
      }
    };
    check();
    window.addEventListener("atb-cookie-accepted", check);
    return () => window.removeEventListener("atb-cookie-accepted", check);
  }, []);

  if (!GA_ID || !allowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
