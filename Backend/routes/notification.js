// routes/notifications.js
const express = require('express');
const router = express.Router();
const {getNotification} = require('../controller/createSlotsController');
const verifyToken = require('../middlewares/authMiddleware'); // Assuming you have a middleware to verify JWT

router.get('/', verifyToken, getNotification);

module.exports = router;
