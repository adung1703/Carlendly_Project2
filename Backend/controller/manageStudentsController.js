// controller/manageStudentsController.js
const Manager = require('../models/manager');

// Hàm để thêm hoặc cập nhật managerUser và students
async function addOrUpdateManager(managerUser, newStudents) {
    try {
        // Tìm kiếm tài liệu với managerUser trùng
        let manager = await Manager.findOne({ managerUser: managerUser });

        if (manager) {
            // Nếu tài liệu tồn tại, cập nhật mảng students
            let updatedStudents = [...new Set([...manager.students, ...newStudents])]; // Loại bỏ trùng lặp
            manager.students = updatedStudents;
            await manager.save();
            console.log("Updated existing manager's students");
        } else {
            // Nếu tài liệu không tồn tại, tạo tài liệu mới
            const newManager = new Manager({
                managerUser: managerUser,
                students: newStudents
            });
            await newManager.save();
            console.log("Created new manager document");
        }
    } catch (err) {
        console.error("Error in addOrUpdateManager function", err);
    } finally {
        mongoose.connection.close(); // Đóng kết nối sau khi hoàn thành
    }
}

exports.manageStudents = async (req, res) => {
    const { managerUser, students } = req.body;

    if (!managerUser || !Array.isArray(students)) {
        return res.status(400).send('Invalid request data');
    }

    try {
        await addOrUpdateManager(managerUser, students);
        res.status(200).send('Operation successful');
    } catch (err) {
        res.status(500).send('Internal server error');
    }
};

exports.getStudents = async (req, res) => {
    try {
        const username  = req.user.username;
        const manager = await Manager.find({managerUser: username});
        console.log(manager)
        res.json(manager);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};


