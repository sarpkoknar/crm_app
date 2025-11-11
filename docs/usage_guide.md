# Kullanım Kılavuzu

## Roller
- `admin`: Tüm işlemler
- `operasyon`: Sipariş girişi, güncelleme
- `goruntuleme`: Sadece görüntüleme

## Sipariş Girişi
1. Ürün listesi JSON formatında girilir.
2. `toplam_tutar`, `odeme_turu`, `odenen_tutar` girilir.
3. `kalan_tutar` otomatik hesaplanır.

## Bundle Ürünler
- `urunler.tip = 'bundle'` olan ürünlerde `bundle_icerik` alanı JSON’dur.
- Örnek: Promo Kit → 2 T-Shirt + 3 Sticker

## Teslimat ve Ödeme
- `teslim_edildi = 'EVET'` → sipariş tamamlandı
- `odenen_tutar < toplam_tutar` → sistem `kalan_tutar` hesaplar

## Kullanıcı Akışı
- Giriş → Sipariş oluştur → Ödeme → Teslimat → Raporlama

---