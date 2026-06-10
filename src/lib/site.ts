// Configuration centrale du site ATB Charpente.
// Positionnement SEO : Toulouse en priorité (fort volume), Bessières en secondaire
// (adresse réelle / fiche Google). Les slugs reprennent EXACTEMENT ceux du site
// WordPress actuel afin de préserver le référencement (aucune redirection requise).
// Les valeurs « TODO: confirmer » seront vérifiées via l'export .wpress / la Search Console.

export const site = {
  name: "ATB Charpente",
  baseline: "Charpentier couvreur à Toulouse",
  description:
    "ATB Charpente, votre charpentier couvreur à Toulouse et ses environs : création et rénovation de charpente bois, couverture, zinguerie et isolation de toiture. Devis gratuit.",
  url: "https://atb-charpente.fr",
  city: "Toulouse", // cible SEO principale
  baseCity: "Bessières", // adresse réelle (NAP)
  zone: "Toulouse et ses environs (30 km)",
  contact: {
    phone: "06 31 18 32 04",
    phoneHref: "tel:+33631183204",
    email: "axelcharpente@yahoo.fr", // TODO: confirmer / privilégier un email @atb-charpente.fr
    addressLocality: "Bessières",
    postalCode: "31660",
    region: "Occitanie",
  },
  // Avis Google (fiche GMB). TODO: remplacer `url` par l'URL exacte de la fiche
  // (lien « partager » de la fiche Google) ; le lien Maps ci-dessous fait l'affaire.
  reviews: {
    rating: "5,0",
    url: "https://www.google.com/maps/search/?api=1&query=ATB+Charpente+Bessi%C3%A8res",
  },
  // Coordonnées géographiques (signal local schema.org). TODO: affiner avec les
  // coordonnées exactes du 491 chemin des Bourdettes (ci-dessous = Bessières bourg).
  geo: { lat: 43.7976, lng: 1.6043 },
  street: "491 chemin des Bourdettes",
  // Horaires d'ouverture. TODO: confirmer avec le client (la fiche Google en a).
  openingHours: [{ days: ["Mo", "Tu", "We", "Th", "Fr"], open: "08:00", close: "18:00" }],
  priceRange: "€€",
  // Image Open Graph par défaut (partages réseaux / messageries), 16:9.
  ogImage: "/images/og-atb-charpente.jpg",
  // Identité légale (source Insee/RNE via societe.com, MAJ 10/06/2026).
  legal: {
    form: "SARL (Société à responsabilité limitée)",
    siren: "823 274 097",
    siret: "823 274 097 00018",
    vat: "FR58823274097",
    ape: "4391A — Travaux de charpente",
    rcs: "RCS Toulouse 823 274 097",
    director: "Axel Truc", // responsable de la publication
    capital: "6 000 €", // capital social fixe
  },
} as const;

// Routes nommées (slugs réels du WordPress = continuité SEO).
export const routes = {
  realisations: "/realisations-charpentier-toulouse-bessiere",
  contact: "/contact-charpentier",
  devis: "/contact-charpentier",
  blog: "/blog",
  cornerstone: "/charpentier-toulouse", // page pilier (cible SEO principale)
} as const;

// Navigation principale (libellés courts ; href = slugs réels existants).
export const mainNav = [
  { label: "Accueil", href: "/" },
  { label: "Charpente", href: "/creation-charpente-bois-renovation" },
  { label: "Isolation", href: "/isolation-toiture" },
  { label: "Gouttière", href: "/pose-changement-gouttieres-zinc" },
  { label: "Tuiles", href: "/pose-remaniement-tuiles" },
  { label: "Fenêtre de toit", href: "/creation-fenetre-de-toit-bois" },
  { label: "Pergola", href: "/creation-pergola-bois" },
  { label: "Réalisations", href: routes.realisations },
  { label: "Blog", href: routes.blog },
  { label: "Contact", href: routes.contact },
] as const;

export type Service = {
  slug: string; // slug réel (identique au WordPress)
  title: string; // libellé court (menu / carte)
  heading: string; // H1 de la page (Toulouse-orienté)
  seoTitle: string; // balise <title> (Toulouse primaire + Bessières secondaire)
  metaDescription: string;
  excerpt: string; // accroche carte d'accueil
  image: string;
  heroImage?: string; // image d'en-tête de la page service (sinon `image`)
};

