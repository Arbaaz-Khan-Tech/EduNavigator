// // // // addColleges.js
// // const mongoose = require('mongoose');
// // const College = require('./model/College');
// // // const SkillsAndInterests = require('./model/carrer');

// // mongoose.connect("mongodb://localhost:27017/collegeDB");
// // const colleges = [
// //     {
// //         name: 'Indian Institute of Technology Bombay',
// //         location: 'Mumbai',
// //         course: 'Computer Science Engineering',
// //         cutoffs: [
// //             { category: 'General', cetScore: 95, jeeScore: 99.9, year: 2023 },
// //             { category: 'EWS', cetScore: 90, jeeScore: 99.5, year: 2023 },
// //             { category: 'OBC-NCL', cetScore: 85, jeeScore: 98, year: 2023 },
// //             { category: 'SC', cetScore: 75, jeeScore: 95, year: 2023 },
// //             { category: 'ST', cetScore: 65, jeeScore: 90, year: 2023 },
// //             { category: 'PwD', cetScore: 50, jeeScore: 85, year: 2023 },
// //             { category: 'State Quota', cetScore: 80, jeeScore: 96, year: 2023 },
// //             { category: 'Management/NRI Quota', cetScore: 70, jeeScore: 88, year: 2023 }
// //         ]
// //     },
// //     {
// //         name: 'Veermata Jijabai Technological Institute (VJTI)',
// //         location: 'Mumbai',
// //         course: 'Mechanical Engineering',
// //         cutoffs: [
// //             { category: 'General', cetScore: 90, jeeScore: 98, year: 2023 },
// //             { category: 'EWS', cetScore: 85, jeeScore: 96, year: 2023 },
// //             { category: 'OBC-NCL', cetScore: 80, jeeScore: 95, year: 2023 },
// //             { category: 'SC', cetScore: 70, jeeScore: 92, year: 2023 },
// //             { category: 'ST', cetScore: 60, jeeScore: 85, year: 2023 },
// //             { category: 'PwD', cetScore: 45, jeeScore: 80, year: 2023 },
// //             { category: 'State Quota', cetScore: 75, jeeScore: 93, year: 2023 },
// //             { category: 'Management/NRI Quota', cetScore: 65, jeeScore: 86, year: 2023 }
// //         ]
// //     },
// //     {
// //         name: 'Vishwaniketan’s iMEET',
// //         location: 'Mumbai',
// //         course: 'Civil Engineering',
// //         cutoffs: [
// //             { category: 'General', cetScore: 85, jeeScore: 94, year: 2023 },
// //             { category: 'EWS', cetScore: 80, jeeScore: 92, year: 2023 },
// //             { category: 'OBC-NCL', cetScore: 75, jeeScore: 90, year: 2023 },
// //             { category: 'SC', cetScore: 65, jeeScore: 87, year: 2023 },
// //             { category: 'ST', cetScore: 55, jeeScore: 82, year: 2023 },
// //             { category: 'PwD', cetScore: 40, jeeScore: 78, year: 2023 },
// //             { category: 'State Quota', cetScore: 70, jeeScore: 89, year: 2023 },
// //             { category: 'Management/NRI Quota', cetScore: 60, jeeScore: 84, year: 2023 }
// //         ]
// //     },
// //     {
// //         name: 'Sardar Patel Institute of Technology',
// //         location: 'Mumbai',
// //         course: 'Information Technology',
// //         cutoffs: [
// //             { category: 'General', cetScore: 88, jeeScore: 97, year: 2023 },
// //             { category: 'EWS', cetScore: 83, jeeScore: 95, year: 2023 },
// //             { category: 'OBC-NCL', cetScore: 78, jeeScore: 93, year: 2023 },
// //             { category: 'SC', cetScore: 68, jeeScore: 89, year: 2023 },
// //             { category: 'ST', cetScore: 58, jeeScore: 84, year: 2023 },
// //             { category: 'PwD', cetScore: 43, jeeScore: 80, year: 2023 },
// //             { category: 'State Quota', cetScore: 73, jeeScore: 90, year: 2023 },
// //             { category: 'Management/NRI Quota', cetScore: 63, jeeScore: 85, year: 2023 }
// //         ]
// //     },
// //     {
// //         name: 'DJ Sanghvi College of Engineering',
// //         location: 'Mumbai',
// //         course: 'Electronics Engineering',
// //         cutoffs: [
// //             { category: 'General', cetScore: 87, jeeScore: 96, year: 2023 },
// //             { category: 'EWS', cetScore: 82, jeeScore: 94, year: 2023 },
// //             { category: 'OBC-NCL', cetScore: 77, jeeScore: 92, year: 2023 },
// //             { category: 'SC', cetScore: 67, jeeScore: 88, year: 2023 },
// //             { category: 'ST', cetScore: 57, jeeScore: 83, year: 2023 },
// //             { category: 'PwD', cetScore: 42, jeeScore: 79, year: 2023 },
// //             { category: 'State Quota', cetScore: 72, jeeScore: 89, year: 2023 },
// //             { category: 'Management/NRI Quota', cetScore: 62, jeeScore: 84, year: 2023 }
// //         ]
// //     }
// // ];



  
// // const insertData = async () => {
// //     try {
// //         await College.insertMany(colleges);
// //         console.log('Data inserted successfully!');

