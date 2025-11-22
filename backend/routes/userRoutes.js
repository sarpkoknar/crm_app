const express = require('express');
const router = express.Router();
const userController = require('../src/controllers/userController');
const { authenticateToken, authorizeRole } = require('../src/middleware/authMiddleware');

// Tümünü Listele
router.get('/', authenticateToken, authorizeRole(['admin']), userController.getAllUsers);

// --- YENİ EKLENEN PARÇA (Tek Kullanıcı Getir) ---
router.get('/:id', authenticateToken, authorizeRole(['admin']), userController.getUserById);
// ------------------------------------------------

// Diğerleri aynı kalıyor
router.post('/', authenticateToken, authorizeRole(['admin']), userController.createUser);
router.put('/:id', authenticateToken, authorizeRole(['admin']), userController.updateUser);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), userController.deleteUser);

module.exports = router;