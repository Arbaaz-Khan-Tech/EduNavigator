const express = require('express');
const router = express.Router();       //igore this go to ai_cat
const SkillsAndInterests = require('../model/carrer.js');

router.get('/Recommendation', (req, res) => {
    res.render('Recommendation');
});

router.get('/career-counseling', (req, res) => {
    const skills = ['Python', 'JavaScript', 'Java', 'C++'];
    const interests = ['Data Science', 'Web Development', 'Machine Learning', 'Cybersecurity'];

    res.render('Carrer_Rec', { skills, interests });
});

router.post('/career-recommendations', (req, res) => {
    const selectedSkills = Array.isArray(req.body.skills) ? req.body.skills : [];
    const selectedInterests = Array.isArray(req.body.interests) ? req.body.interests : [];

    const recommendations = {
        "Python": ["Data Scientist", "Machine Learning Engineer", "Data Analyst"],
        "JavaScript": ["Web Developer", "Frontend Developer", "Full Stack Developer"],
        "Java": ["Software Engineer", "Backend Developer", "Android Developer"],
        "C++": ["Game Developer", "System Software Developer", "Embedded Systems Engineer"],
        "Data Science": ["Data Scientist", "Data Analyst", "Business Intelligence Analyst"],
        "Web Development": ["Web Developer", "Frontend Developer", "Full Stack Developer"],
        "Machine Learning": ["Machine Learning Engineer", "Data Scientist", "AI Researcher"],
        "Cybersecurity": ["Security Analyst", "Penetration Tester", "Cybersecurity Consultant"]
    };

    let recommendedCareers = [];

    selectedSkills.forEach(skill => {
        if (recommendations[skill]) {
            recommendedCareers = recommendedCareers.concat(recommendations[skill]);
        }
    });

    selectedInterests.forEach(interest => {
        if (recommendations[interest]) {
            recommendedCareers = recommendedCareers.concat(recommendations[interest]);
        }
    });

    recommendedCareers = [...new Set(recommendedCareers)];

    res.render('Carrer_Results', { careers: recommendedCareers });
});

module.exports = router;
