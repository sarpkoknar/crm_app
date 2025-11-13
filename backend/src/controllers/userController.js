// userController.js
const userService = require('../services/userService');

// Kullanıcı kaydı
async function register(req, res) {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user); // başarılıysa 201 Created
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Kullanıcı giriş
async function login(req, res) {
  try {
    const user = await userService.loginUser(req.body.email, req.body.password);
    if (!user) return res.status(401).json({ error: 'Geçersiz kimlik bilgileri' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { register, login };
