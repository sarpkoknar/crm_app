// src/config/db.js
const { Sequelize } = require('sequelize');

// PostgreSQL bağlantısı
const sequelize = new Sequelize('crm_db', 'postgres', '22001010', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // SQL loglarını kapatır
});

// Bağlantıyı test et
sequelize.authenticate()
  .then(() => console.log('✅ Veritabanına başarıyla bağlandı'))
  .catch(err => console.error('❌ Veritabanı bağlantı hatası:', err));

// --- Fonksiyonlar ---
async function getUserByEmail(email) {
  const [rows] = await sequelize.query(
    'SELECT id, ad, email, sifre_hash, rol FROM users WHERE email = :email LIMIT 1',
    { replacements: { email } }
  );
  return rows[0] || null;
}

module.exports = { sequelize, getUserByEmail };
