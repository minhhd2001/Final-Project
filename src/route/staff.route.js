const express = require('express');
const router = express.Router();
const staffController = require('../controller/staff.controller');

router.get('/viewCategory/create', staffController.create);
router.post('/viewCategory/store', staffController.store);
router.get('/viewCategory/search', staffController.search);
router.get('/viewCategory/:id/edit', staffController.edit);
router.put('/viewCategory/:id', staffController.update);
router.delete('/viewCategory/:id', staffController.destroy);
router.get('/viewCategory', staffController.show);
router.get('/', staffController.index);

module.exports = router;