// routes/createSlots.js
const express = require('express');
const router = express.Router();
const { listSlots } = require('../controller/createSlotsController');

router.post('/', listSlots);

module.exports = router;
