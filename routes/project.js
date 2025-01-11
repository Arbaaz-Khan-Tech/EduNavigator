
const express = require('express');
const router = express.Router();
const dotenv = require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});





router.get('/project_ai',(req,res)=>{
    res.render('project_ai')
})

// Define Gprompt outside the route handler to be accessible to generateContent
let Gprompt = '';

router.post('/project_ai', (req, res) => {
    // Access form data
    const formData = {
       
       future_car : req.body.future_carrer,
       tech_stack : req.body.tech_stack,
       exp_lvl : req.body.exp_lvl,
       project : req.body.project,
       Time_Dedicated : req.body.Time_Dedicated
    };

    // Create prompt using template literals
    Gprompt = `
    A student wants to become a ${formData.future_career}. They have indicated that they are interested in using ${formData.tech_stack} technologies and programming languages. Their current experience level with programming is ${formData.exp_lvl}, and they are most excited to work on projects related to ${formData.project}. The student can dedicate ${formData.Time_Dedicated} hours each week to learning and completing projects.

Please provide:

Specific project recommendations that will help them advance toward their career goal of becoming a ${formData.future_career}. Focus on projects that will significantly contribute to their skills and help them secure their dream job.

Relevant libraries, frameworks, or tools they should use based on their selected tech stack (${formData.tech_stack}) and how these can be applied to their projects.

Step-by-step guidance on how they can approach and complete each project. Offer actionable suggestions and best practices to ensure their work is effective and impactful.

Any references or examples of successful individuals or projects in their chosen field, using similar technologies or approaches.

Finally, based on the time they can dedicate each week (${formData.Time_Dedicated}), design a realistic learning and project schedule that will keep them on track to achieve their goals. Ensure the schedule is flexible but also helps them make steady progress.
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
          <h1>Career Insights</h1>
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