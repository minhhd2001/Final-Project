const express = require('express');
const router = express.Router();
const trainer = require('../controller/trainer.controller');

router.get('/showalltrainees/:id', trainer.showTrainees);
router.get('/searchcourses', trainer.searchCourses);
router.get('/searchcourses/:idCategory', trainer.searchCoursesInCategory);
router.get('/searchtrainees/:id/', trainer.searchTrainees);
router.get('/:idCategory', trainer.showCoursesInCategory);
router.get('/', trainer.showCourses);

module.exports = router;