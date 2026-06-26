CREATE TABLE IF NOT EXISTS creator_kits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL DEFAULT '',
  bio TEXT DEFAULT '',
  profile_image_url TEXT,
  theme_color VARCHAR(7) DEFAULT '#6366F1',
  base_currency VARCHAR(3) DEFAULT 'USD',
  metrics JSONB DEFAULT '[]'::jsonb,
  rate_cards JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  CONSTRAINT username_alphanumeric_check CHECK (username ~ '^[a-z0-9][a-z0-9_-]{1,48}[a-z0-9]$')
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_creator_kits_username ON creator_kits (username);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_creator_kits_updated_at ON creator_kits;

CREATE TRIGGER update_creator_kits_updated_at
  BEFORE UPDATE ON creator_kits
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
