# Veritabanı Şeması Notları

Bu doküman, CRM sisteminin veritabanı yapısını, tablo alanlarını ve özel veri tiplerini açıklar. Tüm alanlar operasyonel ihtiyaçlara göre tanımlanmıştır. Boş string kontrolleri ve otomatik hesaplamalar dahil edilmiştir.

## Genel Bilgiler

- Veritabanı adı: `crm_db`
- Encoding: UTF-8
- Locale: `tr_TR.UTF-8`
- Uzantılar: `pgcrypto` (UUID üretimi için)

## ENUM Tipleri

| Ad | Değerler | Açıklama |
|----|----------|----------|
| `rol_tipi` | `admin`, `operasyon`, `goruntuleme` | Kullanıcı yetki seviyesi |
| `urun_tipi` | `standart`, `bundle` | Ürün tipi |
| `siparis_kaynak` | `PROBED`, `LABORTECH`, `HARICI` | Siparişin geldiği kaynak |
| `odeme_tipi` | `Nakit`, `Kredi Karti`, `Havale` | Ödeme yöntemi |
| `teslim_durumu` | `EVET`, `HAYIR` | Teslimat durumu |

## Tablolar

### `users` – Kullanıcılar

| Alan | Tip | Zorunlu | Açıklama |
|------|-----|---------|----------|
| `id` | UUID | ✅ | Otomatik üretilen birincil anahtar |
| `ad` | TEXT | ✅ | Boş olamaz (`CHECK (ad <> '')`) |
| `email` | TEXT | ✅ | Benzersiz ve boş olamaz (`UNIQUE`, `CHECK (email <> '')`) |
| `sifre_hash` | TEXT | ✅ | Boş olamaz (`CHECK (sifre_hash <> '')`) |
| `rol` | `rol_tipi` | ✅ | Yetki seviyesi |
| `aktif_mi` | BOOLEAN | ✅ | Varsayılan: `TRUE` |
| `kayit_tarihi` | TIMESTAMP | ❌ | Varsayılan: `CURRENT_TIMESTAMP` |
| `son_giris` | TIMESTAMP | ❌ | Girişte güncellenir |
| `reset_token` | TEXT | ❌ | Şifre sıfırlama için geçici |
| `yetki_seviyesi` | INTEGER | ❌ | Rol içi seviye ayrımı |
| `notlar` | TEXT | ❌ | Açıklama |
| `profil_url` | TEXT | ❌ | Opsiyonel görsel bağlantısı

---

### `urunler` – Ürünler

| Alan | Tip | Zorunlu | Açıklama |
|------|-----|---------|----------|
| `urun_id` | BIGINT | ✅ | Birincil anahtar |
| `urun_ad` | VARCHAR(255) | ✅ | Boş olamaz (`CHECK (urun_ad <> '')`) |
| `tip` | `urun_tipi` | ✅ | Standart veya bundle |
| `adet` | INT | ✅ | Varsayılan adet |
| `bundle_icerik` | JSON | ❌ | Sadece bundle ürünlerde kullanılır |
| `gorsel_url` | VARCHAR(512) | ❌ | Ürün görseli |
| `aktif_mi` | BOOLEAN | ✅ | Varsayılan: `TRUE`

**Bundle Mantığı:**
```json
[
  { "urun_id": 101, "adet": 2 },
  { "urun_id": 102, "adet": 3 }
]
