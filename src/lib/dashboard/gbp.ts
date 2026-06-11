// Google Business Profile (fiche ATB Charpente) — lecture + publication.
//
// Auth : OAuth « utilisateur » via refresh token (compte jayc.events qui gère la
// fiche), client OAuth hébergé dans le projet GCP de clickzou (570833313450), le
// seul approuvé par Google pour l'API Business Profile. Aucun Supabase : tout est
// lu en direct depuis l'API, les identifiants viennent des variables d'env Vercel.
//
// Env : GBP_CLIENT_ID, GBP_CLIENT_SECRET, GBP_REFRESH_TOKEN, GBP_ACCOUNT_ID,
//       GBP_LOCATION_ID. Sans config → configured:false (page « non connecté »).

const CLIENT_ID = process.env.GBP_CLIENT_ID;
const CLIENT_SECRET = process.env.GBP_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GBP_REFRESH_TOKEN;
const ACCOUNT_ID = process.env.GBP_ACCOUNT_ID; // ex. "114116875613669038335"
const LOCATION_ID = process.env.GBP_LOCATION_ID; // ex. "2419270597198015157"

const API_INFO = "https://mybusinessbusinessinformation.googleapis.com/v1";
const API_V4 = "https://mybusiness.googleapis.com/v4";
const API_PERF = "https://businessprofileperformance.googleapis.com/v1";

export function gbpConfigured(): boolean {
  return Boolean(CLIENT_ID && CLIENT_SECRET && REFRESH_TOKEN && ACCOUNT_ID && LOCATION_ID);
}

async function getAccessToken(): Promise<string | null> {
  if (!gbpConfigured()) return null;
  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID!,
        client_secret: CLIENT_SECRET!,
        refresh_token: REFRESH_TOKEN!,
        grant_type: "refresh_token",
      }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()).access_token ?? null;
  } catch {
    return null;
  }
}

