import { NextResponse } from "next/server";
import { getBrevoStats } from "@/lib/brevo";

export async function GET() {
  try {
    const stats = await getBrevoStats();
    return NextResponse.json(stats);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
