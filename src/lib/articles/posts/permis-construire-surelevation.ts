import type { BlogArticle } from "../types";

export const article: BlogArticle = {
  slug: "permis-construire-surelevation",
  title: "Surélévation : permis de construire ou pas ?",
  metaTitle: "Permis de construire surélévation : ce qu'il faut savoir",
  metaDescription: "Surélévation de maison : permis de construire obligatoire ou déclaration préalable ? Guide complet pour les propriétaires en Haute-Garonne.",
  excerpt: "Vous envisagez de surélever votre maison pour gagner de la surface habitable ? Avant de lancer les travaux, la question du permis de construire est incontournable. Voici tout ce qu'il faut savoir.",
  category: "Réglementation & aides",
  primaryKeyword: "permis construire surélévation",
  intent: "informational",
  tags: ["surélévation", "permis de construire", "réglementation toiture", "déclaration préalable", "extension maison"],
  date: "2026-08-21",
  author: "ATB Charpente",
  readTime: "9 min",
  heroImage: "/images/blog/permis-construire-surelevation.jpg",
  heroImageAlt: "Surélévation d'une maison en cours de construction avec charpente apparente et vue sur toiture",
  status: "published",
  relatedSlugs: [
    "declaration-prealable-travaux-toiture",
    "charpente-traditionnelle-vs-fermette",
    "renovation-toiture-guide"
  ],
  content: [
    {
      type: "paragraph",
      text: "La surélévation est l'une des solutions les plus intelligentes pour agrandir sa maison sans empiéter sur le terrain. Plutôt que de construire une extension latérale, on monte : on ajoute un étage, on rehausse les murs de façade, on exploite des combles jusqu'alors perdus. Dans la région toulousaine, où le foncier se raréfie et où les maisons de plain-pied ou de plain-pied-et-demi sont légion, cette option séduit de plus en plus de propriétaires. Mais avant de contacter un charpentier, une question cruciale se pose : **faut-il un permis de construire pour une surélévation ?** La réponse, comme souvent en matière d'urbanisme, dépend de plusieurs paramètres. Ce guide vous donne toutes les clés pour y voir clair."
    },
    {
      type: "heading",
      level: 2,
      text: "Qu'est-ce qu'une surélévation exactement ?"
    },
    {
      type: "paragraph",
      text: "Avant d'aborder la réglementation, posons les bases. Une **surélévation** consiste à augmenter la hauteur d'un bâtiment existant afin de créer de nouvelles surfaces habitables. Concrètement, cela peut prendre plusieurs formes :"
    },
    {
      type: "list",
      ordered: false,
      items: [
        "La rehausse complète : on dépose la toiture existante, on monte les murs sur un niveau supplémentaire, puis on reconstruit une toiture.",
        "L'aménagement de combles avec rehausse partielle : on relève légèrement la pente ou la hauteur sous faîtage pour rendre les combles habitables.",
        "L'ajout d'un niveau intermédiaire (niveau de plancher) entre le rez-de-chaussée et les combles.",
        "La surélévation d'une partie seulement de la maison, par exemple au-dessus d'un garage attenant."
      ]
    },
    {
      type: "paragraph",
      text: "Dans tous ces cas, le résultat final est une modification substantielle du volume bâti et de l'aspect extérieur du bâtiment. C'est précisément ce point — la création de surface de plancher et la modification du gabarit — qui déclenche les obligations administratives."
    },
    {
      type: "callout",
      variant: "info",
      text: "En urbanisme, on distingue la **surface de plancher** (SP) de l'**emprise au sol** (EAS). Une surélévation augmente la surface de plancher sans modifier l'emprise au sol. C'est ce critère de surface de plancher créée qui détermine le régime d'autorisation applicable."
    },
    {
      type: "heading",
      level: 2,
      text: "Les seuils réglementaires : déclaration préalable ou permis de construire ?"
    },
    {
      type: "paragraph",
      text: "Le Code de l'urbanisme distingue plusieurs régimes selon l'ampleur des travaux. Pour une surélévation, deux seuils sont particulièrement importants : celui de la déclaration préalable de travaux (DP) et celui du permis de construire (PC)."
    },
    {
      type: "heading",
      level: 3,
      text: "La déclaration préalable de travaux (DP)"
    },
    {
      type: "paragraph",
      text: "La déclaration préalable est une procédure allégée, moins contraignante qu'un permis de construire. Elle s'applique, pour les maisons individuelles, lorsque la surface de plancher ou l'emprise au sol créée est **comprise entre 5 m² et 40 m²**, à condition que la surface totale de la maison après travaux reste inférieure à certains seuils. Attention : ce plafond de 40 m² en DP n'est valable que si la commune est couverte par un Plan Local d'Urbanisme (PLU). En dehors des zones PLU, le seuil de la DP descend à 20 m² créés."
    },
    {
      type: "heading",
      level: 3,
      text: "Le permis de construire (PC)"
    },
    {
      type: "paragraph",
      text: "Le permis de construire est obligatoire dès lors que la surélévation génère **plus de 40 m² de surface de plancher** (en zone PLU). Il est également obligatoire dans deux autres situations importantes :"
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Si les travaux portent la surface totale de la maison (existant + créé) à **plus de 150 m²** : dans ce cas, le recours à un **architecte** devient obligatoire.",
        "Si la surélévation est réalisée sur un bâtiment dont la surface de plancher existante **dépasse déjà 150 m²**, même si l'extension en elle-même est modeste.",
        "Si les travaux modifient les structures porteuses ou la façade dans le cadre d'un changement de destination du bâtiment."
      ]
    },
    {
      type: "callout",
      variant: "warning",
      text: "**Attention à la règle des 150 m²** : si votre maison fait déjà 140 m² et que vous envisagez une surélévation de 20 m² seulement, le total dépassera 150 m². Vous devrez alors obtenir un permis de construire ET faire appel à un architecte, même si la surface créée serait normalement en dessous du seuil DP/PC."
    },
    {
      type: "heading",
      level: 3,
      text: "Tableau récapitulatif des seuils"
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Moins de 5 m² créés → Aucune formalité (mais vérifiez les règles locales du PLU).",
        "De 5 à 40 m² créés en zone PLU → Déclaration préalable de travaux.",
        "De 5 à 20 m² créés hors zone PLU → Déclaration préalable de travaux.",
        "Plus de 40 m² créés (zone PLU) ou plus de 20 m² hors zone → Permis de construire.",
        "Total maison après travaux > 150 m² → Permis de construire + architecte obligatoire."
      ]
    },
    {
      type: "heading",
      level: 2,
      text: "Le cas particulier des zones protégées et du PLU à Toulouse"
    },
    {
      type: "paragraph",
      text: "Sur Toulouse et dans la métropole toulousaine, la question du PLU est centrale. **Toulouse Métropole** dispose d'un Plan Local d'Urbanisme métropolitain (PLUm) qui fixe des règles précises selon les zones : zones urbaines denses (UA, UB), zones pavillonnaires (UC, UD), zones à urbaniser (AU), etc. Chaque zone a ses propres règles de hauteur maximale, de prospects (distances aux limites séparatives), de coefficient d'emprise au sol ou encore de règles architecturales."
    },
    {
      type: "paragraph",
      text: "Avant tout projet de surélévation, il est **indispensable de consulter le PLU de votre commune** pour vérifier :"
    },
    {
      type: "list",
      ordered: false,
      items: [
        "La hauteur maximale autorisée pour les constructions dans votre zone.",
        "Les règles de prospect (hauteur liée à la distance par rapport aux limites de propriété ou à la voie publique).",
        "Les éventuelles prescriptions architecturales : matériaux, teintes, type de toiture (tuiles canal, pente minimale/maximale…).",
        "L'existence d'un périmètre de protection des monuments historiques ou d'une zone de protection du patrimoine architectural.",
        "Les règles spécifiques en cas de secteur sauvegardé ou de site patrimonial remarquable."
      ]
    },
    {
      type: "callout",
      variant: "info",
      text: "Dans plusieurs communes de la couronne toulousaine (Blagnac, Colomiers, Tournefeuille, Muret…), les règles de hauteur peuvent varier sensiblement d'une zone à l'autre, voire d'une rue à l'autre. Une vérification au cas par cas est indispensable. Le service urbanisme de votre mairie peut vous délivrer un **certificat d'urbanisme opérationnel (CUb)** qui précise les règles applicables à votre parcelle."
    },
    {
      type: "heading",
      level: 3,
      text: "Les Architectes des Bâtiments de France (ABF)"
    },
    {
      type: "paragraph",
      text: "Si votre maison est située dans le périmètre de protection d'un monument historique (dans un rayon de 500 mètres, ou dans un périmètre délimité), les travaux de surélévation sont soumis à l'avis de l'**Architecte des Bâtiments de France**. Cet avis est conforme, c'est-à-dire que la mairie ne peut pas s'y opposer. Dans ces secteurs, des contraintes supplémentaires s'appliquent : matériaux, volumes, teintes de façade. À Toulouse, cela concerne notamment plusieurs quartiers proches du centre historique ou de sites classés."
    },
    {
      type: "heading",
      level: 2,
      text: "Comment constituer son dossier de permis de construire pour une surélévation ?"
    },
    {
      type: "paragraph",
      text: "Si votre projet nécessite un permis de construire, vous devrez constituer un dossier complet à déposer en mairie. Le formulaire Cerfa n° 13406 est celui à utiliser pour les maisons individuelles. Voici les pièces généralement demandées :"
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Le formulaire Cerfa complété et signé.",
        "Un plan de situation du terrain dans la commune (échelle 1/25 000 ou 1/10 000).",
        "Un plan de masse des constructions à édifier ou à modifier (échelle 1/200 ou 1/500), indiquant les cotes de hauteur.",
        "Un plan de coupe du terrain et de la construction existante + projetée.",
        "Une notice décrivant le terrain et le projet (matériaux, aspects extérieurs, intégration paysagère).",
        "Les plans des façades et des toitures (état existant et état projeté), à l'échelle 1/50 ou 1/100.",
        "Un document graphique permettant d'apprécier l'insertion du projet dans son environnement (photo-montage ou croquis).",
        "Des photos situant le terrain dans le paysage proche et lointain.",
        "Si la surface totale après travaux dépasse 150 m² : les plans signés par un architecte."
      ]
    },
    {
      type: "paragraph",
      text: "Le délai d'instruction d'un permis de construire pour une maison individuelle est de **2 mois** à compter du dépôt du dossier complet. Ce délai peut être porté à **3 mois** si le projet est situé dans un secteur soumis à l'avis de l'ABF ou dans une zone protégée. Pensez à anticiper ces délais dans votre planning de travaux."
    },
    {
      type: "quote",
      text: "Dans notre métier, nous accompagnons régulièrement nos clients dès la phase de conception. Comprendre les contraintes du PLU local avant de définir la hauteur de surélévation, c'est s'éviter bien des déconvenues et des allers-retours administratifs.",
      author: "L'équipe ATB Charpente"
    },
    {
      type: "heading",
      level: 2,
      text: "Surélévation et règles de voisinage : les points de vigilance"
    },
    {
      type: "paragraph",
      text: "Au-delà des autorisations d'urbanisme, une surélévation soulève des questions de droit privé entre voisins. Plusieurs points méritent votre attention avant de lancer les travaux."
    },
    {
      type: "heading",
      level: 3,
      text: "Les troubles anormaux de voisinage"
    },
    {
      type: "paragraph",
      text: "Même si votre permis de construire est accordé, votre surélévation ne doit pas causer de **trouble anormal de voisinage** : masquage excessif de la lumière naturelle, vue plongeante sur le jardin ou les pièces privatives du voisin, etc. La jurisprudence en la matière est abondante, et un voisin peut engager une action judiciaire même après obtention du permis, si le trouble causé est jugé anormal. Discuter en amont du projet avec ses voisins est toujours une bonne pratique."
    },
    {
      type: "heading",
      level: 3,
      text: "Les règles de prospect et les distances"
    },
    {
      type: "paragraph",
      text: "Le PLU fixe généralement des règles de **prospect** : la hauteur d'une construction ne peut dépasser une certaine valeur en fonction de sa distance par rapport aux limites séparatives ou à la voie publique. Ces règles visent précisément à éviter les effets d'écrasement et à préserver l'ensoleillement des propriétés voisines. Une surélévation qui ne respecterait pas ces règles sera refusée."
    },
    {
      type: "heading",
      level: 3,
      text: "Le cas de la copropriété"
    },
    {
      type: "paragraph",
      text: "Si vous êtes en **copropriété**, la surélévation est soumise à des règles encore plus strictes. En principe, la surélévation d'un immeuble en copropriété appartient collectivement aux copropriétaires (elle porte sur les parties communes). Pour pouvoir réaliser une telle opération, il faut généralement obtenir une **autorisation de l'assemblée générale à la majorité des deux tiers** (article 35 de la loi de 1965), voire à l'unanimité dans certains cas. Cette démarche est complexe et nécessite souvent l'intervention d'un géomètre-expert et d'un notaire pour modifier le règlement de copropriété."
    },
    {
      type: "callout",
      variant: "warning",
      text: "**Copropriété : attention aux pièges** ! En maison mitoyenne ou en copropriété horizontale (lotissement), des clauses du règlement de copropriété ou du cahier des charges du lotissement peuvent interdire ou restreindre la surélévation, indépendamment des règles d'urbanisme. Consultez ces documents avant tout projet."
    },
    {
      type: "heading",
      level: 2,
      text: "Les spécificités techniques d'une surélévation dans le Sud-Ouest"
    },
    {
      type: "paragraph",
      text: "Sur le plan technique, une surélévation n'est pas un projet anodin. Elle implique de vérifier et souvent de renforcer les **fondations et les structures porteuses** existantes pour supporter le poids supplémentaire. Dans la région toulousaine, où l'on trouve beaucoup de maisons construites entre les années 1950 et 1980 avec des techniques parfois légères, cette vérification est cruciale."
    },
    {
      type: "heading",
      level: 3,
      text: "Le choix de la charpente et de la toiture"
    },
    {
      type: "paragraph",
      text: "La surélévation implique la dépose de la toiture existante et la construction d'une nouvelle charpente. En Haute-Garonne et dans tout le Sud-Ouest, les **tuiles canal** (ou romanes) restent très répandues et souvent imposées par le PLU ou l'ABF pour conserver le caractère architectural local. Leur mise en œuvre sur une nouvelle charpente doit respecter des pentes minimales (généralement 25 à 30 % selon les tuiles) et des règles de pose spécifiques, notamment pour résister aux vents d'autan et aux orages estivaux caractéristiques du climat toulousain."
    },
    {
      type: "paragraph",
      text: "La charpente elle-même peut être de type **traditionnelle** (avec chevrons, pannes et arbalétriers) ou en **fermettes industrielles**. Pour une surélévation visant à créer de l'espace habitable, la charpente traditionnelle est souvent préférable car elle libère le volume sous rampants, permettant un véritable aménagement des combles. ATB Charpente réalise ce type de charpente sur mesure, en adaptant la structure aux contraintes de chaque projet."
    },
    {
      type: "heading",
      level: 3,
      text: "L'isolation thermique : une obligation depuis la RE2020"
    },
    {
      type: "paragraph",
      text: "Dès lors qu'une surélévation crée des surfaces habitables, les nouvelles parois (toiture, murs de la surélévation) doivent respecter les exigences thermiques de la **réglementation environnementale RE2020**. Concrètement, cela implique une isolation performante de la toiture (souvent en sarking ou en isolation entre et sous chevrons) et des murs de la surélévation. Ces travaux d'isolation peuvent d'ailleurs ouvrir droit à des aides financières (MaPrimeRénov', éco-PTZ) si certaines conditions sont remplies."
    },
    {
      type: "callout",
      variant: "tip",
      text: "**Profitez de la surélévation pour isoler l'ensemble de la toiture** ! C'est le bon moment pour traiter thermiquement l'ensemble de l'enveloppe, y compris les parties existantes. Une surélévation bien isolée peut significativement réduire vos factures de chauffage, surtout face aux étés de plus en plus chauds que connaît la région toulousaine."
    },
    {
      type: "heading",
      level: 2,
      text: "Les étapes clés d'un projet de surélévation"
    },
    {
      type: "list",
      ordered: true,
      items: [
        "**Vérification de la faisabilité réglementaire** : consultation du PLU, demande de certificat d'urbanisme informatif (CUa) ou opérationnel (CUb) en mairie.",
        "**Diagnostic de la structure existante** : vérification des fondations, des murs porteurs et des planchers par un bureau d'études structure.",
        "**Conception du projet** : établissement des plans par un architecte (obligatoire si > 150 m² au total) ou un maître d'œuvre.",
        "**Dépôt de la demande d'autorisation** : déclaration préalable ou permis de construire en mairie, selon les seuils.",
        "**Attente de l'autorisation** : 2 à 3 mois selon la zone. Passé ce délai sans opposition, l'autorisation est tacite (à confirmer par courrier).",
        "**Affichage du permis** sur le terrain pendant toute la durée des travaux (panneau visible depuis la voie publique, obligatoire).",
        "**Réalisation des travaux** : dépose de la toiture, renforcement structurel si nécessaire, élévation des murs, construction de la charpente, couverture et isolation.",
        "**Déclaration d'achèvement des travaux (DAACT)** : formulaire Cerfa à déposer en mairie dans les 90 jours suivant la fin des travaux.",
        "**Déclaration aux impôts** : tout agrandissement doit être signalé à l'administration fiscale dans les 90 jours pour mise à jour de la taxe foncière."
      ]
    },
    {
      type: "heading",
      level: 2,
      text: "Construire sans autorisation : les risques"
    },
    {
      type: "paragraph",
      text: "Certains propriétaires sont tentés de se passer des formalités administratives, par impatience ou pour éviter les délais. C'est une erreur aux conséquences potentiellement très lourdes. Une **construction sans autorisation** (ou en violation des règles du permis obtenu) est une infraction pénale. Les sanctions peuvent inclure :"
    },
    {
      type: "list",
      ordered: false,
      items: [
        "Une amende pouvant aller de 1 200 € à 6 000 € par m² de surface construite illégalement.",
        "Une mise en demeure de démolir ou de mettre en conformité l'ouvrage (à vos frais).",
        "Des difficultés lors de la revente du bien (obligation de régularisation ou décote du prix).",
        "Des problèmes avec votre assureur en cas de sinistre (refus de garantie pour les parties non déclarées).",
        "Des délais de prescription : 10 ans pour les constructions en zone couverte par un PLU, 6 ans hors PLU. Passé ce délai, la situation est prescrite pénalement, mais les complications administratives restent."
      ]
    },
    {
      type: "paragraph",
      text: "En résumé, les risques d'une construction sans autorisation dépassent largement les économies de temps imaginées. La régularisation a posteriori est possible mais complexe et coûteuse, et n'est pas toujours accordée."
    },
    {
      type: "heading",
      level: 2,
      text: "Questions fréquentes sur le permis de construire pour une surélévation"
    },
    {
      type: "faq",
      items: [
        {
          question: "Une surélévation de moins de 5 m² nécessite-t-elle une autorisation ?",
          answer: "En dessous de 5 m² de surface de plancher créée, aucune formalité n'est en principe requise par le Code de l'urbanisme. Cependant, cette règle connaît des exceptions selon le secteur (zone protégée, périmètre ABF, règles spécifiques du PLU local). Il est conseillé de vérifier auprès de la mairie avant de commencer, même pour de petits travaux."
        },
        {
          question: "Peut-on surélever une maison en secteur inondable ?",
          answer: "En zone inondable (zone rouge ou bleue d'un Plan de Prévention des Risques Inondation - PPRI), les travaux sur les constructions existantes sont soumis à des restrictions particulières. La surélévation peut être autorisée sous conditions, voire imposée (pour mettre les planchers habitables hors d'eau), mais elle doit être compatible avec le règlement du PPRI. En Haute-Garonne, de nombreuses communes riveraines de la Garonne et de ses affluents sont concernées. Vérifiez le PPRI applicable sur le site Géorisques."
        },
        {
          question: "Le permis de construire pour une surélévation est-il différent de celui pour une construction neuve ?",
          answer: "Le formulaire est le même (Cerfa 13406 pour les maisons individuelles), mais le dossier doit impérativement inclure des plans de l'état existant avant travaux, en plus des plans de l'état projeté. La notice doit expliquer comment le projet s'intègre à la construction existante. L'instruction du dossier suit les mêmes délais : 2 mois en situation normale, 3 mois en secteur protégé."
        },
        {
          question: "Faut-il forcément un architecte pour une surélévation ?",
          answer: "Le recours à un architecte n'est obligatoire que si la surface de plancher totale de la maison après travaux dépasse 150 m². En dessous de ce seuil, vous pouvez déposer votre permis de construire vous-même ou vous faire accompagner par un maître d'œuvre ou un dessinateur. Cependant, même sous les 150 m², l'architecte apporte une vraie valeur ajoutée pour optimiser le projet et s'assurer de sa conformité aux règles d'urbanisme."
        },
        {
          question: "Combien de temps faut-il pour obtenir un permis de construire pour une surélévation ?",
          answer: "Le délai légal d'instruction est de 2 mois à compter du dépôt d'un dossier complet. En secteur protégé (périmètre ABF, site classé), ce délai est porté à 3 mois. En pratique, il arrive que la mairie demande des pièces complémentaires dans le premier mois, ce qui repart le délai d'instruction. Prévoyez donc 2 à 4 mois au minimum entre le dépôt du dossier et le démarrage des travaux."
        },
        {
          question: "Une surélévation modifie-t-elle la taxe foncière ?",
          answer: "Oui, toute augmentation de la surface habitable doit être déclarée à l'administration fiscale dans les 90 jours suivant l'achèvement des travaux. Cela entraîne une réévaluation de la valeur locative cadastrale de votre bien et donc une augmentation de la taxe foncière. Il existe cependant une **exonération temporaire de 2 ans** de taxe foncière pour les nouvelles constructions et les agrandissements, sous réserve de respecter le délai de déclaration."
        }
      ]
    },
    {
      type: "heading",
      level: 2,
      text: "Conclusion : anticiper pour réussir sa surélévation"
    },
    {
      type: "paragraph",
      text: "La surélévation est un projet enthousiasmant, qui peut transformer radicalement votre maison et votre qualité de vie, notamment dans les communes de la métropole toulousaine où l'espace au sol est souvent limité. Mais c'est aussi un projet qui demande une **préparation rigoureuse**, en particulier sur le plan réglementaire. Permis de construire ou déclaration préalable, règles du PLU, contraintes de voisinage, obligations thermiques : chaque étape doit être anticipée."
    },
    {
      type: "paragraph",
      text: "La bonne nouvelle, c'est que ces démarches sont tout à fait accessibles, à condition de bien s'informer et de s'entourer des bons professionnels. Un charpentier expérimenté, un architecte ou un maître d'œuvre connaissant les spécificités locales — les règles de Toulouse Métropole, les prescriptions sur les tuiles canal, les contraintes climatiques du Sud-Ouest — sera votre meilleur allié pour mener ce projet à bien, dans les délais et dans les règles."
    },
    {
      type: "cta",
      text: "Vous envisagez une surélévation dans la région toulousaine ? ATB Charpente vous accompagne de la conception à la réalisation : étude de faisabilité, aide à la constitution du dossier, charpente et couverture. Contactez-nous pour un premier échange sans engagement.",
      href: "/contact-charpentier",
      label: "Demander un devis gratuit"
    }
  ]
};
