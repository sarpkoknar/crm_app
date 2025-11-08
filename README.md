## 📦 Proje Akışı

Bu CRM sistemi, sipariş yönetimi, bundle çözümleme, üretim planlama ve raporlama modüllerini kapsayan modüler bir mimariyle tasarlanmıştır.

### 1. Veritabanı Katmanı
- `database/schema.sql` ile tablo yapıları tanımlanır (`users`, `products`, `orders`, vb.).
- `products.bundle_content` alanı ile bundle ürünlerin alt bileşenleri JSON formatında tutulur.
- `orders.items` alanı ile sipariş kalemleri JSON olarak saklanır.

### 2. Backend Katmanı (`/backend`)
- Express.js ile RESTful API uçları tanımlanır.
- Klasör yapısı:
  - `models/` → ORM modelleri
  - `routes/` → API uçları
  - `controllers/` → İş mantığı
  - `services/` → Bundle çözümleme, raporlama, üretim hesaplama
  - `config/` → DB bağlantısı ve ortam ayarları

### 3. Bundle Çözümleme
- Siparişteki bundle ürünler `services/bundleResolver.js` içinde alt ürünlere ayrıştırılır.
- Her alt ürün için üretim miktarı hesaplanır.
- Çözümleme sonucu üretim ekranına aktarılır.

### 4. Raporlama Modülü
- Sipariş, üretim ve teslimat durumları filtrelenebilir.
- Kullanıcı rolüne göre erişim kontrolü uygulanır.
- Raporlar JSON veya tablo formatında sunulur.

### 5. Frontend Katmanı (`/frontend`)
- React.js ile kullanıcı arayüzü geliştirilir.
- Sipariş girişi, ürün listesi, raporlama ve kullanıcı yönetimi ekranları içerir.
- `components/` ve `pages/` klasörleri ile modüler yapı korunur.

### 6. Dokümantasyon (`/docs`)
- `api_endpoints.md` → Tüm API uçları ve örnek kullanımları
- `roadmap.md` → Geliştirme planı ve modül öncelikleri
- `schema_notes.md` → Veritabanı yapısı ve ilişkiler
- `usage_guide.md` → Kullanım senaryoları ve test adımları

### 7. Test ve Geliştirme
- `scripts/` klasöründe test ve veri üretim scriptleri yer alır.
- `tests/` klasörü eklenerek modül bazlı testler yazılır (önerilir).
- GitHub üzerinden sürüm kontrolü ve görev takibi yapılır.

