import { NextResponse } from "next/server";
import { DASH_COOKIE, DASH_MAX_AGE, dashboardToken } from "@/lib/dashboard/auth";

// POST { password } → pose le cookie de session si le mot de passe est correct.
export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "Dashboard non configuré (DASHBOARD_PASSWORD manquant)." },
      { status: 503 },
    );
  }
  if (!password || password !== expected) {
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }
  const token = await dashboardToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(DASH_COOKIE, token!, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: DASH_MAX_AGE,
  });
  return res;
}

// DELETE → déconnexion.
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(DASH_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
