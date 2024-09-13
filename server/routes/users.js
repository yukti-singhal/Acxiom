const express = require('express');
const router = express.Router();
const { getUsers, addUser, updateUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/', auth, getUsers);
router.post('/', auth, addUser);
router.put('/:id', auth, updateUser);

module.exports = router;