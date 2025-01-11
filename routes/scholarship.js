const express = require('express');
const router = express.Router();
const Scholarship = require('../model/Scholarship');

// Route to render scholarship.ejs form
router.get('/scholarship', async(req, res) => {
    res.render('scholarship');
});

// Route to handle scholarship results
router.get('/scholarship_res', async (req, res) => {
    const {casteCategory,currentEducation,course,state } = req.query;
     
    try {
        const scholarships = await Scholarship.find({
            casteCategory: casteCategory,
            educationLevel: currentEducation,
            course: course,
            state: state
        });

        res.render('scholarship_res', {
            scholarships: scholarships,
            selectedCourse: course,
            selectedState: state,
            selectedCaste: casteCategory
        });
    
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;