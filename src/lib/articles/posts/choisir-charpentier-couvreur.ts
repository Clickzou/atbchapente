import type { BlogArticle } from "../types";

// Rédigé à la main le 06/10/2026 (audit SEO/GEO d'octobre, créneau réservé du
// calendrier) : publié automatiquement le 20/11/2026. Faits sur ATB repris
// uniquement de la fiche de faits et des pages du site (SARL, SIREN, Bessières,
// métiers, devis gratuit, garantie décennale). Ancienneté, nombre de chantiers,
// qualifications, assureur, nombre d'avis et rayon : à confirmer, non écrits.
export const article: BlogArticle = {
  slug: "choisir-charpentier-couvreur",
  title: "Choisir son charpentier couvreur près de Toulouse : les vérifications avant de signer",
  metaTitle: "Choisir un charpentier couvreur : les vérifications",
  metaDescription:
    "Choisir un charpentier couvreur : entreprise, décennale, chantiers, avis, devis. Les vérifications à faire avant de signer, et les signaux d’alerte.",
  excerpt:
    "Avant de confier sa toiture ou sa charpente, quelques vérifications simples évitent la plupart des mauvaises surprises. Lesquelles faire, dans quel ordre, et quels signaux doivent vous faire renoncer.",
  category: "Charpente",
  primaryKeyword: "choisir un charpentier couvreur",
  intent: "commercial",
  tags: ["charpentier couvreur", "devis", "assurance décennale", "artisan", "Haute-Garonne"],
  date: "2026-11-20",
  author: "ATB Charpente",
  readTime: "11 min",
  heroImage: "/images/realisations/vue-ensemble-refection-toiture-tuiles-canal-bessieres.jpeg",
  heroImageAlt: "Toiture en tuiles refaite, vue le long du faîtage, près de Bessières",
  status: "published",
  relatedSlugs: [
    "assurance-decennale-charpentier",
    "lire-devis-charpentier",
    "declaration-prealable-travaux-toiture",
  ],
  content: [
    {
      type: "callout",
      variant: "info",
      text: "**En bref** : choisissez un charpentier couvreur qui fournit son **attestation d’assurance décennale** à jour, un **devis détaillé poste par poste**, des **chantiers visibles** près de chez vous et des **avis vérifiables**. Une entreprise sérieuse se déplace pour voir la toiture avant de chiffrer, et ne vous presse jamais de signer.",
    },
    {
      type: "paragraph",
      text: "Refaire une couverture, reprendre une charpente ou changer une zinguerie engage un budget important et une partie de la maison qu’on ne surveille pas tous les jours. Une fois les tuiles reposées, il est difficile de vérifier ce qui a été fait dessous. Le choix de l’entreprise compte donc autant que le choix des matériaux, et il se prépare : **choisir un charpentier couvreur** ne se résume pas à retenir le devis le moins cher ou le premier artisan disponible.",
    },
    {
      type: "paragraph",
      text: "Ce guide liste les vérifications à faire avant de signer, des plus rapides (l’existence de l’entreprise, son assurance) aux plus parlantes (la visite, le devis), ainsi que les signaux qui doivent vous alerter. Il a été rédigé par **ATB Charpente**, entreprise de charpente et de couverture installée à Bessières, qui intervient à Toulouse et dans son agglomération. Ces vérifications valent pour toutes les entreprises, la nôtre comprise.",
    },
    {
      type: "heading",
      level: 2,
      text: "Charpentier, couvreur, zingueur : qui fait quoi ?",
    },
    {
      type: "paragraph",
      text: "Les trois métiers se côtoient sur une toiture, mais ne recouvrent pas les mêmes travaux. Savoir lequel correspond à votre projet évite de consulter une entreprise qui sous-traitera l’essentiel.",
    },
    {
      type: "list",
      items: [
        "**Le charpentier** conçoit, fabrique, pose et répare la structure en bois qui porte le toit : fermes, pannes, chevrons, mais aussi extensions, surélévations ou pergolas.",
        "**Le couvreur** pose et entretient la peau du toit : tuiles, écran de sous-toiture, liteaux, faîtages, rives, et répare les fuites de couverture.",
        "**Le zingueur** façonne et pose les ouvrages métalliques qui évacuent l’eau et assurent l’étanchéité des raccords : gouttières, chéneaux, descentes, noues, solins.",
      ],
    },
    {
      type: "paragraph",
      text: "Un **charpentier couvreur** réunit les deux premiers métiers, souvent le troisième. L’intérêt est concret : sur une toiture ancienne, le couvreur qui dépose les tuiles découvre l’état des bois, et le charpentier qui reprend la structure doit ensuite refermer une couverture étanche. Une seule entreprise pour l’ensemble, c’est un seul diagnostic, un seul devis et un seul responsable si un défaut apparaît.",
    },
    {
      type: "heading",
      level: 2,
      text: "Première vérification : l’entreprise existe-t-elle vraiment ?",
    },
    {
      type: "paragraph",
      text: "C’est la vérification la plus rapide, et pourtant la plus souvent oubliée. Une entreprise du bâtiment immatriculée possède un numéro **SIREN** (neuf chiffres) et un **SIRET** pour chaque établissement. Ces numéros doivent figurer sur le devis.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Relevez le SIREN ou le SIRET sur le devis, le site internet ou la carte de visite.",
        "Saisissez-le sur le site public **annuaire-entreprises.data.gouv.fr**.",
        "Vérifiez que l’entreprise est **active**, que son nom et son adresse correspondent à ceux du devis.",
        "Regardez son **activité principale** : pour une entreprise de toiture, on trouve en général les codes 43.91A (travaux de charpente) ou 43.91B (travaux de couverture par éléments).",
        "Notez la **date de création** : elle ne dit pas tout de l’expérience du dirigeant, mais une entreprise créée le mois dernier sous un autre nom mérite une question.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      text: "Une adresse physique vérifiable et un numéro de téléphone fixe ou portable au nom de l’entreprise sont des repères simples. Une entreprise qui ne donne qu’un prénom et un numéro, sans raison sociale ni SIRET, ne vous laissera aucun recours en cas de problème.",
    },
    {
      type: "heading",
      level: 2,
      text: "L’assurance décennale : l’attestation, et ce qu’elle couvre",
    },
    {
      type: "paragraph",
      text: "Tout constructeur qui réalise des travaux de charpente ou de couverture doit être assuré en **responsabilité civile décennale**. Cette assurance couvre, pendant dix ans après la réception des travaux, les désordres qui compromettent la solidité de l’ouvrage ou le rendent impropre à sa destination, comme une charpente qui fléchit ou une couverture qui laisse passer l’eau. La loi impose de joindre au devis et à la facture un justificatif de cette assurance.",
    },
    {
      type: "paragraph",
      text: "Demander l’attestation ne suffit pas : il faut la lire. Trois points comptent :",
    },
    {
      type: "list",
      items: [
        "**Les activités couvertes** : l’attestation liste les activités garanties. Si votre projet comprend de la charpente et de la couverture, les deux doivent y figurer. Un artisan assuré pour la couverture seule n’est pas couvert pour reprendre une charpente.",
        "**La période de validité** : c’est l’assurance en vigueur à l’ouverture du chantier qui joue. Une attestation périmée ne prouve rien.",
        "**L’assureur et le numéro de contrat** : ils permettent, en cas de doute, de contacter l’assureur pour confirmer que le contrat est bien actif.",
      ],
    },
    {
      type: "paragraph",
      text: "Le fonctionnement de cette garantie, ce qu’elle exclut et la marche à suivre en cas de sinistre sont détaillés dans notre article sur [l’assurance décennale du charpentier](/blog/assurance-decennale-charpentier).",
    },
    {
      type: "heading",
      level: 2,
      text: "Qualifications et labels : ce qu’ils prouvent, et quand ils comptent",
    },
    {
      type: "paragraph",
      text: "Aucune qualification n’est obligatoire pour exercer la charpente ou la couverture. Les qualifications délivrées par des organismes comme **Qualibat** attestent, après examen d’un dossier, de la capacité d’une entreprise à réaliser certains types de travaux. Elles sont un repère parmi d’autres, pas une garantie de résultat, et leur absence ne signifie pas que l’entreprise travaille mal.",
    },
    {
      type: "paragraph",
      text: "Il existe en revanche un cas où un label devient décisif : les **aides publiques**. Pour bénéficier de MaPrimeRénov’, des primes CEE ou de l’éco-prêt à taux zéro sur des travaux d’économie d’énergie, comme l’isolation de la toiture, les travaux doivent en principe être réalisés par une entreprise **RGE** (Reconnu garant de l’environnement) pour la catégorie de travaux concernée. Si votre projet en dépend, vérifiez la mention RGE sur l’annuaire officiel du service public France Rénov’, et pas seulement sur le devis.",
    },
    {
      type: "heading",
      level: 2,
      text: "Les preuves sur le terrain : réalisations et avis",
    },
    {
      type: "heading",
      level: 3,
      text: "Des chantiers que l’on peut voir",
    },
    {
      type: "paragraph",
      text: "Les photos de chantiers sont l’indice le plus parlant du savoir-faire d’une entreprise, à condition qu’elles soient réelles. Des images de chantiers en cours, prises sous plusieurs angles, sur des maisons qui ressemblent à celles de la région, valent mieux qu’une galerie de photos parfaites trouvées sur une banque d’images. N’hésitez pas à demander où se situait tel chantier, ou s’il est possible de voir une toiture terminée depuis la rue.",
    },
    {
      type: "heading",
      level: 3,
      text: "Des avis à lire, pas seulement à compter",
    },
    {
      type: "list",
      items: [
        "**La date** : quelques avis récents en disent plus qu’une longue série ancienne.",
        "**Le contenu** : un avis qui décrit le chantier, le déroulement et le suivi est plus crédible qu’un simple « très bien ».",
        "**Les réponses de l’entreprise**, surtout aux avis négatifs : elles montrent comment elle gère un problème.",
        "**La cohérence** : un nom d’entreprise identique sur la fiche, le devis et l’annuaire officiel.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "La visite : ce qu’un professionnel sérieux regarde",
    },
    {
      type: "paragraph",
      text: "Pour des travaux de charpente ou de couverture, un devis établi sans avoir vu la toiture est un devis approximatif. La visite est aussi le meilleur moment pour juger de l’entreprise elle-même. Plusieurs signes rassurants :",
    },
    {
      type: "list",
      items: [
        "Il **monte dans les combles** quand ils sont accessibles, et ne se contente pas de regarder le toit depuis la rue.",
        "Il **prend des mesures** et des photos, pose des questions sur l’historique de la maison et des travaux précédents.",
        "Il **explique ce qu’il voit** : l’état des bois, de la couverture, de la zinguerie, et ce qui peut attendre ou non.",
        "Il **distingue l’urgent du souhaitable**, et propose parfois une solution moins lourde que celle que vous imaginiez.",
        "Il **évoque les démarches** éventuelles, comme une déclaration préalable si l’aspect du toit change.",
      ],
    },
    {
      type: "paragraph",
      text: "Sur ce dernier point, notre article sur la [déclaration préalable pour des travaux de toiture](/blog/declaration-prealable-travaux-toiture) précise dans quels cas elle est nécessaire.",
    },
    {
      type: "heading",
      level: 2,
      text: "Le devis : ce qu’il doit contenir",
    },
    {
      type: "paragraph",
      text: "Le devis est le document qui vous protège. Plus il est précis, plus il est facile de comparer les offres et de vérifier ensuite que ce qui a été payé a bien été fait. Un bon devis de charpente ou de couverture comporte au minimum :",
    },
    {
      type: "list",
      items: [
        "L’identité complète de l’entreprise : raison sociale, adresse, SIRET, numéro de TVA, coordonnées de l’assurance décennale.",
        "Une **décomposition poste par poste** : installation de chantier, dépose, fourniture et pose de chaque élément, évacuation des déchets.",
        "Les **quantités et unités** (mètres carrés, mètres linéaires, nombre de pièces) et les prix unitaires.",
        "La **nature des matériaux** : type et modèle de tuiles, essence et section des bois, type d’écran de sous-toiture, épaisseur du zinc.",
        "Le **taux de TVA** appliqué, qui dépend de la nature des travaux et de l’âge du logement.",
        "Les **délais** d’exécution, la durée de validité du devis et les conditions de paiement.",
      ],
    },
    {
      type: "paragraph",
      text: "La lecture détaillée d’un devis, poste par poste, avec les oublis qui doivent alerter, fait l’objet d’un article dédié : [comment lire un devis de charpentier](/blog/lire-devis-charpentier).",
    },
    {
      type: "heading",
      level: 2,
      text: "Comparer deux ou trois devis sans se tromper",
    },
    {
      type: "paragraph",
      text: "Demander plusieurs devis est raisonnable pour un chantier important. Encore faut-il comparer ce qui est comparable. Un devis plus bas que les autres l’est rarement par miracle : il omet souvent un poste (l’écran de sous-toiture, la zinguerie, l’échafaudage, l’évacuation des gravats) ou prévoit une solution différente, un remaniement là où les autres prévoient une réfection, par exemple.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Vérifiez que chaque devis traite le **même périmètre** de travaux.",
        "Alignez les **matériaux** prévus : même famille de tuiles, même traitement des bois, même épaisseur d’isolant le cas échéant.",
        "Repérez les **postes absents** d’un devis et présents dans les autres, et demandez pourquoi.",
        "Comparez les **délais** et la **durée prévue** du chantier, surtout si la toiture doit rester ouverte.",
        "Posez vos questions par écrit et gardez les réponses : elles font partie de l’accord.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Les signaux d’alerte qui doivent vous faire renoncer",
    },
    {
      type: "list",
      items: [
        "**Le démarchage spontané** : un « artisan » qui sonne pour signaler un problème sur votre toit, souvent avec une offre valable le jour même.",
        "**L’urgence artificielle** : « il faut signer aujourd’hui », « il nous reste des matériaux d’un chantier voisin ».",
        "**Le paiement intégral d’avance**, ou en espèces, ou à une personne plutôt qu’à l’entreprise.",
        "**Le refus de fournir** l’attestation d’assurance décennale ou un SIRET.",
        "**Un devis vague**, sans quantités ni matériaux, ou un prix global sans décomposition.",
        "**Une adresse introuvable** ou différente sur chaque document.",
      ],
    },
    {
      type: "callout",
      variant: "warning",
      text: "Un contrat signé chez vous à la suite d’un démarchage ouvre en principe un **délai de rétractation de 14 jours**, et le professionnel ne peut en principe recevoir aucun paiement pendant les sept premiers jours. Si l’on vous demande de renoncer à ces protections ou de payer immédiatement, prenez le temps de vous renseigner avant de signer.",
    },
    {
      type: "heading",
      level: 2,
      text: "La checklist avant de signer",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Le SIRET figure sur le devis et l’entreprise est active dans l’annuaire officiel.",
        "L’attestation décennale est à jour et couvre toutes les activités du chantier.",
        "L’entreprise s’est déplacée et a vu la toiture, combles compris quand c’est possible.",
        "Le devis est détaillé poste par poste, avec quantités, matériaux, TVA et délais.",
        "Les postes souvent oubliés (sous-toiture, zinguerie, échafaudage, déchets) sont présents ou expliqués.",
        "Si vous visez des aides, la mention RGE est vérifiée sur l’annuaire France Rénov’.",
        "Les démarches d’urbanisme éventuelles sont identifiées.",
        "Vous avez obtenu une réponse claire à chacune de vos questions.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "ATB Charpente : ce que vous pouvez vérifier chez nous",
    },
    {
      type: "paragraph",
      text: "**ATB Charpente** est une SARL immatriculée au RCS de Toulouse sous le SIREN 823 274 097, installée au 491 chemin des Bourdettes à **Bessières**. Nous réunissons les métiers de charpentier, de couvreur et de zingueur : création et rénovation de charpente bois, couverture neuve, remaniement et réfection de toitures en tuiles, gouttières et descentes en zinc, isolation de toiture, fenêtres de toit et pergolas en bois. Nos travaux sont couverts par la garantie décennale.",
    },
    {
      type: "paragraph",
      text: "Nous nous déplaçons pour évaluer la toiture avant d’établir un devis gratuit, détaillé et sans engagement, à **Toulouse** et dans son agglomération, notamment à L’Union, Balma, Saint-Jean, Montrabé et Castelmaurou. Des photos de nos chantiers sont visibles sur la page [nos réalisations](/realisations-charpentier-toulouse-bessiere), et notre façon de travailler est présentée sur la page [charpentier couvreur à Toulouse](/charpentier-toulouse). Les vérifications de ce guide s’appliquent à nous comme aux autres : posez-nous les mêmes questions.",
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
          question: "Comment choisir un charpentier couvreur ?",
          answer:
            "Vérifiez que l’entreprise est immatriculée et active, demandez son attestation d’assurance décennale et contrôlez les activités couvertes, regardez des chantiers réels et des avis détaillés, puis comparez des devis établis après une visite de la toiture.",
        },
        {
          question: "Comment vérifier qu’un artisan est bien assuré en décennale ?",
          answer:
            "Demandez l’attestation, qui doit être jointe au devis. Vérifiez qu’elle est valide à la date d’ouverture du chantier et qu’elle liste les activités prévues, charpente et couverture notamment. En cas de doute, contactez l’assureur indiqué avec le numéro de contrat.",
        },
        {
          question: "Faut-il un artisan RGE pour refaire sa toiture ?",
          answer:
            "Ce n’est pas obligatoire pour réaliser les travaux. Le label RGE devient nécessaire si vous voulez bénéficier d’aides comme MaPrimeRénov’, les primes CEE ou l’éco-PTZ pour des travaux d’économie d’énergie, comme l’isolation de la toiture.",
        },
        {
          question: "Combien de devis demander pour des travaux de toiture ?",
          answer:
            "Deux ou trois suffisent généralement pour un chantier important. L’essentiel est qu’ils portent sur le même périmètre et les mêmes matériaux, sinon la comparaison des prix n’a pas de sens.",
        },
        {
          question: "Pourquoi faire appel à un charpentier couvreur plutôt qu’à deux entreprises ?",
          answer:
            "Sur une toiture, la charpente et la couverture dépendent l’une de l’autre. Une seule entreprise pour les deux, c’est un seul diagnostic, un chantier mieux coordonné et un seul interlocuteur responsable si un défaut apparaît.",
        },
        {
          question: "Quels sont les signes d’un artisan peu fiable ?",
          answer:
            "Un démarchage à domicile avec une offre à saisir immédiatement, une demande de paiement intégral d’avance ou en espèces, l’absence de SIRET ou d’attestation décennale, un devis sans détail ni quantités, une adresse introuvable.",
        },
      ],
    },
    {
      type: "paragraph",
      text: "Prendre une heure pour ces vérifications avant de signer, c’est s’éviter des années de doutes sur une toiture qu’on ne voit pas. Une entreprise sérieuse ne s’en offusque pas : elle a l’habitude de répondre à ces questions, et c’est précisément à sa façon d’y répondre qu’on la reconnaît.",
    },
    {
      type: "cta",
      text: "Un projet de charpente, de couverture ou de zinguerie ? ATB Charpente se déplace à Toulouse et dans son agglomération pour évaluer votre toiture et établir un devis détaillé, sans engagement.",
      href: "/contact-charpentier",
      label: "Demander un devis gratuit",
    },
  ],
};
