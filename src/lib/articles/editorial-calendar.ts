import type { BlogCategory, SearchIntent } from "./types";

// Calendrier éditorial — 104 sujets sur 52 semaines (2/semaine).
// Source de vérité du cron d'auto-publication : il prend les 2 prochains sujets
// `status: "todo"` (par numéro de semaine), rédige l'article (>= 2000 mots,
// cf. ATB_SEO_MASTER.md §4), puis passe le sujet à `status: "done"`.
// Les sujets sont des requêtes LONG-TAIL informationnelles (anti-cannibalisation :
// jamais les head terms réservés aux pages services, cf. master §5).

export type EditorialStatus = "todo" | "in-progress" | "done";

export interface EditorialTopic {
  week: number; // 1..52
  slug: string;
  title: string;
  primaryKeyword: string;
  category: BlogCategory;
  intent: SearchIntent;
  status: EditorialStatus;
}

export const editorialCalendar: EditorialTopic[] = [
  // ── Semaine 1 ──
  { week: 1, slug: "renover-charpente-ancienne", title: "Rénover une charpente ancienne : le guide complet", primaryKeyword: "rénover une charpente ancienne", category: "Charpente", intent: "informational", status: "done" },
  { week: 1, slug: "isolation-toiture-exterieur-sarking", title: "Isolation de toiture par l'extérieur : le sarking expliqué", primaryKeyword: "isolation toiture par l'extérieur", category: "Isolation", intent: "informational", status: "done" },
  // ── Semaine 2 ──
  { week: 2, slug: "prix-refection-toiture-m2", title: "Prix d'une réfection de toiture au m²", primaryKeyword: "prix réfection toiture m2", category: "Couverture", intent: "commercial", status: "done" },
  { week: 2, slug: "renovation-toiture-guide", title: "Rénovation de toiture : le guide complet", primaryKeyword: "rénovation toiture", category: "Rénovation toiture", intent: "informational", status: "done" },
  // ── Semaine 3 ──
  { week: 3, slug: "entretien-toiture-calendrier", title: "Entretien de toiture : le calendrier annuel", primaryKeyword: "entretien toiture", category: "Conseils & entretien", intent: "informational", status: "done" },
  { week: 3, slug: "prix-charpente-neuve-m2", title: "Prix d'une charpente neuve au m²", primaryKeyword: "prix charpente neuve m2", category: "Prix & devis", intent: "commercial", status: "done" },
  // ── Semaine 4 ──
  { week: 4, slug: "gouttiere-zinc-vs-pvc", title: "Gouttière en zinc ou en PVC : comparatif", primaryKeyword: "gouttière zinc ou pvc", category: "Zinguerie", intent: "commercial", status: "done" },
  { week: 4, slug: "declaration-prealable-travaux-toiture", title: "Déclaration préalable pour des travaux de toiture", primaryKeyword: "déclaration préalable toiture", category: "Réglementation & aides", intent: "informational", status: "done" },
  // ── Semaine 5 ──
  { week: 5, slug: "pergola-bois-vs-alu", title: "Pergola en bois ou en aluminium ?", primaryKeyword: "pergola bois ou alu", category: "Pergola & extérieur", intent: "commercial", status: "done" },
  { week: 5, slug: "signes-charpente-a-renover", title: "7 signes qu'il faut rénover votre charpente", primaryKeyword: "signes charpente à rénover", category: "Charpente", intent: "informational", status: "done" },
  // ── Semaine 6 ──
  { week: 6, slug: "isolation-combles-perdus-ou-amenages", title: "Combles perdus ou aménagés : quelle isolation ?", primaryKeyword: "isolation combles perdus ou aménagés", category: "Isolation", intent: "informational", status: "done" },
  { week: 6, slug: "types-de-tuiles-comparatif", title: "Les différents types de tuiles : comparatif", primaryKeyword: "types de tuiles", category: "Couverture", intent: "informational", status: "done" },
  // ── Semaine 7 ──
  { week: 7, slug: "quand-refaire-sa-toiture", title: "Quand faut-il refaire sa toiture ?", primaryKeyword: "quand refaire sa toiture", category: "Rénovation toiture", intent: "informational", status: "done" },
  { week: 7, slug: "inspection-toiture-checklist", title: "Inspecter sa toiture : la checklist", primaryKeyword: "inspection toiture", category: "Conseils & entretien", intent: "informational", status: "done" },
  // ── Semaine 8 ──
  { week: 8, slug: "cout-renovation-toiture-complete", title: "Coût d'une rénovation de toiture complète", primaryKeyword: "coût rénovation toiture", category: "Prix & devis", intent: "commercial", status: "done" },
  { week: 8, slug: "entretien-gouttieres-frequence", title: "À quelle fréquence entretenir ses gouttières ?", primaryKeyword: "entretien gouttières", category: "Zinguerie", intent: "informational", status: "done" },
  // ── Semaine 9 ──
  { week: 9, slug: "reglementation-fenetre-toit-voisinage", title: "Fenêtre de toit et vis-à-vis : la réglementation", primaryKeyword: "réglementation fenêtre de toit", category: "Réglementation & aides", intent: "informational", status: "done" },
  { week: 9, slug: "prix-pergola-bois-sur-mesure", title: "Prix d'une pergola en bois sur mesure", primaryKeyword: "prix pergola bois sur mesure", category: "Pergola & extérieur", intent: "commercial", status: "done" },
  // ── Semaine 10 ──
  { week: 10, slug: "charpente-traditionnelle-vs-fermette", title: "Charpente traditionnelle ou fermette : que choisir ?", primaryKeyword: "charpente traditionnelle ou fermette", category: "Charpente", intent: "commercial", status: "done" },
  { week: 10, slug: "meilleur-isolant-toiture", title: "Quel est le meilleur isolant pour une toiture ?", primaryKeyword: "meilleur isolant toiture", category: "Isolation", intent: "commercial", status: "done" },
  // ── Semaine 11 ──
  { week: 11, slug: "tuiles-canal-vs-mecaniques", title: "Tuiles canal ou mécaniques : que choisir ?", primaryKeyword: "tuiles canal ou mécaniques", category: "Couverture", intent: "commercial", status: "done" },
  { week: 11, slug: "renovation-toiture-maison-ancienne", title: "Rénover la toiture d'une maison ancienne", primaryKeyword: "rénovation toiture maison ancienne", category: "Rénovation toiture", intent: "informational", status: "done" },
  // ── Semaine 12 ──
  { week: 12, slug: "mousse-toiture-traitement", title: "Mousse sur la toiture : traiter et prévenir", primaryKeyword: "mousse toiture", category: "Conseils & entretien", intent: "informational", status: "done" },
  { week: 12, slug: "lire-devis-charpentier", title: "Comment lire un devis de charpentier", primaryKeyword: "lire devis charpentier", category: "Prix & devis", intent: "commercial", status: "done" },
  // ── Semaine 13 ──
  { week: 13, slug: "evacuation-eaux-pluviales-probleme", title: "Problèmes d'évacuation des eaux pluviales", primaryKeyword: "évacuation eaux pluviales", category: "Zinguerie", intent: "informational", status: "done" },
  { week: 13, slug: "aides-renovation-energetique-2026", title: "Aides à la rénovation énergétique 2026", primaryKeyword: "aides rénovation énergétique 2026", category: "Réglementation & aides", intent: "informational", status: "done" },
  // ── Semaine 14 ──
  { week: 14, slug: "pergola-bioclimatique-bois", title: "La pergola bioclimatique en bois", primaryKeyword: "pergola bioclimatique bois", category: "Pergola & extérieur", intent: "informational", status: "done" },
  { week: 14, slug: "traitement-charpente-insectes-xylophages", title: "Traitement de charpente contre les insectes xylophages", primaryKeyword: "traitement charpente insectes", category: "Charpente", intent: "informational", status: "done" },
  // ── Semaine 15 ──
  { week: 15, slug: "prix-isolation-toiture", title: "Prix d'une isolation de toiture en 2026", primaryKeyword: "prix isolation toiture", category: "Isolation", intent: "commercial", status: "done" },
  { week: 15, slug: "remaniement-toiture-quand", title: "Remaniement de toiture : quand et pourquoi ?", primaryKeyword: "remaniement toiture", category: "Couverture", intent: "informational", status: "todo" },
  // ── Semaine 16 ──
  { week: 16, slug: "installation-velux-fenetre-toit", title: "Installer un Velux : étapes et conseils", primaryKeyword: "installation velux", category: "Rénovation toiture", intent: "informational", status: "todo" },
  { week: 16, slug: "preparer-toiture-hiver", title: "Préparer sa toiture pour l'hiver", primaryKeyword: "préparer toiture hiver", category: "Conseils & entretien", intent: "informational", status: "todo" },
  // ── Semaine 17 ──
  { week: 17, slug: "prix-pose-velux", title: "Prix de la pose d'un Velux", primaryKeyword: "prix pose velux", category: "Prix & devis", intent: "commercial", status: "todo" },
  { week: 17, slug: "types-de-gouttieres", title: "Les différents types de gouttières", primaryKeyword: "types de gouttières", category: "Zinguerie", intent: "informational", status: "todo" },
  // ── Semaine 18 ──
  { week: 18, slug: "assurance-decennale-charpentier", title: "L'assurance décennale du charpentier", primaryKeyword: "assurance décennale charpentier", category: "Réglementation & aides", intent: "informational", status: "todo" },
  { week: 18, slug: "carport-bois-abri-voiture", title: "Carport en bois : l'abri voiture sur mesure", primaryKeyword: "carport bois", category: "Pergola & extérieur", intent: "commercial", status: "todo" },
  // ── Semaine 19 ──
  { week: 19, slug: "duree-de-vie-charpente-bois", title: "Quelle est la durée de vie d'une charpente en bois ?", primaryKeyword: "durée de vie charpente bois", category: "Charpente", intent: "informational", status: "todo" },
  { week: 19, slug: "aides-isolation-toiture-2026", title: "Aides à l'isolation de toiture en 2026", primaryKeyword: "aides isolation toiture 2026", category: "Isolation", intent: "informational", status: "todo" },
  // ── Semaine 20 ──
  { week: 20, slug: "demoussage-toiture-prix", title: "Démoussage de toiture : prix et méthode", primaryKeyword: "démoussage toiture prix", category: "Couverture", intent: "commercial", status: "todo" },
  { week: 20, slug: "amenagement-combles-etapes", title: "Aménager ses combles : les étapes", primaryKeyword: "aménagement combles", category: "Rénovation toiture", intent: "informational", status: "todo" },
  // ── Semaine 21 ──
  { week: 21, slug: "signe-infiltration-eau-toiture", title: "Repérer une infiltration d'eau par la toiture", primaryKeyword: "infiltration eau toiture", category: "Conseils & entretien", intent: "informational", status: "todo" },
  { week: 21, slug: "tarif-demoussage-toiture", title: "Tarif d'un démoussage de toiture", primaryKeyword: "tarif démoussage toiture", category: "Prix & devis", intent: "commercial", status: "todo" },
  // ── Semaine 22 ──
  { week: 22, slug: "noue-toiture-zinguerie", title: "La noue de toiture : rôle et étanchéité", primaryKeyword: "noue toiture", category: "Zinguerie", intent: "informational", status: "todo" },
  { week: 22, slug: "permis-construire-surelevation", title: "Surélévation : permis de construire ou pas ?", primaryKeyword: "permis construire surélévation", category: "Réglementation & aides", intent: "informational", status: "todo" },
  // ── Semaine 23 ──
  { week: 23, slug: "terrasse-bois-entretien", title: "Entretenir une terrasse en bois", primaryKeyword: "entretien terrasse bois", category: "Pergola & extérieur", intent: "informational", status: "todo" },
  { week: 23, slug: "charpente-extension-maison", title: "Charpente pour une extension de maison : les solutions", primaryKeyword: "charpente extension maison", category: "Charpente", intent: "informational", status: "todo" },
  // ── Semaine 24 ──
  { week: 24, slug: "deperdition-chaleur-toiture", title: "Toiture : jusqu'à 30 % de déperditions de chaleur", primaryKeyword: "déperdition chaleur toiture", category: "Isolation", intent: "informational", status: "todo" },
  { week: 24, slug: "fuite-toiture-que-faire", title: "Fuite de toiture : que faire en urgence ?", primaryKeyword: "fuite toiture que faire", category: "Couverture", intent: "informational", status: "todo" },
  // ── Semaine 25 ──
  { week: 25, slug: "renovation-toiture-avant-vente", title: "Faut-il rénover sa toiture avant de vendre ?", primaryKeyword: "rénovation toiture avant vente", category: "Rénovation toiture", intent: "informational", status: "todo" },
  { week: 25, slug: "condensation-combles-solutions", title: "Condensation dans les combles : solutions", primaryKeyword: "condensation combles", category: "Conseils & entretien", intent: "informational", status: "todo" },
  // ── Semaine 26 ──
  { week: 26, slug: "prix-isolation-combles", title: "Prix de l'isolation des combles", primaryKeyword: "prix isolation combles", category: "Prix & devis", intent: "commercial", status: "todo" },
  { week: 26, slug: "solin-etancheite-cheminee", title: "Solin de cheminée : assurer l'étanchéité", primaryKeyword: "solin cheminée", category: "Zinguerie", intent: "informational", status: "todo" },
  // ── Semaine 27 ──
  { week: 27, slug: "normes-charpente-dtu", title: "Les normes et DTU de la charpente", primaryKeyword: "normes charpente dtu", category: "Réglementation & aides", intent: "informational", status: "todo" },
  { week: 27, slug: "abri-jardin-bois-sur-mesure", title: "Abri de jardin en bois sur mesure", primaryKeyword: "abri de jardin bois", category: "Pergola & extérieur", intent: "commercial", status: "todo" },
  // ── Semaine 28 ──
  { week: 28, slug: "renforcer-une-charpente", title: "Comment renforcer une charpente affaiblie ?", primaryKeyword: "renforcer une charpente", category: "Charpente", intent: "informational", status: "todo" },
  { week: 28, slug: "isolation-toiture-renovation-energetique", title: "Isolation de toiture et rénovation énergétique", primaryKeyword: "isolation toiture rénovation énergétique", category: "Isolation", intent: "informational", status: "todo" },
  // ── Semaine 29 ──
  { week: 29, slug: "refaire-toiture-etapes", title: "Refaire sa toiture : les étapes clés", primaryKeyword: "refaire sa toiture", category: "Couverture", intent: "informational", status: "todo" },
  { week: 29, slug: "assurance-degat-toiture", title: "Dégât de toiture : que couvre l'assurance ?", primaryKeyword: "assurance dégât toiture", category: "Rénovation toiture", intent: "informational", status: "todo" },
  // ── Semaine 30 ──
  { week: 30, slug: "nid-frelon-guepe-toiture", title: "Nid de frelons sous la toiture : que faire ?", primaryKeyword: "nid frelon toiture", category: "Conseils & entretien", intent: "informational", status: "todo" },
  { week: 30, slug: "devis-toiture-pieges", title: "Devis de toiture : les pièges à éviter", primaryKeyword: "devis toiture", category: "Prix & devis", intent: "commercial", status: "todo" },
  // ── Semaine 31 ──
  { week: 31, slug: "gouttiere-qui-deborde", title: "Gouttière qui déborde : causes et solutions", primaryKeyword: "gouttière qui déborde", category: "Zinguerie", intent: "informational", status: "todo" },
  { week: 31, slug: "maprimerenov-conditions-2026", title: "MaPrimeRénov' 2026 : conditions et montants", primaryKeyword: "maprimerénov conditions 2026", category: "Réglementation & aides", intent: "informational", status: "todo" },
  // ── Semaine 32 ──
  { week: 32, slug: "pergola-adossee-vs-autoportee", title: "Pergola adossée ou autoportée ?", primaryKeyword: "pergola adossée ou autoportée", category: "Pergola & extérieur", intent: "commercial", status: "todo" },
  { week: 32, slug: "charpente-combles-amenageables", title: "Aménager ses combles : quelle charpente ?", primaryKeyword: "charpente combles aménageables", category: "Charpente", intent: "informational", status: "todo" },
  // ── Semaine 33 ──
  { week: 33, slug: "sarking-avantages-inconvenients", title: "Sarking : avantages et inconvénients", primaryKeyword: "sarking avantages inconvénients", category: "Isolation", intent: "informational", status: "todo" },
  { week: 33, slug: "duree-de-vie-toiture-tuiles", title: "Durée de vie d'une toiture en tuiles", primaryKeyword: "durée de vie toiture tuiles", category: "Couverture", intent: "informational", status: "todo" },
  // ── Semaine 34 ──
  { week: 34, slug: "toiture-apres-tempete", title: "Toiture endommagée après une tempête : les démarches", primaryKeyword: "toiture après tempête", category: "Rénovation toiture", intent: "informational", status: "todo" },
  { week: 34, slug: "ventilation-toiture-importance", title: "Pourquoi bien ventiler sa toiture", primaryKeyword: "ventilation toiture", category: "Conseils & entretien", intent: "informational", status: "todo" },
  // ── Semaine 35 ──
  { week: 35, slug: "cout-pergola-bois", title: "Combien coûte une pergola en bois ?", primaryKeyword: "prix pergola bois", category: "Prix & devis", intent: "commercial", status: "todo" },
  { week: 35, slug: "habillage-zinc-debords-toit", title: "Habillage en zinc des débords de toit", primaryKeyword: "habillage zinc débord de toit", category: "Zinguerie", intent: "informational", status: "todo" },
  // ── Semaine 36 ──
  { week: 36, slug: "cee-certificats-economie-energie-toiture", title: "Les primes CEE pour la toiture", primaryKeyword: "cee toiture", category: "Réglementation & aides", intent: "informational", status: "todo" },
  { week: 36, slug: "essence-bois-exterieur", title: "Quelle essence de bois pour l'extérieur ?", primaryKeyword: "essence bois extérieur", category: "Pergola & extérieur", intent: "informational", status: "todo" },
  // ── Semaine 37 ──
  { week: 37, slug: "essences-bois-charpente", title: "Quelles essences de bois pour une charpente ?", primaryKeyword: "essences de bois charpente", category: "Charpente", intent: "informational", status: "todo" },
  { week: 37, slug: "epaisseur-isolant-toiture", title: "Quelle épaisseur d'isolant pour une toiture ?", primaryKeyword: "épaisseur isolant toiture", category: "Isolation", intent: "informational", status: "todo" },
  // ── Semaine 38 ──
  { week: 38, slug: "tuiles-terre-cuite-avantages", title: "Les avantages des tuiles en terre cuite", primaryKeyword: "tuiles terre cuite", category: "Couverture", intent: "informational", status: "todo" },
  { week: 38, slug: "diagnostic-toiture", title: "Le diagnostic de toiture : pourquoi, comment", primaryKeyword: "diagnostic toiture", category: "Rénovation toiture", intent: "informational", status: "todo" },
  // ── Semaine 39 ──
  { week: 39, slug: "nettoyer-gouttieres-soi-meme", title: "Nettoyer ses gouttières soi-même : guide", primaryKeyword: "nettoyer gouttières", category: "Conseils & entretien", intent: "informational", status: "todo" },
  { week: 39, slug: "financement-travaux-toiture", title: "Comment financer ses travaux de toiture", primaryKeyword: "financement travaux toiture", category: "Prix & devis", intent: "informational", status: "todo" },
  // ── Semaine 40 ──
  { week: 40, slug: "prix-gouttiere-zinc-ml", title: "Prix d'une gouttière en zinc au mètre", primaryKeyword: "prix gouttière zinc", category: "Zinguerie", intent: "commercial", status: "todo" },
  { week: 40, slug: "plu-contraintes-toiture", title: "PLU : les contraintes pour votre toiture", primaryKeyword: "plu toiture", category: "Réglementation & aides", intent: "informational", status: "todo" },
  // ── Semaine 41 ──
  { week: 41, slug: "reconnaitre-capricorne-vrillette", title: "Capricorne ou vrillette : reconnaître les parasites du bois", primaryKeyword: "reconnaître capricorne vrillette", category: "Charpente", intent: "informational", status: "todo" },
  { week: 41, slug: "isolation-sous-rampants", title: "Isolation sous rampants : méthode et prix", primaryKeyword: "isolation sous rampants", category: "Isolation", intent: "informational", status: "todo" },
  // ── Semaine 42 ──
  { week: 42, slug: "nettoyage-toiture-haute-pression-danger", title: "Nettoyer sa toiture au karcher : bonne idée ?", primaryKeyword: "nettoyage toiture haute pression", category: "Couverture", intent: "informational", status: "todo" },
  { week: 42, slug: "renovation-toiture-copropriete", title: "Rénovation de toiture en copropriété", primaryKeyword: "rénovation toiture copropriété", category: "Rénovation toiture", intent: "informational", status: "todo" },
  // ── Semaine 43 ──
  { week: 43, slug: "proteger-charpente-humidite", title: "Protéger sa charpente de l'humidité", primaryKeyword: "protéger charpente humidité", category: "Conseils & entretien", intent: "informational", status: "todo" },
  { week: 43, slug: "tva-reduite-travaux-toiture", title: "TVA réduite sur les travaux de toiture", primaryKeyword: "tva réduite travaux toiture", category: "Prix & devis", intent: "informational", status: "todo" },
  // ── Semaine 44 ──
  { week: 44, slug: "eco-ptz-travaux-toiture", title: "L'éco-PTZ pour financer ses travaux de toiture", primaryKeyword: "éco-ptz toiture", category: "Réglementation & aides", intent: "informational", status: "todo" },
  { week: 44, slug: "charpente-apparente-amenagement", title: "Mettre une charpente apparente en valeur", primaryKeyword: "charpente apparente", category: "Charpente", intent: "informational", status: "todo" },
  // ── Semaine 45 ──
  { week: 45, slug: "confort-ete-isolation-toiture", title: "Garder la fraîcheur l'été grâce à l'isolation de toiture", primaryKeyword: "isolation toiture confort été", category: "Isolation", intent: "informational", status: "todo" },
  { week: 45, slug: "faitiere-toiture-role", title: "La faîtière : rôle et entretien", primaryKeyword: "faîtière toiture", category: "Couverture", intent: "informational", status: "todo" },
  // ── Semaine 46 ──
  { week: 46, slug: "toiture-en-pente-specificites", title: "Travaux sur toiture en forte pente", primaryKeyword: "toiture en pente", category: "Rénovation toiture", intent: "informational", status: "todo" },
  { week: 46, slug: "toiture-vegetalisee-entretien", title: "Toiture végétalisée : entretien et conseils", primaryKeyword: "toiture végétalisée", category: "Conseils & entretien", intent: "informational", status: "todo" },
  // ── Semaine 47 ──
  { week: 47, slug: "garantie-travaux-toiture", title: "Quelles garanties pour vos travaux de toiture ?", primaryKeyword: "garantie travaux toiture", category: "Réglementation & aides", intent: "informational", status: "todo" },
  { week: 47, slug: "verifier-devis-charpente", title: "Devis de charpente : les points à vérifier", primaryKeyword: "devis charpente", category: "Charpente", intent: "commercial", status: "todo" },
  // ── Semaine 48 ──
  { week: 48, slug: "laine-de-bois-toiture", title: "La laine de bois pour isoler sa toiture", primaryKeyword: "laine de bois toiture", category: "Isolation", intent: "informational", status: "todo" },
  { week: 48, slug: "ecran-sous-toiture-utilite", title: "Écran sous-toiture : à quoi ça sert ?", primaryKeyword: "écran sous-toiture", category: "Couverture", intent: "informational", status: "todo" },
  // ── Semaine 49 ──
  { week: 49, slug: "checklist-renovation-toiture", title: "Checklist avant de rénover sa toiture", primaryKeyword: "checklist rénovation toiture", category: "Rénovation toiture", intent: "informational", status: "todo" },
  { week: 49, slug: "quand-appeler-charpentier", title: "Quand faut-il appeler un charpentier ?", primaryKeyword: "quand appeler un charpentier", category: "Conseils & entretien", intent: "informational", status: "todo" },
  // ── Semaine 50 ──
  { week: 50, slug: "entretien-charpente-bois", title: "Comment entretenir une charpente en bois ?", primaryKeyword: "entretien charpente bois", category: "Charpente", intent: "informational", status: "todo" },
  { week: 50, slug: "maprimerenov-toiture", title: "MaPrimeRénov' pour l'isolation de toiture", primaryKeyword: "maprimerénov toiture", category: "Isolation", intent: "informational", status: "todo" },
  // ── Semaine 51 ──
  { week: 51, slug: "choisir-couvreur", title: "Comment choisir un bon couvreur ?", primaryKeyword: "choisir un couvreur", category: "Couverture", intent: "commercial", status: "todo" },
  { week: 51, slug: "surelevation-toiture-charpente", title: "Surélévation de toiture : ce qu'il faut savoir", primaryKeyword: "surélévation toiture", category: "Charpente", intent: "informational", status: "todo" },
  // ── Semaine 52 ──
  { week: 52, slug: "aides-refection-toiture", title: "Quelles aides pour refaire sa toiture ?", primaryKeyword: "aides réfection toiture", category: "Couverture", intent: "informational", status: "todo" },
  { week: 52, slug: "deperdition-isolation-recap", title: "Isolation de toiture : le récapitulatif 2026", primaryKeyword: "isolation toiture récapitulatif", category: "Isolation", intent: "informational", status: "todo" },
];

/** Prochains sujets à rédiger (status todo), triés par semaine. */
export function getNextTopics(count = 2) {
  return editorialCalendar
    .filter((t) => t.status === "todo")
    .sort((a, b) => a.week - b.week)
    .slice(0, count);
}
