import { NextResponse } from "next/server";
import { routes, site } from "@/lib/site";
import { allArticles, dateDeParution, isPublished } from "@/lib/articles";
import type { BlogArticle } from "@/lib/articles/types";
import { cheminApercu } from "@/lib/articles/apercu";
import { serviceForArticle } from "@/lib/articles/service-links";
import { estReservePremium } from "@/lib/articles/premium";
import { ENTETES_TABLEAU_DE_BORD, autoriseTableauDeBord } from "@/lib/articles/tableau-de-bord";

/**
 * GET /api/articles-programmes — la liste des articles pour l'espace client
 * Clickzou (clickzou.fr/espace-client, onglet « Articles programmés »), au
 * format `ArticleClient` (`src/lib/espace-client/articles.ts` du dépôt
 * clickzou-v2).
 *
 * Ce que le site publie, et comment (lu dans le code le 06/10/2026) :
 *   - le robot `.github/workflows/publish-article.yml` (mardi et vendredi)
 *     rédige le sujet suivant du calendrier `editorial-calendar.ts` LE JOUR MÊME
 *     et le publie aussitôt : avant ce jour, il n'existe pas de texte à relire ;
 *   - un article rédigé à l'avance (créneau réservé, champ `date` du
 *     calendrier) est déposé dans `posts/` avec sa date future : il reste
 *     invisible jusqu'à ce jour-là, et c'est lui que le robot publie à la place
 *     d'un sujet automatique.
 *
 * La liste contient donc les articles en ligne (« publie ») et les articles
 * rédigés à l'avance (« programme », avec un lien d'aperçu signé). Les sujets du
 * calendrier pas encore rédigés n'y figurent pas : il n'y aurait rien à relire
 * ni à valider. Sans clé valide : 401, et rien ne sort.
 *
 * Pack Premium (décision de JC du 06/10/2026) : tant que `articles-premium.json`
 * dit `"publier": false`, les créneaux réservés restent « programme » (même date
 * passée) avec `reservePremium: true` : l'espace client affiche « Réservé au pack
 * Premium — non publié », n'envoie pas de rappel J-7, et l'aperçu reste lisible.
 */
export const dynamic = "force-dynamic";

/** Texte brut : retire un éventuel balisage `**gras**` et `[ancre](url)`. */
function brut(texte: string): string {
  return texte.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

/** La réponse en tête : l'encadré ou le paragraphe qui précède le premier H2. */
function reponse(a: BlogArticle): string {
  for (const b of a.content) {
    if (b.type === "heading") break;
    if (b.type === "callout" || b.type === "paragraph") {
      // « **En bref** : … » (bloc de réponse directe) : on ne garde que la réponse.
      const t = brut(b.text).replace(/^En bref\s*:\s*/i, "");
      return t.charAt(0).toUpperCase() + t.slice(1);
    }
  }
  return brut(a.excerpt);
}

/** Les points clés : les éléments de la première liste de l'article (5 au plus). */
function points(a: BlogArticle): string[] {
  const liste = a.content.find((b) => b.type === "list");
  return liste && liste.type === "list" ? liste.items.slice(0, 5).map(brut) : [];
}

/** La page qui vend, servie par l'article : la prestation liée, sinon la page pilier. */
function pilier(a: BlogArticle): { href: string; ancre: string } {
  const service = serviceForArticle(a);
  if (service) return { href: `/${service.slug}`, ancre: service.heading };
  return { href: routes.cornerstone, ancre: "charpentier couvreur à Toulouse" };
}

export async function GET(requete: Request) {
  if (!autoriseTableauDeBord(requete)) {
    return NextResponse.json({ ok: false }, { status: 401, headers: ENTETES_TABLEAU_DE_BORD });
  }

  // `url` : l'adresse définitive (atb-charpente.fr), celle qu'on diffuse ;
  // `urlActuelle` / `apercuUrl` / `image` : le domaine réellement servi (celui de la requête).
  const base = new URL(requete.url).origin;

  const liste = allArticles
    .filter((a) => a.status !== "draft")
    .sort((a, b) => dateDeParution(a).localeCompare(dateDeParution(b)))
    .map((a) => {
      const publie = isPublished(a);
      const chemin = `/blog/${a.slug}`;
      const apercu = publie ? null : cheminApercu(a.slug);
      return {
        slug: a.slug,
        titre: a.title,
        datePublication: dateDeParution(a),
        statut: publie ? "publie" : "programme",
        url: `${site.url}${chemin}`,
        urlActuelle: `${base}${chemin}`,
        ...(a.heroImage ? { image: `${base}${a.heroImage}` } : {}),
        apercuUrl: apercu ? `${base}${apercu}` : null,
        auteur: a.author,
        motCle: a.primaryKeyword,
        motsClesSecondaires: [] as string[],
        metaDescription: a.metaDescription,
        chapo: brut(a.excerpt),
        essentiel: { reponse: reponse(a), points: points(a) },
        pilier: pilier(a),
        ...(estReservePremium(a.slug) ? { reservePremium: true } : {}),
      };
    });

  return NextResponse.json(
    { ok: true, site: site.name, articles: liste },
    { headers: ENTETES_TABLEAU_DE_BORD },
  );
}
