const User = require('../models/user');
const bcrypt = require('bcryptjs');

const userService = {
  getAllUsers: async () => {
    return await User.findAll();
  },

  // --- YENİ EKLENEN PARÇA ---
  getUserById: async (id) => {
    return await User.findByPk(id);
  },
  // --------------------------

  createUser: async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.sifre, 10);
    return await User.create({ ...userData, sifre_hash: hashedPassword });
  },

  updateUser: async (id, userData) => {
    if (userData.sifre) {
      userData.sifre_hash = await bcrypt.hash(userData.sifre, 10);
      delete userData.sifre;
    }
    return await User.update(userData, { where: { id } });
  },

  deleteUser: async (id) => {
    return await User.destroy({ where: { id } });
  },

  getUserByEmail: async (email) => {
    return await User.findOne({ where: { email } });
  }
};

module.exports = userService;