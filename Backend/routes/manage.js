// routes/manage.js
const express = require('express');
const router = express.Router();
const manageController = require('../controller/manageStudentsController');

router.post('/', manageController.manageStudents);

module.exports = router;
