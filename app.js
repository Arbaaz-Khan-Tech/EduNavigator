// Filename - App.js

const express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose =
        require("passport-local-mongoose")
const User = require("./model/User.js");
const CetCollege = require('./model/cetCollege');
// const College = require('./model/College');

const http = require('http');
const WebSocket = require('ws');
const nodemailer = require('nodemailer');

const axios = require('axios');
// API Key has been revoked
require('dotenv').config();  




const homeRoutes = require('./routes/homeRoute.js');
const authRoutes = require('./routes/AuthRoute.js');
const carrerRecRoute = require('./routes/carrerRecRoute.js');
const blogRoutes = require('./routes/blogRoute.js');
const collegeRoutes = require('./routes/collegeRoutes.js')
const exam_choice = require('./routes/exam_choice.js')
const cet_add_clg = require('./routes/cet_add_clg.js')
const apti = require('./routes/apti.js')
const apti_res = require('./routes/stu_res.js')
const ai_carrer = require('./routes/ai_cat.js')
const chatbot = require('./routes/chatbot.js')
const Carrer_Trends = require('./routes/Carrer_Trends.js')
const jobs = require('./routes/job.js')
const resources = require('./routes/resources.js')
const contactRoutes = require('./routes/contact');
const scholarshipRoutes = require('./routes/scholarship');
const Mentor = require('./routes/mentor.js')
const PBL = require('./routes/pbl.js')
const project = require('./routes/project.js')
const Carrer_Test = require('./routes/Carrer_Test_Que.js')

const profileRoutes = require('./routes/profileRoute.js');
const teacherRoutes = require('./routes/teacherpRoute');
const studentlistRoutes = require('./routes/studentlistRoutes');
const parentProfileRoutes = require("./routes/parentProfileRoutes.js"); 
const carrer_bank = require('./routes/carrer_bank.js')
const teacherHomeRoutes = require("./routes/teacherhome.js");


const Cert = require('./routes/cert_validator.js')
const interview = require('./routes/Ai_Interview.js')


let app = express();
const path = require('path');


// Set the public folder to serve static files
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('Error connecting to MongoDB:', err));




app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.userId = req.session.userId || null;  // `userId` will be available in all templates
    next();
  });
// Middleware to check if the user is logged in
function checkLogin(req, res, next) {
    res.locals.isLoggedIn = !!req.session.userId;  // Pass the logged-in status to views
    next();  // Call the next middleware or route handler
  }

//=====================
//=====================
app.get('/favicon.ico', (req, res) => res.status(204));
// Showing home page
app.use(homeRoutes);
app.use(authRoutes);
app.use(carrerRecRoute);
app.use(blogRoutes);
app.use(collegeRoutes);
app.use(exam_choice)
app.use(cet_add_clg)
app.use(apti)
app.use(ai_carrer)
app.use(chatbot)
app.use(apti_res)
app.use(PBL)
app.use(project)
app.use(jobs)
app.use(Carrer_Trends)
app.use(resources)
app.use(contactRoutes);
app.use(scholarshipRoutes);
app.use(Mentor);
app.use(Carrer_Test)

app.use(profileRoutes);
app.use(teacherRoutes);
app.use(studentlistRoutes);
app.use(parentProfileRoutes);
app.use(carrer_bank)

app.use(Cert)
app.use(interview)
app.use(teacherHomeRoutes); // Use teacher home routes



// Define the isLoggedIn middleware (if it's in another file, require it instead)



app.listen(4000, () => {
    console.log('Listening on 4000');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    ws.on('message', message => {
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});
app.get('/vid', (req, res) => {
    res.render('vid')
});
app.get('/resources', (req, res) => {
    res.render('resources')
});

app.get('/mentor', (req, res) => {
    res.sendFile(__dirname + '/views/Mentor.html');
});

app.get('/an', (req, res) => {
    res.render('anima')
});


app.get('/resume', (req, res) => {
    res.render('resume')
});

app.get('/verify',(req,res)=>{
    res.render('blockchain')

});

app.get('/parent_home', (req, res) => {
    if (req.session.role !== 'parent') {
        return res.redirect('/login');
    }
    res.render('parent_home');
});

app.get('/teacher_home', (req, res) => {
    if (req.session.role !== 'teacher') {
        return res.redirect('/login');
    }
    res.render('teacher_home');
});




app.get('/carrer_resources',(req,res)=>{
    res.render('career_resources')
})



app.get('/webinars', (req, res) => {
    res.render('webinars');
});
