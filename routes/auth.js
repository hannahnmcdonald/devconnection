const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route GET api/auth
// @desc: Test
// @access Public
router.get('/', auth, (req,res) => res.send('Auth Route'));

module.exports = router;