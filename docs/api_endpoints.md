# API Uç Noktaları

Bu doküman, CRM sisteminin API uç noktalarını tanımlar. Her endpoint için HTTP metodları, açıklamalar, örnek istek ve yanıt yapıları belirtilmiştir. Tüm uç noktalar JWT tabanlı kimlik doğrulama gerektirir.

## Kullanıcı İşlemleri

### POST /api/login
Kullanıcı girişi yapar ve JWT token döner.

**Girdi:**
{
  "email": "sarp@example.com",
  "sifre": "gizli_sifre"
}

**Çıktı:**
{
  "token": "JWT_token",
  "rol": "admin"
}

## Ürün İşlemleri

### GET /api/urunler
Tüm aktif ürünleri listeler. Bundle ürünler `bundle_icerik` alanıyla birlikte gelir.

**Çıktı:**
[
  {
    "urun_id": 101,
    "urun_ad": "T-Shirt",
    "tip": "standart",
    "adet": 1,
    "aktif_mi": true
  },
  {
    "urun_id": 201,
    "urun_ad": "Promo Kit",
    "tip": "bundle",
    "adet": 1,
    "bundle_icerik": [
      { "urun_id": 101, "adet": 2 },
      { "urun_id": 102, "adet": 3 }
    ],
    "aktif_mi": true
  }
]

## Sipariş İşlemleri

### POST /api/siparis
Yeni sipariş oluşturur. `kalan_tutar` otomatik hesaplanır.

**Girdi:**
{
  "siparis_no": "ORD-0002",
  "ad_soyad": "Zeynep Müşteri",
  "telefon": "+90 555 123 4567",
  "adres": "Ankara, Türkiye",
  "urunler": [
    { "urun_id": 201, "adet": 1 }
  ],
  "toplam_tutar": 250.00,
  "odeme_turu": "Kredi Karti",
  "odenen_tutar": 150.00,
  "kullanici": "ayse@example.com"
}

**Çıktı:**
{
  "id": 2,
  "kalan_tutar": 100.00,
  "teslim_edildi": "HAYIR"
}

### GET /api/siparis/:id
Belirli bir siparişi getirir.

**Çıktı:**
{
  "siparis_no": "ORD-0001",
  "ad_soyad": "Ali Müşteri",
  "urunler": [
    { "urun_id": 201, "adet": 1 }
  ],
  "toplam_tutar": 250.00,
  "odenen_tutar": 250.00,
  "kalan_tutar": 0.00,
  "teslim_edildi": "EVET"
}

## Raporlama (Planlanan)

### GET /api/rapor/satis
Tarih aralığına göre satış raporu döner.

**Parametreler:**
?baslangic=2025-11-01&bitis=2025-11-10

**Çıktı:**
{
  "toplam_siparis": 12,
  "toplam_tutar": 3250.00,
  "bundle_orani": "42%"
}

## Test Notları

- Tüm endpointler JWT doğrulaması gerektirir.
- `urunler` alanı JSON formatında girilir.
- `kalan_tutar` alanı sistem tarafından hesaplanır.
- `teslim_edildi` sadece `"EVET"` veya `"HAYIR"` olabilir.
- Bundle ürünler `urunler` içinde `urun_id` ve `adet` ile girilir, sistem çözümlemeyi backend'de yapar.
