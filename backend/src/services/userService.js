// userService.js
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Yeni kullanıcı kaydı
async function registerUser({ ad, email, password, rol }) {
  const sifre_hash = await bcrypt.hash(password, 10); // şifreyi hashle
  return await User.create({ ad, email, sifre_hash, rol });
}

// Kullanıcı giriş kontrolü
async function loginUser(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) return null;
  const match = await bcrypt.compare(password, user.sifre_hash);
  return match ? user : null;
}

module.exports = { registerUser, loginUser };
