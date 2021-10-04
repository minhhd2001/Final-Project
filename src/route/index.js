const express = require('express');
const auth = require('./auth.route');
const profile = require('./profile.route');
const trainer = require('./trainer.route');
const admin = require('./admin.route');
const staff = require('./staff.route');
const authenticate = require('../middleware/auth.middleware')
const router = express.Router();

// router.use('/admin', admin);
router.use('/trainer', trainer);
<<<<<<< HEAD
router.use('/profile',  profile);
=======
router.use('/staff', staff);
router.use('/profile', authenticate.verifyUser,  profile);
>>>>>>> 5a53d46477621590e8dc6177368722e9ce71ce56
router.use('/staff',authenticate.verifyUser, authenticate.isStaff, staff);

router.get('/upload', (req, res, next) => {
    res.render('upload')
})
router.use('/', auth);
router.use('/:slug', (req, res, next) => {
    res.send('Not found page')
});

module.exports = router;