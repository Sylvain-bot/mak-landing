import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://monassistantkine.fr";

  const { data: articles } = await supabase
    .from("articles")
    .select("slug, date_publication, created_at")
    .eq("statut", "publie");

  const articleUrls: MetadataRoute.Sitemap = (articles ?? []).map((a) => ({
    url: `${site}/blog/${a.slug}`,
    lastModified: new Date(a.date_publication ?? a.created_at),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    { url: site, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${site}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    ...articleUrls,
  ];
}
