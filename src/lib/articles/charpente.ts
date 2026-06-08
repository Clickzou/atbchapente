import type { BlogArticle } from "./types";

// Articles de la catégorie « Charpente ».
// Le 1er article ci-dessous sert de TEMPLATE de référence pour le cron
// d'auto-publication (structure, ton, maillage, FAQ). Statut "draft" : visible
// en dev, masqué en prod, exempté du contrôle des 2000 mots.
export const charpenteArticles: BlogArticle[] = [
  {
    slug: "renover-charpente-ancienne",
    title: "Rénover une charpente ancienne : le guide complet",
    metaTitle: "Rénover une charpente ancienne : guide complet 2026",
    metaDescription:
      "Diagnostic, étapes, traitements et prix : tout savoir pour rénover une charpente ancienne en bois et préserver votre toiture durablement.",
    excerpt:
      "Fissures, insectes, affaissement : comment diagnostiquer et rénover une charpente ancienne sans tout reconstruire ? Le guide étape par étape.",
    category: "Charpente",
    primaryKeyword: "rénover une charpente ancienne",
    intent: "informational",
    tags: ["charpente", "rénovation", "bois", "traitement"],
    date: "2026-06-08",
    author: "ATB Charpente",
    readTime: "7 min",
    heroImage: "/images/realisations/IMG-20250403-WA0001.jpg",
    heroImageAlt: "Charpente en bois ancienne en cours de rénovation",
    status: "draft",
    relatedSlugs: [],
    content: [
      {
        type: "paragraph",
        text: "Une **charpente ancienne** est souvent le cœur d'une maison de caractère. Avec le temps, le bois subit l'humidité, les insectes et les variations de charge. Faut-il **rénover ou remplacer** ? Dans la majorité des cas, une rénovation bien menée suffit à redonner des décennies de solidité à votre toiture, pour un coût bien inférieur à une reconstruction.",
      },
      {
        type: "heading",
        level: 2,
        text: "Quand faut-il rénover une charpente ancienne ?",
      },
      {
        type: "paragraph",
        text: "Plusieurs signes doivent vous alerter. Un diagnostic précoce évite des travaux lourds et coûteux.",
      },
      {
        type: "list",
        items: [
          "**Affaissement** de la toiture ou déformation visible des pannes",
          "Présence de **sciure** ou de petits trous (insectes xylophages : capricornes, vrillettes)",
          "**Traces d'humidité**, moisissures ou bois qui s'effrite",
          "Fissures importantes dans les pièces maîtresses",
          "Toiture qui date de plus de 30 ans sans entretien",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "Au moindre doute, faites réaliser un diagnostic par un charpentier professionnel. L'inspection est rapide et permet d'agir avant que les dégâts ne s'étendent à la toiture entière.",
      },
      {
        type: "heading",
        level: 2,
        text: "Les étapes d'une rénovation de charpente",
      },
      {
        type: "heading",
        level: 3,
        text: "1. Le diagnostic structurel",
      },
      {
        type: "paragraph",
        text: "Le charpentier évalue l'état de chaque pièce de bois, repère les zones attaquées et vérifie la stabilité de l'ensemble. Ce diagnostic conditionne tout le chantier.",
      },
      {
        type: "heading",
        level: 3,
        text: "2. Le traitement du bois",
      },
      {
        type: "paragraph",
        text: "Un **traitement curatif** élimine les insectes et champignons, suivi d'un traitement préventif. C'est une étape incontournable pour ne pas voir le problème réapparaître.",
      },
      {
        type: "heading",
        level: 3,
        text: "3. Le renforcement ou remplacement des pièces",
      },
      {
        type: "paragraph",
        text: "Les pièces trop abîmées sont remplacées à l'identique ; les autres sont renforcées (moisage, ajout de connecteurs). L'objectif : conserver un maximum du bois d'origine.",
      },
      {
        type: "heading",
        level: 2,
        text: "Combien coûte la rénovation d'une charpente ?",
      },
      {
        type: "paragraph",
        text: "Le prix dépend de l'ampleur des dégâts, de l'accessibilité et du type de charpente. À titre indicatif, comptez de 50 à 90 €/m² pour un traitement, et davantage en cas de remplacement de pièces. Seul un **devis sur mesure** après diagnostic donne un chiffre fiable.",
      },
      {
        type: "faq",
        items: [
          {
            question: "Peut-on rénover une charpente sans déposer la toiture ?",
            answer:
              "Oui, dans de nombreux cas le traitement et le renforcement se font par l'intérieur, sans toucher à la couverture. Cela dépend de l'état des pièces.",
          },
          {
            question: "Combien de temps dure une rénovation de charpente ?",
            answer:
              "De quelques jours pour un traitement simple à deux semaines pour un renforcement structurel important.",
          },
        ],
      },
      {
        type: "cta",
        text: "Vous avez un doute sur l'état de votre charpente ?",
        href: "/contact-charpentier",
        label: "Demander un diagnostic gratuit",
      },
    ],
  },
];
