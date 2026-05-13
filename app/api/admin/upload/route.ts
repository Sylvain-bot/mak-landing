import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });

  // Use Vercel Blob if token is available
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { put } = await import("@vercel/blob");
      const blob = await put(`blog/${Date.now()}-${file.name}`, file, { access: "public" });
      return NextResponse.json({ url: blob.url });
    } catch (e) {
      return NextResponse.json({ error: `Erreur Blob : ${String(e)}` }, { status: 500 });
    }
  }

  // Fallback: use Supabase Storage if configured
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { supabaseAdmin } = await import("@/lib/supabase-server");
      const filename = `blog/${Date.now()}-${file.name}`;
      const arrayBuffer = await file.arrayBuffer();
      const { data, error } = await supabaseAdmin.storage
        .from("images")
        .upload(filename, arrayBuffer, { contentType: file.type, upsert: false });

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });

      const { data: urlData } = supabaseAdmin.storage.from("images").getPublicUrl(data.path);
      return NextResponse.json({ url: urlData.publicUrl });
    } catch (e) {
      return NextResponse.json({ error: `Erreur Supabase Storage : ${String(e)}` }, { status: 500 });
    }
  }

  return NextResponse.json(
    { error: "Aucun stockage configuré. Configure BLOB_READ_WRITE_TOKEN (Vercel Blob) ou un bucket Supabase Storage nommé 'images'." },
    { status: 503 }
  );
}
