// models/meeting.js
const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    hostUser: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number, // Duration in minutes
        required: true,
        default: 30
    },
    slotsId: {
        type: String // From availabilitySlots.id
    },
    note: {
        type: String
    }, 
    location: {
        type: String
    }
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
