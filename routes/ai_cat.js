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
            <div class="card ${cardClass} h-100 career-card">
              <div class="card-body">
                <div class="card-icon">
                  <i class="fas fa-briefcase"></i>
                </div>
                <h5 class="card-title text-center">${title}</h5>
                <div class="card-divider"></div>
                <p class="card-text">${description}</p>
              </div>
              <div class="card-footer text-center">
                <button class="btn btn-light mb-2 roadmap-btn" onclick="showRoadmap('${encodeURIComponent(title)}')">
                  <span class="btn-text">View Career Roadmap</span>
                  <div class="loading-spinner d-none">
                    <div class="spinner"></div>
                  </div>
                </button>
                <button class="btn btn-light linkedin-btn">
                  <a href="https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(title)}" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                    </svg>
                    LinkedIn Jobs
                  </a>
                </button>
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
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
          <style>
            body {
              font-family: 'Inter', sans-serif;
              margin: 20px;
              line-height: 1.6;
              background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
              min-height: 100vh;
            }

            .container {
              padding: 2rem;
            }

            h1 {
              color: white;
              font-size: 2.5rem;
              font-weight: 800;
              text-align: center;
              margin-bottom: 3rem;
              background: linear-gradient(to right, #fff, #94a3b8);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              text-shadow: 0 2px 10px rgba(255,255,255,0.1);
            }

            .career-card {
              border: none;
              border-radius: 20px;
              overflow: hidden;
              transition: all 0.3s ease;
              backdrop-filter: blur(10px);
            }

            .gradient-gold {
              background: linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 234, 0, 0.15) 100%);
              border: 1px solid rgba(255, 215, 0, 0.3);
            }

            .gradient-pink {
              background: linear-gradient(135deg, rgba(255, 105, 180, 0.15) 0%, rgba(255, 20, 147, 0.15) 100%);
              border: 1px solid rgba(255, 105, 180, 0.3);
            }

            .gradient-purple {
              background: linear-gradient(135deg, rgba(128, 0, 128, 0.15) 0%, rgba(218, 112, 214, 0.15) 100%);
              border: 1px solid rgba(128, 0, 128, 0.3);
            }

            .career-card:hover {
              transform: translateY(-10px);
            }

            .gradient-gold:hover {
              box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
            }

            .gradient-pink:hover {
              box-shadow: 0 0 30px rgba(255, 105, 180, 0.3);
            }

            .gradient-purple:hover {
              box-shadow: 0 0 30px rgba(128, 0, 128, 0.3);
            }

            .card-icon {
              width: 60px;
              height: 60px;
              margin: 0 auto 1.5rem;
              background: linear-gradient(135deg, #4f46e5 0%, #ec4899 100%);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.5rem;
              color: white;
              transition: all 0.3s ease;
            }

            .career-card:hover .card-icon {
              transform: rotate(360deg);
            }

            .card-title {
              font-size: 1.5rem;
              font-weight: 700;
              color: #fff;
              margin-bottom: 1rem;
            }

            .card-divider {
              height: 2px;
              background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
              margin: 1rem 0;
            }

            .card-text {
              color: rgba(255,255,255,0.8);
              font-size: 0.95rem;
              line-height: 1.6;
            }

            .card-footer {
              background: rgba(0,0,0,0.1);
              border-top: 1px solid rgba(255,255,255,0.1);
              padding: 1.5rem;
            }

            .btn {
              border: none;
              border-radius: 12px;
              padding: 0.8rem 1.5rem;
              font-weight: 600;
              transition: all 0.3s ease;
              width: 100%;
              position: relative;
              overflow: hidden;
            }

            .roadmap-btn {
              background: linear-gradient(135deg, #4f46e5 0%, #ec4899 100%);
              color: white;
              margin-bottom: 1rem !important;
            }

            .roadmap-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 5px 15px rgba(79, 70, 229, 0.4);
            }

            .linkedin-btn {
              background: #0077b5;
              color: white;
            }

            .linkedin-btn:hover {
              background: #006097;
              transform: translateY(-2px);
            }

            .linkedin-btn a {
              color: white;
              text-decoration: none;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0.5rem;
            }

            /* Loading Spinner */
            .loading-spinner {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }

            .spinner {
              width: 24px;
              height: 24px;
              border: 3px solid rgba(255,255,255,0.3);
              border-radius: 50%;
              border-top-color: white;
              animation: spin 1s ease-in-out infinite;
            }

            @keyframes spin {
              to { transform: rotate(360deg); }
            }

            .d-none {
              display: none;
            }

            @media (max-width: 768px) {
              .container {
                padding: 1rem;
              }
              
              h1 {
                font-size: 2rem;
                margin-bottom: 2rem;
              }
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

          <script>
            function showRoadmap(title) {
              const btn = event.target.closest('.roadmap-btn');
              const btnText = btn.querySelector('.btn-text');
              const spinner = btn.querySelector('.loading-spinner');
              
              // Show loading state
              btnText.style.opacity = '0';
              spinner.classList.remove('d-none');
              
              // Navigate to roadmap after a short delay
              setTimeout(() => {
                window.location.href = '/career-roadmap/' + title;
              }, 800);
            }
          </script>
        </body>
        </html>
      `);
    } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).send("An error occurred while generating content.");
    }
  };
  
  
    


 

  // Update the roadmap route
  router.get('/career-roadmap/:role', async (req, res) => {
    try {
        const role = decodeURIComponent(req.params.role);
        // Use the same model as the one defined at the top of the file
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Updated prompt with better structure
        const prompt = `As a career counselor, create a detailed 12-week roadmap for becoming a ${role}.

Format your response as a JSON object with exactly this structure:
{
    "overview": {
        "roleDescription": "A clear 2-3 sentence description of the ${role} position",
        "requiredSkills": "A comma-separated list of key technical and soft skills required",
        "careerGrowth": "3-4 potential career advancement paths and opportunities",
        "salaryRange": "Typical salary range for entry-level to senior positions"
    },
    "weeks": [
        {
            "focus": "The main learning objective for Week 1",
            "topics": [
                "Specific topic 1 to learn",
                "Specific topic 2 to learn",
                "Specific topic 3 to learn"
            ],
            "resources": [
                "Specific online course or tutorial link",
                "Recommended book or documentation",
                "Practice exercise or project idea"
            ]
        }
    ]
}

Important guidelines:
1. Make the content specific to ${role}
2. Include exactly 12 weeks of content
3. Each week should have 3-5 topics and resources
4. Resources should be specific and actionable
5. Ensure proper JSON formatting
6. No placeholder text or "example" content
7. All content should be practical and industry-relevant

Remember to maintain valid JSON structure with proper quotes and commas.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let roadmapData;

        try {
            const responseText = response.text();
            // Extract JSON from the response if it's wrapped in other text
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            const jsonStr = jsonMatch ? jsonMatch[0] : responseText;
            roadmapData = JSON.parse(jsonStr);

            // Ensure we have exactly 12 weeks
            if (!roadmapData.weeks || roadmapData.weeks.length < 12) {
                const weekTemplate = {
                    focus: "Continue building practical skills",
                    topics: [
                        "Advanced concepts",
                        "Industry best practices",
                        "Professional development"
                    ],
                    resources: [
                        "Online courses and tutorials",
                        "Industry documentation",
                        "Practice projects"
                    ]
                };
                roadmapData.weeks = Array(12).fill(null).map((_, index) => 
                    roadmapData.weeks && roadmapData.weeks[index] 
                        ? roadmapData.weeks[index] 
                        : weekTemplate
                );
            }

            // Validate overview structure
            if (!roadmapData.overview) {
                roadmapData.overview = {
                    roleDescription: `Detailed description of ${role} role and responsibilities`,
                    requiredSkills: "Key technical and soft skills required for this role",
                    careerGrowth: "Career advancement opportunities and growth paths",
                    salaryRange: "Typical salary range for this position"
                };
            }
        } catch (parseError) {
            console.error('Error parsing JSON response:', parseError);
            console.log('Raw response:', response.text());
            
            // Structured fallback data
            roadmapData = {
                overview: {
                    roleDescription: `A ${role} is a professional who specializes in designing, developing, and implementing solutions in their field.`,
                    requiredSkills: "Technical expertise, problem-solving, communication, teamwork, and continuous learning ability",
                    careerGrowth: "Career paths include senior roles, team leadership, technical architecture, and specialized consulting",
                    salaryRange: "Entry-level to senior positions typically range from $50,000 to $150,000+ depending on experience and location"
                },
                weeks: Array(12).fill(null).map((_, i) => ({
                    focus: `Week ${i + 1}: Core ${role} Skills and Knowledge`,
                    topics: [
                        "Fundamental concepts and principles",
                        "Industry-standard tools and practices",
                        "Professional development skills"
                    ],
                    resources: [
                        "Online learning platforms (Coursera, Udemy)",
                        "Professional documentation and guides",
                        "Hands-on projects and exercises"
                    ]
                }))
            };
        }

        res.render('career_roadmap', {
            role: role,
            overview: roadmapData.overview,
            weeks: roadmapData.weeks
        });
    } catch (error) {
        console.error('Error generating roadmap:', error);
        
        // More specific fallback data
        const fallbackData = {
            overview: {
                roleDescription: `We're currently preparing a detailed description of the ${role} position. This role typically involves specialized work in the field.`,
                requiredSkills: "Core technical skills, problem-solving abilities, and professional competencies specific to the role",
                careerGrowth: "Various advancement opportunities including senior positions, leadership roles, and specialized paths",
                salaryRange: "Competitive compensation based on experience and location"
            },
            weeks: Array(12).fill(null).map((_, i) => ({
                focus: `Week ${i + 1}: Essential Skills Development`,
                topics: [
                    "Core concepts and fundamentals",
                    "Professional tools and technologies",
                    "Industry best practices"
                ],
                resources: [
                    "Industry-leading online courses",
                    "Professional documentation",
                    "Practical exercises and projects"
                ]
            }))
        };

        res.render('career_roadmap', {
            role: role,
            overview: fallbackData.overview,
            weeks: fallbackData.weeks
        });
    }
});

module.exports = router;