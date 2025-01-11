// const express = require('express');
// const router = express.Router();
// const Question = require('../model/questions');




// router.get('/apti', async (req, res) => {
//   try {
//     const questions = await Question.find();
//     res.render('apti', { questions });
//   } catch (error) {
//     console.error('Error fetching questions:', error);
//     res.status(500).send('Server Error');
//   }
// });



// module.exports = router;
// router.post('/add_apti',async (req, res) => {
//     const newQuestion = new Question(req.body);
//     try {
//       const savedQuestion = await newQuestion.save();
//       res.status(201).json(savedQuestion);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });

// module.exports = router;







const express = require('express');
const router = express.Router();
const Question = require('../model/questions');

// Fetch 20 random questions from each section and render to apti.ejs
router.get('/apti', async (req, res) => {
  try {
    const verbalQuestions = await Question.aggregate([
      { $match: { section: 'Verbal Ability' } },
      { $sample: { size: 20 } }
    ]);

    const logicalQuestions = await Question.aggregate([
      { $match: { section: 'Logical Reasoning' } },
      { $sample: { size: 20 } }
    ]);

    const quantitativeQuestions = await Question.aggregate([
      { $match: { section: 'Quantitative Aptitude' } },
      { $sample: { size: 20 } }
    ]);

    // Combine questions from all sections
    const questions = [
      ...verbalQuestions,
      ...logicalQuestions,
      ...quantitativeQuestions
    ];

    // Render apti.ejs with the questions
    res.render('apti', { questions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).send('Server Error');
  }
});

// Route to handle adding new questions
router.post('/add_apti', async (req, res) => {
  const newQuestion = new Question(req.body);
  try {
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

