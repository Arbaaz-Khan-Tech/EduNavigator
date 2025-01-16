const mongoose = require('mongoose');

const skillsAndInterestsSchema = new mongoose.Schema({
    skill: String,
    interest: String,
    recommendedCareers: [String]
});

const SkillsAndInterests = mongoose.model('SkillsAndInterests', skillsAndInterestsSchema);

module.exports = SkillsAndInterests;
