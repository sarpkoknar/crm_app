// index.js
const express = require('express');   // Express framework'ünü projeye dahil ediyoruz
const app = express();                // Yeni bir Express uygulaması oluşturuyoruz

// Middleware: gelen JSON verilerini otomatik parse etsin
app.use(express.json());

// Kullanıcı route'unu dahil ediyoruz
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);    // /api/users/... adreslerini userRoutes yönetecek

// Basit test endpointi
app.get('/', (req, res) => {
  res.send('CRM Backend Çalışıyor 🚀');
});

// Sunucuyu başlatıyoruz
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
