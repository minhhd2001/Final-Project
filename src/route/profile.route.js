const express = require('express');
const router = express.Router();
const profile = require('../controller/profile.controller');

router.patch('/changepassword', profile.changePassword);
router.get('/', profile.show);

module.exports = router;

