// models/manager.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    managerUser: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const Manager = mongoose.model('manager', userSchema);

module.exports = Manager;
