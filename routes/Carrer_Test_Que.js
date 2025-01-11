const express = require('express');
const router = express.Router();
const Question = require('../model/Carrer_Que'); // Adjust the path as necessary

const dotenv = require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const text = require('body-parser/lib/types/text');

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


// Route to display questions
router.get('/Carrer_Test', async (req, res) => {
    try {
        const questions = await Question.find();
        res.render('Carrer_Test_Que', { questions });
    } catch (error) {
        res.status(500).send('Error fetching questions');
    }
});



let Gprompt = '';

// Route to handle submitted responses
// Route to handle submitted responses
router.post('/submit_answers_carrer', (req, res) => {
    const answers = req.body;
    const score = {
        Technical: 0,
        Creative: 0,
        "Social/Leadership": 0,
        Analytical: 0,
        Practical: 0,
    };

    for (let question in answers) {
        if (answers.hasOwnProperty(question)) {
            const category = answers[question];
            score[category] = (score[category] || 0) + 1;
        }
    }

    // console.log(score);

    const Gprompt = `
    Based on the following scores for different career categories, provide tailored career suggestions. 
    
    Scores:
    - Technical: ${score.Technical}
    - Creative: ${score.Creative}
    - Social/Leadership: ${score["Social/Leadership"]}
    - Analytical: ${score.Analytical}
    - Practical: ${score.Practical}
    
    Format your response as follows:
    ## Career Suggestions Based on Your Scores:
    **1. [Career Title] (Score: [Score])**
    * [Career Description]
    * [Career Description]
    ...
    **Next Steps:**
    - [Next Step]
    - [Next Step]
    `;
    

    generateContent(req, res, Gprompt,score); // Pass Gprompt to generateContent
});

// Update the generateContent function to send the response
const generateContent = async (req, res, prompt,score) => {
    try {
      // Ensure prompt is set before calling generateContent
      if (!prompt) {
        return res.send("No prompt available. Please submit the form first.");
      }
  
      // Use the AI model to generate content based on the prompt
      const result = await model.generateContent(prompt); // Use the passed prompt
      const response = await result.response;
      const text = await response.text();
    //   console.log("Raw Response Text:", text);

      // After generating the content and parsing the response
const { careerSuggestions, nextSteps } = formatCareerSuggestions(text);
res.render('Carrer_Test_Ai', { careerSuggestions, nextSteps });

      

      // Render the EJS template with score and formatted suggestions
    //   res.render('Carrer_Test_Ai', { score, careerSuggestions });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).send("An error occurred while generating content.");
    }
};

function formatCareerSuggestions(responseText) {
    const lines = responseText.split('\n').map(line => line.trim()).filter(line => line);
    const careerSuggestions = [];
    const nextSteps = [];
    let currentCareer = null;

    for (let line of lines) {
        if (line.startsWith('**1.') || line.startsWith('**2.') || line.startsWith('**3.') || line.startsWith('**4.')) {
            // If there's an existing career, push it to the array
            if (currentCareer) {
                careerSuggestions.push(currentCareer);
            }
            // Create a new career suggestion
            const careerMatch = line.match(/^\*\*(\d+)\.\s+(.+)\s+\(Score:\s*(\d+)\)\*\*/);
            if (careerMatch) {
                currentCareer = {
                    title: careerMatch[2],
                    score: parseInt(careerMatch[3]),
                    descriptions: []
                };
            }
        } else if (line.startsWith('*') && currentCareer) {
            // This is a description line
            const description = line.replace(/^\*\s*/, '').trim();
            currentCareer.descriptions.push(description);
        } else if (line.startsWith('**Next Steps:**')) {
            // Next steps section
            continue; // Skip the heading line
        } else if (line.startsWith('-')) {
            // This is a next step line
            const step = line.replace(/^\-\s*/, '').trim();
            nextSteps.push(step);
        }
    }

    // Push the last career suggestion if it exists
    if (currentCareer) {
        careerSuggestions.push(currentCareer);
    }

    return { careerSuggestions, nextSteps };
}

// Example usage





module.exports = router;