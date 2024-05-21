// models/manager.js
const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    managerUser: {
        type: String,
        required: true,
        unique: true 
    },
    students: {
        type: Array
    }
});

const Manager = mongoose.model('manager', managerSchema);

module.exports = Manager;
