const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
    name: { type: String, required: true },
    casteCategory: { type: String, required: true },
    educationLevel: { type: String, required: true },
    state: { type: String, required: true },
    eligibility: { type: String, required: true },
    course: { type: String, required: true },
    link: { type: String, required: true }
});

module.exports = mongoose.model('Scholarship', scholarshipSchema);



// const mongoose = require('mongoose');

// const ScholarshipSchema = new mongoose.Schema({
//     name: String,
//     eligibility: String,
//     casteCategory: String,
//     educationLevel: String,
//     course: String,
//     state: String,
//     link: String
// });

// module.exports = mongoose.model('Scholarship', ScholarshipSchema);