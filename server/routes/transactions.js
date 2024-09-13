const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, updateTransaction } = require('../controllers/transactionController');
const auth = require('../middleware/auth');

router.get('/', auth, getTransactions);
router.post('/', auth, addTransaction);
router.put('/:id', auth, updateTransaction);

module.exports = router;