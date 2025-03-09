const express = require("express");
const router = express.Router();
const User = require("../model/User");
const StudentProfile = require("../model/profile");
const TeacherProfile = require("../model/TeacherProfile");
const TeacherWork = require("../model/teacherwork");

// Middleware for authentication
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

// GET: Teacher Home Page
router.get("/teacher_home", async (req, res) => {
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).send("Unauthorized: No user ID in session");
        }

        // Fetch user details
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Fetch teacher profile based on user ID
        const teacherProfile = await TeacherProfile.findOne({ userId });

        if (!teacherProfile) {
            return res.render("teacher_home", { 
                username: user.username,  // Pass username even if profile is missing
                students: [], 
                tasks: [], 
                announcements: [] 
            });
        }

        // Fetch students and teacher work data
        const students = await StudentProfile.find({ collegeName: teacherProfile.collegeName });
        const tasks = await TeacherWork.find({ type: "task" });
        const announcements = await TeacherWork.find({ type: "announcement" });

        res.render("teacher_home", { 
            username: user.username,  // Explicitly pass the username
            students, 
            tasks, 
            announcements 
        });

    } catch (error) {
        console.error("Error loading teacher home page:", error);
        res.status(500).send("Internal Server Error");
    }
});

// POST: Add Task
// POST: Add Task
router.post("/addTask", async (req, res) => {
    try {
        const { title, dueDate } = req.body;
        
        if (!title || !dueDate) {
            return res.status(400).send("Title and Due Date are required");
        }

        await TeacherWork.create({ type: "task", title, dueDate });

        res.redirect("/teacher_home"); // Redirect to update frontend
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).send("Internal Server Error");
    }
});

// POST: Add Announcement
router.post("/addAnnouncement", async (req, res) => {
    try {
        const { title, date } = req.body;

        if (!title || !date) {
            return res.status(400).send("Title and Date are required");
        }

        await TeacherWork.create({ type: "announcement", title, date });

        res.redirect("/teacher_home"); // Redirect to update frontend
    } catch (error) {
        console.error("Error adding announcement:", error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
