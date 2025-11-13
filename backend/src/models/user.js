// user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // veritabanı bağlantısı

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
    allowNull: false
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
  timestamps: false // tabloya otomatik createdAt/updatedAt ekleme
});

module.exports = User;
