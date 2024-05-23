// routes/joinMeeting.js
const express = require('express');
const router = express.Router();
const joinController = require('../controller/joinMeetingController');

router.post('/', joinController.joinMeeting);

module.exports = router;
