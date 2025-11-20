const express = require('express');
const router = express.Router();

// Controller ve Middleware'leri doğru adreslerden çağırıyoruz
const userController = require('../src/controllers/userController');
const { authenticateToken, authorizeRole } = require('../src/middleware/authMiddleware');

// Rotalar
router.get('/', authenticateToken, authorizeRole(['admin']), userController.getAllUsers);
router.post('/', authenticateToken, authorizeRole(['admin']), userController.createUser);
router.put('/:id', authenticateToken, authorizeRole(['admin']), userController.updateUser);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), userController.deleteUser);

module.exports = router;