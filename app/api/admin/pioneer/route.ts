import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase-server";

export async function GET() {
  const { data } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "pioneer_spots")
    .single();

  return NextResponse.json({ spots: data ? parseInt(data.value, 10) : 87 });
}

export async function POST(req: NextRequest) {
  const { spots } = await req.json();
  if (typeof spots !== "number" || spots < 0 || spots > 100) {
    return NextResponse.json({ error: "Valeur invalide (0–100)" }, { status: 400 });
  }

  const { error } = await supabase.from("settings").upsert({
    key: "pioneer_spots",
    value: String(spots),
    updated_at: new Date().toISOString(),
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, spots });
}
