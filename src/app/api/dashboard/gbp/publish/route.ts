import { NextResponse } from "next/server";
import { createGbpPost } from "@/lib/dashboard/gbp";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: { summary?: string; ctaUrl?: string; ctaType?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  const summary = (body.summary ?? "").trim();
  if (summary.length < 20) {
    return NextResponse.json(
      { ok: false, error: "Le texte du post doit faire au moins 20 caractères." },
      { status: 400 }
    );
  }
  if (summary.length > 1500) {
    return NextResponse.json(
      { ok: false, error: "Le texte dépasse la limite (1500 caractères)." },
      { status: 400 }
    );
  }

  const result = await createGbpPost({
    summary,
    ctaUrl: body.ctaUrl?.trim() || undefined,
    ctaType: body.ctaType,
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
