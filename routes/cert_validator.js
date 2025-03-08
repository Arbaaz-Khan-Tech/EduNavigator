const express = require('express');
const router = express.Router();

router.get('/Certificate_Validator', (req, res) => {
    res.render('Cert_Validator');
});

module.exports = router;
