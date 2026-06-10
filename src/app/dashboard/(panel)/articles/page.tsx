import { allArticles, isPublished } from "@/lib/articles";
import { editorialCalendar, getNextTopics } from "@/lib/articles/editorial-calendar";
import { getPublishRuns } from "@/lib/dashboard/github";

export const dynamic = "force-dynamic";

export default async function DashboardArticles() {
  const publishedList = [...allArticles]
    .filter(isPublished)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const todo = editorialCalendar
    .filter((t) => t.status === "todo")
    .sort((a, b) => a.week - b.week);
  const nextSlugs = new Set(getNextTopics(2).map((t) => t.slug));

  const { configured, runs } = await getPublishRuns(10);
  const failures = runs.filter((r) => r.status === "completed" && r.conclusion !== "success");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-anthracite">Articles</h1>
        <p className="mt-1 text-sm text-foreground/60">
          {publishedList.length} en ligne · {todo.length} programmés · {editorialCalendar.length} au total
        </p>
      </div>

      {/* Échecs récents */}
      {configured && failures.length > 0 && (
        <section className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <p className="font-semibold text-red-800">
            {failures.length} publication(s) en échec récemment
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {failures.map((r) => (
              <li key={r.id}>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-red-700 underline-offset-2 hover:underline">
                  {new Date(r.createdAt).toLocaleString("fr-FR")} — {r.name || "run"}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Programmés */}
      <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-anthracite">Programmés ({todo.length})</h2>
        <p className="mt-1 text-sm text-foreground/60">
          Ordre de publication par numéro de semaine. Les 2 prochains sont mis en avant.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-foreground/50">
                <th className="pb-2 pr-3 font-semibold">Sem.</th>
                <th className="pb-2 pr-3 font-semibold">Titre</th>
                <th className="pb-2 pr-3 font-semibold">Mot-clé</th>
                <th className="pb-2 pr-3 font-semibold">Catégorie</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {todo.map((t) => (
                <tr key={t.slug} className={nextSlugs.has(t.slug) ? "bg-orange/5" : ""}>
                  <td className="py-2 pr-3 font-semibold text-orange">S{t.week}</td>
                  <td className="py-2 pr-3 text-anthracite">
                    {t.title}
                    {nextSlugs.has(t.slug) && (
                      <span className="ml-2 rounded-full bg-orange px-2 py-0.5 text-[10px] font-semibold text-white">
                        à venir
                      </span>
                    )}
                  </td>
                  <td className="py-2 pr-3 text-foreground/60">{t.primaryKeyword}</td>
                  <td className="py-2 pr-3 text-foreground/60">{t.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Publiés */}
      <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-anthracite">En ligne ({publishedList.length})</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-foreground/50">
                <th className="pb-2 pr-3 font-semibold">Date</th>
                <th className="pb-2 pr-3 font-semibold">Titre</th>
                <th className="pb-2 pr-3 font-semibold">Catégorie</th>
                <th className="pb-2 pr-3 font-semibold">Lien</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {publishedList.map((a) => (
                <tr key={a.slug}>
                  <td className="whitespace-nowrap py-2 pr-3 text-foreground/60">
                    {new Date(a.date).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="py-2 pr-3 text-anthracite">{a.title}</td>
                  <td className="py-2 pr-3 text-foreground/60">{a.category}</td>
                  <td className="py-2 pr-3">
                    <a
                      href={`/blog/${a.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-orange hover:underline"
                    >
                      voir →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
