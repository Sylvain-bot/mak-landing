import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });

  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const arrayBuffer = await file.arrayBuffer();

  const { data, error } = await supabaseAdmin.storage
    .from("images")
    .upload(filename, arrayBuffer, { contentType: file.type, upsert: false });

  if (error) {
    return NextResponse.json(
      { error: `Erreur upload : ${error.message}. Vérifie que le bucket "images" existe dans Supabase Storage et est en accès public.` },
      { status: 500 }
    );
  }

  const { data: urlData } = supabaseAdmin.storage.from("images").getPublicUrl(data.path);
  return NextResponse.json({ url: urlData.publicUrl });
}
