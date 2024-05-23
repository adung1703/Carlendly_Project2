// controller/createSlotsController.js
const mySlots = require('../models/availabilitySlots');

exports.listSlots = async (req, res) => {
    try {
        const { hostUser, description, participant, slots, location } = req.body;
        const newUserSlots = new mySlots({
            hostUser,
            description,
            participant,
            slots,
            location
        });
        await newUserSlots.save();
        res.status(201).json({ message: 'User slots saved successfully!' });
    } catch (error) {
        console.error('Error saving user slots:', error);
        res.status(500).json({ message: 'Error saving user slots', error });
    }
};

exports.getNotification = async (req, res) => {
    try {
        const userSlots = await mySlots.find({ "participant": req.user.studentId }).sort({ currentTime: -1 }).exec();
        console.log(userSlots);
        const notifications = userSlots.map(slot => ({
            id: slot._id,
            hostUser: slot.hostUser,
            description: slot.description,
            currentTime: slot.currentTime,
            message: slot.hostUser
        }));
        res.json(notifications);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

exports.getAvailabilitySlots = async (req, res) => {
    try {
        const slotsID = req.query.id;
        console.log(slotsID);
        const AvailSlots = await mySlots.findOne({ "_id": slotsID }).exec();
        console.log(AvailSlots);
        res.json(AvailSlots);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};