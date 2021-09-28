const express = require('express');
const auth = require('./auth.route');
const profile = require('./profile.route');
const trainer = require('./trainer.route');
const admin = require('./admin.route');
const authenticate = require('../middleware/auth.middleware')
const router = express.Router();

router.use('/auth', auth);
// router.use('/admin', admin);
router.use('/trainer', trainer);
router.use('/profile',  profile);


module.exports = router;