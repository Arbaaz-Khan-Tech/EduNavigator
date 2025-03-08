const express = require("express");
const router = express.Router();
const User = require("../model/User");
const TeacherProfile = require("../model/TeacherProfile");
const StudentProfile = require("../model/profile");

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

// GET: Display Student List Page at /studentlist
router.get("/studentlist", async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.redirect("/login");
        }

        // Fetch the logged-in teacher's details from User.js
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Fetch the teacher's profile using fullName from TeacherProfile.js
        const teacherProfile = await TeacherProfile.findOne({ fullName: user.username });

        if (!teacherProfile) {
            return res.render("student_list", { students: [] });
        }

        // Fetch students from Profile.js who belong to the same college as the teacher
        const students = await StudentProfile.find({ collegeName: teacherProfile.collegeName });

        // Fetch student details
        const studentList = students.map((student, index) => ({
            srNo: index + 1,
            fullName: student.fullName, // Fix: Use fullName instead of username
            email: student.email,
            phone: student.phone,
            year: student.year,
            profileImage: student.profileImage || "/images/default-profile.png"
        }));

        res.render("student_list", { students: studentList });
    } catch (err) {
        console.error(err);
        res.redirect("/");
    }
});

module.exports = router;
