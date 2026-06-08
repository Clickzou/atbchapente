// Configuration centrale du site ATB Charpente.
// Les valeurs marquees « TODO: confirmer » seront verifiees a partir de l'export .wpress.

export const site = {
  name: "ATB Charpente",
  baseline: "Charpente, couverture & zinguerie",
  description:
    "Création et rénovation de charpentes, couverture et zinguerie à 30 km autour de Bessières (Haute-Garonne).",
  url: "https://atb-charpente.fr",
  zone: "30 km autour de Bessières",
  contact: {
    phone: "06 31 18 32 04",
    phoneHref: "tel:+33631183204",
    email: "axelcharpente@yahoo.fr", // TODO: confirmer (audit GMB / .wpress)
    city: "Bessières (31660)", // TODO: confirmer l'adresse exacte
  },
} as const;

// Navigation principale (ordre identique au site actuel pour préserver les repères).
export const mainNav = [
  { label: "Accueil", href: "/" },
  { label: "Charpente", href: "/charpente" },
  { label: "Isolation", href: "/isolation" },
  { label: "Gouttière", href: "/gouttiere" },
  { label: "Tuiles", href: "/tuiles" },
  { label: "Fenêtre de toit", href: "/fenetre-de-toit" },
  { label: "Pergola", href: "/pergola" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export type Service = {
  slug: string;
  title: string; // titre court (menu / carte)
  heading: string; // titre h1 de la page
  excerpt: string; // accroche carte d'accueil
  image: string; // image de réalisation associée
};

// Pages services (URLs identiques au WordPress actuel -> pas de perte SEO).
// Les textes longs seront remplacés par le contenu réel issu du .wpress.
export const services: Service[] = [
  {
    slug: "charpente",
    title: "Charpente",
    heading: "Création & rénovation de charpentes",
    excerpt:
      "Charpente traditionnelle, ossature bois, rénovation et extension, réalisées sur mesure.",
    image: "/images/realisations/IMG-20250403-WA0001.jpg",
  },
  {
    slug: "isolation",
    title: "Isolation",
    heading: "Isolation de toitures & étanchéité",
    excerpt:
      "Amélioration du confort et des performances énergétiques de votre toiture.",
    image: "/images/realisations/IMG-20250403-WA0005.jpg",
  },
  {
    slug: "gouttiere",
    title: "Gouttière",
    heading: "Installation & rénovation de gouttières",
    excerpt:
      "Pose et remplacement de gouttières zinc pour une évacuation des eaux durable.",
    image: "/images/realisations/IMG-20250403-WA0010.jpg",
  },
  {
    slug: "tuiles",
    title: "Tuiles",
    heading: "Pose & remaniement de tuiles",
    excerpt:
      "Couverture neuve, réfection et remaniement de toitures en tuiles.",
    image: "/images/realisations/IMG-20250403-WA0015.jpg",
  },
  {
    slug: "fenetre-de-toit",
    title: "Fenêtre de toit",
    heading: "Pose de fenêtres de toit",
    excerpt:
      "Installation de fenêtres de toit pour apporter lumière et ventilation à vos combles.",
    image: "/images/realisations/IMG-20250403-WA0020.jpg",
  },
  {
    slug: "pergola",
    title: "Pergola",
    heading: "Création de pergola en bois",
    excerpt:
      "Conception et fabrication de pergolas en bois sur mesure pour vos extérieurs.",
    image: "/images/realisations/IMG-20250403-WA0025.jpg",
  },
];

// Zone d'intervention (SEO local). TODO: confirmer la liste exacte (16 communes) via le site actuel.
export const communes = [
  "Bessières",
  "Toulouse",
  "Montauban",
  "Albi",
  "Gaillac",
  "Fronton",
  "Villemur-sur-Tarn",
  "Buzet-sur-Tarn",
  "Montastruc-la-Conseillère",
  "Saint-Sulpice-la-Pointe",
  "Rabastens",
  "Grenade",
  "Verfeil",
  "Lavaur",
  "L'Union",
  "Castelnau-d'Estrétefonds",
];
