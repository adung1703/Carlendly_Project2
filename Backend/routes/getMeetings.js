// routes/getMeetings.js
const express = require('express');
const router = express.Router();
const { myMeeting } = require('../controller/joinMeetingController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, myMeeting);

module.exports = router;

