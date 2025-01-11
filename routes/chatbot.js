const express = require('express');
const router = express.Router();
const dotenv = require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});



router.get('/chatbot', (req, res) => {
    res.render('chatbot');
});

// Endpoint to handle chatbot conversation
router.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ reply: "No message provided." });
    }
  
    try {
      // Fetch the generative model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
      // Properly format the request input
      const Gprompt = {
        prompt: userMessage
      };
  
      // Generate content using the model
      const result = await model.generateContent(Gprompt);
      const response = await result.response;
      const text = await response.text();
  
      // Check the result structure
      if (result && result.response && result.response.text) {
        const botResponse = result.response.text;
        res.json({ reply: botResponse });
      } else {
        res.status(500).json({ reply: "No response from the AI model." });
      }
    } catch (error) {
      console.error('Error with Google Generative AI:', error.message);
      res.status(500).json({ reply: 'Something went wrong with the AI service.' });
    }
  });


module.exports = router;
