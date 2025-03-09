    const express = require("express");
    const multer = require("multer");
    const path = require("path");
    const Profile = require("../model/profile");
    const User = require("../model/User");
    const router = express.Router();

    // Multer storage setup for profile image uploads
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "public/uploads/");
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });
    const upload = multer({ storage });

    // Route to render the profile page
    router.get("/profile", async (req, res) => {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.redirect("/login");
            }

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).send("User not found");
            }

            let profile = await Profile.findOne({ userId });

            res.render("student_profile", {
                profile,
                username: user.username,
                role: user.role,  // Fetching the role from the User model
                profileImage: profile?.profileImage || "/images/default-profile.png"
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Error loading profile page");
        }
    });

    // Handle Profile Save (POST)
    router.post("/profile", upload.single("profileImage"), async (req, res) => {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).send("Unauthorized");
            }

            const {
                fullName,
                email,
                phone,
                state,
                district,
                collegeName,
                course,
                year,
                linkedin,
                twitter,
                // schoolName,
                // schoolBoard,
                // passingYear,
                skills,
                careerGoal
            } = req.body;

            // Ensure required fields are not undefined
            const profileData = {
                userId,
                fullName: fullName?.trim() || "",
                email: email?.trim() || "",
                phone: phone?.trim() || "",
                state: state?.trim() || "",
                district: district?.trim() || "",
                collegeName: collegeName?.trim() || "",
                course: course?.trim() || "",
                year: year?.trim() || "N/A", 
                linkedin: linkedin?.trim() || "N/A",
                twitter: twitter?.trim() || "N/A",
                // Default value if missing
                // schoolName: schoolName?.trim() || "N/A",
                // schoolBoard: schoolBoard?.trim() || "N/A",
                // passingYear: passingYear?.trim() || "N/A",
                skills: skills?.trim() || "",
                careerGoal: careerGoal?.trim() || "",
                profileImage: req.file ? `/uploads/${req.file.filename}` : req.body.existingProfileImage
            };

            // Check if profile exists, update or create new
            let profile = await Profile.findOne({ userId });
            if (profile) {
                await Profile.updateOne({ userId }, profileData);
            } else {
                await new Profile(profileData).save();
            }

            res.redirect("/profile");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error saving profile");
        }
    });

    router.post("/profile/generate-code", async (req, res) => {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({ success: false, message: "Unauthorized" });
            }
    
            let profile = await Profile.findOne({ userId });
    
            if (!profile) {
                return res.status(404).json({ success: false, message: "Profile not found" });
            }
    
            if (profile.uniqueCode) {
                return res.json({ success: false, message: "Code already generated", uniqueCode: profile.uniqueCode });
            }
    
            const uniqueCode = Math.random().toString(36).substr(2, 8).toUpperCase();
            profile.uniqueCode = uniqueCode;
            await profile.save();
    
            res.json({ success: true, uniqueCode });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Error generating code" });
        }
    });
    
    router.post("/profile/link-parent", async (req, res) => {
        try {
            const { uniqueCode } = req.body;
            const userId = req.session.userId; // Parent's user ID
    
            if (!userId) {
                return res.status(401).json({ success: false, message: "Unauthorized" });
            }
    
            const parentUser = await User.findById(userId);
            if (!parentUser) {
                return res.status(404).json({ success: false, message: "Parent user not found" });
            }
    
            let studentProfile = await Profile.findOne({ uniqueCode });
            if (!studentProfile) {
                return res.status(404).json({ success: false, message: "Invalid code" });
            }
    
            studentProfile.parentUsername = parentUser.username; // Store parent's username
            await studentProfile.save();
    
            res.json({ success: true, message: "Linked successfully", parentUsername: parentUser.username });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Error linking parent" });
        }
    });

    module.exports = router;