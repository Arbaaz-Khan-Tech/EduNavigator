const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");


// ✅ Load professions.json correctly
const professions = JSON.parse(fs.readFileSync(path.join(__dirname, "/../public/data/professions.json"), "utf8"));

// ✅ Route for Career Bank
router.get("/career-bank", (req, res) => {
    res.render("career-bank", { professions });
});

// ✅ Dynamic route for profession details
router.get("/career/:id", (req, res) => {
    const profession = professions.find(p => p.id === req.params.id);
    if (!profession) {
        return res.status(404).send("Profession not found");
    }
    res.render("profession-details", { profession });
});



module.exports = router;
