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


// API Key has been revoked





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



let app = express();
const path = require('path');


// Set the public folder to serve static files
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost:27017/collegeDB");


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


app.get('/an', (req, res) => {
    res.render('anima')
});


app.get('/resume', (req, res) => {
    res.render('resume')
});

app.get('/verify',(req,res)=>{
    res.render('blockchain')
})