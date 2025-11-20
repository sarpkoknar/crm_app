// src/models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Veritabanı bağlantısı

// User tablosunu tanımlıyoruz
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // otomatik UUID üretir
    primaryKey: true
  },
  ad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true, // aynı email tekrar olamaz
    allowNull: false,
    validate: {
      isEmail: true // email format kontrolü
    }
  },
  sifre_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('admin', 'operasyon', 'goruntuleme'),
    allowNull: false
  },
  aktif_mi: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'users',
  timestamps: true, // createdAt ve updatedAt alanlarını otomatik ekler
  underscored: true // alan adlarını snake_case yapar (created_at, updated_at)
});

// Modeli dışa aktarıyoruz
module.exports = User;
