const express = require('express');
const router = express.Router();
const profile = require('../controller/profile.controller');

router.get('/changePassword', profile.viewChangePassword);
router.patch('/changepassword', profile.changePassword);
router.patch('/trainee/update', profile.updateTrainee);
router.put('/update', profile.updateAll);
router.get('/viewUpdate', profile.viewUpdate);
router.get('/', profile.show);

module.exports = router;

