const pool = require('./src/config/db'); // Mevcut bağlantımızı kullanıyoruz
const bcrypt = require('bcryptjs');

async function seedUsers() {
  try {
    console.log('🌱 Kullanıcı ekleme işlemi başladı...');

    // Herkesin şifresi '123456' olacak
    const passwordRaw = '123456';
    const hashedPassword = await bcrypt.hash(passwordRaw, 10);

    // Eklenecek Kullanıcı Listesi
    const users = [
      // 1. İkinci Admin (Yedek)
      { ad: 'Yedek Admin', email: 'admin2@test.com', rol: 'admin' },
      
      // 2. Operasyon Ekibi
      { ad: 'Ali Operasyon', email: 'yeliz@test.com', rol: 'operasyon' },
      { ad: 'Ayşe Operasyon', email: 'ilknur@test.com', rol: 'operasyon' },

      // 3. Görüntüleme Ekibi
      { ad: 'Mehmet İzleyici', email: 'sahan@test.com', rol: 'goruntuleme' },
      { ad: 'Zeynep İzleyici', email: 'onur@test.com', rol: 'goruntuleme' }
    ];

    for (const user of users) {
      // Önce var mı diye kontrol et (Çakışmayı önle)
      const check = await pool.query("SELECT * FROM users WHERE email = $1", [user.email]);
      
      if (check.rows.length > 0) {
        console.log(`⚠️  ATLANDI: ${user.email} zaten var.`);
      } else {
        // Yoksa ekle
        await pool.query(
          `INSERT INTO users (ad, email, sifre_hash, rol, aktif_mi)
           VALUES ($1, $2, $3, $4, $5)`,
          [user.ad, user.email, hashedPassword, user.rol, true]
        );
        console.log(`✅ EKLENDİ: ${user.ad} (${user.rol})`);
      }
    }

    console.log('\n🎉 İşlem tamamlandı! Herkesin şifresi: 123456');
    process.exit(); // İş bitince çık

  } catch (error) {
    console.error('❌ HATA OLUŞTU:', error);
    process.exit(1);
  }
}

seedUsers();