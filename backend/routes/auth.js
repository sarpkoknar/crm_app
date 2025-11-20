const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// db.js src/config altında olduğu için path böyle
const { getUserByEmail } = require('../src/config/db');

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Basit input doğrulama
  if (!email || !password) {
    return res.status(400).json({ message: 'Email ve şifre zorunlu' });
  }

  try {
    // Kullanıcıyı DB’den çek
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Kullanıcı bulunamadı' });
    }

    // Şifre kontrolü
    const ok = await bcrypt.compare(password, user.sifre_hash);
    if (!ok) {
      return res.status(401).json({ message: 'Şifre hatalı' });
    }

    // Token üret
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.rol },
      process.env.JWT_SECRET || 'supersecret',
      { expiresIn: '1h' }
    );

    // Başarılı yanıt
    return res.json({
      token,
      role: user.rol,
      user: { id: user.id, ad: user.ad, email: user.email }
    });
  } catch (err) {
    console.error('❌ Auth error:', err);
    return res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
