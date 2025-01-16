# EduNavigator  (AI Powered Career and College Recommendation Website)

This is an AI-powered career and college recommendation website that leverages machine learning to provide personalized career and college suggestions to users based on their responses to various questions. The website also includes features such as quiz performance analysis, scholarship finder, hands-on learning, and a dashboard to track user progress.

## Features

- **Career Recommendations:** Based on the user's answers to a series of questions, the AI will analyze and recommend potential career paths.
  
- **Quiz with Performance Insights:** Users can take a quiz of 60 marks, and based on their answers, AI provides insights into their performance, including which category they are weak at (e.g., Quantitative).
  
- **Leaderboard:** A leaderboard displays the top-performing users in the quiz.
  
- **User Dashboard:** Users can track their quiz attempts, see performance trends with AI-driven insights, and visualize their progress over time.
  
- **Project-Based Learning (PBL) Mechanism:** Users can experience hands-on learning through various project-based activities.
  
- **College Recommendations:** Based on users' CET/JEE scores and selected preferences, the website suggests colleges that match their criteria.
  
- **Scholarship Finder:** The website helps users find potential scholarships based on their profile and performance.

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Frontend:** EJS Templating Engine
- **AI:** Gemini API for career and performance insights

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Arbaaz-Khan-Tech/EduNavigator.git
   ```

2. **Create `.env` File:**  
   In the root directory, create a `.env` file and add your **Gemini API key**.

   Example:
   ```
   API_KEY=your-api-key-here
   ```

3. **Install Dependencies:**
   In the project directory, run the following command to install the necessary dependencies:
   ```bash
   npm install
   ```

4. **Start the Application:**
   After the dependencies are installed, start the server:
   ```bash
   npm start
   ```

   The application will be live on `http://localhost:4000`.

## Folder Structure

```
/EduNavigator
|
|-- /models            # Mongoose models for MongoDB database
|-- /public            # Static assets (CSS, JavaScript, Images)
|-- /routes            # API routes and view routes
|-- /views             # EJS templates for rendering HTML pages
|-- .env               # Store sensitive environment variables
|-- app.js             # Main application file
|-- package.json       # Project dependencies and scripts
```




## Acknowledgements

- **Gemini API** for providing AI-driven insights and analysis.
- **MongoDB** for handling database management.
- **Express.js** and **Node.js** for the backend.
- **EJS** for rendering dynamic HTML templates.

## Contact

For any issues or questions, feel free to open an issue on the GitHub repository or reach out to the project maintainers.

---

Enjoy using the EduNavigator!
