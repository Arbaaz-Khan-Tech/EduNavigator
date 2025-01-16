const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: Object, required: true },  // e.g. {A: 'Option A', B: 'Option B', C: 'Option C', D: 'Option D'}
  correctAnswer: { type: String, required: true },  // Correct answer, e.g., 'a', 'b', etc.
  section: { type: String, required: true }  // e.g., 'Quantitative', 'Verbal', etc.
});

module.exports = mongoose.model('Question', QuestionSchema);
