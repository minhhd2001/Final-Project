const express = require('express');
const router = express.Router();
const upload = require('../middleware/user.middleware');
const trainer = require('../controller/trainer.controller');

router.post('/updateprofile', upload.single('avatar') , trainer.update);
router.get('/', trainer.showCourse);
router.get('/showallstudents', trainer.showStudents);

module.exports = router;