// //         // Fetch and log the inserted data
// //         const insertedData = await College.find({});
// //         console.log('Inserted Data:', insertedData);

// //         mongoose.connection.close();
// //     } catch (err) {
// //         console.error('Error inserting data:', err);
// //     }
// // };

// // insertData();
// // // const careers = [
// // //     { skill: 'Python', interest: 'Data Science', recommendedCareers: ['Data Scientist', 'Machine Learning Engineer', 'Data Analyst'] },
// // //     { skill: 'JavaScript', interest: 'Web Development', recommendedCareers: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer'] },
// // //     { skill: 'Java', interest: 'Software Engineering', recommendedCareers: ['Software Engineer', 'Java Developer', 'Android Developer'] },
// // //     { skill: 'C++', interest: 'Game Development', recommendedCareers: ['Game Developer', 'Software Engineer', 'Systems Programmer'] },
// // //     { skill: 'Python', interest: 'Machine Learning', recommendedCareers: ['Data Scientist', 'Machine Learning Engineer', 'AI Engineer'] },
// // //     { skill: 'JavaScript', interest: 'Cybersecurity', recommendedCareers: ['Security Analyst', 'Penetration Tester', 'Security Engineer'] },
// // //     { skill: 'Java', interest: 'Enterprise Development', recommendedCareers: ['Enterprise Java Developer', 'Backend Developer', 'Systems Architect'] },
// // //     { skill: 'C++', interest: 'Embedded Systems', recommendedCareers: ['Embedded Systems Engineer', 'Firmware Developer', 'Hardware Engineer'] },
// // //     { skill: 'Python', interest: 'Automation', recommendedCareers: ['Automation Engineer', 'SQA Engineer', 'Robotic Process Automation Developer'] },
// // //     { skill: 'JavaScript', interest: 'Mobile Development', recommendedCareers: ['Mobile Developer', 'React Native Developer', 'Cross-Platform Developer'] }
// // // ];

// // // const insertData = async () => {
// // //     try {
// // //         await Career.insertMany(careers);
// // //         console.log('Dummy data inserted successfully!');
// // //         mongoose.connection.close();
// // //     } catch (err) {
// // //         console.error('Error inserting data:', err);
// // //     }
// // // };

// // // insertData();



// // // const mongoose = require('mongoose');
// // // const SkillsAndInterests = require('./model/carrer'); // Adjust path as needed

// // // mongoose.connect('mongodb://localhost:27017/collegeDB', { useNewUrlParser: true, useUnifiedTopology: true });

// // // const insertData = async () => {
// // //     try {
// // //         const data = [
// // //             {
// // //                 skills: ['Python', 'JavaScript', 'Java', 'C++'],
// // //                 interests: ['Data Science', 'Web Development', 'Machine Learning', 'Cybersecurity'],
// // //                 recommendedCareers: [
// // //                     'Data Scientist',
// // //                     'Machine Learning Engineer',
// // //                     'Data Analyst',
// // //                     'Web Developer',
// // //                     'Cybersecurity Analyst'
// // //                 ]
// // //             }
// // //         ];

// // //         await SkillsAndInterests.insertMany(data);
// // //         console.log('Data inserted successfully!');
// // //         mongoose.connection.close();
// // //     } catch (err) {
// // //         console.error('Error inserting data:', err);
// // //     }
// // // };

// // // insertData();






// const mongoose = require('mongoose');
// const CetCollege = require('./model/College'); // Adjust the path if necessary

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('Failed to connect to MongoDB', err));

