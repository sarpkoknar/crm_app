const express = require('express');
const cors = require('cors'); // Tarayıcıdan erişim izni için
require('dotenv').config();   // .env dosyasını okumak için

const app = express();

// 1. Middleware: CORS (Tarayıcı Güvenlik Kilidini Açar)
// Bu olmazsa Postman çalışır ama Chrome/React "Network Error" verir.
app.use(cors());

// 2. Middleware: JSON Verilerini Oku
app.use(express.json());

// 3. Route Tanımları
// NOT: Dosya yapına göre './routes' kullanıyorum.
// Eğer index.js dosyan 'src' içindeyse ve routes dışarıdaysa '../routes' yapman gerekebilir.
const userRoutes = require('../routes/userRoutes'); 
const authRoutes = require('../routes/auth');

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// 4. Basit Test Endpointi
app.get('/', (req, res) => {
  res.send('CRM Backend Çalışıyor - Triocare 2025 🚀');
});

// 5. Sunucuyu Başlat
// React genelde 3000 portunu kullanır. Çakışmaması için Backend'i 5000'e sabitliyoruz.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server ${PORT} portunda çalışıyor`);
});