
const express = require('express');
const router = express.Router();
const dotenv = require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});





router.get('/ai',(req,res)=>{
    res.render('ai_carrer')
})

// Define Gprompt outside the route handler to be accessible to generateContent
let Gprompt = '';

router.post('/Ai_Insights', (req, res) => {
    // Access form data
    const formData = {
        education: req.body.Education,
        workExperience: req.body.WorkExperience,
        skills: req.body.Skills,
        subjects: req.body.Subjects,
        workPreference: req.body.WorkPreference,
        hobbies: req.body.Hobbies,
        learningInterests: req.body.LearningInterests,
        careerGoals: req.body.CareerGoals,
        workEnvironment: req.body.WorkEnvironment,
        jobPreferences: req.body.JobPreferences,
        workImpact: req.body.WorkImpact,
        workSchedule: req.body.WorkSchedule,
        salaryImportance: req.body.SalaryImportance,
        stressManagement: req.body.StressManagement,
        workStyle: req.body.WorkStyle,
        feedback: req.body.Feedback,
        futureLearning: req.body.FutureLearning
    };

    // Create prompt using template literals
    Gprompt = `
    You are an expert career counselor. Based on the following information, provide concise career recommendations and insights tailored to the individual. 
    
    **IMPORTANT:** Start directly with the career recommendations, and do not include any introductory sentences or explanations. List them clearly with points for each recommendation.
    
    Here is the information:
    
    - Education: ${formData.education}
    - Work Experience: ${formData.workExperience}
    - Skills: ${formData.skills}
    - Subjects of Interest: ${formData.subjects}
    - Work Preference (independent or team-based): ${formData.workPreference}
    - Hobbies and Interests: ${formData.hobbies}
    - Learning Interests (topics researched or learned): ${formData.learningInterests}
    - Career Goals (5–10 years): ${formData.careerGoals}
    - Preferred Work Environment: ${formData.workEnvironment}
    - Job Preferences (security, growth, work-life balance): ${formData.jobPreferences}
    - Desired Impact of Work: ${formData.workImpact}
    - Preferred Work Schedule (stable or flexible): ${formData.workSchedule}
    - Salary Importance: ${formData.salaryImportance}
    - Stress Management Ability: ${formData.stressManagement}
    - Work Style (planner or adaptive): ${formData.workStyle}
    - Feedback Received (strengths and areas for improvement): ${formData.feedback}
    - Future Learning Goals: ${formData.futureLearning}
    
    Task:
    - Recommend 3-5 suitable career paths based on this information.
    - **Insights:** Good fit
    - **Skills:** Skills needed
    - **Alignment:** Work preferences
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
  
      // Remove unwanted introductory lines and split the text into different career recommendations
      const cleanedText = text.replace(/## Career Recommendations for.*?\n\n?/g, ''); // Remove unwanted intro line
      const recommendations = cleanedText.split(/(?=\d+\.\s)/); // Splits based on "1. ", "2. ", etc.
  
      // Generate formatted cards for each recommendation
      const formattedRecommendations = recommendations.map((rec, index) => {
        // Ignore the first card
        if (index === 0) return '';
    
        // Extract title (first line of each section)
        const titleMatch = rec.match(/^\d+\.\s(.*?)(?=\n|$)/);
        const title = titleMatch ? titleMatch[1].trim() : "Career Recommendation";
    
        // Replace markdown-like formatting in the description
        const description = rec
            .replace(/^\d+\.\s.*?(\n|$)/, '') // Remove the title line
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Convert **bold** to <strong>
            .replace(/\n\n/g, '</p><p>')  // Convert double line breaks to new paragraphs
            .replace(/\n/g, '<br>');  // Convert single line breaks to <br>
    
        // Define a color scheme for each card
        const colors = [
            'gradient-gold',    // Gold gradient
            'gradient-pink',    // Pink gradient
            'gradient-purple',   // Purple gradient
        ];
        
        // Choose a random gradient class
        const cardClass = colors[Math.floor(Math.random() * colors.length)];
        
        // Set title color based on the selected gradient class
        const titleClass = cardClass === 'gradient-gold' ? 'text-dark' : 'text-light';
        // Choose a random background color
      // Randomly assign a color class
    
        return `
          <div class="col-md-4 mb-4">
            <div class="card ${cardClass} h-100">
              <div class="card-body">
                <h5 class="card-title text-center">${title}</h5>
                <p class="card-text">${description}</p>
              </div>
              <div class="card-footer text-center">
                <button class="btn btn-light"><a href="https://www.google.com/search?q=${title}" target="_blank">Know More</a></button>
                 <button class="btn btn-light"><a href="https://www.google.com/search?q=${title}+career+recommendations+site:linkedin.com target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
</svg>LinkedIn</a></button>
              </div>
            </div>
          </div>
        `;
    }).filter(Boolean).join(''); // Filter out any empty strings from ignored cards
      // Render the HTML response
      res.send(`
 <html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 20px;
      line-height: 1.6;
      background: linear-gradient(135deg, #667eea, #764ba2); /* Gradient background for the page */
      color: black;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    h1 {
      color: white;
      text-align: center;
      margin-bottom: 2rem;
      font-size: 2.5rem;
      font-weight: bold;
      text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Text shadow for depth */
    }

    .row {
      display: flex;
      flex-wrap: wrap;
      gap: 0px; /* Consistent spacing between cards */
      justify-content: center;
    }

    .card {
      flex: 1 1 calc(33.333% - 40px); /* Three cards per row with spacing */
      border: none;
      border-radius: 15px; /* Rounded corners */
      background: rgba(255, 255, 255, 0.1); /* Glassmorphic effect */
      backdrop-filter: blur(10px); /* Blur effect for glassmorphism */
      color: black; /* Black text for high contrast */
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Flat design with minimal shading */
      transition: transform 0.2s, box-shadow 0.2s; /* Smooth hover effect */
      overflow: hidden; /* Ensures rounded corners for child elements */
      border: 1px solid rgba(255, 255, 255, 0.2); /* Subtle border for glassmorphism */
    }

    .card:hover {
      transform: translateY(-5px); /* Slight lift on hover */
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
    }

    .card-body {
      padding: 20px;
    }

    .card-title {
      font-size: 1.5em; /* Bold, sans-serif font for headings */
      font-weight: bold;
      margin-bottom: 15px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1); /* Thin underline separator */
      padding-bottom: 10px;
      color: white; /* White text for contrast */
    }

    .card-text {
      font-size: 1em; /* Slightly smaller subtext for descriptions */
      color: rgba(255, 255, 255, 0.8); /* Slightly muted text for readability */
    }

    .card-footer {
      background: rgba(255, 255, 255, 0.1); /* Semi-transparent footer */
      border-top: 1px solid rgba(255, 255, 255, 0.1); /* Thin underline separator */
      padding: 15px;
      text-align: center;
    }

    .btn-light {
      background-color: rgba(255, 255, 255, 0.9); /* Light button background */
      color: black; /* Black text for contrast */
      border: none; /* Remove border */
      border-radius: 20px; /* Rounded button */
      padding: 10px 20px; /* Button padding */
      transition: background-color 0.2s, transform 0.2s; /* Smooth hover effect */
    }

    .btn-light:hover {
      background-color: rgba(255, 255, 255, 1); /* Solid white on hover */
      transform: scale(1.05); /* Slightly scale up on hover */
    }

    .btn-light a {
      color: inherit;
      text-decoration: none;
    }

    .btn-light a:hover {
      color: inherit;
    }

    .illustration {
      width: 100%;
      height: 150px;
      background: rgba(255, 255, 255, 0.1); /* Placeholder for black line-art illustrations */
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2em;
      color: white;
      border-radius: 10px; /* Rounded corners for illustrations */
    }

    /* Different gradient colors for each card */
    .card:nth-child(1) {
      background: linear-gradient(135deg, rgba(255, 105, 180, 0.1), rgba(255, 20, 147, 0.1)); /* Pink gradient */
    }

    .card:nth-child(2) {
      background: linear-gradient(135deg, rgba(0, 191, 255, 0.1), rgba(30, 144, 255, 0.1)); /* Blue gradient */
    }

    .card:nth-child(3) {
      background: linear-gradient(135deg, rgba(50, 205, 50, 0.1), rgba(34, 139, 34, 0.1)); /* Green gradient */
    }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="text-center mb-4">Career Insights</h1>
    <div class="row">
      ${formattedRecommendations}
    </div>
  </div>
</body>
</html>
      `);
    } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).send("An error occurred while generating content.");
    }
  };
  
  
    


 

module.exports = router;