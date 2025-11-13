// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Kullanıcı kayıt endpointi
router.post('/register', userController.register);

// Kullanıcı giriş endpointi
router.post('/login', userController.login);

module.exports = router; // çok kritik! yoksa app.use hata verir