export const services: Service[] = [
  {
    slug: "creation-charpente-bois-renovation",
    title: "Charpente",
    heading: "Création & rénovation de charpente bois à Toulouse",
    seoTitle: "Charpente bois à Toulouse – création & rénovation",
    metaDescription:
      "Charpente bois à Toulouse : charpente traditionnelle, ossature bois, rénovation et extension sur mesure. Devis gratuit autour de Toulouse et Bessières.",
    excerpt:
      "Charpente traditionnelle, ossature bois, rénovation et extension, réalisées sur mesure.",
    image: "/images/realisations/creation-charpente.jpg",
    heroImage: "/images/realisations/IMG-20250403-WA0010.jpg",
  },
  {
    slug: "isolation-toiture",
    title: "Isolation",
    heading: "Isolation de toiture à Toulouse",
    seoTitle: "Isolation de toiture à Toulouse – confort & économies",
    metaDescription:
      "Isolation de toiture par l'extérieur (sarking) à Toulouse et Bessières : confort thermique et économies d'énergie. Devis gratuit.",
    excerpt:
      "Amélioration du confort et des performances énergétiques de votre toiture.",
    image: "/images/realisations/isolation-toiture-par-exterieur.jpg",
  },
  {
    slug: "pose-changement-gouttieres-zinc",
    title: "Gouttière",
    heading: "Pose & changement de gouttières zinc à Toulouse",
    seoTitle: "Gouttières zinc à Toulouse – pose & remplacement",
    metaDescription:
      "Pose et remplacement de gouttières zinc à Toulouse, Bessières et leurs environs pour une évacuation des eaux durable. Devis gratuit.",
    excerpt:
      "Pose et remplacement de gouttières zinc pour une évacuation des eaux durable.",
    image: "/images/realisations/pose-goutuere-zinc.webp",
  },
  {
    slug: "pose-remaniement-tuiles",
    title: "Tuiles",
    heading: "Pose & remaniement de tuiles à Toulouse",
    seoTitle: "Couverture tuiles à Toulouse – pose & remaniement",
    metaDescription:
      "Couverture neuve, réfection et remaniement de toitures en tuiles à Toulouse et Bessières. Couvreur tuiles, devis gratuit.",
    excerpt: "Couverture neuve, réfection et remaniement de toitures en tuiles.",
    image: "/images/realisations/pose-changement-tuile-canal-romane-plate.jpg",
  },
  {
    slug: "creation-fenetre-de-toit-bois",
    title: "Fenêtre de toit",
    heading: "Pose de fenêtre de toit à Toulouse",
    seoTitle: "Pose de fenêtre de toit à Toulouse – Velux & bois",
    metaDescription:
      "Installation de fenêtres de toit à Toulouse et Bessières pour apporter lumière et ventilation à vos combles. Devis gratuit.",
    excerpt:
      "Installation de fenêtres de toit pour apporter lumière et ventilation à vos combles.",
    image: "/images/realisations/IMG-20250403-WA0015.jpg",
  },
  {
    slug: "creation-pergola-bois",
    title: "Pergola",
    heading: "Création de pergola en bois à Toulouse",
    seoTitle: "Pergola bois sur mesure à Toulouse – création",
    metaDescription:
      "Conception et fabrication de pergolas en bois sur mesure à Toulouse, Bessières et leurs environs. Devis gratuit.",
    excerpt:
      "Conception et fabrication de pergolas en bois sur mesure pour vos extérieurs.",
    image: "/images/realisations/pose-pergola-bois-toulouse-bessiere.jpg",
  },
];

// Zone d'intervention — Toulouse et son agglomération en tête (SEO local).
// TODO: confirmer la liste exacte via le site actuel.
export const communes = [
  "Toulouse",
  "L'Union",
  "Saint-Jean",
  "Balma",
  "Montrabé",
  "Castelmaurou",
  "Saint-Sulpice-la-Pointe",
  "Montastruc-la-Conseillère",
  "Verfeil",
  "Bessières",
  "Villemur-sur-Tarn",
  "Buzet-sur-Tarn",
  "Fronton",
  "Castelnau-d'Estrétefonds",
  "Grenade",
  "Montauban",
];
