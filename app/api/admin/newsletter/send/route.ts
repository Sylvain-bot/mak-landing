import { NextRequest, NextResponse } from "next/server";
import { sendBrevoEmail } from "@/lib/brevo";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const result = await sendBrevoEmail(body);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
