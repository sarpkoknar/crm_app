# CRM Sistemi Geliştirme Yol Haritası

## ✅ Tamamlananlar

- Veritabanı oluşturuldu (`init.sql`, UTF-8, Türkçe locale)
- Gerekli uzantılar eklendi (`pgcrypto`)
- ENUM tipleri tanımlandı (`rol_tipi`, `urun_tipi`, vb.)
- Tablolar oluşturuldu (`users`, `urunler`, `siparisler`)
- Bundle ürün mantığı tanımlandı (`urunler.bundle_icerik`)
- Otomatik kalan tutar hesaplama eklendi (`siparisler.kalan_tutar`)
- Örnek veri seti yüklendi (`seed.sql`)
- Klasör yapısı oluşturuldu (`crm_app`)
- Dokümantasyon dosyaları yapılandırıldı (`docs/`)

## 🔜 Sıradaki Adımlar

### Raporlama Modülü
- Sipariş özeti ekranı (tarih, kullanıcı, toplam tutar)
- Ürün bazlı satış raporu (standart vs bundle ayrımı)
- Kullanıcı performans raporu (sipariş sayısı, toplam satış)

### Bundle Çözümleme
- Bundle içeriğinin sipariş ekranında otomatik açılımı
- Raporlamada bundle içeriğinin ayrı ayrı listelenmesi

### Local-First Mimari
- Local DB varsayılan erişim
- Manuel sunucu senkronizasyon trigger’ları
- Test-first örneklerle veri akışı doğrulama

### Kullanıcı Arayüzü
- Giriş ekranı (email + şifre)
- Sipariş oluşturma formu (JSON ürün girişi)
- Sipariş listesi ve filtreleme
- Raporlama ekranı wireframe tasarımı

### Test ve Onboarding
- Test-first senaryolarla modül doğrulama
- Yeni kullanıcılar için örnek veri ve açıklamalı onboarding
- Dokümantasyon güncelleme ve referans bütünlüğü

## 🧪 Test Senaryoları

- [x] 1 adet bundle siparişi → çözümleme → toplam tutar kontrolü
- [x] Kısmi ödeme → kalan tutar hesaplama
- [ ] Teslimat durumu güncelleme → raporda görünürlük
- [ ] Raporlama ekranında bundle çözümleme → alt ürünlerin ayrı listelenmesi
- [ ] Local DB → sunucuya manuel veri gönderimi → veri tutarlılığı

## 📌 Notlar

- Her modül tamamlandığında `docs/usage_guide.md` ve `schema_notes.md` güncellenmeli
- Kod ve veri akışı test edilmeden production’a geçilmemeli
- Her alan için açıklama ve örnek veri sağlanmalı
- Bundle mantığı ve local-first mimari kritik bileşenlerdir

