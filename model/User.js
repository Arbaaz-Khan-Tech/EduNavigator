


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String,
    role: { type: String, enum: ['student', 'teacher', 'parent'], required: true },
    googleId: String, 
    email: String 
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);