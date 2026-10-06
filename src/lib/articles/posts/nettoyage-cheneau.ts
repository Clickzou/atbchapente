import type { BlogArticle } from "../types";

// Rédigé à la main le 06/10/2026 (audit SEO/GEO d'octobre, créneau réservé du
// calendrier) : publié automatiquement le 27/10/2026. Faits sur ATB repris
// uniquement des pages du site (zinguerie, chéneaux, zone, devis) ; fréquence de
// nettoyage reprise de l'article « À quelle fréquence entretenir ses gouttières ? ».
export const article: BlogArticle = {
  slug: "nettoyage-cheneau",
  title: "Nettoyage de chéneau : quand le faire et qui appeler à l’automne",
  metaTitle: "Nettoyage de chéneau : quand le faire, qui appeler",
  metaDescription:
    "Nettoyage de chéneau : au moins une fois par an après la chute des feuilles, plus souvent sous des arbres. Risques, méthode et quand appeler un pro.",
  excerpt:
    "Un chéneau bouché ne déborde pas dehors comme une gouttière : l’eau peut passer dans les murs et la charpente. Quand le nettoyer, comment, et quand confier le travail à un couvreur-zingueur.",
  category: "Zinguerie",
  primaryKeyword: "nettoyage de chéneau",
  intent: "informational",
  tags: ["chéneau", "zinguerie", "entretien", "eaux pluviales", "automne"],
  date: "2026-10-27",
  author: "ATB Charpente",
  readTime: "10 min",
  heroImage: "/images/realisations/refection-toiture-tuiles-zinc-toulouse.jpeg",
  heroImageAlt: "Ouvrage en zinc entre deux toitures en tuiles canal, l’une neuve et l’autre ancienne, près de Toulouse",
  status: "published",
  relatedSlugs: [
    "entretien-gouttieres-frequence",
    "evacuation-eaux-pluviales-probleme",
    "noue-toiture-zinguerie",
  ],
  content: [
    {
      type: "callout",
      variant: "info",
      text: "**En bref** : un **chéneau se nettoie au moins une fois par an**, après la chute des feuilles, et plus souvent si des arbres surplombent la toiture. C’est un travail en hauteur, souvent depuis le toit lui-même : il est plus sûr de le confier à un **couvreur-zingueur**, qui vérifie en même temps l’état du zinc et des soudures.",
    },
    {
      type: "paragraph",
      text: "Chaque automne, les feuilles s’accumulent sur les toits de la région toulousaine, glissent le long des pentes et finissent dans les évacuations. Sur une maison équipée de gouttières pendantes, le problème se voit vite : l’eau déborde par-dessus le bord et ruisselle sur la façade. Sur une maison équipée d’un **chéneau**, c’est plus sournois. Le **nettoyage de chéneau** est pourtant l’un des entretiens les plus utiles d’une toiture, et l’un des plus souvent oubliés, parce que l’ouvrage est peu visible depuis le sol.",
    },
    {
      type: "paragraph",
      text: "Ce guide explique ce qu’est un chéneau et pourquoi il réclame plus d’attention qu’une gouttière, à quel moment le nettoyer, comment se déroule un nettoyage bien fait et dans quels cas faire appel à un professionnel. Il a été rédigé par **ATB Charpente**, charpentier-couvreur-zingueur installé à Bessières, qui intervient à Toulouse et dans un rayon d’une trentaine de kilomètres.",
    },
    {
      type: "heading",
      level: 2,
      text: "Chéneau ou gouttière : quelle différence ?",
    },
    {
      type: "paragraph",
      text: "On confond souvent les deux, et pourtant ils ne se comportent pas de la même façon quand ils se bouchent. La **gouttière** est un canal fixé au bord du toit par des crochets : elle est suspendue à l’extérieur du bâtiment. Le **chéneau** est un canal d’évacuation **intégré à la structure du toit ou du mur**. On le rencontre souvent sur les bâtiments anciens ou de grande dimension, derrière un muret en bas de pente, ou entre deux toitures qui se rejoignent.",
    },
    {
      type: "list",
      items: [
        "**Gouttière pendante** : accrochée en bas de pente, visible depuis le sol, elle déborde vers l’extérieur.",
        "**Chéneau encaissé** : logé dans l’épaisseur du mur ou derrière un acrotère, il est peu visible et peut déborder vers l’intérieur de l’ouvrage.",
        "**Chéneau entre deux toits** : il recueille l’eau de deux pans à la fois, donc un volume d’eau et de débris plus important.",
      ],
    },
    {
      type: "paragraph",
      text: "Les différents profils de gouttières et leurs usages sont présentés dans notre article sur les [types de gouttières](/blog/types-de-gouttieres).",
    },
    {
      type: "heading",
      level: 2,
      text: "Pourquoi un chéneau bouché est plus risqué qu’une gouttière bouchée",
    },
    {
      type: "paragraph",
      text: "Quand une gouttière pendante déborde, l’eau tombe à l’extérieur : elle salit la façade et humidifie le pied des murs, ce qui reste un problème, mais elle ne rentre pas dans la maison. Un chéneau encaissé, lui, est bordé d’un côté par le toit et de l’autre par un mur. Lorsqu’il se remplit, l’eau monte jusqu’à trouver un passage : sous les tuiles du bas de pente, par-dessus le relevé de zinc, ou dans la maçonnerie. Elle atteint alors le haut des murs, les sablières et les pieds de chevrons.",
    },
    {
      type: "callout",
      variant: "warning",
      text: "Des auréoles au plafond d’une pièce située sous le bas de la toiture, une tache d’humidité en haut d’un mur intérieur ou une odeur de renfermé dans les combles après une forte pluie : ces signes peuvent venir d’un chéneau qui déborde vers l’intérieur. Faites vérifier l’évacuation avant d’engager des travaux de peinture ou de plâtrerie.",
    },
    {
      type: "paragraph",
      text: "Un chéneau qui reste encombré garde aussi de l’eau stagnante et des débris humides au contact du métal. Ce n’est pas bon pour la longévité du zinc et des soudures, ni pour les bois qui se trouvent juste en dessous. Les conséquences d’une mauvaise évacuation sur la maison sont détaillées dans notre article sur les [problèmes d’évacuation des eaux pluviales](/blog/evacuation-eaux-pluviales-probleme).",
    },
    {
      type: "heading",
      level: 2,
      text: "Quand nettoyer un chéneau ?",
    },
    {
      type: "paragraph",
      text: "La fréquence dépend avant tout de l’environnement de la maison. Comme nous l’expliquons dans notre guide sur la [fréquence d’entretien des gouttières](/blog/entretien-gouttieres-frequence), les mêmes repères valent pour un chéneau :",
    },
    {
      type: "list",
      items: [
        "**Maison dégagée, sans arbre à proximité** : un nettoyage par an suffit généralement, idéalement à l’automne.",
        "**Arbres proches ou surplombant le toit** : deux nettoyages par an au minimum, un à l’automne après la chute des feuilles, un au printemps après la chute des fleurs, des samares et des bourgeons.",
        "**Après un épisode de vent fort ou d’orage** : un contrôle visuel, car un seul coup de vent peut ramener d’un coup une grande quantité de feuilles et de branchages.",
      ],
    },
    {
      type: "heading",
      level: 3,
      text: "Pourquoi l’automne est le bon moment",
    },
    {
      type: "paragraph",
      text: "Autour de Toulouse, la chute des feuilles se concentre sur quelques semaines, au moment où reviennent les pluies d’automne. Un chéneau nettoyé une fois l’essentiel des feuilles tombé aborde l’hiver dégagé. Nettoyé trop tôt, il se remplit de nouveau avant les premières grosses pluies ; nettoyé trop tard, il a déjà dû encaisser des averses avec une évacuation encombrée.",
    },
    {
      type: "heading",
      level: 3,
      text: "Les signes qu’un chéneau est encombré",
    },
    {
      type: "list",
      items: [
        "De l’eau qui stagne dans le chéneau plusieurs heures après la pluie.",
        "Une descente qui ne coule presque plus, ou qui gargouille, alors qu’il pleut.",
        "Des végétaux, mousses ou petites pousses visibles dans le canal.",
        "Des coulures ou des traces d’humidité sous le bas de la toiture, dehors comme dedans.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Comment se déroule un nettoyage de chéneau bien fait",
    },
    {
      type: "paragraph",
      text: "Le nettoyage en lui-même n’a rien de compliqué ; la difficulté tient à l’accès et à la précaution avec laquelle il faut traiter le zinc. Un nettoyage complet suit généralement ces étapes :",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "**Sécuriser l’accès** : échafaudage, échelle fixée ou accès par la toiture avec un équipement contre les chutes.",
        "**Retirer les débris à la main** : feuilles, mousses, branchages, en commençant par les zones les plus éloignées de la descente.",
        "**Dégager la naissance et la crapaudine**, la grille qui protège l’entrée de la descente, car c’est là que les débris s’accumulent.",
        "**Vérifier que la descente est libre**, sur toute sa hauteur.",
        "**Rincer à l’eau claire, sans pression**, pour contrôler que l’eau s’écoule bien vers la descente et ne stagne nulle part.",
        "**Inspecter le chéneau vide** : soudures, joints, relevés contre le mur, traces de corrosion, déformations ou perte de pente.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      text: "Évitez le nettoyeur haute pression dans un chéneau en zinc : le jet peut abîmer les soudures et chasser l’eau sous les tuiles du bas de pente. Une brosse souple, une petite pelle en plastique et de l’eau sans pression suffisent.",
    },
    {
      type: "heading",
      level: 2,
      text: "Les points sensibles d’un chéneau à surveiller",
    },
    {
      type: "paragraph",
      text: "Un chéneau propre n’est pas forcément un chéneau étanche. Le nettoyage est le meilleur moment pour regarder de près les endroits où les désordres apparaissent en premier, parce que l’ouvrage est enfin visible sur toute sa longueur. Voici ceux qui méritent le plus d’attention :",
    },
    {
      type: "list",
      items: [
        "**La naissance** : la pièce qui raccorde le fond du chéneau à la descente. C’est un point bas où l’eau et les débris convergent ; une soudure fatiguée à cet endroit laisse passer l’eau directement dans la maçonnerie.",
        "**Les soudures et les raccords** entre deux longueurs de zinc : une fissure fine suffit à créer une fuite qui ne se voit qu’à l’intérieur.",
        "**Les relevés contre le mur ou l’acrotère** : la remontée de zinc doit rester bien solidaire de la maçonnerie et protégée en partie haute, sans quoi l’eau s’infiltre derrière.",
        "**La pente du fond** : un chéneau doit conduire l’eau vers la descente. Une zone où l’eau stagne alors que tout est propre signale une pente faussée ou un affaissement du support.",
        "**Le raccord avec les noues et le bas de pente** : c’est là que l’eau de la toiture entre dans le chéneau ; une tuile déplacée ou une bande de zinc décollée renvoie l’eau à côté.",
      ],
    },
    {
      type: "paragraph",
      text: "Noter ces observations, ou les photographier, permet de suivre l’évolution d’une année sur l’autre. Un défaut repéré tôt se règle par une reprise ponctuelle ; le même défaut laissé plusieurs saisons finit souvent par imposer une réfection plus large, et parfois par abîmer les bois qui portent le chéneau.",
    },
    {
      type: "heading",
      level: 2,
      text: "Le faire soi-même ou appeler un professionnel ?",
    },
    {
      type: "paragraph",
      text: "Une gouttière pendante basse, accessible depuis une échelle bien calée, peut être nettoyée par un particulier équipé et à l’aise en hauteur. Le chéneau est un cas différent : il est souvent inaccessible depuis le sol, et l’atteindre suppose de monter sur la toiture ou de se pencher par-dessus un muret, ce qui expose à une chute.",
    },
    {
      type: "heading",
      level: 3,
      text: "Les situations où il vaut mieux faire appel à un couvreur-zingueur",
    },
    {
      type: "list",
      items: [
        "Le chéneau n’est accessible qu’en marchant sur la toiture.",
        "La maison a un étage ou plus, ou le chéneau est situé entre deux toits.",
        "Vous avez constaté des traces d’humidité à l’intérieur, sous le bas de la toiture.",
        "Le zinc présente de la corrosion, des perforations ou des soudures ouvertes.",
        "L’eau stagne même chéneau propre : la pente ou la descente est en cause.",
      ],
    },
    {
      type: "paragraph",
      text: "L’intérêt de faire intervenir un professionnel ne tient pas seulement à la sécurité. Un couvreur-zingueur sait lire l’état du chéneau une fois vidé : il voit si une soudure commence à lâcher, si un relevé s’est décollé du mur ou si la pente s’est faussée. Une petite reprise faite à temps évite une infiltration et, plus tard, une réfection complète.",
    },
    {
      type: "heading",
      level: 2,
      text: "Et si le chéneau est en mauvais état ?",
    },
    {
      type: "paragraph",
      text: "Le nettoyage révèle parfois un chéneau fatigué. Tout dépend alors de l’étendue des dégâts : une **fuite localisée** sur un zinc en bon état peut souvent être reprise par une soudure, alors qu’un ouvrage ancien, corrodé ou déformé sur plusieurs longueurs se remplace plus durablement. ATB Charpente réalise la **réfection ou le remplacement des chéneaux et des descentes**, ainsi que les autres ouvrages de zinguerie qui les accompagnent : noues, solins, habillages. Le fonctionnement des noues, qui amènent souvent l’eau jusqu’au chéneau, est détaillé dans notre article sur la [noue de toiture](/blog/noue-toiture-zinguerie), et l’ensemble de nos interventions sur la page [pose et changement de gouttières zinc](/pose-changement-gouttieres-zinc).",
    },
    {
      type: "heading",
      level: 2,
      text: "Limiter l’encrassement entre deux nettoyages",
    },
    {
      type: "list",
      items: [
        "**Une crapaudine en bon état** à chaque naissance, pour que les débris ne descendent pas dans le tuyau.",
        "**Une grille ou un filet pare-feuilles** lorsque des arbres surplombent la toiture, en sachant qu’il faut aussi les dégager régulièrement.",
        "**L’élagage des branches** qui débordent au-dessus du toit, dans le respect des règles applicables entre voisins.",
        "**Un coup d’œil après chaque gros coup de vent**, en particulier à l’automne.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Vos travaux de zinguerie autour de Toulouse",
    },
    {
      type: "paragraph",
      text: "Basés à **Bessières**, nous intervenons à **Toulouse** et dans son agglomération, notamment à L’Union, Balma, Saint-Jean, Montrabé, Saint-Jory, Garidech et Montberon, pour la pose, le changement et la réparation des gouttières, des chéneaux et des descentes. Nous établissons un diagnostic précis et un devis détaillé, sans engagement.",
    },
    {
      type: "heading",
      level: 2,
      text: "Questions fréquentes",
    },
    {
      type: "faq",
      items: [
        {
          question: "À quelle fréquence faut-il nettoyer un chéneau ?",
          answer:
            "Au moins une fois par an, idéalement à l’automne après la chute des feuilles. Si des arbres sont proches ou surplombent la toiture, prévoyez deux nettoyages par an au minimum : un à l’automne, un au printemps.",
        },
        {
          question: "Quelle est la différence entre un chéneau et une gouttière ?",
          answer:
            "La gouttière est suspendue au bord du toit par des crochets et déborde vers l’extérieur. Le chéneau est intégré à la structure du toit ou du mur ; lorsqu’il se bouche, l’eau peut passer vers l’intérieur de l’ouvrage, d’où l’importance de son entretien.",
        },
        {
          question: "Qui appeler pour nettoyer un chéneau ?",
          answer:
            "Un couvreur-zingueur. L’accès au chéneau passe souvent par la toiture, et le professionnel profite du nettoyage pour vérifier le zinc, les soudures, les relevés et la pente.",
        },
        {
          question: "Peut-on nettoyer un chéneau au nettoyeur haute pression ?",
          answer:
            "C’est déconseillé. Le jet peut abîmer les soudures du zinc et pousser l’eau sous les tuiles du bas de pente. Retirez les débris à la main, puis rincez à l’eau claire sans pression.",
        },
        {
          question: "Mon chéneau fuit : faut-il le remplacer ?",
          answer:
            "Pas forcément. Une fuite localisée sur un zinc en bon état peut souvent être reprise par une soudure. Si l’ouvrage est ancien, corrodé ou déformé sur plusieurs longueurs, un remplacement est plus durable. Le diagnostic permet de trancher.",
        },
        {
          question: "ATB Charpente intervient-il sur les chéneaux autour de Toulouse ?",
          answer:
            "Oui, pour la réfection et le remplacement des chéneaux et des descentes, ainsi que pour les autres travaux de zinguerie, à Toulouse et dans son agglomération.",
        },
      ],
    },
    {
      type: "paragraph",
      text: "Un chéneau propre et en bon état passe inaperçu ; un chéneau bouché peut abîmer les murs et la charpente sans que rien ne se voie de l’extérieur. Un nettoyage à l’automne, un second au printemps si des arbres sont proches, et un contrôle du zinc à cette occasion suffisent à écarter l’essentiel des risques.",
    },
    {
      type: "cta",
      text: "Un chéneau qui déborde, une trace d’humidité sous le bas de la toiture ou un zinc fatigué ? ATB Charpente intervient à Toulouse et dans son agglomération pour diagnostiquer et réparer vos chéneaux et gouttières.",
      href: "/contact-charpentier",
      label: "Demander un devis gratuit",
    },
  ],
};
