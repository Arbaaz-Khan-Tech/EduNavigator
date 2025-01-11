
const express = require('express');
const router = express.Router();

router.get('/resources',(req,res)=>{
    res.render('resources')
})

module.exports = router;