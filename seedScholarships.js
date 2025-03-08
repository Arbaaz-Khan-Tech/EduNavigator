const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://sachinchaurasiya69:606280Sk@tesing.8vhz1.mongodb.net/education', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Define the Scholarship Schema
const scholarshipSchema = new mongoose.Schema({
    name: String,
    eligibility: String,
    casteCategory: String,
    educationLevel: String,
    state: String,
    course: String,
    link: String,
    
    
});

// Create a Scholarship Model
const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

// Data to seed
const scholarshipsData = [
    {
        "name": "National Means Cum Merit Scholarship",
        "eligibility": "Students from class IX to XII with family income less than ₹1.5 lakh per annum",
        "casteCategory": "All",
        "educationLevel": "High School",
        "course": "Science",
        "state": "Maharashtra",
        "link": "https://scholarships.gov.in/"
    },
    {
        "name": "Post-Matric Scholarship for SC Students",
        "eligibility": "SC students pursuing post-matriculation courses",
        "casteCategory": "SC",
        "educationLevel": "Undergraduate",
        "course": "B.Tech",
        "state": "Karnataka",
        "link": "https://scholarships.gov.in/"
    },
    {
        "name": "Central Sector Scheme of Scholarships for College and University Students",
        "eligibility": "Students pursuing higher education with family income below ₹6 lakh per annum",
        "casteCategory": "All",
        "educationLevel": "Postgraduate",
        "course": "MBA",
        "state": "Delhi",
        "link": "https://scholarships.gov.in/"
    },
    {
        "name": "Mukhyamantri Medhavi Vidyarthi Yojana",
        "eligibility": "Students with 75% or above in 12th standard and family income less than ₹6 lakh per annum",
        "casteCategory": "All",
        "educationLevel": "Undergraduate",
        "course": "B.Sc",
        "state": "Madhya Pradesh",
        "link": "https://scholarships.mp.gov.in/"
    },
    {
        "name": "Pre-Matric Scholarship for OBC Students",
        "eligibility": "OBC students in classes IX and X",
        "casteCategory": "OBC",
        "educationLevel": "High School",
        "course": "Arts",
        "state": "Rajasthan",
        "link": "https://scholarships.gov.in/"
    },
    {
        "name": "Dr. Ambedkar Post-Matric Scholarship for Economically Backward Class Students",
        "eligibility": "EBC students pursuing post-matriculation courses",
        "casteCategory": "EBC",
        "educationLevel": "Undergraduate",
        "course": "B.Com",
        "state": "Uttar Pradesh",
        "link": "https://scholarships.gov.in/"
    },
    {
        "name": "Post-Matric Scholarship for ST Students",
        "eligibility": "ST students pursuing post-matriculation courses",
        "casteCategory": "ST",
        "educationLevel": "Postgraduate",
        "course": "M.Tech",
        "state": "Chhattisgarh",
        "link": "https://scholarships.gov.in/"
    },
    {
        "name": "Merit-cum-Means Scholarship for Professional and Technical Courses",
        "eligibility": "Minority students pursuing professional and technical courses",
        "casteCategory": "Minority",
        "educationLevel": "Undergraduate",
        "course": "B.Tech",
        "state": "Kerala",
        "link": "https://scholarships.gov.in/"
    },
    {
        "name": "National Talent Search Examination",
        "eligibility": "Students in class X with outstanding academic performance",
        "casteCategory": "All",
        "educationLevel": "High School",
        "course": "Science",
        "state": "Punjab",
        "link": "https://ncert.nic.in/"
    },
    {
        "name": "Bikash Bhavan Scholarship",
        "eligibility": "Students with at least 75% in the last exam and family income less than ₹2.5 lakh per annum",
        "casteCategory": "All",
        "educationLevel": "Undergraduate",
        "course": "BA",
        "state": "West Bengal",
        "link": "https://wb.gov.in/"
    },
    {
        "name": "Jharkhand State Post Matric Scholarship",
        "eligibility": "ST/SC/OBC students pursuing higher education",
        "casteCategory": "SC/ST/OBC",
        "educationLevel": "Postgraduate",
        "course": "MA",
        "state": "Jharkhand",
        "link": "https://scholarships.gov.in/"
    },
    {
        "name": "Goa Education Trust Scholarship",
        "eligibility": "Students from Goa pursuing postgraduate education in any field",
        "casteCategory": "All",
        "educationLevel": "Postgraduate",
        "course": "M.Sc",
        "state": "Goa",
        "link": "https://britishcouncil.in/"
    },
    {
        "name": "Dr. Ambedkar Scholarship for Economically Backward Classes",
        "eligibility": "EBC students with family income below ₹1 lakh per annum",
        "casteCategory": "EBC",
        "educationLevel": "High School",
        "course": "Commerce",
        "state": "Haryana",
        "link": "https://scholarships.gov.in/"
    },
    {
        "name": "Vidyasiri Scholarship",
        "eligibility": "SC/ST/OBC students with family income less than ₹2.5 lakh per annum",
        "casteCategory": "SC/ST/OBC",
        "educationLevel": "Undergraduate",
        "course": "B.Sc",
        "state": "Karnataka",
        "link": "https://karnataka.gov.in/"
    },
    {
        "name": "Telangana ePASS Scholarship",
        "eligibility": "SC/ST/BC/EBC students pursuing undergraduate or postgraduate courses",
        "casteCategory": "SC/ST/BC/EBC",
        "educationLevel": "Undergraduate",
        "course": "B.Tech",
        "state": "Telangana",
        "link": "https://telanganaepass.cgg.gov.in/"
    },
    {
        "name": "Tamil Nadu Government Merit Scholarship",
        "eligibility": "Students with 75% or above in their previous exam and family income less than ₹2 lakh per annum",
        "casteCategory": "All",
        "educationLevel": "Undergraduate",
        "course": "B.Com",
        "state": "Tamil Nadu",
        "link": "https://scholarships.gov.in/"
    },
    {
        "name": "National Overseas Scholarship for SC Students",
        "eligibility": "SC students pursuing higher studies abroad",
        "casteCategory": "SC",
        "educationLevel": "Postgraduate",
        "course": "MBA",
        "state": "Andhra Pradesh",
        "link": "https://scholarships.gov.in/"
    },
    {
        "name": "Mizoram State Scholarship",
        "eligibility": "Students belonging to SC/ST/OBC pursuing higher education",
        "casteCategory": "SC/ST/OBC",
        "educationLevel": "Postgraduate",
        "course": "M.Tech",
        "state": "Mizoram",
        "link": "https://scholarships.gov.in/"
    },
    {
        "name": "Himachal Pradesh State Merit Scholarship",
        "eligibility": "Students with 75% or above in the last exam and family income less than ₹2 lakh per annum",
        "casteCategory": "All",
        "educationLevel": "High School",
        "course": "Science",
        "state": "Himachal Pradesh",
        "link": "https://hpepass.cgg.gov.in/"
    },
{
    "name": "National Means Cum Merit Scholarship",
    "eligibility": "Students from class IX to XII with family income less than ₹1.5 lakh per annum",
    "casteCategory": "All",
    "educationLevel": "High School",
    "course": "Science",
    "state": "Maharashtra",
    "link": "https://scholarships.gov.in/"
},
{
    "name": "State Merit Scholarship",
    "eligibility": "Students in class XI and XII who secured 60% in SSC exam",
    "casteCategory": "All",
    "educationLevel": "High School",
    "course": "Science",
    "state": "Maharashtra",
    "link": "https://mahadbtmahait.gov.in/"
},

// Karnataka - Undergraduate - B.Tech
{
    "name": "Post-Matric Scholarship for SC Students",
    "eligibility": "SC students pursuing post-matriculation courses",
    "casteCategory": "SC",
    "educationLevel": "Undergraduate",
    "course": "B.Tech",
    "state": "Karnataka",
    "link": "https://scholarships.gov.in/"
},
{
    "name": "Karnataka Minority Scholarship",
    "eligibility": "Minority students pursuing professional courses like engineering",
    "casteCategory": "Minority",
    "educationLevel": "Undergraduate",
    "course": "B.Tech",
    "state": "Karnataka",
    "link": "https://karnataka.gov.in/"
},

// Delhi - Postgraduate - MBA
{
    "name": "Central Sector Scheme of Scholarships for College and University Students",
    "eligibility": "Students pursuing higher education with family income below ₹6 lakh per annum",
    "casteCategory": "All",
    "educationLevel": "Postgraduate",
    "course": "MBA",
    "state": "Delhi",
    "link": "https://scholarships.gov.in/"
},
{
    "name": "Delhi Higher Education and Skill Development Scholarship",
    "eligibility": "Students pursuing higher education in recognized institutions",
    "casteCategory": "All",
    "educationLevel": "Postgraduate",
    "course": "MBA",
    "state": "Delhi",
    "link": "https://delhi.gov.in/"
},

// Madhya Pradesh - Undergraduate - B.Sc
{
    "name": "Mukhyamantri Medhavi Vidyarthi Yojana",
    "eligibility": "Students with 75% or above in 12th standard and family income less than ₹6 lakh per annum",
    "casteCategory": "All",
    "educationLevel": "Undergraduate",
    "course": "B.Sc",
    "state": "Madhya Pradesh",
    "link": "https://scholarships.mp.gov.in/"
},
{
    "name": "Gaon Ki Beti Yojana",
    "eligibility": "Female students from rural areas with family income less than ₹6 lakh per annum",
    "casteCategory": "All",
    "educationLevel": "Undergraduate",
    "course": "B.Sc",
    "state": "Madhya Pradesh",
    "link": "https://scholarships.mp.gov.in/"
},

// Rajasthan - High School - Arts
{
    "name": "Pre-Matric Scholarship for OBC Students",
    "eligibility": "OBC students in classes IX and X",
    "casteCategory": "OBC",
    "educationLevel": "High School",
    "course": "Arts",
    "state": "Rajasthan",
    "link": "https://scholarships.gov.in/"
},
{
    "name": "Rajasthan Government Scholarship for SC Students",
    "eligibility": "SC students with family income less than ₹2.5 lakh per annum",
    "casteCategory": "SC",
    "educationLevel": "High School",
    "course": "Arts",
    "state": "Rajasthan",
    "link": "https://rajpms.nic.in/"
},

// Uttar Pradesh - Undergraduate - B.Com
{
    "name": "Dr. Ambedkar Post-Matric Scholarship for Economically Backward Class Students",
    "eligibility": "EBC students pursuing post-matriculation courses",
    "casteCategory": "EBC",
    "educationLevel": "Undergraduate",
    "course": "B.Com",
    "state": "Uttar Pradesh",
    "link": "https://scholarships.gov.in/"
},
{
    "name": "Post-Matric Scholarship for OBC Students",
    "eligibility": "OBC students pursuing undergraduate courses",
    "casteCategory": "OBC",
    "educationLevel": "Undergraduate",
    "course": "B.Com",
    "state": "Uttar Pradesh",
    "link": "https://scholarships.gov.in/"
},

// Chhattisgarh - Postgraduate - M.Tech
{
    "name": "Post-Matric Scholarship for ST Students",
    "eligibility": "ST students pursuing post-matriculation courses",
    "casteCategory": "ST",
    "educationLevel": "Postgraduate",
    "course": "M.Tech",
    "state": "Chhattisgarh",
    "link": "https://scholarships.gov.in/"
},
{
    "name": "Chhattisgarh Merit Scholarship",
    "eligibility": "Students with 75% or more in the previous exam and family income less than ₹2.5 lakh per annum",
    "casteCategory": "All",
    "educationLevel": "Postgraduate",
    "course": "M.Tech",
    "state": "Chhattisgarh",
    "link": "https://scholarships.cg.nic.in/"
},

// Kerala - Undergraduate - B.Tech
{
    "name": "Merit-cum-Means Scholarship for Professional and Technical Courses",
    "eligibility": "Minority students pursuing professional and technical courses",
    "casteCategory": "Minority",
    "educationLevel": "Undergraduate",
    "course": "B.Tech",
    "state": "Kerala",
    "link": "https://scholarships.gov.in/"
},
{
    "name": "Post-Matric Scholarship for OBC Students",
    "eligibility": "OBC students pursuing professional and technical courses",
    "casteCategory": "OBC",
    "educationLevel": "Undergraduate",
    "course": "B.Tech",
    "state": "Kerala",
    "link": "https://scholarships.gov.in/"
},

// Punjab - High School - Science
{
    "name": "National Talent Search Examination",
    "eligibility": "Students in class X with outstanding academic performance",
    "casteCategory": "All",
    "educationLevel": "High School",
    "course": "Science",
    "state": "Punjab",
    "link": "https://ncert.nic.in/"
},
{
    "name": "Punjab Pre-Matric Scholarship for SC Students",
    "eligibility": "SC students in class IX and X",
    "casteCategory": "SC",
    "educationLevel": "High School",
    "course": "Science",
    "state": "Punjab",
    "link": "https://scholarships.gov.in/"
},

// West Bengal - Undergraduate - BA
{
    "name": "Bikash Bhavan Scholarship",
    "eligibility": "Students with at least 75% in the last exam and family income less than ₹2.5 lakh per annum",
    "casteCategory": "All",
    "educationLevel": "Undergraduate",
    "course": "BA",
    "state": "West Bengal",
    "link": "https://wb.gov.in/"
},
{
    "name": "Kanyashree Prakalpa Scholarship",
    "eligibility": "Female students above the age of 18 pursuing higher education",
    "casteCategory": "All",
    "educationLevel": "Undergraduate",
    "course": "BA",
    "state": "West Bengal",
    "link": "https://wb.gov.in/"
    },

// maharashtra data

{
    "name": "Maharashtra Government Merit Scholarship",
    "eligibility": "General category students pursuing B.Tech with 75% in 12th grade",
    "casteCategory": "General",
    "educationLevel": "Undergraduate",
    "course": "B.Tech",
    "state": "Maharashtra",
    "link": "https://mahadbtmahait.gov.in/"
},
{
    "name": "Chief Minister's Scholarship for Professional Courses",
    "eligibility": "General category students from economically weaker sections pursuing B.Tech",
    "casteCategory": "General",
    "educationLevel": "Undergraduate",
    "course": "B.Tech",
    "state": "Maharashtra",
    "link": "https://mahadbtmahait.gov.in/"
},
{
    "name": "Maharashtra E-Scholarship for Engineering Students",
    "eligibility": "General category students pursuing B.Tech with family income less than ₹6 lakh per annum",
    "casteCategory": "General",
    "educationLevel": "Undergraduate",
    "course": "B.Tech",
    "state": "Maharashtra",
    "link": "https://scholarships.gov.in/"
},
{
    "name": "Dr. APJ Abdul Kalam Scholarship",
    "eligibility": "General category B.Tech students with excellent academic performance",
    "casteCategory": "General",
    "educationLevel": "Undergraduate",
    "course": "B.Tech",
    "state": "Maharashtra",
    "link": "https://mahadbtmahait.gov.in/"
},
{
    "name": "MahaDBT Scholarship for Engineering Students",
    "eligibility": "General category students pursuing B.Tech with a minimum of 60% in 12th grade",
    "casteCategory": "General",
    "educationLevel": "Undergraduate",
    "course": "B.Tech",
    "state": "Maharashtra",
    "link": "https://mahadbtmahait.gov.in/"
},
{
    "name": "Maharashtra Talent Search Scholarship",
    "eligibility": "Top-performing general category students in B.Tech courses with 70% and above",
    "casteCategory": "General",
    "educationLevel": "Undergraduate",
    "course": "B.Tech",
    "state": "Maharashtra",
    "link": "https://mahadbtmahait.gov.in/"
},
{
    "name": "Maharashtra Higher Education Scholarship",
    "eligibility": "General category students with excellent academic records pursuing B.Tech",
    "casteCategory": "General",
    "educationLevel": "Undergraduate",
    "course": "B.Tech",
    "state": "Maharashtra",
    "link": "https://mahadbtmahait.gov.in/"
},
{
    "name": "Rajiv Gandhi Science and Technology Scholarship",
    "eligibility": "General category students enrolled in B.Tech with financial needs",
    "casteCategory": "General",
    "educationLevel": "Undergraduate",
    "course": "B.Tech",
    "state": "Maharashtra",
    "link": "https://scholarships.gov.in/"
},
{
    "name": "Vidya Lakshmi Scholarship for Engineers",
    "eligibility": "General category students pursuing B.Tech with family income less than ₹8 lakh per annum",
    "casteCategory": "General",
    "educationLevel": "Undergraduate",
    "course": "B.Tech",
    "state": "Maharashtra",
    "link": "https://vidyalakshmi.co.in/"
},
{
    "name": "Engineering Excellence Scholarship",
    "eligibility": "General category students with 80% and above in 12th grade pursuing B.Tech",
    "casteCategory": "General",
    "educationLevel": "Undergraduate",
    "course": "B.Tech",
    "state": "Maharashtra",
    "link": "https://mahadbtmahait.gov.in/"
    }


];

// Seed the data into the database
Scholarship.insertMany(scholarshipsData)
    .then(() => {
        console.log('Data successfully seeded into the database');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error seeding data:', err);
    });