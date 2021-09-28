const express = require('express');
const auth = require('./auth.route');
const profile = require('./profile.route');
const trainer = require('./trainer.route');
const authenticate = require('../middleware/auth.middleware')
const router = express.Router();

router.use('/auth', auth);
router.use('/test',authenticate.verifyToken, authenticate.idAdmin, function(req, res){
    res.send('Hello world !')
});
// router.use('/admin',authenticate.verifyToken, authenticate.idAdmin, admin)
router.use('/trainer', trainer);
router.use('/profile',  profile);
router.use('/upload', (req, res) => {
    res.render('upload')
});

module.exports = router;