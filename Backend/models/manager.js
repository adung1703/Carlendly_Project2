// models/manager.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    managerUser: {
        type: String,
        required: true,
        unique: true 
    },
    students: {
        type: Array
    }
});

const Manager = mongoose.model('manager', userSchema);

module.exports = Manager;
