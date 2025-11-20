const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userService = require('../src/services/userService'); 

// GİRİŞ YAP (LOGIN) - DEBUG MODU
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log(`\n--- GİRİŞ DENEMESİ: ${email} ---`);

  try {
    // 1. Kullanıcıyı Bul
    const user = await userService.getUserByEmail(email);
    
    if (!user) {
      console.log("❌ HATA: Kullanıcı veritabanında bulunamadı!");
      return res.status(400).json({ message: 'Kullanıcı bulunamadı' });
    }
    console.log("✅ Kullanıcı bulundu:", user.email);
    console.log("🔍 DB'deki Şifre Hash:", user.sifre_hash);

    // 2. Şifreyi Kontrol Et
    const validPassword = await bcrypt.compare(password, user.sifre_hash);
    
    if (!validPassword) {
      console.log("❌ HATA: Şifre eşleşmedi!");
      return res.status(400).json({ message: 'Şifre hatalı' });
    }
    console.log("✅ Şifre doğrulandı.");

    // 3. Token Oluştur
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        rol: user.rol 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log("✅ Token üretildi. Giriş Başarılı.\n");

    res.json({
      token,
      user: {
        id: user.id,
        ad: user.ad,
        email: user.email,
        rol: user.rol
      },
      role: user.rol
    });

  } catch (error) {
    console.error("🔥 KRİTİK HATA:", error);
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

module.exports = router;