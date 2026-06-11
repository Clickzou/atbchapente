import {
  gbpConfigured,
  getGbpProfile,
  getGbpReviews,
  getGbpPerformance,
  getGbpPosts,
} from "@/lib/dashboard/gbp";
import GbpPublishForm from "@/components/dashboard/GbpPublishForm";

export const dynamic = "force-dynamic";

const nf = new Intl.NumberFormat("fr-FR");
const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "";

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border border-black/5 p-4 text-center shadow-sm ${accent ? "bg-orange/10" : "bg-white"}`}>
      <p className={`text-2xl font-bold ${accent ? "text-orange-dark" : "text-anthracite"}`}>{value}</p>
      <p className="mt-0.5 text-[11px] text-foreground/55">{label}</p>
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
          <p className="mt-1 text-sm text-foreground/60">Profil, performance, avis et publication.</p>
        </div>
        <NotConfigured />
      </div>
    );
  }

  const [profile, perf, reviews, posts] = await Promise.all([
    getGbpProfile(),
    getGbpPerformance(30),
    getGbpReviews(),
    getGbpPosts(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-anthracite">Fiche Google My Business</h1>
        <p className="mt-1 text-sm text-foreground/60">Profil, performance (30 j), avis et publication.</p>
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
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-anthracite">{profile.title}</p>
              {profile.mapsUrl && (
                <a href={profile.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-orange hover:underline">
                  Voir sur Google Maps →
                </a>
              )}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
              <Metric label="Catégorie" value={profile.category ?? "—"} />
              <Metric label="Téléphone" value={profile.phone ?? "—"} />
              <Metric
                label={`${nf.format(profile.totalReviews ?? 0)} avis`}
                value={profile.avgRating ? `${profile.avgRating.toFixed(1)} ★` : "—"}
                accent
              />
              <Metric label="Ville" value={profile.city ?? "Zone de service"} />
            </div>
          </section>

          {/* Performance */}
          <section>
            <h2 className="mb-3 font-semibold text-anthracite">Performance (30 derniers jours)</h2>
            {perf ? (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                <Metric label="Vues sur Recherche" value={nf.format(perf.searchViews)} />
                <Metric label="Vues sur Maps" value={nf.format(perf.mapsViews)} />
                <Metric label="Clics vers le site" value={nf.format(perf.websiteClicks)} accent />
                <Metric label="Appels" value={nf.format(perf.calls)} accent />
                <Metric label="Itinéraires" value={nf.format(perf.directions)} />
              </div>
            ) : (
              <p className="text-sm text-foreground/50">Statistiques indisponibles pour le moment.</p>
            )}
          </section>

          {/* Publication */}
          <section className="grid gap-6 lg:grid-cols-2">
            <GbpPublishForm />

            {/* Posts récents */}
            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="font-semibold text-anthracite">Posts récents</p>
              {posts.length === 0 ? (
                <p className="mt-3 text-sm text-foreground/50">Aucun post pour le moment.</p>
              ) : (
                <ul className="mt-3 space-y-3">
                  {posts.slice(0, 6).map((p) => (
                    <li key={p.name} className="flex gap-3 border-b border-black/5 pb-3 last:border-0 last:pb-0">
                      {p.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.imageUrl} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
                      )}
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-xs text-foreground/70">{p.summary}</p>
                        <p className="mt-1 text-[10px] text-foreground/40">{fmtDate(p.createTime)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* Avis */}
          {reviews.reviews.length > 0 && (
            <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <p className="font-semibold text-anthracite">Derniers avis</p>
              <ul className="mt-3 space-y-3">
                {reviews.reviews.slice(0, 8).map((r, i) => (
                  <li key={i} className="border-b border-black/5 pb-3 text-sm last:border-0 last:pb-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-orange">{"★".repeat(r.rating)}</span>
                      <span className="font-medium text-anthracite">{r.reviewer}</span>
                      <span className="text-[10px] text-foreground/40">{fmtDate(r.date)}</span>
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
        </>
      )}
    </div>
  );
}
