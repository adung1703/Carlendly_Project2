// models/availabilitySlots.js
const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    dateTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number, // Duration in minutes
        required: true
    }
});


const userSlotsSchema = new mongoose.Schema({
    hostUser: {
        type: String,
        required: true
    },
    participant: {
        type: Array,
        default: []
    },
    currentTime: {
        type: Date,
        default: Date.now
    },
    slots: {
        type: [slotSchema],
        default: []
    }
});

const UserSlots = mongoose.model('availabilitySlots', userSlotsSchema);

module.exports = UserSlots;
