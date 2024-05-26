// controller/joinMeetingController.js
const meeting = require('../models/meeting');

exports.joinMeeting = async (req, res) => {
    try {
        const { hostUser, studentId, startTime, duration, slotsId, note, location } = req.body;
        const Meeting = new meeting({
            hostUser, studentId, startTime, duration, slotsId, note, location
        });
        await Meeting.save();
        res.status(201).json({ message: 'Cuộc hẹn đã được tạo, hãy kiểm tra trong "My scheduled events"' });
    } catch (error) {
        console.error('Lỗi khi thêm cuộc hẹn:', error);
        res.status(500).json({ message: 'Lỗi khi thêm cuộc hẹn', error });
    }
};


// Hàm để tính thời gian kết thúc dựa trên startTime và duration
function getEndTime(meeting) {
    return new Date(new Date(meeting.startTime).getTime() + meeting.duration * 60000);
}

exports.myMeeting = async (req, res) => {
    try {
        const now = new Date();

        const upcomingHostMeetings = await meeting.find({
            hostUser: req.user.username,
            startTime: { $gte: now }
        }).sort({ startTime: 1 }).exec();

        const happeningHostMeetings = await meeting.find({
            hostUser: req.user.username,
            startTime: { $lte: now },
            $expr: {
                $gte: [
                    { $add: ["$startTime", { $multiply: ["$duration", 60000] }] },
                    now
                ]
            }
        }).sort({ startTime: 1 }).exec();

        const pastHostMeetings = await meeting.find({
            hostUser: req.user.username,
            $expr: {
                $lt: [
                    { $add: ["$startTime", { $multiply: ["$duration", 60000] }] },
                    now
                ]
            }
        }).sort({ startTime: -1 }).exec();

        const upcomingParticipationMeetings = await meeting.find({
            studentId: req.user.studentId,
            startTime: { $gte: now }
        }).sort({ startTime: 1 }).exec();

        const happeningParticipationMeetings = await meeting.find({
            studentId: req.user.studentId,
            startTime: { $lte: now },
            $expr: {
                $gte: [
                    { $add: ["$startTime", { $multiply: ["$duration", 60000] }] },
                    now
                ]
            }
        }).sort({ startTime: 1 }).exec();

        const pastParticipationMeetings = await meeting.find({
            studentId: req.user.studentId,
            $expr: {
                $lt: [
                    { $add: ["$startTime", { $multiply: ["$duration", 60000] }] },
                    now
                ]
            }
        }).sort({ startTime: -1 }).exec();

        const Meetings = {
            upcomingHostMeetings,
            happeningHostMeetings,
            pastHostMeetings,
            upcomingParticipationMeetings,
            happeningParticipationMeetings,
            pastParticipationMeetings
        };

        res.json(Meetings);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

exports.editNote = async (req, res) => {
    try {
        const meetingId = req.header('meetingId');
        const studentId = req.user.studentId;
        const Meeting = await meeting.findOne({_id : meetingId}).exec();
        console.log(Meeting);
        if (Meeting.studentId != studentId) {
            res.status(400).send('Không thể chỉnh sửa do xác thực!');
        } else {
            Meeting.note = req.body.note;
            Meeting.save();
            res.status(200).send('Chỉnh sửa thành công!');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}