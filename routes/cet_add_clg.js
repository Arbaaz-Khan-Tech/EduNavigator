
const express = require('express');
const router = express.Router();
const College = require('../model/cetCollege');


router.get('/admin_add_cet',(req,res)=>{
    res.render('cet_add_clg')
})

router.post('/add_cet_clg',async (req, res) => {
    console.log(req.body); // Log the request body to see its structure

    const { name, university, location, branch, cutoffs } = req.body;

    try {
        const newCollege = new College({
            name,
            university,
            location,
            branches: [
                {
                    name: branch,
                    cutoffs: cutoffs.map(cutoff => ({
                        category: cutoff.category,
                        cetScore: cutoff.cetScore,
                        round: cutoff.round,
                        year: cutoff.year
                    }))
                }
            ]
        });

        await newCollege.save();
        res.json({ success: true, message: 'College data saved successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error saving college data' });
    }
});


module.exports = router;
