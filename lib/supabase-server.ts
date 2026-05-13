import { createClient } from "@supabase/supabase-js";

// Uses service role key — bypasses RLS. Only for server-side API routes.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
