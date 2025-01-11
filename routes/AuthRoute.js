const express = require('express');
const router = express.Router();
const User = require('../model/User'); // Assuming you have a User model
const passport = require('passport');
require('dotenv').config();
require('../passport'); // Ensure you have passport strategies configured

// Environment variables
const sessionSecret = process.env.SESSION_SECRET;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// Registration route
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password, isPoster } = req.body;
  const user = new User({ username, password, isPoster });
  await user.save();
  res.redirect('/jobs');
});

// Login routes
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Authenticate user (e.g., with your User model)
    const user = await User.findOne({ username });
  
    if (user && user.password === password) {
      // Save the user ID in the session
      req.session.userId = user._id;
  
      // Redirect or send a response after login
      res.render('home');
    } else {
      res.status(401).send('Authentication failed');
    }
  });

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Error logging out');
      }
      res.redirect('/login');
    });
  });
  
// Google Auth Routes



// Google authentication route
router.get('/auth/google', passport.authenticate('google', { 
    scope: [ 'email', 'profile' ] 
})); 

// Google authentication callback
router.get('/auth/google/callback', passport.authenticate('google', { 
    successRedirect: '/success', 
    failureRedirect: '/failure'
}));

// Success route
router.get('/success', (req, res) => { 
    if (!req.user) {
        return res.redirect('/failure');
    }
    console.log(req.user);
    res.send("Welcome " + req.user.email); 
});

// Failure route
router.get('/failure', (req, res) => { 
    res.send("Error during authentication"); 
});

module.exports = router;
