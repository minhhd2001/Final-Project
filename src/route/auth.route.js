const express = require('express');
const router = express.Router();
const auth = require('../controller/auth.controller');

router.post('/login', auth.login);

router.post('/refreshtoken', auth.refreshToken);

router.delete('/logout', auth.logout);


module.exports = router;