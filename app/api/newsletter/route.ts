import { NextRequest, NextResponse } from "next/server";

const BREVO_LIST_ID = 3;

export async function POST(req: NextRequest) {
  let email: string;
  try {
    const body = await req.json();
    email = (body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Corps invalide" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Configuration manquante" }, { status: 500 });
  }

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
    }),
  });

  if (res.ok || res.status === 204) {
    return NextResponse.json({ ok: true });
  }

  const data = await res.json().catch(() => ({}));
  // 400 avec code DUPLICATE_PARAMETER = déjà inscrit → on traite comme succès
  if (data?.code === "DUPLICATE_PARAMETER") {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Erreur Brevo" }, { status: 502 });
}
