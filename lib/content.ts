import { supabase } from "./supabase";
import fallback from "../content.json";

export type SiteContent = typeof fallback;

export async function getContent(): Promise<SiteContent> {
  try {
    const { data, error } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "content")
      .single();

    if (error || !data) return fallback;
    return JSON.parse(data.value) as SiteContent;
  } catch {
    return fallback;
  }
}
