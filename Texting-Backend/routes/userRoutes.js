const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
} = require('../controllers/userController');

// Public routes
router.post('/', createUser);

// Protected routes
router.use(authenticateToken);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/email/:email', getUserByEmail);

module.exports = router;
