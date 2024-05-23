// routes/getStudents.js
const express = require('express');
const router = express.Router();
const { getStudents } = require('../controller/manageStudentsController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, getStudents);

module.exports = router;

