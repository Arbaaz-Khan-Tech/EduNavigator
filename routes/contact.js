const express = require('express');
const router = express.Router();
const Contact = require('../model/contactsch'); // Import the Contact model

// Route to render the contact form
router.get('/contact', (req, res) => {
  res.render('contact'); // Render the contact.ejs form
});

// Route to handle contact form submission
router.post('/contact/submit', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Create a new contact entry
    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });

    // Save the contact entry to the database
    await newContact.save();

    // Redirect to the success page after form submission
    res.redirect('/contact/success');
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).send('Server Error');
  }
});

// Route to render the success page after submission
router.get('/contact/success', (req, res) => {
  res.render('contact_suc'); // Render contact_suc.ejs
});

module.exports = router;
