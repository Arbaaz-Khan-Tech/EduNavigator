
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')



router.get('/', (req, res) => {
    res.render('home');
});

router.post('/send-email', (req, res) => {
    const { name, email, mobile, education, language, careerGoals, date, time } = req.body;

    // Set up Nodemailer
 
    let transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465, // For SSL
        secure: true, // Use true for 465 and false for 587
        auth: {
            user: 'pranavrane030105@yahoo.com', // Your email
          pass: 'msaoyjbaussjoeor' // The generated app password from Yahoo
        }
      });
    // Email options
    let mailOptions = {
        from: 'pranavrane030105@yahoo.com', // sender address
        to: 'mfive2072@gmail.com', // list of receivers
        subject: 'New Demo Request', // Subject line
        text: `
        Name: ${name}
        Email: ${email}
        Mobile: ${mobile}
        Current Education Level: ${education}
        Language: ${language}
        Career Interests/Goals: ${careerGoals}
        Appointment Date: ${date}
        Appointment Time: ${time}
        `, // Email body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send(`
                <p>Error sending email.</p>
                <script>
                    setTimeout(function() {
                        window.location.href = '/';
                    }, 3000); // 3000ms = 3 seconds
                </script>
            `);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send(`
                <p>Email sent successfully.</p>
                <script>
                    setTimeout(function() {
                        window.location.href = '/';
                    }, 3000); // 3000ms = 3 seconds
                </script>
            `);
        }
    });
    
});


module.exports = router;

