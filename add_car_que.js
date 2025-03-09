const mongoose = require('mongoose');
const Question = require('./model/Carrer_Que'); // Adjust the path according to your folder structure
require('dotenv').config(); 
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  

  // This loads the .env variables


  
// Function to add 15 questions
const addQuestions = async () => {
  const questions = [
    { 
      questionText: "Which activity do you enjoy most?",
      category: "Technical",
      options: [
        { optionText: "Building a DIY project", category: "Technical" },
        { optionText: "Writing a story", category: "Creative" },
        { optionText: "Volunteering at an event", category: "Social/Leadership" },
        { optionText: "Solving a puzzle", category: "Analytical" }
      ]
    },
    {
      questionText: "What do you prefer doing in your free time?",
      category: "Creative",
      options: [
        { optionText: "Designing graphics or drawing", category: "Creative" },
        { optionText: "Experimenting with software", category: "Technical" },
        { optionText: "Leading a community project", category: "Social/Leadership" },
        { optionText: "Analyzing data", category: "Analytical" }
      ]
    },
    {
      questionText: "How would you describe your role in group projects?",
      category: "Social/Leadership",
      options: [
        { optionText: "Organizing and delegating tasks", category: "Social/Leadership" },
        { optionText: "Building and testing ideas", category: "Technical" },
        { optionText: "Brainstorming creative solutions", category: "Creative" },
        { optionText: "Analyzing the results", category: "Analytical" }
      ]
    },
    {
      questionText: "Which problem-solving method appeals to you?",
      category: "Analytical",
      options: [
        { optionText: "Working with data to find patterns", category: "Analytical" },
        { optionText: "Experimenting with new tools or technology", category: "Technical" },
        { optionText: "Leading a team towards a solution", category: "Social/Leadership" },
        { optionText: "Creating new and innovative designs", category: "Creative" }
      ]
    },
    {
      questionText: "Which activity would you prefer in a hands-on situation?",
      category: "Practical",
      options: [
        { optionText: "Operating machinery or equipment", category: "Practical" },
        { optionText: "Analyzing how to improve efficiency", category: "Analytical" },
        { optionText: "Developing new technology solutions", category: "Technical" },
        { optionText: "Designing new tools or products", category: "Creative" }
      ]
    },
    {
      questionText: "What excites you the most about a new project?",
      category: "Technical",
      options: [
        { optionText: "Experimenting with new tools or technologies", category: "Technical" },
        { optionText: "Brainstorming creative ideas", category: "Creative" },
        { optionText: "Working with others to achieve a common goal", category: "Social/Leadership" },
        { optionText: "Analyzing data and optimizing processes", category: "Analytical" }
      ]
    },
    {
      questionText: "Which activity would you enjoy the most?",
      category: "Creative",
      options: [
        { optionText: "Sketching a new design", category: "Creative" },
        { optionText: "Writing a software algorithm", category: "Technical" },
        { optionText: "Coordinating a team event", category: "Social/Leadership" },
        { optionText: "Developing a solution based on research", category: "Analytical" }
      ]
    },
    {
      questionText: "Which task in a group project do you prefer?",
      category: "Social/Leadership",
      options: [
        { optionText: "Managing and organizing the team", category: "Social/Leadership" },
        { optionText: "Solving technical problems", category: "Technical" },
        { optionText: "Creating visuals or content", category: "Creative" },
        { optionText: "Analyzing results and data", category: "Analytical" }
      ]
    },
    {
      questionText: "How do you approach challenges?",
      category: "Analytical",
      options: [
        { optionText: "Analyze the situation and find patterns", category: "Analytical" },
        { optionText: "Look for technical solutions", category: "Technical" },
        { optionText: "Think of innovative ways to solve them", category: "Creative" },
        { optionText: "Collaborate and lead a team to a solution", category: "Social/Leadership" }
      ]
    },
    {
      questionText: "Which type of task would you find most enjoyable?",
      category: "Practical",
      options: [
        { optionText: "Fixing or building something tangible", category: "Practical" },
        { optionText: "Analyzing how things work", category: "Analytical" },
        { optionText: "Developing new technology or tools", category: "Technical" },
        { optionText: "Designing or creating new ideas", category: "Creative" }
      ]
    },
    {
      questionText: "What is your preferred way of solving problems?",
      category: "Technical",
      options: [
        { optionText: "Experimenting with different solutions", category: "Technical" },
        { optionText: "Coming up with creative approaches", category: "Creative" },
        { optionText: "Collaborating with others to get a solution", category: "Social/Leadership" },
        { optionText: "Breaking down the problem and analyzing it", category: "Analytical" }
      ]
    },
    {
      questionText: "How would you spend your free time?",
      category: "Creative",
      options: [
        { optionText: "Creating art or design", category: "Creative" },
        { optionText: "Learning a new technical skill", category: "Technical" },
        { optionText: "Participating in community events", category: "Social/Leadership" },
        { optionText: "Solving complex puzzles", category: "Analytical" }
      ]
    },
    {
      questionText: "How would you contribute to a large project?",
      category: "Social/Leadership",
      options: [
        { optionText: "Organizing and managing the team", category: "Social/Leadership" },
        { optionText: "Handling technical tasks", category: "Technical" },
        { optionText: "Providing creative solutions", category: "Creative" },
        { optionText: "Analyzing data and processes", category: "Analytical" }
      ]
    },
    {
      questionText: "Which approach appeals to you the most?",
      category: "Analytical",
      options: [
        { optionText: "Solving problems through analysis", category: "Analytical" },
        { optionText: "Using technology to solve problems", category: "Technical" },
        { optionText: "Creating innovative solutions", category: "Creative" },
        { optionText: "Leading and motivating a team", category: "Social/Leadership" }
      ]
    },
    {
      questionText: "Which type of work environment do you prefer?",
      category: "Practical",
      options: [
        { optionText: "Hands-on tasks with clear outcomes", category: "Practical" },
        { optionText: "An office with problem-solving opportunities", category: "Analytical" },
        { optionText: "Working in a lab or with technology", category: "Technical" },
        { optionText: "Inspiring others through leadership", category: "Social/Leadership" }
      ]
    }
  ];

  try {
    await Question.insertMany(questions);
    console.log('Questions added successfully!');
  } catch (error) {
    console.log('Error adding questions:', error);
  } finally {
    mongoose.connection.close();
  }
};
