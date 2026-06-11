import { getGa4Summary, getGscSummary, getGscDaily } from "@/lib/dashboard/google";
import SeoChart from "@/components/dashboard/SeoChart";

export const dynamic = "force-dynamic";

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-orange">{label}</p>
      <p className="mt-1 text-3xl font-bold text-anthracite">{value}</p>
      {hint && <p className="mt-1 text-sm text-foreground/60">{hint}</p>}
    </div>
  );
}

function NotConfigured({ what }: { what: string }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
      <p className="font-semibold">{what} — pas encore connecté</p>
      <p className="mt-1">
        Renseigne dans Vercel : <code className="rounded bg-white/60 px-1">GOOGLE_SERVICE_ACCOUNT_JSON</code>,{" "}
        <code className="rounded bg-white/60 px-1">GA4_PROPERTY_ID</code>,{" "}
        <code className="rounded bg-white/60 px-1">GSC_SITE_URL</code>, et donne au compte de
        service l&apos;accès lecture à GA4 + Search Console.
      </p>
    </div>
  );
}

function ApiError({ what, error }: { what: string; error?: string }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
      <p className="font-semibold">{what} — accès en erreur</p>
      <p className="mt-1 break-words">{error || "Vérifie les accès du compte de service."}</p>
    </div>
  );
}

const nf = new Intl.NumberFormat("fr-FR");
const pct = (v: number) => `${(v * 100).toFixed(1)} %`;

export default async function DashboardSeo() {
  const [ga, gsc, daily] = await Promise.all([
    getGa4Summary(28),
    getGscSummary(28),
    getGscDaily(90),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-anthracite">SEO &amp; trafic</h1>
        <p className="mt-1 text-sm text-foreground/60">28 derniers jours.</p>
      </div>

      {/* GA4 */}
      <section>
        <h2 className="mb-3 font-semibold text-anthracite">Trafic (Google Analytics)</h2>
        {!ga.configured ? (
          <NotConfigured what="Google Analytics" />
        ) : !ga.ok ? (
          <ApiError what="Google Analytics" error={ga.error} />
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Stat label="Sessions" value={nf.format(ga.totals!.sessions)} />
              <Stat label="Utilisateurs" value={nf.format(ga.totals!.users)} hint={`${nf.format(ga.totals!.newUsers)} nouveaux`} />
              <Stat label="Sessions engagées" value={nf.format(ga.totals!.engagedSessions)} />
              <Stat label="Engagement moyen" value={`${ga.totals!.avgEngagementSec}s`} hint="par session" />
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                <p className="font-semibold text-anthracite">Pages les plus vues</p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {(ga.topPages ?? []).map((p) => (
                    <li key={p.path} className="flex justify-between gap-3">
                      <span className="truncate text-foreground/70">{p.path}</span>
                      <span className="shrink-0 font-medium text-anthracite">{nf.format(p.sessions)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                <p className="font-semibold text-anthracite">Sources de trafic</p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {(ga.channels ?? []).map((c) => (
                    <li key={c.channel} className="flex justify-between gap-3">
                      <span className="text-foreground/70">{c.channel}</span>
                      <span className="font-medium text-anthracite">{nf.format(c.sessions)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </section>

      {/* GSC */}
      <section>
        <h2 className="mb-3 font-semibold text-anthracite">Recherche Google (Search Console)</h2>
        {!gsc.configured ? (
          <NotConfigured what="Search Console" />
        ) : !gsc.ok ? (
          <ApiError what="Search Console" error={gsc.error} />
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Stat label="Clics" value={nf.format(gsc.totals!.clicks)} />
              <Stat label="Impressions" value={nf.format(gsc.totals!.impressions)} />
              <Stat label="CTR" value={pct(gsc.totals!.ctr)} />
              <Stat label="Position moy." value={gsc.totals!.position.toFixed(1)} />
            </div>
            {daily.length > 0 && (
              <div className="mt-4">
                <SeoChart data={daily} />
              </div>
            )}
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                <p className="font-semibold text-anthracite">Requêtes (top clics)</p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {(gsc.topQueries ?? []).slice(0, 15).map((q) => (
                    <li key={q.query} className="flex justify-between gap-3">
                      <span className="truncate text-foreground/70">{q.query}</span>
                      <span className="shrink-0 font-medium text-anthracite">
                        {nf.format(q.clicks)} <span className="text-foreground/40">· pos {q.position.toFixed(0)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                <p className="font-semibold text-anthracite">Pages (top clics)</p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {(gsc.topPages ?? []).slice(0, 15).map((p) => (
                    <li key={p.page} className="flex justify-between gap-3">
                      <span className="truncate text-foreground/70">{p.page.replace("https://atb-charpente.fr", "")}</span>
                      <span className="shrink-0 font-medium text-anthracite">{nf.format(p.clicks)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
