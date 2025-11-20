const { Pool } = require('pg');
require('dotenv').config();

// .env dosyasındaki bilgileri kullanarak ayarları yapıyoruz
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Bağlantı hatası olursa konsola bas (Server çökmesin)
pool.on('error', (err) => {
  console.error('Beklenmedik veritabanı hatası:', err);
  process.exit(-1);
});

// Pool nesnesini doğrudan dışarı aktarıyoruz
module.exports = pool;