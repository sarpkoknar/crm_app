# Veritabanı Şeması Notları

Bu doküman, CRM sisteminin veritabanı yapısını, tablo alanlarını ve özel veri tiplerini açıklar. Tüm alanlar operasyonel ihtiyaçlara göre tanımlanmıştır ve bundle mantığı ile raporlama desteği içerir.

## Genel Bilgiler

- Veritabanı adı: `crm_db`
- Encoding: UTF-8
- Locale: `tr_TR.UTF-8`
- Uzantılar: `pgcrypto`

## ENUM Tipleri

| Ad | Değerler | Açıklama |
|----|----------|----------|
| rol_tipi | admin, operasyon, goruntuleme | Kullanıcı yetki seviyesi |
| urun_tipi | standart, bundle | Ürün tipi |
| siparis_kaynak | PROBED, LABORTECH, HARICI | Siparişin geldiği kaynak |
| odeme_tipi | Nakit, Kredi Karti, Havale | Ödeme yöntemi |
| teslim_durumu | EVET, HAYIR | Teslimat durumu |

## Tablolar

### users – Kullanıcılar

| Alan | Tip | Açıklama |
|------|-----|----------|
| id | UUID | Birincil anahtar |
| ad | TEXT | Kullanıcı adı |
| email | TEXT | E-posta (benzersiz) |
| sifre_hash | TEXT | Şifre hash’i |
| rol | rol_tipi | Yetki seviyesi |
| aktif_mi | BOOLEAN | Aktiflik durumu |
| kayit_tarihi | TIMESTAMP | Kayıt zamanı |
| son_giris | TIMESTAMP | Son giriş zamanı |
| reset_token | TEXT | Şifre sıfırlama token’ı |
| yetki_seviyesi | INTEGER | Opsiyonel seviye |
| notlar | TEXT | Açıklama |
| profil_url | TEXT | Profil görseli URL’si |

---

### urunler – Ürünler

| Alan | Tip | Açıklama |
|------|-----|----------|
| urun_id | BIGINT | Birincil anahtar |
| urun_ad | VARCHAR(255) | Ürün adı |
| tip | urun_tipi | Standart veya bundle |
| adet | INT | Varsayılan adet |
| bundle_icerik | JSON | Alt ürün listesi (sadece bundle) |
| gorsel_url | VARCHAR(512) | Ürün görseli |
| aktif_mi | BOOLEAN | Aktiflik durumu |

**Bundle Mantığı:**
- `tip = 'bundle'` olan ürünlerde `bundle_icerik` JSON formatındadır.
- Örnek:
```json
[
  { "urun_id": 101, "adet": 2 },
  { "urun_id": 102, "adet": 3 }
]
