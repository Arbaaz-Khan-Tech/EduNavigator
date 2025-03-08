//new

const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Question = require('../model/questions');  // Import the Question model
const StudentResponse = require('../model/student_res');
const User = require('../model/User');

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Middleware to parse form data
router.use(express.urlencoded({ extended: true }));

// Route for submitting test responses
router.post('/responses/submit', async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).render('notlogged'); 

    // Fetch the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    // Save the submitted responses from the user
    const responses = req.body;
    const questions = await Question.find();

    // Prepare section scores based on the responses
    const sectionScores = {};
    questions.forEach((question) => {
      const selectedOption = responses[`question-${question._id}`];
      const section = question.section;
      if (!sectionScores[section]) {
        sectionScores[section] = { correct: 0, total: 0 };
      }
      sectionScores[section].total++;
      if (selectedOption && selectedOption.toLowerCase() === question.correctAnswer.toLowerCase()) {
        sectionScores[section].correct++;
      }
      totalScore = Object.values(sectionScores).reduce((sum, sec) => sum + sec.correct, 0);
    });

    // Save the student response in the database
    const newResponse = new StudentResponse({
      user: userId,
      responses,
      sectionScores
    });
    await newResponse.save();



    // Store a session flag to indicate that the test was submitted
    req.session.testSubmitted = true;

    // Redirect to the student results page to prevent form resubmission
    res.redirect('/student_results');

  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).send('Server Error');
  }
});

// Route to display the student's test results (PRG Pattern)
router.get('/student_results', async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).render('notlogged'); 

  // Ensure the test was submitted before displaying results
  

  // Reset the session flag to prevent multiple submissions
  req.session.testSubmitted = false;

  // Fetch all tests for the current user
  const studentTests = await StudentResponse.find({ user: userId });

  // Prepare data for the graph
  const testNumbers = studentTests.map((_, index) => `Test ${index + 1}`);
  const totalScores = studentTests.map((test) => test.totalScore);

  // Fetch leaderboard data (default empty array if no leaderboard is required here)
  const topScores = await StudentResponse.aggregate([
    {
      $group: {
        _id: "$user", // Group by user ID
        maxScore: { $max: "$totalScore" }, // Get the highest score per user
        testDate: { $first: "$testDate" } // Get the first test date (or change this to latest if needed)
      }
    },
    {
      $lookup: {
        from: "users", // Lookup the user collection
        localField: "_id",
        foreignField: "_id",
        as: "userDetails"
      }
    },
    {
      $unwind: "$userDetails" // Unwind the user details array
    },
    {
      $sort: { maxScore: -1 } // Sort by highest score in descending order
    }
  ]);

  // Generate AI insights based on the student's performance
  const generateContent = async () => {
    try {
      const prompt = `
        Based on the performance in the following sections:
        ${Object.keys(studentTests[studentTests.length - 1].sectionScores).map(section => `${section}: ${studentTests[studentTests.length - 1].sectionScores[section].correct}/${studentTests[studentTests.length - 1].sectionScores[section].total}`).join('\n')}
        
        Please provide recommendations on how to improve and potential areas of interest.
      `;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const insights = await response.text();

      return insights
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Convert **bold** to <strong>
        .replace(/\n\n/g, '</p><p>')  // Convert double line breaks to new paragraphs
        .replace(/\n/g, '<br>');      // Convert single line breaks to <br>
    } catch (error) {
      console.error('Error generating AI insights:', error);
      return 'Unable to generate insights at the moment.';
    }
  };

  // Generate insights using AI
  const insights = await generateContent();
  let now = new Date();
  let hours = now.getHours();
let minutes = now.getMinutes();

  // Render the results page with section scores, total tests, leaderboard, and AI insights
  res.render('student_res', {
    sectionScores: studentTests.length > 0 ? studentTests[studentTests.length - 1].sectionScores : 'NA',  // Fallback to 'NA' if no section scores are available
    username: (await User.findById(userId)).username,
    totalTests: studentTests.length || 1,  // Default to 1 if no tests are available (to avoid breaking calculations)
    testNumbers,   // X-axis: Test numbers
    totalScores: totalScores || 1,  // Default to 1 if totalScores is unavailable (to avoid breaking calculations)
    totalScore: totalScores, // Pass totalScore (or a calculated value) here
    topScores,     // Pass top scores for the leaderboard
    insights,      // AI insights
    hours,
    minutes
  });
  
  
});

// Route to view full AI insights
router.get('/Ai_Insights_Full', (req, res) => {
  const insights = req.session.insights;
  res.render('Ai_Insights_Full', { insights });
});

// Route to render the graph
router.get('/get_graph', async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).send('User not authenticated');

  // Fetch all tests for the current user
  const studentTests = await StudentResponse.find({ user: userId });
  
  // Prepare data for the graph
  const testNumbers = studentTests.map((_, index) => `Test ${index + 1}`);
  const totalScores = studentTests.map((test) => test.totalScore);

  // Render the graph view with total tests and scores
  res.render('student_res', {
    totalTests: studentTests.length,
    testNumbers,
    totalScores
  });
});

// Route for fetching and rendering the leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    // Fetch the highest score for each unique user
    const topScores = await StudentResponse.aggregate([
      {
        $group: {
          _id: "$user", // Group by user ID
          maxScore: { $max: "$totalScore" }, // Get the highest score per user
          testDate: { $first: "$testDate" }, // Get the test date (can be changed to latest with $max if needed)
        }
      },
      {
        $lookup: {
          from: "users", // Lookup the user collection
          localField: "_id", // Match on the user ID
          foreignField: "_id", // Get user details from the User model
          as: "userDetails"  // Store result in 'userDetails'
        }
      },
      {
        $unwind: "$userDetails" // Unwind the user details array
      },
      {
        $sort: { maxScore: -1 } // Sort by highest score in descending order
      }
    ]);

    // Render the leaderboard with top scores
    res.render('student_res', { topScores });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
