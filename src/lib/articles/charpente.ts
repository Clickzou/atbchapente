import type { BlogArticle } from "./types";

// Articles de la catégorie « Charpente ».
// Le 1er article sert aussi de TEMPLATE de référence pour le cron d'auto-publication
// (structure, ton, maillage, FAQ). Statut "published" : visible en prod (≥ 2000 mots).
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
    status: "published",
    relatedSlugs: [
      "signes-charpente-a-renover",
      "charpente-traditionnelle-vs-fermette",
      "prix-charpente-neuve-m2",
    ],
    content: [
      {
        type: "paragraph",
        text: "Une **charpente ancienne** est bien plus qu’une structure : c’est le squelette de votre maison, souvent en chêne massif ou en pin, façonné parfois il y a un siècle ou deux. Dans la région toulousaine, où dominent les toitures en tuiles canal posées sur des charpentes traditionnelles à pannes et chevrons, ce patrimoine en bois a traversé les décennies en encaissant l’humidité, les écarts de température, le poids de la couverture et les assauts répétés des insectes xylophages. Avec le temps, des faiblesses apparaissent. La question que se pose tout propriétaire est alors la même : faut-il **rénover ou tout remplacer** ?",
      },
      {
        type: "paragraph",
        text: "La bonne nouvelle, c’est que dans la grande majorité des cas une rénovation bien menée suffit à redonner plusieurs décennies de solidité à votre toiture, pour un coût très inférieur à une reconstruction complète. Encore faut-il poser le bon diagnostic, identifier les bons ennemis et choisir les bonnes techniques. Ce guide complet, rédigé par les charpentiers d’**ATB Charpente** à **Toulouse**, vous explique tout, étape par étape, du premier signe d’alerte jusqu’au chantier terminé.",
      },
      {
        type: "heading",
        level: 2,
        text: "Pourquoi et quand rénover une charpente ancienne ?",
      },
      {
        type: "paragraph",
        text: "Une charpente n’est jamais figée : elle vit, travaille et se déforme lentement sous les charges et les variations d’humidité. Rénover, ce n’est pas seulement réparer un dégât visible, c’est aussi prévenir l’effondrement progressif d’un ouvrage dont dépend toute la stabilité de la maison. Une charpente affaiblie qui cède peut entraîner la couverture, déformer les murs porteurs et provoquer des infiltrations en cascade. Intervenir tôt coûte toujours moins cher qu’intervenir trop tard.",
      },
      {
        type: "paragraph",
        text: "Plusieurs situations justifient une rénovation : l’apparition d’insectes ou de champignons, une déformation de la toiture, des travaux d’isolation ou d’aménagement des combles qui imposent de vérifier la solidité de la structure, ou simplement une charpente de plus de trente ans n’ayant jamais reçu de traitement préventif. Dans tous les cas, mieux vaut agir au premier doute plutôt que d’attendre que les dégâts deviennent structurels.",
      },
      {
        type: "callout",
        variant: "info",
        text: "Une charpente traditionnelle bien entretenue peut durer plus de **150 ans**. À l’inverse, une attaque d’insectes ou de champignons laissée sans traitement peut compromettre les pièces maîtresses en quelques années seulement. L’entretien préventif est toujours l’investissement le plus rentable.",
      },
      {
        type: "heading",
        level: 2,
        text: "Le diagnostic : repérer les signes d’alerte",
      },
      {
        type: "paragraph",
        text: "Tout chantier de rénovation sérieux commence par un diagnostic complet. C’est l’étape la plus importante : elle conditionne le choix des techniques, le budget et la durabilité du résultat. Avant même de faire appel à un professionnel, vous pouvez repérer vous-même plusieurs signaux qui ne trompent pas.",
      },
      {
        type: "heading",
        level: 3,
        text: "Les signes visibles",
      },
      {
        type: "list",
        items: [
          "**Affaissement** de la toiture, ligne de faîtage qui ondule ou pannes qui présentent une **flèche** (courbure) anormale",
          "Présence de **sciure** fine (la vermoulure) au pied des bois ou sur le sol des combles",
          "Petits **trous de sortie** ronds ou ovales de 1 à 10 mm dans le bois, signes d’insectes xylophages",
          "**Traces d’humidité**, auréoles brunes, moisissures ou bois qui noircit",
          "Filaments cotonneux blancs ou plaques brunâtres en surface, évocateurs d’un champignon lignivore comme la **mérule**",
          "Fissures importantes ou éclatements dans les pièces maîtresses (entraits, arbalétriers, pannes)",
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "Le test du son et de la lame",
      },
      {
        type: "paragraph",
        text: "Les professionnels utilisent deux gestes simples mais révélateurs. D’abord, frapper le bois avec un maillet : un bois sain résonne franchement, tandis qu’un **bois qui sonne creux** révèle une galerie d’insectes ou une pourriture interne sous une surface intacte. Ensuite, enfoncer la pointe d’un poinçon ou d’un tournevis : si la lame pénètre sans résistance dans une pièce qui devrait être dense, le cœur du bois est attaqué. C’est souvent ainsi que l’on découvre qu’une poutre apparemment saine est en réalité vidée de l’intérieur.",
      },
      {
        type: "callout",
        variant: "warning",
        text: "Une charpente peut paraître parfaitement saine en surface alors que son cœur est entièrement dévoré. Ne vous fiez jamais à la seule apparence : seul un sondage méthodique par un charpentier permet d’évaluer la part de bois réellement sain.",
      },
      {
        type: "heading",
        level: 2,
        text: "Les ennemis du bois : insectes et champignons",
      },
      {
        type: "paragraph",
        text: "Identifier l’agresseur est essentiel, car le traitement diffère selon qu’il s’agit d’insectes ou de champignons, et selon l’espèce. Voici les principaux ennemis d’une charpente ancienne.",
      },
      {
        type: "heading",
        level: 3,
        text: "Les insectes xylophages (mangeurs de bois)",
      },
      {
        type: "list",
        items: [
          "**Le capricorne des maisons** : l’ennemi numéro un des résineux. Sa larve creuse pendant des années des galeries sous la surface, sans trou visible, jusqu’à fragiliser entièrement la pièce. On l’entend parfois grignoter par temps chaud.",
          "**Les vrillettes** (petite et grosse vrillette) : elles laissent de petits trous ronds de 1 à 3 mm et une vermoulure fine. La grosse vrillette s’attaque souvent aux bois déjà humides ou attaqués par un champignon.",
          "**Les termites** : redoutables car invisibles, ils progressent à l’abri de la lumière par des cordonnets de terre. Leur présence est soumise à déclaration en mairie dans les zones concernées, dont une partie de la Haute-Garonne.",
          "**Le lyctus** : il attaque surtout les bois feuillus et les parquets, en provoquant une fine poussière semblable à du talc.",
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "Les champignons lignivores",
      },
      {
        type: "paragraph",
        text: "Là où l’humidité s’installe durablement (taux supérieur à 20 %), les **champignons lignivores** prennent le relais. La pourriture cubique brune fait littéralement éclater le bois en petits cubes. Mais le plus redouté reste la **mérule**, surnommée « la lèpre des maisons ». Ce champignon se développe dans l’obscurité, l’humidité stagnante et le confinement ; il peut traverser la maçonnerie, se propager à grande vitesse et détruire une charpente en quelques mois. Sa présence impose une intervention rapide et radicale, souvent au-delà de la simple charpente (assèchement des murs, suppression de la source d’humidité).",
      },
      {
        type: "callout",
        variant: "warning",
        text: "Face à un soupçon de **mérule**, n’attendez pas. Aérez, ne masquez surtout pas la zone derrière un doublage et appelez un professionnel sans tarder. Plus le champignon est traité tôt, plus le chantier reste circonscrit et maîtrisé.",
      },
      {
        type: "heading",
        level: 2,
        text: "Les techniques de rénovation et de renforcement",
      },
      {
        type: "paragraph",
        text: "Une fois le diagnostic posé, le charpentier dispose de tout un éventail de techniques. Le principe directeur d’ATB Charpente est simple : **conserver le maximum de bois d’origine** et n’intervenir qu’à la mesure du nécessaire. Voici les solutions les plus courantes.",
      },
      {
        type: "heading",
        level: 3,
        text: "Le renforcement des pièces existantes",
      },
      {
        type: "list",
        items: [
          "**Le moisage** : on vient doubler une pièce affaiblie de part et d’autre par deux fortes planches ou madriers boulonnés, qui reprennent les efforts. C’est la technique reine pour renforcer un entrait fissuré ou un arbalétrier fatigué.",
          "**Les jambes de force** : ces pièces obliques transmettent une partie de la charge des pannes vers les murs porteurs et limitent la flèche d’une charpente qui s’affaisse.",
          "**Les sabots et connecteurs métalliques** : sabots de charpente, équerres et étriers galvanisés sécurisent les assemblages anciens dont les tenons-mortaises se sont desserrés.",
          "**Les prothèses bois-résine (résine époxy)** : lorsqu’une extrémité de poutre est pourrie (par exemple en about, là où elle entre dans un mur humide), on retire la partie atteinte et on reconstitue le bois avec une résine époxy armée de fers à béton. La pièce d’origine est ainsi conservée, prolongée par une « prothèse » invisible une fois finie.",
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "Le remplacement de pièces",
      },
      {
        type: "paragraph",
        text: "Quand une pièce est trop dégradée pour être sauvée, elle est remplacée **à l’identique**, avec une essence et une section équivalentes, et un assemblage respectueux de l’ouvrage d’origine (tenon-mortaise, embrèvement). Sur une charpente de caractère, ce travail d’ajustement à l’ancienne fait toute la différence entre une réparation discrète et une rustine visible.",
      },
      {
        type: "heading",
        level: 3,
        text: "Le traitement curatif et préventif du bois",
      },
      {
        type: "paragraph",
        text: "Le traitement est l’étape qui garantit que le problème ne reviendra pas. Le **traitement curatif** élimine les insectes et champignons présents ; le **traitement préventif** protège durablement l’ensemble de la charpente. Il se déroule généralement ainsi :",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "**Bûchage** : on gratte et on retire la couche de bois vermoulu en surface jusqu’à atteindre le bois sain.",
          "**Dépoussiérage** de l’ensemble de la charpente pour que le produit pénètre correctement.",
          "**Injection sous pression** d’un produit fongicide et insecticide dans les pièces de forte section, via des chevilles-buses, afin de traiter le bois à cœur.",
          "**Pulvérisation** à basse pression sur toutes les surfaces accessibles pour une protection préventive globale.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "Exigez toujours que le traitement soit accompagné d’une **garantie écrite** (souvent dix ans) et que les produits utilisés disposent d’une certification adaptée. Un bon traitement n’a de valeur que s’il est tracé et garanti.",
      },
      {
        type: "heading",
        level: 2,
        text: "Rénover ou remplacer : comment trancher ?",
      },
      {
        type: "paragraph",
        text: "C’est la question centrale, et la réponse dépend d’un seul critère objectif : **la proportion de bois encore sain**. Tant qu’une majorité des pièces maîtresses peut être conservée, la rénovation reste la meilleure option, à la fois économiquement et patrimonialement.",
      },
      {
        type: "list",
        items: [
          "**On privilégie la rénovation** quand les attaques sont localisées, que la structure reste globalement saine et que la géométrie d’ensemble est conservable. C’est le cas le plus fréquent.",
          "**On envisage le remplacement total** quand la charpente est attaquée à plus de 60-70 %, qu’elle présente un risque d’effondrement, qu’elle est inadaptée à un projet d’aménagement de combles, ou qu’une mérule généralisée impose de tout déposer.",
        ],
      },
      {
        type: "quote",
        text: "Neuf chantiers sur dix que nous menons sur des charpentes anciennes se règlent par une rénovation ciblée. Remplacer une charpente entière n’est presque jamais la première solution : c’est le dernier recours quand le bois ne peut vraiment plus être sauvé.",
        author: "L’équipe ATB Charpente",
      },
      {
        type: "heading",
        level: 2,
        text: "Les étapes d’un chantier de rénovation",
      },
      {
        type: "paragraph",
        text: "Une rénovation de charpente menée par un professionnel suit un déroulé éprouvé qui garantit la qualité et la sécurité du résultat.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "**Diagnostic et devis** : inspection complète, sondage des bois, repérage des agresseurs et chiffrage détaillé.",
          "**Préparation du chantier** : protection des lieux, étaiement provisoire si la stabilité l’exige, dépose partielle de la couverture si nécessaire.",
          "**Bûchage et traitement** : nettoyage, traitement curatif puis préventif des bois conservés.",
          "**Renforcement et remplacement** : moisage, pose des prothèses résine, des sabots métalliques et remplacement des pièces irrécupérables.",
          "**Repose et finitions** : remise en place de la couverture, contrôle des assemblages et nettoyage final.",
          "**Réception du chantier** : remise des garanties et des justificatifs de traitement.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Les matériaux : quel bois pour une charpente ?",
      },
      {
        type: "paragraph",
        text: "Le choix de l’essence dépend de l’existant à respecter et de l’usage. Sur les charpentes anciennes de la région toulousaine, on retrouve surtout le chêne et le pin.",
      },
      {
        type: "list",
        items: [
          "**Le chêne** : bois feuillu dense et noble, très résistant, c’est le matériau historique des belles charpentes traditionnelles. Idéal pour remplacer à l’identique des pièces maîtresses d’origine.",
          "**Le pin des Landes (pin maritime)** : résineux local, économique et facile à travailler, fréquent dans la région ; il doit impérativement être traité car il est sensible aux insectes.",
          "**Le douglas** : résineux naturellement durable, esthétique avec sa teinte rosée, de plus en plus utilisé pour les renforcements et les charpentes apparentes.",
          "**L’épicéa et le sapin** : courants pour les pièces non apparentes, à condition d’un traitement préventif soigné.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Combien coûte la rénovation d’une charpente ?",
      },
      {
        type: "paragraph",
        text: "Le prix dépend de l’ampleur des dégâts, de l’accessibilité des combles, du type de charpente et de l’essence de bois. Les ordres de grandeur ci-dessous sont **purement indicatifs** et ne remplacent en aucun cas un devis : seule une visite sur place permet de chiffrer précisément un chantier.",
      },
      {
        type: "list",
        items: [
          "**Traitement curatif et préventif** : de l’ordre de 25 à 70 €/m² de surface de plancher des combles, selon la méthode (injection, pulvérisation).",
          "**Renforcement structurel** (moisage, sabots, jambes de force) : généralement de 60 à 130 €/m², en fonction du nombre de pièces concernées.",
          "**Prothèses bois-résine** : souvent facturées à la pièce, selon la longueur reconstituée.",
          "**Remplacement partiel ou total** : de 100 à 250 €/m² et plus, le chêne et les assemblages traditionnels tirant le coût vers le haut.",
        ],
      },
      {
        type: "callout",
        variant: "info",
        text: "Ces fourchettes varient fortement d’un chantier à l’autre. Pour ATB Charpente, **seul un devis établi après diagnostic sur place fait foi**. Méfiez-vous des estimations données au téléphone sans avoir vu la charpente.",
      },
      {
        type: "heading",
        level: 2,
        text: "Quelles aides pour financer les travaux ?",
      },
      {
        type: "paragraph",
        text: "Une rénovation de charpente seule ouvre rarement droit à des aides, car elle relève de l’entretien. En revanche, lorsque les travaux s’inscrivent dans un projet plus large de **rénovation énergétique** (isolation des combles, réfection de toiture avec amélioration de la performance), plusieurs dispositifs peuvent intervenir : MaPrimeRénov’, les certificats d’économies d’énergie (CEE), un éco-prêt à taux zéro, ou encore une TVA réduite à 5,5 % sur les travaux d’amélioration énergétique. Certaines collectivités de la métropole toulousaine proposent également des aides locales. Renseignez-vous en amont, car la plupart de ces dispositifs imposent de faire appel à une entreprise qualifiée et de constituer le dossier avant de signer les travaux.",
      },
      {
        type: "heading",
        level: 2,
        text: "L’entretien préventif : la meilleure des assurances",
      },
      {
        type: "paragraph",
        text: "Une charpente rénovée se conserve. Quelques gestes simples permettent d’éviter que les problèmes ne réapparaissent et de prolonger la durée de vie de l’ouvrage de plusieurs décennies.",
      },
      {
        type: "list",
        items: [
          "**Ventiler les combles** : une bonne circulation de l’air maintient le bois sec et décourage insectes comme champignons.",
          "**Surveiller la couverture** : une tuile cassée ou un solin défectueux laissent entrer l’eau, première cause de pourriture.",
          "**Inspecter visuellement** la charpente une fois par an, à la recherche de sciure, de trous neufs ou de traces d’humidité.",
          "**Renouveler le traitement préventif** tous les dix à quinze ans environ.",
          "**Traiter rapidement toute infiltration** : l’humidité est le terrain de jeu favori de tous les agresseurs du bois.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Les spécificités des charpentes anciennes toulousaines",
      },
      {
        type: "paragraph",
        text: "Autour de **Toulouse** et de **Bessières**, les charpentes traditionnelles supportent majoritairement des couvertures en **tuiles canal**, emblématiques du Sud-Ouest. Ces tuiles, posées avec de faibles pentes, exigent une charpente parfaitement plane et stable : la moindre flèche se traduit par des tuiles qui glissent et des infiltrations. Le climat de la région, marqué par des étés chauds et secs mais des épisodes pluvieux intenses et du vent d’autan, sollicite fortement les bois. L’alternance d’humidité et de sécheresse favorise le retrait, les fentes et le travail des assemblages.",
      },
      {
        type: "paragraph",
        text: "Beaucoup de bâtisses anciennes de la région présentent des charpentes en chêne ou en pin local jamais traitées, particulièrement exposées au capricorne et aux vrillettes. C’est pourquoi un charpentier connaissant le bâti local, ses essences, ses assemblages traditionnels et les contraintes des tuiles canal apporte une réelle valeur ajoutée. **ATB Charpente** intervient quotidiennement sur ce type d’ouvrages à Toulouse et dans tout le secteur de Bessières.",
      },
      {
        type: "faq",
        items: [
          {
            question: "Peut-on rénover une charpente sans déposer la toiture ?",
            answer:
              "Oui, dans de nombreux cas le traitement et le renforcement se réalisent entièrement par l’intérieur des combles, sans toucher à la couverture. La dépose de tuiles n’est nécessaire que lorsqu’il faut remplacer des pièces hautes (pannes, faîtage) ou intervenir sur des bois inaccessibles par-dessous.",
          },
          {
            question: "Comment savoir si ma charpente est encore attaquée par des insectes ?",
            answer:
              "La présence de sciure fraîche (vermoulure de couleur claire), de trous de sortie neufs ou de bruits de grignotement par temps chaud indique une infestation active. Un charpentier confirmera par sondage des bois. En cas de doute, un traitement curatif lève l’incertitude.",
          },
          {
            question: "Combien de temps dure une rénovation de charpente ?",
            answer:
              "De quelques jours pour un simple traitement curatif et préventif, à une à deux semaines pour un renforcement structurel important avec remplacement de pièces. La durée dépend de la surface, de l’accessibilité et de l’ampleur des dégâts.",
          },
          {
            question: "La mérule est-elle vraiment dangereuse pour une maison ?",
            answer:
              "Oui. La mérule est le champignon lignivore le plus destructeur : elle se propage rapidement, peut traverser la maçonnerie et détruire une charpente en quelques mois. Sa présence impose une intervention immédiate, l’élimination des bois atteints et surtout la suppression de la source d’humidité.",
          },
          {
            question: "Vaut-il mieux rénover ou remplacer entièrement une vieille charpente ?",
            answer:
              "Dans la grande majorité des cas, la rénovation suffit et coûte bien moins cher. Le remplacement total ne s’impose que lorsque le bois est attaqué à plus de 60 à 70 %, qu’il existe un risque d’effondrement, ou qu’un projet d’aménagement de combles rend la structure inadaptée.",
          },
          {
            question: "Le traitement de charpente est-il garanti ?",
            answer:
              "Un traitement réalisé par un professionnel est généralement assorti d’une garantie écrite, souvent de dix ans. Exigez ce document ainsi que la traçabilité des produits employés : c’est la preuve d’un travail sérieux et votre meilleure protection.",
          },
        ],
      },
      {
        type: "cta",
        text: "Affaissement, sciure, traces d’humidité ? Ne laissez pas le doute s’installer. Les charpentiers d’ATB Charpente inspectent votre charpente à Toulouse et autour de Bessières, et vous remettent un diagnostic clair avec un devis détaillé.",
        href: "/contact-charpentier",
        label: "Demander un devis gratuit",
      },
    ],
  },
];
