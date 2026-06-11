import {
  gbpConfigured,
  getGbpProfile,
  getGbpReviews,
  getGbpPerformance,
  getGbpPosts,
  getGbpMedia,
  type GbpPost,
} from "@/lib/dashboard/gbp";
import GbpPublishForm from "@/components/dashboard/GbpPublishForm";

export const dynamic = "force-dynamic";

const nf = new Intl.NumberFormat("fr-FR");
const fmtDay = (d: Date | string | undefined) =>
  d
    ? new Date(d).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })
    : "—";

type Scheduled = { type: "post" | "photo"; label: string; date: Date };

// Planning des publications automatiques : photos lundi/vendredi, posts mardi/jeudi.
function nextPublications(): Scheduled[] {
  const now = new Date();
  const next = (weekday: number) => {
    const d = new Date(now);
    const diff = ((weekday - d.getDay() + 7) % 7) || 7;
    d.setDate(d.getDate() + diff);
    return d;
  };
  const items: Scheduled[] = [
    { type: "photo", label: "Photo automatique", date: next(1) }, // lundi
    { type: "post", label: "Post automatique (texte + image)", date: next(2) }, // mardi
    { type: "post", label: "Post automatique (texte + image)", date: next(4) }, // jeudi
    { type: "photo", label: "Photo automatique", date: next(5) }, // vendredi
  ];
  return items.sort((a, b) => a.date.getTime() - b.date.getTime());
}

function isThisMonth(iso?: string): boolean {
  if (!iso) return false;
  const d = new Date(iso);
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border border-black/5 p-4 shadow-sm ${accent ? "bg-orange/10" : "bg-white"}`}>
      <p className={`text-2xl font-bold ${accent ? "text-orange-dark" : "text-anthracite"}`}>{value}</p>
      <p className="mt-0.5 text-[11px] text-foreground/55">{label}</p>
    </div>
  );
}

function PubCard({ post, scheduled }: { post?: GbpPost; scheduled?: Scheduled }) {
  const isPhoto = scheduled?.type === "photo";
  const title = scheduled?.label ?? post?.summary ?? "";
  const img = post?.imageUrl;
  const date = scheduled ? scheduled.date : post?.createTime;
  return (
    <div className="flex gap-3 rounded-lg border border-black/5 p-3">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-black/5 bg-muted/40">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-xl">{isPhoto ? "🖼️" : "🪵"}</span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${
              scheduled ? "bg-violet-100 text-violet-700" : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {scheduled ? "Programmé" : "Publié"}
          </span>
          <span
            className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${
              isPhoto ? "bg-pink-100 text-pink-600" : "bg-muted text-foreground/60"
            }`}
          >
            {isPhoto ? "Photo" : "Post"}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-[11px] text-foreground/70">{title}</p>
        <p className="mt-1 text-[10px] text-foreground/40">{fmtDay(date)}</p>
      </div>
    </div>
  );
}

function NotConfigured() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
      <p className="font-semibold">Fiche Google non connectée</p>
      <p className="mt-1">
        Renseigne dans Vercel : <code className="rounded bg-white/60 px-1">GBP_CLIENT_ID</code>,{" "}
        <code className="rounded bg-white/60 px-1">GBP_CLIENT_SECRET</code>,{" "}
        <code className="rounded bg-white/60 px-1">GBP_REFRESH_TOKEN</code>,{" "}
        <code className="rounded bg-white/60 px-1">GBP_ACCOUNT_ID</code>,{" "}
        <code className="rounded bg-white/60 px-1">GBP_LOCATION_ID</code>.
      </p>
    </div>
  );
}

