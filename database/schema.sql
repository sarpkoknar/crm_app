-- schema.sql

-- Gerekli uzantılar
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ENUM tipleri
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'rol_tipi') THEN
    CREATE TYPE rol_tipi AS ENUM ('admin', 'operasyon', 'goruntuleme');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'urun_tipi') THEN
    CREATE TYPE urun_tipi AS ENUM ('standart', 'bundle');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'siparis_kaynak') THEN
    CREATE TYPE siparis_kaynak AS ENUM ('PROBED', 'LABORTECH', 'HARICI');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'odeme_tipi') THEN
    CREATE TYPE odeme_tipi AS ENUM ('Nakit', 'Kredi Karti', 'Havale');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'teslim_durumu') THEN
    CREATE TYPE teslim_durumu AS ENUM ('EVET', 'HAYIR');
  END IF;
END$$;

-- USERS tablosu
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ad TEXT NOT NULL CHECK (ad <> ''),
  email TEXT UNIQUE NOT NULL CHECK (email <> ''),
  sifre_hash TEXT NOT NULL CHECK (sifre_hash <> ''),
  rol rol_tipi NOT NULL,
  aktif_mi BOOLEAN DEFAULT TRUE,
  kayit_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  son_giris TIMESTAMP,
  reset_token TEXT,
  yetki_seviyesi INTEGER,
  notlar TEXT,
  profil_url TEXT
);

-- URUNLER tablosu
CREATE TABLE urunler (
  urun_id BIGINT PRIMARY KEY,
  urun_ad VARCHAR(255) NOT NULL CHECK (urun_ad <> ''),
  tip urun_tipi NOT NULL,
  adet INT NOT NULL,
  bundle_icerik JSON,
  gorsel_url VARCHAR(512),
  aktif_mi BOOLEAN DEFAULT TRUE
);

-- SIPARISLER tablosu
CREATE TABLE siparisler (
  id SERIAL PRIMARY KEY,
  siparis_no VARCHAR(50) NOT NULL CHECK (siparis_no <> ''),
  kaynak siparis_kaynak NOT NULL,
  siparis_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  guncellenme_tarihi TIMESTAMP,
  guncelleyen_kullanici VARCHAR(100),
  termin_tarihi DATE,
  kargoya_teslim_tarihi DATE,
  imalat_no SERIAL,
  ad_soyad VARCHAR(255) NOT NULL CHECK (ad_soyad <> ''),
  telefon VARCHAR(50) NOT NULL CHECK (telefon <> ''),
  adres TEXT,
  urunler JSON NOT NULL,
  toplam_tutar NUMERIC(15,2) NOT NULL,
  odeme_turu odeme_tipi NOT NULL,
  odenen_tutar NUMERIC(15,2) NOT NULL,
  kalan_tutar NUMERIC(15,2) GENERATED ALWAYS AS (toplam_tutar - odenen_tutar) STORED,
  teslim_edildi teslim_durumu DEFAULT 'HAYIR',
  kargo_takip_no VARCHAR(100),
  notlar TEXT,
  kullanici VARCHAR(100)
);