const express = require("express");
const router = express.Router();
const ParentProfile = require("../model/ParentProfile");
const User = require("../model/User");
const Profile = require("../model/profile"); // Fetch student profiles

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated() && req.session.role === "parent") {
        return next();
    }
    res.redirect("/login");
};

// Route to render Parent Profile Page
router.get("/parentprofile", async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) return res.redirect("/login");

        // Fetch parent user details
        const user = await User.findById(userId);
        if (!user) return res.status(404).send("User not found");

        // Fetch parent profile details
        let parentProfile = await ParentProfile.findOne({ username: user.username }).populate("linkedStudent");

        res.render("parent_profile", {
            username: user.username,
            email: parentProfile?.email || "",
            phone: parentProfile?.phone || "",
            linkedStudent: parentProfile?.linkedStudent || null
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error loading parent profile page");
    }
});

// Route to update Parent Profile (Add Linked Student)
router.post("/parentprofile", async (req, res) => {
    try {
        console.log("Received Form Data:", req.body); // Debugging
        const userId = req.session.userId;
        const { email, phone, studentCode } = req.body;

        if (!email) {
            return res.status(400).send("Email is required");
        }

        // Fetch parent user details
        const user = await User.findById(userId);
        if (!user) return res.status(404).send("User not found");

        // Find student by unique code
        const student = await Profile.findOne({ uniqueCode: studentCode });
        if (!student) {
            return res.status(400).send("Invalid student code");
        }

        // Update or create parent profile
        let parentProfile = await ParentProfile.findOne({ username: user.username });

        if (parentProfile) {
            parentProfile.email = email || parentProfile.email;
            parentProfile.phone = phone || parentProfile.phone;
            parentProfile.linkedStudent = student._id;
            await parentProfile.save();
        } else {
            parentProfile = new ParentProfile({
                username: user.username,
                email: email,
                phone: phone,
                linkedStudent: student._id
            });
            await parentProfile.save();
        }

        res.redirect("/parentprofile");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating parent profile");
    }
});


module.exports = router;
