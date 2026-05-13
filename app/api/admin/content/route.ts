import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase-server";
import fallback from "@/content.json";

export async function GET() {
  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "content")
    .single();

  if (error || !data) return NextResponse.json(fallback);
  return NextResponse.json(JSON.parse(data.value));
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { error } = await supabase.from("settings").upsert({
    key: "content",
    value: JSON.stringify(body),
    updated_at: new Date().toISOString(),
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
