const express = require('express');
const router = express.Router();

router.get('/exam_choice', (req, res) => {
    res.render('exam_choice');
});

module.exports = router;

