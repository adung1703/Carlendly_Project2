// controller/createSlotsController.js
const mySlots = require('../models/availabilitySlots');

exports.listSlots = async (req, res) => {
    try {
        const { hostUser, participant, slots } = req.body;
        const newUserSlots = new mySlots({
            hostUser,
            participant,
            slots
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
//        console.log(req.user.studentId);
        const userSlots = await mySlots.find({ "participant": '20215545' }).sort({ currentTime: -1 }).exec();
        console.log(userSlots);
        const notifications = userSlots.map(slot => ({
            id: slot._id,
            hostUser: slot.hostUser,
            currentTime: slot.currentTime,
            message: `Bạn có cuộc họp từ ${slot.hostUser}`
        }));
        res.json(notifications);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

