// controllers/signinController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        // console.log(user);
        if (!user) {
            return res.status(400).json({ success: false, message: 'Tài khoản không tồn tại' });
        }

        if (password !== user.password) {
            return res.status(400).json({ success: false, message: 'Mật khẩu không chính xác' });
        }

        // Tạo token JWT
        const token = jwt.sign({ 
                    id: user._id, 
                    username: user.username, 
                    fullname: user.fullname, 
                    email: user.email,
                    studentId: user.studentId,
                    phone: user.phone
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        // Gửi token trong phản hồi
        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi đăng nhập' });
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password'); // Loại bỏ mật khẩu

        if (!user) {
            return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi lấy thông tin người dùng' });
    }
};