export default async function DashboardGbp() {
  if (!gbpConfigured()) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-anthracite">Fiche Google My Business</h1>
        </div>
        <NotConfigured />
      </div>
    );
  }

  const [profile, perf, reviews, posts, media] = await Promise.all([
    getGbpProfile(),
    getGbpPerformance(30),
    getGbpReviews(),
    getGbpPosts(),
    getGbpMedia(),
  ]);

  const postsThisMonth = posts.filter((p) => isThisMonth(p.createTime)).length;
  const photosThisMonth = media.filter((m) => isThisMonth(m.createTime)).length;
  const upcoming = nextPublications();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-anthracite">Fiche Google My Business</h1>
        <p className="mt-1 max-w-2xl text-sm text-foreground/60">
          Publication automatique : <strong>2 posts</strong> (texte + image) les <strong>mardi</strong> &amp;{" "}
          <strong>jeudi</strong>, et <strong>2 photos</strong> les <strong>lundi</strong> &amp;{" "}
          <strong>vendredi</strong>. Suivez ici l'état de la fiche et le planning des publications.
        </p>
      </div>

      {!profile.connected ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          <p className="font-semibold">Connexion à Google impossible</p>
          <p className="mt-1">Le jeton GBP est invalide ou expiré — regénère un refresh token (scope business.manage).</p>
        </div>
      ) : (
        <>
          {/* Profil */}
          <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-1.5 text-xs font-semibold text-anthracite">
                <span className="text-emerald-600">●</span> Fiche Google connectée
              </h2>
              {profile.mapsUrl && (
                <a href={profile.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-orange hover:underline">
                  Voir sur Google Maps →
                </a>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 text-center md:grid-cols-5">
              <div className="rounded-lg bg-muted/40 py-2"><p className="text-xs font-bold text-anthracite">{profile.title}</p><p className="text-[9px] text-foreground/50">Nom fiche</p></div>
              <div className="rounded-lg bg-muted/40 py-2"><p className="text-xs font-bold text-anthracite">{profile.category ?? "—"}</p><p className="text-[9px] text-foreground/50">Catégorie</p></div>
              <div className="rounded-lg bg-muted/40 py-2"><p className="text-xs font-bold text-anthracite">{profile.city ?? "Zone de service"}</p><p className="text-[9px] text-foreground/50">Secteur</p></div>
              <div className="rounded-lg bg-orange/10 py-2"><p className="text-xs font-bold text-orange-dark">{profile.avgRating ? `${profile.avgRating.toFixed(1)} ★` : "—"}</p><p className="text-[9px] text-foreground/50">{nf.format(profile.totalReviews ?? 0)} avis</p></div>
              <div className="rounded-lg bg-muted/40 py-2"><p className="text-xs font-bold text-anthracite">{profile.phone ?? "—"}</p><p className="text-[9px] text-foreground/50">Téléphone</p></div>
            </div>
          </section>

          {/* Stats du mois */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="Posts publiés (ce mois)" value={nf.format(postsThisMonth)} />
            <Stat label="Photos publiées (ce mois)" value={nf.format(photosThisMonth)} />
            <Stat label="À venir (auto)" value={nf.format(upcoming.length)} accent />
            <Stat label="Note moyenne" value={profile.avgRating ? `${profile.avgRating.toFixed(1)} ★` : "—"} accent />
          </div>

          {/* Prochaines publications (planning auto) */}
          <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold text-anthracite">Prochaines publications</p>
              <span className="text-[10px] text-foreground/40">Programmées automatiquement</span>
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {upcoming.map((u, i) => (
                <PubCard key={i} scheduled={u} />
              ))}
            </div>
          </section>

          {/* Publié récemment (posts) */}
          <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <p className="mb-3 font-semibold text-anthracite">Posts publiés récemment</p>
            {posts.length === 0 ? (
              <p className="text-sm text-foreground/50">Aucun post pour le moment.</p>
            ) : (
              <div className="grid gap-2 md:grid-cols-2">
                {posts.slice(0, 8).map((p) => (
                  <PubCard key={p.name} post={p} />
                ))}
              </div>
            )}
          </section>

          {/* Photos récentes */}
          {media.length > 0 && (
            <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="mb-3 font-semibold text-anthracite">Photos récentes</p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-8">
                {media.slice(0, 16).map((m) =>
                  m.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={m.name} src={m.thumbnailUrl} alt="" className="aspect-square w-full rounded-lg border border-black/5 object-cover" />
                  ) : null
                )}
              </div>
            </section>
          )}

          {/* Performance */}
          <section>
            <h2 className="mb-3 font-semibold text-anthracite">Performance (30 derniers jours)</h2>
            {perf ? (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                <Stat label="Vues sur Recherche" value={nf.format(perf.searchViews)} />
                <Stat label="Vues sur Maps" value={nf.format(perf.mapsViews)} />
                <Stat label="Clics vers le site" value={nf.format(perf.websiteClicks)} accent />
                <Stat label="Appels" value={nf.format(perf.calls)} accent />
                <Stat label="Itinéraires" value={nf.format(perf.directions)} />
              </div>
            ) : (
              <p className="text-sm text-foreground/50">Statistiques indisponibles pour le moment.</p>
            )}
          </section>

          {/* Publication manuelle */}
          <GbpPublishForm />

          {/* Avis */}
          {reviews.reviews.length > 0 && (
            <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="mb-3 font-semibold text-anthracite">Derniers avis</p>
              <ul className="space-y-3">
                {reviews.reviews.slice(0, 8).map((r, i) => (
                  <li key={i} className="border-b border-black/5 pb-3 text-sm last:border-0 last:pb-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-orange">{"★".repeat(r.rating)}</span>
                      <span className="font-medium text-anthracite">{r.reviewer}</span>
                      <span className="text-[10px] text-foreground/40">{fmtDay(r.date)}</span>
                    </div>
                    {r.comment && <p className="mt-1 line-clamp-3 text-foreground/70">{r.comment}</p>}
                    {r.reply ? (
                      <p className="mt-1 text-xs italic text-emerald-700">Réponse : {r.reply}</p>
                    ) : (
                      <p className="mt-1 text-[11px] text-amber-600">Sans réponse</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Encart automatisation */}
          <section className="rounded-2xl border border-orange/20 bg-orange/5 p-4">
            <p className="flex items-center gap-2 text-xs font-bold text-orange-dark">⚡ Automatisation de la fiche</p>
            <div className="mt-2 grid gap-2 text-[11px] text-foreground/70 sm:grid-cols-2">
              <p><strong>Posts (texte + image)</strong> : 2/semaine, publiés automatiquement <strong>mardi</strong> &amp; <strong>jeudi</strong>.</p>
              <p><strong>Photos</strong> : 2/semaine, publiées automatiquement <strong>lundi</strong> &amp; <strong>vendredi</strong>.</p>
            </div>
            <p className="mt-2 text-[10px] text-foreground/45">Aucune action requise. « Publier un post » sert uniquement pour une actualité ponctuelle.</p>
          </section>
        </>
      )}
    </div>
  );
}
