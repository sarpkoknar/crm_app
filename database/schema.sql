-- schema.sql

-- Gerekli uzantılar
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ENUM tipleri
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'rol_tipi') THEN
    CREATE TYPE rol_tipi AS ENUM ('admin', 'operasyon', 'görüntüleme');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'urun_tipi') THEN
    CREATE TYPE urun_tipi AS ENUM ('standart', 'bundle');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'siparis_kaynak') THEN
    CREATE TYPE siparis_kaynak AS ENUM ('PROBED', 'LABORTECH', 'HARICI');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'odeme_tipi') THEN
    CREATE TYPE odeme_tipi AS ENUM ('Nakit', 'Kredi Kartı', 'Havale');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'teslim_durumu') THEN
    CREATE TYPE teslim_durumu AS ENUM ('EVET', 'HAYIR');
  END IF;
END$$;

-- Kullanıcılar tablosu
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ad TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  sifre_hash TEXT NOT NULL,
  rol rol_tipi NOT NULL,
  aktif_mi BOOLEAN DEFAULT TRUE,
  kayit_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  son_giris TIMESTAMP,
  reset_token TEXT,
  yetki_seviyesi INTEGER,
  notlar TEXT,
  profil_url TEXT
);

-- Ürünler tablosu
CREATE TABLE urunler (
  urun_id BIGINT PRIMARY KEY,
  urun_ad VARCHAR(255) NOT NULL,
  tip urun_tipi NOT NULL DEFAULT 'standart',
  adet INT DEFAULT 1,
  bundle_icerik JSON DEFAULT NULL,
  gorsel_url VARCHAR(512) DEFAULT NULL,
  aktif_mi BOOLEAN DEFAULT TRUE
);

-- Siparişler tablosu
CREATE TABLE siparisler (
  id SERIAL PRIMARY KEY,
  siparis_no VARCHAR(50) NOT NULL UNIQUE,
  kaynak siparis_kaynak DEFAULT 'HARICI',
  siparis_tarihi TIMESTAMP NOT NULL,
  guncellenme_tarihi TIMESTAMP,
  guncelleyen_kullanici VARCHAR(100),
  termin_tarihi DATE,
  kargoya_teslim_tarihi DATE,
  imalat_no SERIAL,
  ad_soyad VARCHAR(255) NOT NULL,
  telefon VARCHAR(50),
  adres TEXT,
  urunler JSON NOT NULL,
  toplam_tutar NUMERIC(15,2) NOT NULL,
  odeme_turu odeme_tipi,
  odenen_tutar NUMERIC(15,2) DEFAULT 0,
  kalan_tutar NUMERIC(15,2) GENERATED ALWAYS AS (toplam_tutar - odenen_tutar) STORED,
  teslim_edildi teslim_durumu DEFAULT 'HAYIR',
  kargo_takip_no VARCHAR(100),
  notlar TEXT,
  kullanici VARCHAR(100)
);