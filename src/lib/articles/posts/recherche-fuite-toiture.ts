import type { BlogArticle } from "../types";

// Rédigé à la main le 06/10/2026 (audit SEO/GEO d'octobre, créneau réservé du
// calendrier) : publié automatiquement le 10/11/2026. La recherche de fuite
// n'est PAS confirmée comme prestation d'ATB (consignes client, « à confirmer ») :
// l'article explique la méthode et oriente vers les prestations confirmées
// (couverture, remaniement, solins, zinguerie, charpente) des pages du site.
export const article: BlogArticle = {
  slug: "recherche-fuite-toiture",
  title: "Recherche de fuite de toiture : comment un couvreur trouve l’origine d’une infiltration",
  metaTitle: "Recherche de fuite toiture : trouver l’origine",
  metaDescription:
    "Recherche de fuite de toiture : pourquoi l’eau coule loin de son entrée, les méthodes pour la localiser et qui appeler. Le guide avant d’agir.",
  excerpt:
    "Une tache au plafond indique rarement l’endroit exact où la toiture laisse passer l’eau. Comment se mène une recherche de fuite, ce que vous pouvez observer vous-même et à qui confier la suite.",
  category: "Couverture",
  primaryKeyword: "recherche de fuite toiture",
  intent: "informational",
  tags: ["fuite de toiture", "infiltration", "couverture", "tuiles", "étanchéité"],
  date: "2026-11-10",
  author: "ATB Charpente",
  readTime: "11 min",
  heroImage: "/images/realisations/solin-zinc-souche-cheminee-brique-toiture-tuiles-bessieres.jpeg",
  heroImageAlt: "Abergement en zinc au pied d’une souche de cheminée en briques, sur une toiture en tuiles près de Bessières",
  status: "published",
  relatedSlugs: [
    "fuite-toiture-que-faire",
    "signe-infiltration-eau-toiture",
    "solin-etancheite-cheminee",
  ],
  content: [
    {
      type: "callout",
      variant: "info",
      text: "**En bref** : pour trouver l’origine d’une fuite, on part de la trace intérieure et on **remonte la pente**. La plupart des infiltrations viennent d’une tuile déplacée, d’un solin, d’une noue ou d’un faîtage, rarement de l’endroit exact où l’eau tombe. Sur une toiture en tuiles, c’est un travail de **couvreur**, qui peut ensuite réparer la cause.",
    },
    {
      type: "paragraph",
      text: "Une auréole apparaît au plafond après une nuit de pluie. Le premier réflexe est de regarder le toit juste au-dessus et de chercher une tuile cassée. Bien souvent, il n’y en a pas. L’eau qui traverse une couverture voyage avant de se montrer : elle glisse sur l’écran de sous-toiture, suit un chevron, s’étale sur l’isolant, et ne goutte qu’un ou deux mètres plus loin. C’est pour cela que la **recherche de fuite de toiture** est une affaire de méthode plus que de coup d’œil.",
    },
    {
      type: "paragraph",
      text: "Ce guide explique pourquoi une fuite se cache, comment elle se localise, ce que vous pouvez observer sans monter sur le toit et à qui confier la suite. Les gestes d’urgence à faire dans les premières heures sont détaillés dans notre article [fuite de toiture : que faire en urgence ?](/blog/fuite-toiture-que-faire). Il a été rédigé par **ATB Charpente**, charpentier-couvreur installé à Bessières, qui intervient à Toulouse et dans son agglomération.",
    },
    {
      type: "heading",
      level: 2,
      text: "Pourquoi l’eau apparaît rarement là où la toiture fuit",
    },
    {
      type: "paragraph",
      text: "Une toiture en tuiles n’est pas une coque étanche d’un seul tenant. C’est un assemblage de pièces qui se recouvrent, posées sur des liteaux, parfois au-dessus d’un écran de sous-toiture, le tout porté par la charpente. Quand l’eau franchit la première barrière, elle rencontre ces couches successives et suit le chemin que la pente et la gravité lui offrent.",
    },
    {
      type: "list",
      items: [
        "**Sur l’écran de sous-toiture** : l’eau glisse vers le bas de pente jusqu’à trouver une déchirure, un raccord mal fait ou le bord de l’écran.",
        "**Le long des bois** : elle suit un chevron ou une panne, parfois sur plusieurs mètres, avant de tomber à l’endroit où le bois change de direction.",
        "**Dans l’isolant** : une laine minérale ou végétale absorbe l’eau et la diffuse, ce qui produit une tache large et floue au plafond.",
        "**Contre un mur** : près d’un pignon ou d’une cheminée, l’eau peut descendre dans la maçonnerie et ressortir plus bas, sur un mur intérieur.",
      ],
    },
    {
      type: "paragraph",
      text: "Conséquence pratique : remplacer la tuile située juste au-dessus de la tache ne règle souvent rien. Il faut retrouver le point d’entrée, et ce point se trouve presque toujours **plus haut sur la pente** que la trace intérieure.",
    },
    {
      type: "heading",
      level: 2,
      text: "Écarter les fausses pistes avant de chercher sur le toit",
    },
    {
      type: "paragraph",
      text: "Toutes les taches d’humidité sous une toiture ne viennent pas de la couverture. Avant de soupçonner les tuiles, il est utile d’éliminer les autres sources d’eau possibles, faute de quoi la recherche part dans la mauvaise direction.",
    },
    {
      type: "list",
      items: [
        "**La condensation** : de l’humidité qui apparaît par temps froid et sec, sans pluie, sur la face intérieure de l’écran ou sur les bois, signale un défaut de ventilation des combles plutôt qu’une fuite.",
        "**La plomberie** : un ballon d’eau chaude, une canalisation ou une évacuation qui passent dans les combles peuvent fuir indépendamment du temps qu’il fait.",
        "**La ventilation mécanique** : une gaine de VMC mal isolée condense et goutte, souvent au même endroit, quelle que soit la météo.",
        "**L’évacuation des eaux pluviales** : une gouttière ou un chéneau qui déborde mouille le haut des murs et peut imiter une fuite de couverture.",
      ],
    },
    {
      type: "paragraph",
      text: "Le critère le plus simple reste le lien avec la pluie. Une trace qui n’apparaît **que pendant ou juste après une averse**, et qui varie selon la force de la pluie ou la direction du vent, pointe vers la toiture. Une trace qui persiste par temps sec oriente plutôt vers la condensation ou un réseau d’eau.",
    },
    {
      type: "heading",
      level: 2,
      text: "Ce que vous pouvez observer vous-même, sans monter sur le toit",
    },
    {
      type: "paragraph",
      text: "Le propriétaire dispose d’informations précieuses que le professionnel n’a pas : il voit la maison sous toutes les pluies. Quelques observations bien notées font gagner beaucoup de temps lors de la recherche. Elles se font depuis l’intérieur et depuis le sol, jamais sur la toiture.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "**Notez les circonstances** : date, intensité de la pluie, direction et force du vent. Une fuite qui ne se manifeste que par vent d’ouest ou par forte pluie oriente vers un versant précis.",
        "**Repérez la trace dans les combles**, s’ils sont accessibles, pendant ou juste après la pluie, avec une lampe : bois mouillés, gouttes, écran humide.",
        "**Marquez les points humides** à la craie ou au ruban adhésif et photographiez-les, avec un repère de distance par rapport à un mur ou à la cheminée.",
        "**Observez la toiture depuis le sol**, aux jumelles si besoin : tuile qui dépasse de l’alignement, faîtage où le mortier manque, végétation dans une noue.",
        "**Rassemblez l’historique** : date des derniers travaux, passage d’un antenniste ou d’un installateur sur le toit, coup de vent récent.",
      ],
    },
    {
      type: "callout",
      variant: "warning",
      text: "Ne montez pas sur la toiture pour chercher la fuite. Une couverture mouillée est glissante, et les tuiles canal se cassent facilement sous le poids d’une personne qui ne sait pas où poser les pieds : on peut créer une nouvelle fuite en cherchant l’ancienne, et surtout risquer une chute grave.",
    },
    {
      type: "heading",
      level: 2,
      text: "Comment un couvreur localise l’origine d’une infiltration",
    },
    {
      type: "paragraph",
      text: "Une recherche de fuite sur une toiture en pente combine en général plusieurs approches, de la plus simple à la plus outillée. L’objectif n’est pas d’utiliser le matériel le plus sophistiqué, mais de réduire progressivement la zone suspecte jusqu’à trouver le point d’entrée.",
    },
    {
      type: "heading",
      level: 3,
      text: "Lire les traces et remonter la pente",
    },
    {
      type: "paragraph",
      text: "Le point de départ est la trace intérieure. Depuis les combles, le professionnel suit les marques laissées par l’eau sur les bois et sur l’écran : coulures, auréoles, bois plus sombre. Il remonte ces indices vers le haut de la pente et repère, à l’aplomb du point le plus haut, la zone de couverture à examiner de l’extérieur. Quand les combles sont aménagés et que les bois sont cachés, cette lecture se fait davantage depuis l’extérieur, à partir de la position de la tache.",
    },
    {
      type: "heading",
      level: 3,
      text: "Inspecter les points sensibles de la couverture",
    },
    {
      type: "paragraph",
      text: "Sur le toit, l’examen porte d’abord sur les endroits où la couverture est interrompue ou raccordée à autre chose, car c’est là que l’étanchéité est la plus difficile à assurer :",
    },
    {
      type: "list",
      items: [
        "Les **tuiles** elles-mêmes : cassées, fêlées, poreuses, ou déplacées de quelques centimètres.",
        "Le **faîtage** et les **arêtiers** : mortier fissuré, closoir décollé, tuile faîtière qui a bougé.",
        "Les **rives**, en bordure de pignon, où le vent s’engouffre.",
        "Les **noues**, ces creux où deux pans se rejoignent et concentrent l’eau.",
        "Les **solins** et abergements autour des cheminées, des murs qui dépassent et des sorties de ventilation.",
        "Le **raccord des fenêtres de toit**, souvent en cause quand la tache apparaît autour de l’ouvrant.",
      ],
    },
    {
      type: "heading",
      level: 3,
      text: "Le test à l’eau, zone par zone",
    },
    {
      type: "paragraph",
      text: "Quand l’inspection visuelle ne suffit pas, le test d’arrosage permet de reproduire la fuite de façon contrôlée. Il se pratique par temps sec, à deux personnes, l’une sur le toit, l’autre à l’intérieur :",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "On commence **en bas** de la zone suspecte, jamais en haut, pour ne pas mouiller toute la pente d’un coup.",
        "On arrose une **petite surface** pendant plusieurs minutes, au débit d’une pluie soutenue, sans jet puissant.",
        "La personne à l’intérieur surveille l’apparition de l’eau.",
        "Si rien n’apparaît, on **remonte** d’une zone et on recommence.",
        "Dès que l’eau se manifeste, la dernière zone arrosée contient le point d’entrée.",
      ],
    },
    {
      type: "paragraph",
      text: "Cette méthode demande de la patience : l’eau peut mettre un certain temps à traverser l’isolant ou à suivre un bois avant de se montrer. Arroser trop vite ou trop large fausse le résultat.",
    },
    {
      type: "heading",
      level: 3,
      text: "Les outils de détection : utiles, mais pas magiques",
    },
    {
      type: "list",
      items: [
        "**L’humidimètre** mesure l’humidité d’un bois ou d’un plâtre et permet de délimiter précisément une zone mouillée.",
        "**La caméra thermique** repère les zones plus froides où l’eau s’est accumulée, à condition qu’il existe un écart de température suffisant entre l’intérieur et l’extérieur.",
        "**Le colorant ou traceur**, versé dans l’eau d’arrosage, aide à confirmer qu’une trace provient bien de la zone testée.",
        "**Le drone ou la perche photo** permettent d’examiner une toiture haute ou fragile sans marcher dessus.",
      ],
    },
    {
      type: "paragraph",
      text: "Ces outils complètent l’œil d’un professionnel, ils ne le remplacent pas. Sur une toiture en tuiles, l’essentiel des fuites se trouve encore par la lecture des traces, l’inspection des points singuliers et, au besoin, le test à l’eau. Le fumigène et les tests sous pression concernent surtout les toitures-terrasses et les réseaux d’eau, qui sortent du cadre de cet article.",
    },
    {
      type: "heading",
      level: 2,
      text: "Où se trouve la trace, d’où vient souvent l’eau",
    },
    {
      type: "paragraph",
      text: "Sans remplacer une recherche sur place, la position de la tache donne une première orientation. Voici les correspondances les plus fréquentes sur une maison couverte en tuiles :",
    },
    {
      type: "list",
      items: [
        "**Tache au pied de la cheminée ou sur le conduit** : solin ou abergement fatigué, mortier fissuré, couronnement de la souche. Le sujet est détaillé dans notre guide sur le [solin de cheminée](/blog/solin-etancheite-cheminee).",
        "**Tache dans l’angle où deux pans se rejoignent** : noue encombrée de feuilles, zinc percé ou tuiles mal recoupées le long de la noue. Voir notre article sur la [noue de toiture](/blog/noue-toiture-zinguerie).",
        "**Tache alignée sous le sommet du toit** : faîtage dont le mortier s’est fendu ou dont les tuiles faîtières ont bougé.",
        "**Tache le long d’un mur pignon** : rive qui laisse passer l’eau poussée par le vent.",
        "**Tache autour d’une fenêtre de toit** : raccord d’étanchéité mal posé, encrassé ou abîmé.",
        "**Plusieurs taches diffuses sur une même pente** : couverture vieillissante, tuiles poreuses ou écran de sous-toiture absent ou dégradé ; c’est souvent le signe qu’une réparation ponctuelle ne suffira plus.",
      ],
    },
    {
      type: "paragraph",
      text: "Les toitures en tuiles canal, très répandues en Haute-Garonne, ont une particularité : sur les poses anciennes, les tuiles de couvert reposent sur les tuiles de courant sans toujours être fixées. Un coup de vent, le passage d’un animal ou d’une personne suffit à en faire glisser une de quelques centimètres, et l’eau s’engouffre dans l’interstice. C’est une cause fréquente de fuite intermittente, qui ne se manifeste que par certaines pluies.",
    },
    {
      type: "heading",
      level: 2,
      text: "Qui appeler pour une recherche de fuite de toiture ?",
    },
    {
      type: "heading",
      level: 3,
      text: "Le couvreur, pour une toiture en pente",
    },
    {
      type: "paragraph",
      text: "Sur une maison couverte de tuiles, la grande majorité des origines de fuite se trouve dans la couverture ou dans la zinguerie qui l’accompagne. Le **couvreur** sait se déplacer sur ce type de toit sans casser de tuiles, connaît les points faibles de chaque type de pose et peut, une fois la cause identifiée, **réparer dans la foulée** ou chiffrer la réparation. C’est donc l’interlocuteur logique pour une infiltration qui se manifeste par temps de pluie.",
    },
    {
      type: "heading",
      level: 3,
      text: "L’entreprise spécialisée en détection de fuite",
    },
    {
      type: "paragraph",
      text: "Certaines entreprises font de la détection de fuite leur seul métier, avec des méthodes non destructives. Elles interviennent surtout sur les canalisations encastrées, les planchers chauffants et les toitures-terrasses. Leur rapport peut être utile à l’assurance, mais elles ne réalisent généralement pas la réparation : il faudra ensuite un artisan pour reprendre la toiture.",
    },
    {
      type: "heading",
      level: 3,
      text: "L’expert de votre assurance",
    },
    {
      type: "paragraph",
      text: "Après une déclaration de sinistre, l’assureur peut missionner un expert pour constater les dommages et en établir la cause. Il ne répare pas et ne se substitue pas à l’artisan ; en revanche, ses conclusions conditionnent souvent la prise en charge.",
    },
    {
      type: "heading",
      level: 2,
      text: "Recherche de fuite et assurance habitation : les points à vérifier",
    },
    {
      type: "paragraph",
      text: "Les règles dépendent de votre contrat, et il est préférable de le relire avant d’engager des frais. Quelques repères généraux :",
    },
    {
      type: "list",
      items: [
        "Beaucoup de contrats multirisques habitation comportent, dans la garantie dégâts des eaux, une prise en charge des **frais de recherche de fuite**, parfois plafonnée. Vérifiez si c’est votre cas et sous quelles conditions.",
        "Les infiltrations par la toiture sont traitées différemment selon les contrats, et une exclusion pour **défaut d’entretien** est fréquente : une couverture manifestement négligée peut limiter l’indemnisation.",
        "Les dommages causés par une **tempête** relèvent d’une autre garantie, avec ses propres conditions.",
        "Le sinistre doit être déclaré dans le délai prévu par votre contrat, qui ne peut pas être inférieur à **cinq jours ouvrés** pour un dégât des eaux.",
        "Conservez les **photos**, les dates et les factures de toutes les interventions : elles servent à établir la cause et la chronologie.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Après la recherche : réparer la cause, puis contrôler les dégâts",
    },
    {
      type: "paragraph",
      text: "Trouver la fuite n’est que la moitié du travail. Une fois le point d’entrée identifié, l’ordre des opérations compte autant que la réparation elle-même :",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "**Réparer la cause** : remplacement ou recalage des tuiles, reprise du faîtage, réfection d’un solin ou d’une noue, raccord de fenêtre de toit.",
        "**Contrôler l’isolant** : une laine qui a été mouillée perd une partie de son efficacité et peut se tasser ; elle doit être séchée ou remplacée.",
        "**Vérifier les bois** : chevrons, liteaux et pannes restés longtemps humides peuvent avoir été attaqués par des champignons ou des insectes.",
        "**Laisser sécher**, puis seulement reprendre les plafonds et les peintures.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      text: "Avant de refaire un plafond taché, attendez d’avoir traversé plusieurs épisodes de pluie sans nouvelle trace. C’est la meilleure confirmation que la réparation a bien traité la bonne cause.",
    },
    {
      type: "paragraph",
      text: "Lorsque la fuite a révélé une couverture fatiguée dans son ensemble, une réparation ponctuelle ne fait que repousser le problème. Un **remaniement**, qui consiste à déposer, trier et reposer les tuiles en remplaçant celles qui sont abîmées, ou une **réfection** complète avec un écran de sous-toiture neuf, peuvent alors être plus raisonnables à moyen terme.",
    },
    {
      type: "heading",
      level: 2,
      text: "Réparer sa toiture après une infiltration autour de Toulouse",
    },
    {
      type: "paragraph",
      text: "Une fois l’origine de l’infiltration identifiée, les travaux relèvent de la couverture, de la zinguerie ou de la charpente. Ce sont les métiers d’**ATB Charpente** : remplacement de tuiles cassées ou poreuses, remaniement et réfection de couverture, reprise des faîtages, des rives, des noues et des solins, et, lorsque l’eau a abîmé la structure, réparation des bois. Ces interventions sont présentées sur nos pages [pose et remaniement de tuiles](/pose-remaniement-tuiles) et [création et rénovation de charpente bois](/creation-charpente-bois-renovation).",
    },
    {
      type: "paragraph",
      text: "Basés à **Bessières**, nous intervenons à **Toulouse** et dans son agglomération, notamment à L’Union, Balma, Saint-Jean, Montrabé et Castelmaurou. Le devis est gratuit, détaillé et sans engagement. Pour que nous puissions vous dire si votre situation relève de nos interventions, décrivez-la lors de votre demande, photos à l’appui.",
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
          question: "Comment trouver l’origine d’une fuite de toiture ?",
          answer:
            "On part de la trace intérieure et on remonte la pente, car l’eau entre presque toujours plus haut que l’endroit où elle apparaît. On inspecte ensuite les points sensibles de la couverture (tuiles, faîtage, rives, noues, solins, fenêtres de toit), et, si besoin, on réalise un test d’arrosage zone par zone.",
        },
        {
          question: "Pourquoi la tache au plafond n’est-elle pas sous la tuile cassée ?",
          answer:
            "Parce que l’eau voyage avant de se montrer : elle glisse sur l’écran de sous-toiture, suit un chevron ou une panne, ou s’étale dans l’isolant. Elle peut ainsi apparaître à un ou deux mètres de son point d’entrée, parfois davantage.",
        },
        {
          question: "Qui appeler pour une recherche de fuite sur un toit en tuiles ?",
          answer:
            "Un couvreur, dans la plupart des cas : l’origine se trouve généralement dans la couverture ou la zinguerie, et il peut réparer une fois la cause trouvée. Une entreprise spécialisée en détection de fuite est plus utile pour les canalisations encastrées et les toitures-terrasses.",
        },
        {
          question: "Une fuite de toiture peut-elle être de la condensation ?",
          answer:
            "Oui. Une humidité qui apparaît par temps froid et sec, sans lien avec la pluie, signale souvent de la condensation due à une ventilation insuffisante des combles. Une trace qui n’apparaît qu’avec la pluie oriente vers la couverture.",
        },
        {
          question: "La recherche de fuite est-elle prise en charge par l’assurance ?",
          answer:
            "Beaucoup de contrats multirisques habitation prévoient des frais de recherche de fuite dans la garantie dégâts des eaux, souvent plafonnés. Les conditions varient d’un contrat à l’autre, et un défaut d’entretien de la toiture peut limiter la prise en charge : relisez votre contrat ou interrogez votre assureur.",
        },
        {
          question: "Peut-on faire soi-même le test à l’eau ?",
          answer:
            "Il suppose de monter sur la toiture, ce qui est dangereux et risque de casser des tuiles. Vous pouvez en revanche observer les combles pendant la pluie, marquer les zones humides et noter les circonstances : ces informations facilitent beaucoup le travail du professionnel.",
        },
      ],
    },
    {
      type: "paragraph",
      text: "Retenez l’essentiel : l’eau entre plus haut qu’elle ne tombe, les fausses pistes s’écartent avant de monter sur le toit, et une fuite se répare à sa source. Plus l’origine est trouvée tôt, plus la réparation reste limitée à la couverture, sans atteindre l’isolant ni la charpente.",
    },
    {
      type: "cta",
      text: "Une infiltration après la pluie, une tuile déplacée ou un solin fatigué ? Décrivez-nous la situation : ATB Charpente intervient à Toulouse et dans son agglomération pour la réparation de couverture, de zinguerie et de charpente.",
      href: "/contact-charpentier",
      label: "Demander un devis gratuit",
    },
  ],
};
