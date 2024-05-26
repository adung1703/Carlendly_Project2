// routes/editNote.js
const express = require('express');
const router = express.Router();
const {editNote} = require('../controller/joinMeetingController');
const verify = require('../middlewares/authMiddleware');

router.post('/', verify, editNote);

module.exports = router;