import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // revalidate every 60s

export async function GET() {
  const { data } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "pioneer_spots")
    .single();

  const spots = data ? parseInt(data.value, 10) : 87;
  return NextResponse.json({ spots });
}
