// routes/getUser.js
const express = require('express');
const router = express.Router();
const { getUserInfo } = require('../controller/signinController');
const auth = require('../middlewares/authMiddleware');

router.get('/me', auth, getUserInfo);

module.exports = router;

