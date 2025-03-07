const mongoose = require('mongoose');

const TeacherProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    profileImage: { type: String, default: '' },
    state: { type: String, required: true },
    district: { type: String, required: true },
    collegeName: { type: String, required: true } // College affiliation
});

module.exports = mongoose.model('TeacherProfile', TeacherProfileSchema);
