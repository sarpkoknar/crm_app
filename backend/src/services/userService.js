// Service katmanı: İş mantığını burası yönetir
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const userService = {
  // Tüm kullanıcıları getir
  getAllUsers: async () => {
    // User modelindeki SQL fonksiyonunu çağırır
    return await User.findAll();
  },

  // Yeni kullanıcı oluştur
  createUser: async (userData) => {
    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(userData.sifre, 10);
    
    // Hashlenmiş şifre ile kaydet
    return await User.create({
      ...userData,
      sifre_hash: hashedPassword
    });
  },

  // Kullanıcı güncelle
  updateUser: async (id, userData) => {
    // Eğer şifre değişiyorsa onu da hashle
    if (userData.sifre) {
      userData.sifre_hash = await bcrypt.hash(userData.sifre, 10);
      delete userData.sifre; // Ham şifreyi veritabanına gönderme
    }
    
    // Güncelleme (id'yi where şartı olarak gönderiyoruz)
    return await User.update(userData, { where: { id } });
  },

  // Kullanıcı sil
  deleteUser: async (id) => {
    return await User.destroy({ where: { id } });
  },

  // Login için kullanıcı bul
  getUserByEmail: async (email) => {
    return await User.findOne({ where: { email } });
  }
};

module.exports = userService;