import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirections 301 pour préserver le SEO à la migration WordPress → Next.
  // Les slugs des pages services/contact/réalisations/blog/cornerstone sont
  // conservés à l'identique (pas de redirection nécessaire). On redirige ici
  // uniquement les URLs qui disparaissent (WooCommerce) ou se consolident.
  async redirects() {
    return [
      // Page d'accueil WP (slug "accueil") → racine
      { source: "/accueil", destination: "/", permanent: true },
      // Ancienne page "Devis" → page de contact (où se trouve le formulaire)
      { source: "/devis-charpentier", destination: "/contact-charpentier", permanent: true },
      // Politique de cookies WP → politique de confidentialité unique
      { source: "/politique-de-cookie-eu", destination: "/politique-de-confidentialite", permanent: true },
      // WooCommerce (abandonné) → accueil, y compris sous-pages de compte
      { source: "/panier", destination: "/", permanent: true },
      { source: "/commander", destination: "/", permanent: true },
      { source: "/mon-compte", destination: "/", permanent: true },
      { source: "/mon-compte/:path*", destination: "/", permanent: true },
      { source: "/boutique", destination: "/", permanent: true },
      // Équivalents anglais WooCommerce, au cas où
      { source: "/cart", destination: "/", permanent: true },
      { source: "/checkout", destination: "/", permanent: true },
      { source: "/my-account", destination: "/", permanent: true },
      { source: "/my-account/:path*", destination: "/", permanent: true },
      { source: "/shop", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
