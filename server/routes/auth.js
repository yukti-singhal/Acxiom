const express = require('express');
const router = express.Router();
const { getAuth, addAuth, updateAuth } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.get('/', auth, getAuth);
router.post('/', auth, addAuth);
router.put('/:id', auth, updateAuth);

module.exports = router;