// // Dummy data


// // Dummy data
// const dummyColleges = [
//   {
//     university: {
//       name: 'University of Mumbai',
//       location: 'Mumbai'
//     },
//     colleges: [
//       {
//         name: 'VJTI',
//         branches: [
//           {
//             branch: 'Computer Engineering',
//             cutoffs: [
//               { year: '2024', cap_round: 1, cutoff: { cetScore: 85, jeeScore: 90 }, category: 'General' },
//               { year: '2023', cap_round: 2, cutoff: { cetScore: 87, jeeScore: 92 }, category: 'General' },
//               { year: '2022', cap_round: 3, cutoff: { cetScore: 88, jeeScore: 93 }, category: 'General' }
//             ]
//           },
//           {
//             branch: 'Mechanical Engineering',
//             cutoffs: [
//               { year: '2024', cap_round: 1, cutoff: { cetScore: 80, jeeScore: 85 }, category: 'General' },
//               { year: '2023', cap_round: 2, cutoff: { cetScore: 82, jeeScore: 87 }, category: 'General' },
//               { year: '2022', cap_round: 3, cutoff: { cetScore: 84, jeeScore: 88 }, category: 'General' }
//             ]
//           }
//         ]
//       }
//     ]
//   },
//   {
//     university: {
//       name: 'Savitribai Phule Pune University (SPPU)',
//       location: 'Pune'
//     },
//     colleges: [
//       {
//         name: 'COEP',
//         branches: [
//           {
//             branch: 'Electrical Engineering',
//             cutoffs: [
//               { year: '2024', cap_round: 1, cutoff: { cetScore: 90, jeeScore: 95 }, category: 'General' },
//               { year: '2023', cap_round: 2, cutoff: { cetScore: 92, jeeScore: 97 }, category: 'General' },
//               { year: '2022', cap_round: 3, cutoff: { cetScore: 93, jeeScore: 98 }, category: 'General' }
//             ]
//           }
//         ]
//       }
//     ]
//   }
//   // Add more dummy colleges as needed
// ];

// // Insert dummy data into the database
// async function insertDummyData() {
//   try {
//     await CetCollege.deleteMany({}); // Clear existing data
//     await CetCollege.insertMany(dummyColleges); // Insert dummy data
//     console.log('Dummy data inserted successfully');
//   } catch (err) {
//     console.error('Error inserting dummy data:', err);
//   } finally {
//     mongoose.disconnect(); // Close connection
//   }
// }

// insertDummyData();







const mongoose = require('mongoose');
const CetCollege = require('./model/cetCollege'); // Assuming the model file is named cetCollege.js

require('dotenv').config(); 
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  

async function insertDummyData() {
  const colleges = [
    {
      name: "College A",
      university: "Mumbai University",
      branches: [
        {
          name: "Computer Science",
          cutoffs: [
            { category: "General", round: 1, cetScore: 85 },
            { category: "OBC", round: 1, cetScore: 80 },
            { category: "SC", round: 1, cetScore: 75 },
            { category: "General", round: 2, cetScore: 82 },
            { category: "OBC", round: 2, cetScore: 78 },
            { category: "SC", round: 2, cetScore: 72 }
          ]
        },
        {
          name: "Electronics",
          cutoffs: [
            { category: "General", round: 1, cetScore: 88 },
            { category: "OBC", round: 1, cetScore: 83 },
            { category: "SC", round: 1, cetScore: 78 },
            { category: "General", round: 2, cetScore: 85 },
            { category: "OBC", round: 2, cetScore: 81 },
            { category: "SC", round: 2, cetScore: 75 }
          ]
        }
      ]
    },
    {
      name: "College B",
      university: "Pune University",
      branches: [
        {
          name: "Mechanical Engineering",
          cutoffs: [
            { category: "General", round: 1, cetScore: 90 },
            { category: "OBC", round: 1, cetScore: 85 },
            { category: "SC", round: 1, cetScore: 80 },
            { category: "General", round: 2, cetScore: 87 },
            { category: "OBC", round: 2, cetScore: 83 },
            { category: "SC", round: 2, cetScore: 78 }
          ]
        }
      ]
    }
  ];

  try {
    await CetCollege.insertMany(colleges);
    console.log('Dummy data inserted successfully');
  } catch (err) {
    console.error('Error inserting dummy data:', err);
  }
}

insertDummyData();

