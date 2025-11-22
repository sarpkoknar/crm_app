const userService = require('../services/userService');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Hata', error: error.message });
    }
  },

  // --- YENİ EKLENEN PARÇA ---
  getUserById: async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
      }
      res.json(user);
    } catch (error) {
      console.error("Detay Getirme Hatası:", error);
      res.status(500).json({ message: 'Kullanıcı getirilemedi' });
    }
  },
  // --------------------------

  createUser: async (req, res) => {
    try {
      const newUser = await userService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Hata', error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Hata', error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await userService.deleteUser(req.params.id);
      res.json({ message: 'Silindi' });
    } catch (error) {
      res.status(500).json({ message: 'Hata', error: error.message });
    }
  }
};

module.exports = userController;