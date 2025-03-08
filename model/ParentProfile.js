const mongoose = require('mongoose');
const ParentProfileSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    linkedStudent: { type: mongoose.Schema.Types.ObjectId, ref: "Profile", default: null } // Linked student
});

module.exports = mongoose.model('ParentProfile', ParentProfileSchema);
