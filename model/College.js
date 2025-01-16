// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Define the cutoff schema
// const cutoffSchema = new Schema({
//   year: { type: String, required: true },
//   cap_round: { type: Number, required: true },
//   cutoff: { type: Number, required: true }
// });

// // Define the branch schema
// const branchSchema = new Schema({
//   branch: { type: String, required: true },
//   cutoffs: [cutoffSchema]
// });

// // Define the college schema
// const collegeSchema = new Schema({
//   name: { type: String, required: true },
//   branches: [branchSchema]
// });

// // Define the university schema
// const universitySchema = new Schema({
//   name: {
//     type: String,
//     enum: [
//       "University of Mumbai",
//       "Savitribai Phule Pune University (SPPU)",
//       "Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)",
//       "Shivaji University",
//       "Dr. Babasaheb Ambedkar Technological University (DBATU)",
//       "Sant Gadge Baba Amravati University",
//       "Swami Ramanand Teerth Marathwada University"
//     ],
//     required: true
//   },
//   location: { type: String, required: true }
// });

// // Define the main schema
// const cetCollegeSchema = new Schema({
//   university: universitySchema,
//   colleges: [collegeSchema]
// });

// // Create the model
// const CetCollege = mongoose.model('CetCollege', cetCollegeSchema);

// module.exports = CetCollege;
