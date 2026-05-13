import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });

  // List buckets to diagnose connection + bucket existence
  const { data: buckets, error: bucketsError } = await supabaseAdmin.storage.listBuckets();

  if (bucketsError) {
    return NextResponse.json(
      { error: `Connexion Supabase Storage échouée : ${bucketsError.message}. Vérifie que SUPABASE_SERVICE_ROLE_KEY est bien configurée dans Vercel.` },
      { status: 500 }
    );
  }

  const bucketNames = (buckets ?? []).map((b) => b.name);
  const targetBucket = bucketNames.find((n) => n.toLowerCase() === "images") ?? "images";

  if (!bucketNames.includes(targetBucket)) {
    return NextResponse.json(
      { error: `Bucket introuvable. Buckets existants : [${bucketNames.join(", ") || "aucun"}]. Crée un bucket nommé exactement "images" dans Supabase → Storage.` },
      { status: 500 }
    );
  }

  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const arrayBuffer = await file.arrayBuffer();

  const { data, error } = await supabaseAdmin.storage
    .from(targetBucket)
    .upload(filename, arrayBuffer, { contentType: file.type, upsert: false });

  if (error) {
    return NextResponse.json({ error: `Erreur upload : ${error.message}` }, { status: 500 });
  }

  const { data: urlData } = supabaseAdmin.storage.from(targetBucket).getPublicUrl(data.path);
  return NextResponse.json({ url: urlData.publicUrl });
}
