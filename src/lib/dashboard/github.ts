// Récupère les exécutions du workflow d'auto-publication (statut succès/échec).
// Nécessite un PAT lecture-seule dans GH_DASHBOARD_TOKEN. Sans token, le dashboard
// affiche un état « non configuré » plutôt que de planter.

export type WorkflowRun = {
  id: number;
  name: string;
  status: string; // queued | in_progress | completed
  conclusion: string | null; // success | failure | cancelled | null
  createdAt: string;
  url: string;
  event: string;
};

const REPO = process.env.GH_REPO ?? "Clickzou/atbchapente";

export async function getPublishRuns(
  limit = 10,
): Promise<{ configured: boolean; ok: boolean; runs: WorkflowRun[] }> {
  const token = process.env.GH_DASHBOARD_TOKEN;
  if (!token) return { configured: false, ok: false, runs: [] };

  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/actions/workflows/publish-article.yml/runs?per_page=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        cache: "no-store",
      },
    );
    if (!res.ok) return { configured: true, ok: false, runs: [] };
    const data = await res.json();
    const runs: WorkflowRun[] = (data.workflow_runs ?? []).map(
      (r: Record<string, unknown>) => ({
        id: r.id as number,
        name: (r.display_title as string) ?? (r.name as string) ?? "",
        status: r.status as string,
        conclusion: (r.conclusion as string) ?? null,
        createdAt: r.created_at as string,
        url: r.html_url as string,
        event: r.event as string,
      }),
    );
    return { configured: true, ok: true, runs };
  } catch {
    return { configured: true, ok: false, runs: [] };
  }
}
