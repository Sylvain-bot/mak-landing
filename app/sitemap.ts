import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.monassistantkine.fr";

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
    { url: `${site}/bio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${site}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${site}/tarifs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${site}/equipe`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${site}/replay`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${site}/comparatif-outils-ia-kine`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${site}/fonctionnalites`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${site}/fonctionnalites/documentation-bilan-kine`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${site}/fonctionnalites/aide-decision-clinique`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${site}/fonctionnalites/suivi-patient`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${site}/fonctionnalites/gestion-administrative`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${site}/fonctionnalites/contrats-remplacement`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${site}/mentions-legales`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${site}/cgu`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${site}/politique-confidentialite`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...articleUrls,
  ];
}
