const mongoose = require("mongoose");

const TeacherWorkSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["task", "announcement"],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    dueDate: {
        type: String, 
        default: null // Make it optional
    },
    date: {
        type: String, 
        default: null // Make it optional
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const TeacherWork = mongoose.model("TeacherWork", TeacherWorkSchema);
module.exports = TeacherWork;
