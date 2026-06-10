import { google } from "googleapis";

// Lecture GA4 + Search Console via un compte de service (clé JSON dans
// GOOGLE_SERVICE_ACCOUNT_JSON). Sans config/accès, on renvoie configured:false
// et le dashboard affiche un état « non configuré » au lieu de planter.

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID; // ex. "541044459"
const GSC_SITE_URL = process.env.GSC_SITE_URL; // ex. "https://atb-charpente.fr/"

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  let creds: { client_email?: string; private_key?: string };
  try {
    creds = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!creds.client_email || !creds.private_key) return null;
  return new google.auth.JWT({
    email: creds.client_email,
    // Les clés collées dans une variable d'env ont souvent des \n littéraux.
    key: creds.private_key.replace(/\\n/g, "\n"),
    scopes: [
      "https://www.googleapis.com/auth/analytics.readonly",
      "https://www.googleapis.com/auth/webmasters.readonly",
    ],
  });
}

const ymd = (d: Date) => d.toISOString().slice(0, 10);

export type Ga4Summary = {
  configured: boolean;
  ok: boolean;
  error?: string;
  totals?: {
    sessions: number;
    users: number;
    newUsers: number;
    engagedSessions: number;
    avgEngagementSec: number;
  };
  topPages?: { path: string; sessions: number }[];
  channels?: { channel: string; sessions: number }[];
};

export async function getGa4Summary(days = 28): Promise<Ga4Summary> {
  const auth = getAuth();
  if (!auth || !GA4_PROPERTY_ID) return { configured: false, ok: false };
  try {
    const data = google.analyticsdata({ version: "v1beta", auth });
    const property = `properties/${GA4_PROPERTY_ID}`;
    const dateRanges = [{ startDate: `${days}daysAgo`, endDate: "today" }];

    const totalsRes = await data.properties.runReport({
      property,
      requestBody: {
        dateRanges,
        metrics: [
          { name: "sessions" },
          { name: "totalUsers" },
          { name: "newUsers" },
          { name: "engagedSessions" },
          { name: "userEngagementDuration" },
        ],
      },
    });
    const row = totalsRes.data.rows?.[0]?.metricValues ?? [];
    const n = (i: number) => Number(row[i]?.value ?? 0);
    const sessions = n(0);
    const totals = {
      sessions,
      users: n(1),
      newUsers: n(2),
      engagedSessions: n(3),
      avgEngagementSec: sessions ? Math.round(n(4) / sessions) : 0,
    };

    const pagesRes = await data.properties.runReport({
      property,
      requestBody: {
        dateRanges,
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: "10",
      },
    });
    const topPages = (pagesRes.data.rows ?? []).map((r) => ({
      path: r.dimensionValues?.[0]?.value ?? "",
      sessions: Number(r.metricValues?.[0]?.value ?? 0),
    }));

    const chRes = await data.properties.runReport({
      property,
      requestBody: {
        dateRanges,
        dimensions: [{ name: "sessionDefaultChannelGroup" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: "8",
      },
    });
    const channels = (chRes.data.rows ?? []).map((r) => ({
      channel: r.dimensionValues?.[0]?.value ?? "",
      sessions: Number(r.metricValues?.[0]?.value ?? 0),
    }));

    return { configured: true, ok: true, totals, topPages, channels };
  } catch (e) {
    return { configured: true, ok: false, error: e instanceof Error ? e.message : "Erreur GA4" };
  }
}

export type GscSummary = {
  configured: boolean;
  ok: boolean;
  error?: string;
  totals?: { clicks: number; impressions: number; ctr: number; position: number };
  topQueries?: { query: string; clicks: number; impressions: number; position: number }[];
  topPages?: { page: string; clicks: number; impressions: number }[];
};

export async function getGscSummary(days = 28): Promise<GscSummary> {
  const auth = getAuth();
  if (!auth || !GSC_SITE_URL) return { configured: false, ok: false };
  try {
    const sc = google.searchconsole({ version: "v1", auth });
    // GSC a ~2-3 j de latence : on décale la fenêtre de 2 jours.
    const end = new Date();
    end.setDate(end.getDate() - 2);
    const start = new Date();
    start.setDate(start.getDate() - days - 2);
    const range = { startDate: ymd(start), endDate: ymd(end) };

    const totalsRes = await sc.searchanalytics.query({
      siteUrl: GSC_SITE_URL,
      requestBody: { ...range, dimensions: [] },
    });
    const t = totalsRes.data.rows?.[0];
    const totals = {
      clicks: t?.clicks ?? 0,
      impressions: t?.impressions ?? 0,
      ctr: t?.ctr ?? 0,
      position: t?.position ?? 0,
    };

    const qRes = await sc.searchanalytics.query({
      siteUrl: GSC_SITE_URL,
      requestBody: { ...range, dimensions: ["query"], rowLimit: 25 },
    });
    const topQueries = (qRes.data.rows ?? []).map((r) => ({
      query: r.keys?.[0] ?? "",
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      position: r.position ?? 0,
    }));

    const pRes = await sc.searchanalytics.query({
      siteUrl: GSC_SITE_URL,
      requestBody: { ...range, dimensions: ["page"], rowLimit: 25 },
    });
    const topPages = (pRes.data.rows ?? []).map((r) => ({
      page: r.keys?.[0] ?? "",
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
    }));

    return { configured: true, ok: true, totals, topQueries, topPages };
  } catch (e) {
    return { configured: true, ok: false, error: e instanceof Error ? e.message : "Erreur GSC" };
  }
}
