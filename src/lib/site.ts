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
} as const;

// Routes nommées (slugs réels du WordPress = continuité SEO).
export const routes = {
  realisations: "/realisations-charpentier-toulouse-bessiere",
  contact: "/contact-charpentier",
  devis: "/contact-charpentier",
  blog: "/blog",
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
};

export const services: Service[] = [
  {
    slug: "creation-charpente-bois-renovation",
    title: "Charpente",
    heading: "Création & rénovation de charpente bois à Toulouse",
    seoTitle: "Charpentier à Toulouse – Création & rénovation de charpente bois",
    metaDescription:
      "Charpentier à Toulouse : charpente traditionnelle, ossature bois, rénovation et extension sur mesure. Devis gratuit autour de Toulouse et Bessières.",
    excerpt:
      "Charpente traditionnelle, ossature bois, rénovation et extension, réalisées sur mesure.",
    image: "/images/realisations/IMG-20250403-WA0001.jpg",
  },
  {
    slug: "isolation-toiture",
    title: "Isolation",
    heading: "Isolation de toiture à Toulouse",
    seoTitle: "Isolation de toiture à Toulouse & Bessières – Confort thermique",
    metaDescription:
      "Isolation de toiture par l'extérieur (sarking) à Toulouse et Bessières : confort thermique et économies d'énergie. Devis gratuit.",
    excerpt:
      "Amélioration du confort et des performances énergétiques de votre toiture.",
    image: "/images/realisations/IMG-20250403-WA0005.jpg",
  },
  {
    slug: "pose-changement-gouttieres-zinc",
    title: "Gouttière",
    heading: "Pose & changement de gouttières zinc à Toulouse",
    seoTitle: "Gouttières zinc à Toulouse – Pose & remplacement | ATB Charpente",
    metaDescription:
      "Pose et remplacement de gouttières zinc à Toulouse et ses environs pour une évacuation des eaux durable. Devis gratuit.",
    excerpt:
      "Pose et remplacement de gouttières zinc pour une évacuation des eaux durable.",
    image: "/images/realisations/IMG-20250403-WA0010.jpg",
  },
  {
    slug: "pose-remaniement-tuiles",
    title: "Tuiles",
    heading: "Pose & remaniement de tuiles à Toulouse",
    seoTitle: "Couverture tuiles à Toulouse – Pose & remaniement | ATB Charpente",
    metaDescription:
      "Couverture neuve, réfection et remaniement de toitures en tuiles à Toulouse et Bessières. Charpentier couvreur, devis gratuit.",
    excerpt: "Couverture neuve, réfection et remaniement de toitures en tuiles.",
    image: "/images/realisations/IMG-20250403-WA0015.jpg",
  },
  {
    slug: "creation-fenetre-de-toit-bois",
    title: "Fenêtre de toit",
    heading: "Pose de fenêtre de toit à Toulouse",
    seoTitle: "Pose de fenêtre de toit à Toulouse & Bessières – ATB Charpente",
    metaDescription:
      "Installation de fenêtres de toit à Toulouse pour apporter lumière et ventilation à vos combles. Devis gratuit.",
    excerpt:
      "Installation de fenêtres de toit pour apporter lumière et ventilation à vos combles.",
    image: "/images/realisations/IMG-20250403-WA0020.jpg",
  },
  {
    slug: "creation-pergola-bois",
    title: "Pergola",
    heading: "Création de pergola en bois à Toulouse",
    seoTitle: "Pergola bois sur mesure à Toulouse – Création | ATB Charpente",
    metaDescription:
      "Conception et fabrication de pergolas en bois sur mesure à Toulouse et ses environs. Devis gratuit.",
    excerpt:
      "Conception et fabrication de pergolas en bois sur mesure pour vos extérieurs.",
    image: "/images/realisations/IMG-20250403-WA0025.jpg",
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
