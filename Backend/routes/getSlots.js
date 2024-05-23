// routes/getSlots.js
const express = require('express');
const router = express.Router();
const {getAvailabilitySlots} = require('../controller/createSlotsController');

router.get('/', getAvailabilitySlots);

module.exports = router;