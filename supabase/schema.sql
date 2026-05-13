-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titre text NOT NULL,
  slug text UNIQUE NOT NULL,
  extrait text,
  corps text,
  categorie text CHECK (categorie IN ('IA clinique','Bibliographie','Bilans','Pratique libérale')),
  photo_url text,
  statut text DEFAULT 'brouillon' CHECK (statut IN ('publie','brouillon')),
  meta_titre text,
  meta_description text,
  date_publication timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Optional: enable Row Level Security (public read for published articles)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "published articles are public" ON articles
  FOR SELECT USING (statut = 'publie');

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
-- Settings are read/written only from server-side (service role key or anon for reads)
CREATE POLICY "settings are public read" ON settings
  FOR SELECT USING (true);
