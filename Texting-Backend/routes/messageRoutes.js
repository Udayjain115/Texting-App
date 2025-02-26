const express = require('express');

const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

const {
  createMessage,
  getMessages,
} = require('../controllers/messageController');

router.use(authenticateToken);

router.get('/', getMessages);
router.post('/', createMessage);

module.exports = router;
