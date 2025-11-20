const userService = require('../services/userService');

const userController = {
  // 1. Listeleme
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Listeleme Hatası:", error);
      res.status(500).json({ message: 'Kullanıcılar getirilemedi', error: error.message });
    }
  },

  // 2. Ekleme
  createUser: async (req, res) => {
    try {
      const newUser = await userService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Ekleme Hatası:", error);
      res.status(500).json({ message: 'Kullanıcı oluşturulamadı', error: error.message });
    }
  },

  // 3. Güncelleme
  updateUser: async (req, res) => {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      console.error("Güncelleme Hatası:", error);
      res.status(500).json({ message: 'Güncelleme başarısız', error: error.message });
    }
  },

  // 4. Silme
  deleteUser: async (req, res) => {
    try {
      await userService.deleteUser(req.params.id);
      res.json({ message: 'Kullanıcı silindi' });
    } catch (error) {
      console.error("Silme Hatası:", error);
      res.status(500).json({ message: 'Silme başarısız', error: error.message });
    }
  }
};

module.exports = userController;