const express = require('express');
const auth = require('./auth.route');
const router = express.Router();

router.use('/auth', auth);

module.exports = router;