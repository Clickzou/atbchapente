import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DASH_COOKIE, isValidDashCookie } from "@/lib/dashboard/auth";

// Protège /dashboard et /api/dashboard (sauf la route de login).
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/dashboard/login" || pathname === "/api/dashboard/login") {
    return NextResponse.next();
  }

  const ok = await isValidDashCookie(req.cookies.get(DASH_COOKIE)?.value);
  if (ok) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const url = req.nextUrl.clone();
  url.pathname = "/dashboard/login";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"],
};
