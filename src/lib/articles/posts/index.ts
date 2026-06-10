// Barrel des articles de blog (1 fichier par article dans ./).
// Le cron d’auto-publication ajoute un fichier ici + une ligne d’import.
import type { BlogArticle } from "../types";
import { article as charpenteTraditionnelleVsFermette } from "./charpente-traditionnelle-vs-fermette";
import { article as coutRenovationToitureComplete } from "./cout-renovation-toiture-complete";
import { article as declarationPrealableTravauxToiture } from "./declaration-prealable-travaux-toiture";
import { article as entretienGouttieresFrequence } from "./entretien-gouttieres-frequence";
import { article as entretienToitureCalendrier } from "./entretien-toiture-calendrier";
import { article as gouttiereZincVsPvc } from "./gouttiere-zinc-vs-pvc";
import { article as inspectionToitureChecklist } from "./inspection-toiture-checklist";
import { article as isolationComblesPerdusOuAmenages } from "./isolation-combles-perdus-ou-amenages";
import { article as isolationToitureExterieurSarking } from "./isolation-toiture-exterieur-sarking";
import { article as meilleurIsolantToiture } from "./meilleur-isolant-toiture";
import { article as pergolaBoisVsAlu } from "./pergola-bois-vs-alu";
import { article as prixCharpenteNeuveM2 } from "./prix-charpente-neuve-m2";
import { article as prixPergolaBoisSurMesure } from "./prix-pergola-bois-sur-mesure";
import { article as prixRefectionToitureM2 } from "./prix-refection-toiture-m2";
import { article as quandRefaireSaToiture } from "./quand-refaire-sa-toiture";
import { article as reglementationFenetreToitVoisinage } from "./reglementation-fenetre-toit-voisinage";
import { article as renovationToitureGuide } from "./renovation-toiture-guide";
import { article as signesCharpenteARenover } from "./signes-charpente-a-renover";
import { article as tuilesCanalVsMecaniques } from "./tuiles-canal-vs-mecaniques";
import { article as typesDeTuilesComparatif } from "./types-de-tuiles-comparatif";

export const posts: BlogArticle[] = [
  charpenteTraditionnelleVsFermette,
  coutRenovationToitureComplete,
  declarationPrealableTravauxToiture,
  entretienGouttieresFrequence,
  entretienToitureCalendrier,
  gouttiereZincVsPvc,
  inspectionToitureChecklist,
  isolationComblesPerdusOuAmenages,
  isolationToitureExterieurSarking,
  meilleurIsolantToiture,
  pergolaBoisVsAlu,
  prixCharpenteNeuveM2,
  prixPergolaBoisSurMesure,
  prixRefectionToitureM2,
  quandRefaireSaToiture,
  reglementationFenetreToitVoisinage,
  renovationToitureGuide,
  signesCharpenteARenover,
  tuilesCanalVsMecaniques,
  typesDeTuilesComparatif,
];
