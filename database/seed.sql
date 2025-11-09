-- seed.sql

-- Örnek kullanıcılar
INSERT INTO users (ad, email, sifre_hash, rol)
VALUES
  ('Sarp Yılmaz', 'sarp@example.com', 'hashed_sifre_123', 'admin'),
  ('Ayşe Operatör', 'ayse@example.com', 'hashed_sifre_456', 'operasyon'),
  ('Kemal Görüntüleme', 'kemal@example.com', 'hashed_sifre_789', 'görüntüleme');

-- Örnek ürünler
INSERT INTO urunler (urun_id, urun_ad, tip, adet, aktif_mi)
VALUES
  (101, 'T-Shirt', 'standart', 1, TRUE),
  (102, 'Sticker Seti', 'standart', 1, TRUE);

-- Bundle ürün: Promo Kit (2 T-Shirt + 3 Sticker)
INSERT INTO urunler (urun_id, urun_ad, tip, adet, bundle_icerik, aktif_mi)
VALUES (
  201,
  'Promo Kit',
  'bundle',
  1,
  '[
    { "urun_id": 101, "adet": 2 },
    { "urun_id": 102, "adet": 3 }
  ]',
  TRUE
);

-- Örnek sipariş: 1 adet Promo Kit
INSERT INTO siparisler (
  siparis_no,
  kaynak,
  siparis_tarihi,
  ad_soyad,
  telefon,
  adres,
  urunler,
  toplam_tutar,
  odeme_turu,
  odenen_tutar,
  teslim_edildi,
  kullanici
)
VALUES (
  'ORD-0001',
  'HARICI',
  CURRENT_TIMESTAMP,
  'Ali Müşteri',
  '+90 532 000 0000',
  'İzmir, Türkiye',
  '[
    { "urun_id": 201, "adet": 1 }
  ]',
  250.00,
  'Kredi Kartı',
  250.00,
  'EVET',
  'sarp@example.com'
);