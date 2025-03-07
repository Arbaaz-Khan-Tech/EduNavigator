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

//router post ka jaha tole dega 
router.post('/register', async (req, res) => {
  try {
      const { username, password, role } = req.body;

      const user = new User({ username, role });

      await User.register(user, password); // Use `await` instead of callback

      // Manually authenticate and log in the user after registration
      req.login(user, (err) => {
          if (err) {
              return res.status(500).send("Error logging in after registration.");
          }

          // Redirect based on role
          if (role === 'student') {
              return res.redirect('/');
          } else if (role === 'parent') {
              return res.redirect('/parent_home');
          } else if (role === 'teacher') {
              return res.redirect('/teacher_home');
          } else {
              return res.redirect('/'); // Default fallback
          }
      });

  } catch (err) {
      console.error("Registration error:", err);
      res.status(500).send("Error registering user.");
  }
});



// Login routes
router.get('/login', (req, res) => {
    res.render('login');
});

// Login POST request
router.post('/login', async (req, res) => {
  try {
      const { username, password, role } = req.body;

      const user = await User.findOne({ username, role });
      if (!user) {
          return res.status(401).send('User not found');
      }

      const authenticated = await user.authenticate(password);
      if (!authenticated) {
          return res.status(401).send('Invalid credentials');
      }

      req.session.userId = user._id;
      req.session.role = user.role;

      // Redirect based on role
      if (role === 'student') {
          return res.redirect('/');
      } else if (role === 'parent') {
          return res.redirect('/parent_home');
      } else if (role === 'teacher') {
          return res.redirect('/teacher_home');
      }

  } catch (err) {
      console.error("Login error:", err);
      res.status(500).send("Error during login.");
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
