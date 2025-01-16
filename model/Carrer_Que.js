const mongoose = require('mongoose');

// Define the schema for questions
const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Technical', 'Creative', 'Social/Leadership', 'Analytical', 'Practical'],
    required: true
  },
  options: [
    {
      optionText: {
        type: String,
        required: true
      },
      category: {
        type: String,
        enum: ['Technical', 'Creative', 'Social/Leadership', 'Analytical', 'Practical'],
        required: true
      }
    }
  ]
});

// Export the model
const Question = mongoose.model('Carrer_Question', QuestionSchema);

module.exports = Question;
