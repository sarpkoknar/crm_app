# 📦 CRM Proje Akışı

Bu CRM sistemi, sipariş yönetimi, bundle çözümleme, üretim planlama ve raporlama modüllerini kapsayan modüler bir mimariyle tasarlanmıştır.

## 1. Veritabanı Katmanı
- `database/schema.sql` ile tablo yapıları tanımlanır (`users`, `urunler`, `siparisler`).
- `urunler.bundle_icerik` alanı ile bundle ürünlerin alt bileşenleri JSON formatında tutulur.
- `siparisler.urunler` alanı ile sipariş kalemleri JSON olarak saklanır.
- `siparisler.kalan_tutar` alanı otomatik olarak hesaplanır (`toplam_tutar - odenen_tutar`).

## 2. Backend Katmanı (`/src`)
- Express.js ile RESTful API uçları tanımlanır.
- Klasör yapısı:
  - `models/` → ORM modelleri
  - `routes/` → API uçları
  - `controllers/` → İş mantığı
  - `services/` → Bundle çözümleme, raporlama, üretim hesaplama
  - `config/` → DB bağlantısı ve ortam ayarları

## 3. Bundle Çözümleme
- Siparişteki bundle ürünler `services/bundleResolver.js` içinde alt ürünlere ayrıştırılır.
- Her alt ürün için üretim miktarı hesaplanır.
- Çözümleme sonucu üretim ekranına aktarılır.

## 4. Raporlama Modülü
- Sipariş, üretim ve teslimat durumları filtrelenebilir.
- Kullanıcı rolüne göre erişim kontrolü uygulanır.
- Raporlar JSON veya tablo formatında sunulur.

## 5. Frontend Katmanı (`/frontend`)
- React.js ile kullanıcı arayüzü geliştirilir.
- Sipariş girişi, ürün listesi, raporlama ve kullanıcı yönetimi ekranları içerir.
- `components/` ve `pages/` klasörleri ile modüler yapı korunur.

## 6. Dokümantasyon (`/docs`)
- `api_endpoints.md` → Tüm API uçları ve örnek kullanımları
- `roadmap.md` → Geliştirme planı ve modül öncelikleri
- `schema_notes.md` → Veritabanı yapısı ve ilişkiler
- `usage_guide.md` → Kullanım senaryoları ve test adımları

## 7. Test ve Geliştirme
- `scripts/` klasöründe test ve veri üretim scriptleri yer alır.
- `tests/` klasörü eklenerek modül bazlı testler yazılır (önerilir).
- GitHub üzerinden sürüm kontrolü ve görev takibi yapılır.

## 8. Local-First Mimari
- Sistem varsayılan olarak local veritabanı ile çalışır.
- Sunucuya veri gönderimi manuel tetiklenir (raporlama, dış sistem entegrasyonu).
- Bu mimari, offline çalışma ve veri kontrolü sağlar.

## 9. Üretim Planlama (Bundle sonrası)
- Bundle çözümleme sonrası alt ürünler için üretim miktarları hesaplanır.
- Üretim ekranında ürün bazlı planlama yapılır.
- Siparişe bağlı üretim takibi desteklenir.
