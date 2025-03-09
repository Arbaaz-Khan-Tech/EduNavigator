const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    profileImage: { type: String, default: '' },
    state: { type: String, required: true },
    district: { type: String, required: true },
    collegeName: { type: String, required: true },
    course: { type: String, required: true },
    year: { type: String, required: true },
    linkedin: { type: String, required: true },
    twitter: { type: String, required: true },
    // schoolName: { type: String, required: true },
    // schoolBoard: { type: String, required: true },
    // passingYear: { type: Number, required: true },
    skills: { type: String, default: '' },
    careerGoal: { type: String, default: '' },
    uniqueCode: { type: String, unique: true }, // Unique code for linking
    parentUsername: { type: String, default: null } // Store parent's username if linked
   

});

module.exports = mongoose.model('Profile', ProfileSchema);
