const express = require('express');
const router = express.Router();
const { getBook, addBook, updateBook } = require('../controllers/bookController');
const auth = require('../middleware/auth');

router.get('/', auth, getBook);
router.post('/', auth, addBook);
router.put('/:id', auth, updateBook);

module.exports = router;