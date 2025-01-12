


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String,
    googleId: String, // Add this field for Google login
    email: String // Optional: to store the email from Google profile
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);