import type { ContentBlock } from "@/lib/articles/types";
import { content as charpente } from "./creation-charpente-bois-renovation";
import { content as isolation } from "./isolation-toiture";
import { content as gouttieres } from "./pose-changement-gouttieres-zinc";
import { content as tuiles } from "./pose-remaniement-tuiles";
import { content as fenetreToit } from "./creation-fenetre-de-toit-bois";
import { content as pergola } from "./creation-pergola-bois";

// Contenu enrichi (orienté Toulouse) de chaque page service, indexé par slug.
export const serviceContent: Record<string, ContentBlock[]> = {
  "creation-charpente-bois-renovation": charpente,
  "isolation-toiture": isolation,
  "pose-changement-gouttieres-zinc": gouttieres,
  "pose-remaniement-tuiles": tuiles,
  "creation-fenetre-de-toit-bois": fenetreToit,
  "creation-pergola-bois": pergola,
};
