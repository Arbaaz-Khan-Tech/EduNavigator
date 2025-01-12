const mongoose = require('mongoose');

const StudentResponseSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Reference to the User model by its model name
    required: true
  },
  responses: Object,  // e.g. {'questionId': 'selectedOption'}
  sectionScores: Object,  // e.g. {'Quantitative': {correct: 3, total: 5}, ...}



  totalScore: {
    type: Number,
    default: 0  // Initialize with zero
  },

  // Add a timestamp for when the test was taken
  testDate: {
    type: Date,
    default: Date.now  // Automatically set to current date and time when the test is submitted

  }
});

// Middleware to calculate totalScore before saving the document
StudentResponseSchema.pre('save', function(next) {
  const studentResponse = this;

  // Calculate the total score by summing up correct answers from all sections
  studentResponse.totalScore = Object.values(studentResponse.sectionScores).reduce((sum, section) => {
    return sum + (section.correct || 0);
  }, 0);

  next();  // Proceed to the next step in saving
});

module.exports = mongoose.model('StudentResponse', StudentResponseSchema);