async function apiGet(token: string, url: string): Promise<any | null> {
  try {
    const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

// ── Profil de la fiche ──

export type GbpProfile = {
  configured: boolean;
  connected: boolean;
  title?: string;
  category?: string;
  phone?: string;
  website?: string;
  city?: string;
  mapsUrl?: string;
  avgRating?: number;
  totalReviews?: number;
};

export async function getGbpProfile(): Promise<GbpProfile> {
  if (!gbpConfigured()) return { configured: false, connected: false };
  const token = await getAccessToken();
  if (!token) return { configured: true, connected: false };

  const loc = await apiGet(
    token,
    `${API_INFO}/locations/${LOCATION_ID}?readMask=name,title,storefrontAddress,phoneNumbers,categories,websiteUri,metadata`
  );
  if (!loc) return { configured: true, connected: false };

  const reviews = await getGbpReviews();

  return {
    configured: true,
    connected: true,
    title: loc.title,
    category: loc.categories?.primaryCategory?.displayName,
    phone: loc.phoneNumbers?.primaryPhone,
    website: loc.websiteUri,
    city: loc.storefrontAddress?.locality,
    mapsUrl: loc.metadata?.mapsUri,
    avgRating: reviews.avgRating,
    totalReviews: reviews.total,
  };
}

// ── Avis ──

export type GbpReview = {
  reviewer: string;
  rating: number;
  comment?: string;
  date?: string;
  reply?: string;
};
export type GbpReviews = { total: number; avgRating?: number; reviews: GbpReview[] };

const STAR: Record<string, number> = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

export async function getGbpReviews(): Promise<GbpReviews> {
  if (!gbpConfigured()) return { total: 0, reviews: [] };
  const token = await getAccessToken();
  if (!token) return { total: 0, reviews: [] };

  const data = await apiGet(
    token,
    `${API_V4}/accounts/${ACCOUNT_ID}/locations/${LOCATION_ID}/reviews`
  );
  if (!data) return { total: 0, reviews: [] };

  const reviews: GbpReview[] = (data.reviews ?? []).map((r: any) => ({
    reviewer: r.reviewer?.displayName ?? "Anonyme",
    rating: STAR[r.starRating] ?? 0,
    comment: r.comment,
    date: r.createTime,
    reply: r.reviewReply?.comment,
  }));

  return {
    total: data.totalReviewCount ?? reviews.length,
    avgRating: typeof data.averageRating === "number" ? data.averageRating : undefined,
    reviews,
  };
}

// ── Performance (30 derniers jours) ──

export type GbpPerformance = {
  searchViews: number;
  mapsViews: number;
  websiteClicks: number;
  calls: number;
  directions: number;
};

async function sumMetric(token: string, metric: string, start: Date, end: Date): Promise<number> {
  const url =
    `${API_PERF}/locations/${LOCATION_ID}:getDailyMetricsTimeSeries?dailyMetric=${metric}` +
    `&dailyRange.startDate.year=${start.getFullYear()}&dailyRange.startDate.month=${start.getMonth() + 1}&dailyRange.startDate.day=${start.getDate()}` +
    `&dailyRange.endDate.year=${end.getFullYear()}&dailyRange.endDate.month=${end.getMonth() + 1}&dailyRange.endDate.day=${end.getDate()}`;
  const data = await apiGet(token, url);
  const values = data?.timeSeries?.datedValues ?? [];
  return values.reduce((acc: number, v: any) => acc + Number(v.value ?? 0), 0);
}

export async function getGbpPerformance(days = 30): Promise<GbpPerformance | null> {
  if (!gbpConfigured()) return null;
  const token = await getAccessToken();
  if (!token) return null;

  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);

  const [
    searchDesktop, searchMobile, mapsDesktop, mapsMobile, websiteClicks, calls, directions,
  ] = await Promise.all([
    sumMetric(token, "BUSINESS_IMPRESSIONS_DESKTOP_SEARCH", start, end),
    sumMetric(token, "BUSINESS_IMPRESSIONS_MOBILE_SEARCH", start, end),
    sumMetric(token, "BUSINESS_IMPRESSIONS_DESKTOP_MAPS", start, end),
    sumMetric(token, "BUSINESS_IMPRESSIONS_MOBILE_MAPS", start, end),
    sumMetric(token, "WEBSITE_CLICKS", start, end),
    sumMetric(token, "CALL_CLICKS", start, end),
    sumMetric(token, "BUSINESS_DIRECTION_REQUESTS", start, end),
  ]);

  return {
    searchViews: searchDesktop + searchMobile,
    mapsViews: mapsDesktop + mapsMobile,
    websiteClicks,
    calls,
    directions,
  };
}

// ── Posts ──

export type GbpPost = {
  name: string;
  summary: string;
  state?: string;
  createTime?: string;
  imageUrl?: string;
  searchUrl?: string;
};

export async function getGbpPosts(): Promise<GbpPost[]> {
  if (!gbpConfigured()) return [];
  const token = await getAccessToken();
  if (!token) return [];
  const data = await apiGet(
    token,
    `${API_V4}/accounts/${ACCOUNT_ID}/locations/${LOCATION_ID}/localPosts`
  );
  return (data?.localPosts ?? []).map((p: any) => ({
    name: p.name,
    summary: p.summary ?? "",
    state: p.state,
    createTime: p.createTime,
    imageUrl: p.media?.[0]?.googleUrl ?? p.media?.[0]?.sourceUrl,
    searchUrl: p.searchUrl,
  }));
}

// ── Publication d'un post ──

export type CreatePostResult = { ok: boolean; error?: string; name?: string };

export async function createGbpPost(opts: {
  summary: string;
  ctaUrl?: string;
  ctaType?: string; // LEARN_MORE | CALL | BOOK | ORDER | SHOP | SIGN_UP
  imageUrl?: string;
}): Promise<CreatePostResult> {
  if (!gbpConfigured()) return { ok: false, error: "GBP non configuré." };
  const token = await getAccessToken();
  if (!token) return { ok: false, error: "Token GBP invalide/expiré." };

  const body: any = {
    languageCode: "fr",
    summary: opts.summary,
    topicType: "STANDARD",
  };
  if (opts.ctaUrl) {
    body.callToAction = { actionType: opts.ctaType ?? "LEARN_MORE", url: opts.ctaUrl };
  }
  if (opts.imageUrl) {
    body.media = [{ mediaFormat: "PHOTO", sourceUrl: opts.imageUrl }];
  }

  try {
    const res = await fetch(
      `${API_V4}/accounts/${ACCOUNT_ID}/locations/${LOCATION_ID}/localPosts`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    );
    const text = await res.text();
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}: ${text.slice(0, 200)}` };
    const data = JSON.parse(text);
    return { ok: true, name: data.name };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Erreur réseau" };
  }
}
