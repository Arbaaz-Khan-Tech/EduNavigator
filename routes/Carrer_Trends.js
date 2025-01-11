
const express = require('express');
const router = express.Router();
const dotenv = require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});





router.get('/Carrer_Trends',(req,res)=>{
    res.render('Carrer_Trends')
})

// Define Gprompt outside the route handler to be accessible to generateContent
let Gprompt = '';

router.post('/Carrer_Trends', (req, res) => {
    // Access form data
    const formData = {
        subjects: req.body.subjects,
        curiosity: req.body.curiosity,
        preference: req.body.preference,
        hobbies: req.body.hobbies,
        skills: req.body.skills,
        tasks: req.body.tasks,
        feedback: req.body.feedback,
        teamwork: req.body.teamwork,
        careerGoals: req.body.careerGoals,
        jobRole: req.body.jobRole,
        careerPath: req.body.careerPath,
        workLifeBalance: req.body.workLifeBalance,
        workEnvironment: req.body.workEnvironment,
        pacePreference: req.body.pacePreference,
        relocation: req.body.relocation,
        jobSecurity: req.body.jobSecurity
    };

    // Create prompt using template literals
    Gprompt = `
    "Based on the following responses from a student about their career interests, strengths, and preferences:

Subjects or activities they enjoy the most: ${formData.subjects}}
Topics or fields they are naturally curious about: ${formData.curiosity}
Preference for working with technology, people, data, or creative ideas: ${formData.preference}
Hobbies or extracurricular activities they enjoy: ${formData.hobbies}
Strongest skills or talents: ${formData.skills}
Types of tasks or challenges they excel at: ${formData.tasks}
Feedback they have received about their strengths: ${formData.feedback}
Comfort working individually or in a team setting: ${formData.teamwork}
Long-term career goals: ${formData.careerGoals}
Specific job roles they aspire to: ${formData.jobRole}
Preference for a stable career path or one with creativity and change: ${formData.careerPath}
Importance of work-life balance: ${formData.workLifeBalance}
Preference for working in an office, outdoors, or remotely: ${formData.workEnvironment}
Preference for fast-paced, dynamic environments or structured and predictable work: ${formData.pacePreference}
Willingness to relocate for their career: ${formData.relocation}
Value placed on job security versus rapid career growth: ${formData.jobSecurity}
Analyze this information and provide personalized career insights including:

Top Trending Jobs: Based on the student's interests and skills, recommend the most in-demand jobs across industries that align with their preferences. Consider both traditional and emerging fields.

Required Skills: List the most important and sought-after skills needed to succeed in these roles, and highlight any skills the student may already have or need to develop.

Salary Trends: Provide salary ranges for the suggested roles, including regional differences (where applicable), entry-level positions, and salary progression with experience.

Industry Growth: Identify which industries are currently experiencing growth or are projected to grow, and which industries may be facing challenges. Explain why these industries are favorable or declining.

Additionally, include the following:

Recommended Learning Paths: Suggest specific certifications, online courses, or educational paths the student could pursue to further develop the skills required for these careers.
Emerging Technologies: Highlight any emerging technologies or trends relevant to the student's areas of interest that could impact their career prospects.
Career Development Tips: Provide strategies for career growth, networking, and building a professional portfolio to enhance their job opportunities in these fields."
    `;

    // For demonstration, log the prompt
    console.log(Gprompt);

    // Send response to confirm receipt of the form and prompt creation
    generateContent(req, res);


    
});



const generateContent = async (req, res) => {
    try {
      // Ensure Gprompt is set before calling generateContent
      if (!Gprompt) {
        return res.send("No prompt available. Please submit the form first.");
      }
  
      // Use the AI model to generate content based on the prompt
      const result = await model.generateContent(Gprompt);
      const response = await result.response;
      const text = await response.text();


      const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Convert **bold** to <strong>
      .replace(/\n\n/g, '</p><p>')  // Convert double line breaks to new paragraphs
      .replace(/\n/g, '<br>');      // Convert single line breaks to <br>

  // Render HTML response with CSS
  res.send(`
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 20px;
                  line-height: 1.6;
              }
              h1 {
                  color: #333;
                  font-size: 24px;
              }
              p {
                  font-size: 18px;
                  margin-bottom: 16px;
              }
              strong {
                  color: #007BFF;
                  font-weight: bold;
              }
              .highlight {
                  background-color: #f0f8ff;
                  padding: 10px;
                  border-radius: 5px;
                  margin: 20px 0;
              }
          </style>
      </head>
      <body>
          <h1>Career Hindsights</h1>
          <div class="highlight">
              <p>${formattedText}</p>
          </div>
      </body>
      </html>
  `);
    
    } catch (err) {
      console.error(err);
      res.send("Unexpected Error!!!");
    }
  };

 

  module.exports = router;