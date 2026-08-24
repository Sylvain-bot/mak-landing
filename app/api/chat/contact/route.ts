import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let name: string, email: string, message: string;
  try {
    const body = await req.json();
    name = (body.name ?? "").trim();
    email = (body.email ?? "").trim().toLowerCase();
    message = (body.message ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Corps invalide" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({ error: "Configuration manquante" }, { status: 500 });
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Mon Assistant Kiné — Chatbot", email: "no-reply@monassistantkine.fr" },
      to: [{ email: "sylvain@monassistantkine.fr", name: "Sylvain" }],
      subject: `🔔 Nouveau prospect — ${name || email}`,
      htmlContent: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto">
          <h2 style="color:#0f172a">Nouveau prospect via le chatbot</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#64748b;font-size:14px">Prénom / Nom</td><td style="padding:8px 0;font-weight:600">${name || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b;font-size:14px">Email</td><td style="padding:8px 0;font-weight:600"><a href="mailto:${email}">${email}</a></td></tr>
            ${message ? `<tr><td style="padding:8px 0;color:#64748b;font-size:14px;vertical-align:top">Message</td><td style="padding:8px 0">${message}</td></tr>` : ""}
          </table>
          <p style="margin-top:24px;font-size:13px;color:#94a3b8">
            Ce prospect a utilisé le chatbot sur monassistantkine.fr et a demandé à être recontacté.
          </p>
        </div>
      `,
    }),
  });

  if (res.ok || res.status === 201) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Erreur envoi email" }, { status: 502 });
}
