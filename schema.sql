-- ============================================================
-- Meureno Travel Guide — Supabase Schema
-- Schema: travel (terpisah dari schema public/berita)
-- ============================================================

-- 1. Buat schema travel
CREATE SCHEMA IF NOT EXISTS travel;

-- 2. Tabel utama: travel_places
CREATE TABLE IF NOT EXISTS travel.travel_places (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT        NOT NULL,
  description  TEXT        NOT NULL,
  location     TEXT        NOT NULL,
  category     TEXT        NOT NULL CHECK (category IN ('wisata','kuliner','penginapan','transportasi','aktivitas')),
  image        TEXT,
  rating       NUMERIC(3,1) CHECK (rating >= 0 AND rating <= 5),
  address      TEXT,
  phone        TEXT,
  website      TEXT,
  price_range  TEXT,
  tags         TEXT[],
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Index
CREATE INDEX IF NOT EXISTS idx_travel_places_location ON travel.travel_places (location);
CREATE INDEX IF NOT EXISTS idx_travel_places_category ON travel.travel_places (category);
CREATE INDEX IF NOT EXISTS idx_travel_places_rating   ON travel.travel_places (rating DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_travel_places_created  ON travel.travel_places (created_at DESC);

-- 4. Full-text search
CREATE INDEX IF NOT EXISTS idx_travel_places_fts ON travel.travel_places
  USING GIN (to_tsvector('indonesian', coalesce(title,'') || ' ' || coalesce(description,'')));

-- 5. Auto-update updated_at
CREATE OR REPLACE FUNCTION travel.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_travel_places_updated ON travel.travel_places;
CREATE TRIGGER trg_travel_places_updated
  BEFORE UPDATE ON travel.travel_places
  FOR EACH ROW EXECUTE FUNCTION travel.set_updated_at();

-- 6. Row Level Security
ALTER TABLE travel.travel_places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Publik dapat membaca semua tempat"
  ON travel.travel_places FOR SELECT
  USING (true);

CREATE POLICY "Hanya admin yang dapat menulis"
  ON travel.travel_places FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- DATA CONTOH
-- ============================================================

INSERT INTO travel.travel_places (title, description, location, category, image, rating, address, price_range, tags)
VALUES
(
  'Masjid Raya Baiturrahman',
  'Masjid ikonik peninggalan Kesultanan Aceh yang berdiri megah di jantung kota Banda Aceh. Dibangun sejak abad ke-17, masjid ini menjadi simbol ketahanan dan kebanggaan masyarakat Aceh.',
  'banda-aceh', 'wisata',
  'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800',
  4.9, 'Jl. Mohd. Jam No.1, Banda Aceh', 'Gratis',
  ARRAY['masjid','sejarah','ikon aceh','fotografi']
),
(
  'Pantai Iboih Sabang',
  'Salah satu surga bawah laut terbaik Asia Tenggara. Terumbu karang yang masih pristine, ikan beragam, dan air yang jernih menjadikan Iboih destinasi favorit para penyelam dan snorkeler.',
  'sabang', 'wisata',
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
  4.8, 'Iboih, Sukakarya, Sabang', 'Rp 50.000 – 300.000',
  ARRAY['pantai','diving','snorkeling','sabang','alam']
),
(
  'Sate Matang Bireuen',
  'Kuliner legendaris Aceh yang wajib dicoba. Sate sapi dengan bumbu kacang khas dan kuah soto yang kaya rempah. Disajikan panas langsung dari pembakaran arang.',
  'bireuen', 'kuliner',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
  4.7, 'Matangglumpangdua, Bireuen', 'Rp 20.000 – 50.000',
  ARRAY['kuliner','sate','bireuen','makanan khas']
),
(
  'Danau Laut Tawar',
  'Danau vulkanik nan tenang di ketinggian 1.200 mdpl. Dikelilingi kebun kopi Gayo dan hutan lebat, danau ini menawarkan pemandangan spektakuler dan udara pegunungan yang segar.',
  'takengon', 'wisata',
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
  4.7, 'Kecamatan Bebesen, Aceh Tengah', 'Rp 10.000 – 30.000',
  ARRAY['danau','gayo','alam','pegunungan','kopi']
),
(
  'Hutan Mangrove Kuala Langsa',
  'Kawasan hutan mangrove seluas 9.000 hektar — salah satu yang terluas di Asia. Nikmati wisata perahu, pengamatan burung, dan ekosistem bakau yang menakjubkan.',
  'langsa', 'wisata',
  'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800',
  4.6, 'Kuala Langsa, Aceh Timur', 'Rp 15.000 – 50.000',
  ARRAY['mangrove','ekowisata','alam','perahu']
),
(
  'Kepulauan Banyak Singkil',
  'Gugusan 99 pulau tropis yang hampir belum terjamah. Pasir putih halus, air sebening kaca, dan terumbu karang yang kaya — surga tersembunyi di selatan Aceh.',
  'singkil', 'wisata',
  'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800',
  4.9, 'Kepulauan Banyak, Aceh Singkil', 'Rp 200.000 – 500.000',
  ARRAY['pulau','snorkeling','diving','terpencil','alam']
);

-- ============================================================
-- VERIFIKASI — jalankan ini untuk cek hasilnya
-- ============================================================
-- SELECT * FROM travel.travel_places;
