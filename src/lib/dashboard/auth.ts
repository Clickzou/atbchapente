// Auth simple du dashboard : un mot de passe (env DASHBOARD_PASSWORD) → un cookie
// contenant un jeton dérivé (SHA-256), vérifié par le middleware (edge) et les
// routes API. Web Crypto = compatible edge + Node 20+.

export const DASH_COOKIE = "atb_dash";
export const DASH_MAX_AGE = 60 * 60 * 24 * 30; // 30 jours

/** Jeton attendu = SHA-256(password + sel). null si DASHBOARD_PASSWORD absent. */
export async function dashboardToken(): Promise<string | null> {
  const pw = process.env.DASHBOARD_PASSWORD;
  if (!pw) return null;
  const data = new TextEncoder().encode(`${pw}:atb-dashboard-v1`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Vrai si la valeur de cookie correspond au jeton attendu. */
export async function isValidDashCookie(value: string | undefined): Promise<boolean> {
  if (!value) return false;
  const token = await dashboardToken();
  return !!token && value === token;
}
