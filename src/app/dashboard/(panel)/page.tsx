import Link from "next/link";
import { allArticles, isPublished } from "@/lib/articles";
import { editorialCalendar, getNextTopics } from "@/lib/articles/editorial-calendar";
import { getPublishRuns } from "@/lib/dashboard/github";

export const dynamic = "force-dynamic";

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-orange">{label}</p>
      <p className="mt-1 text-3xl font-bold text-anthracite">{value}</p>
      {hint && <p className="mt-1 text-sm text-foreground/60">{hint}</p>}
    </div>
  );
}

function RunBadge({ conclusion, status }: { conclusion: string | null; status: string }) {
  if (status !== "completed")
    return <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">En cours</span>;
  if (conclusion === "success")
    return <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">Succès</span>;
  return <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">Échec</span>;
}

export default async function DashboardOverview() {
  const published = allArticles.filter(isPublished).length;
  const done = editorialCalendar.filter((t) => t.status === "done").length;
  const todo = editorialCalendar.filter((t) => t.status === "todo").length;
  const total = editorialCalendar.length;
  const next = getNextTopics(1)[0];
  const pct = total ? Math.round((done / total) * 100) : 0;

  const { configured, runs } = await getPublishRuns(5);
  const last = runs[0];

  return (
    <div>
      <h1 className="text-2xl font-bold text-anthracite">Vue d&apos;ensemble</h1>
      <p className="mt-1 text-sm text-foreground/60">
        Auto-publication du blog — 2 articles/semaine (mardi &amp; vendredi).
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Articles en ligne" value={published} />
        <StatCard label="Sujets restants" value={todo} hint={`sur ${total} planifiés`} />
        <StatCard
          label="Prochaine publication"
          value={next ? `S${next.week}` : "—"}
          hint={next ? next.title : "Calendrier épuisé"}
        />
        <StatCard
          label="Dernier run"
          value={last ? (last.conclusion === "success" ? "OK" : last.status === "completed" ? "Échec" : "…") : "—"}
          hint={configured ? (last ? new Date(last.createdAt).toLocaleString("fr-FR") : "aucun run") : "token GitHub non configuré"}
        />
      </div>

      {/* Progression du calendrier */}
      <div className="mt-6 rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-anthracite">Progression du calendrier éditorial</p>
          <p className="text-sm text-foreground/60">
            {done}/{total} ({pct}%)
          </p>
        </div>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-orange" style={{ width: `${pct}%` }} />
        </div>
        <Link href="/dashboard/articles" className="mt-3 inline-block text-sm font-semibold text-orange hover:underline">
          Voir tous les articles →
        </Link>
      </div>

      {/* Derniers runs */}
      <div className="mt-6 rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
        <p className="font-semibold text-anthracite">Dernières exécutions du robot</p>
        {!configured ? (
          <p className="mt-3 text-sm text-foreground/60">
            Renseigne <code className="rounded bg-muted px-1">GH_DASHBOARD_TOKEN</code> (PAT
            GitHub lecture seule) pour afficher l&apos;état des publications automatiques.
          </p>
        ) : runs.length === 0 ? (
          <p className="mt-3 text-sm text-foreground/60">Aucune exécution récente.</p>
        ) : (
          <ul className="mt-3 divide-y divide-black/5">
            {runs.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="block truncate text-sm font-medium text-anthracite hover:text-orange">
                    {r.name || "Publication"}
                  </a>
                  <p className="text-xs text-foreground/50">
                    {new Date(r.createdAt).toLocaleString("fr-FR")} · {r.event}
                  </p>
                </div>
                <RunBadge conclusion={r.conclusion} status={r.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
