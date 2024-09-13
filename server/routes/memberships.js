// server/routes/memberships.js
const express = require('express');
const router = express.Router();
const { getMemberships, addMembership, updateMembership } = require('../controllers/membershipController');
const auth = require('../middleware/auth');

router.get('/', auth, getMemberships);
router.post('/', auth, addMembership);
router.put('/:id', auth, updateMembership);

module.exports = router;