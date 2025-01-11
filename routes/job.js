const express = require('express');
const router = express.Router();
const Job = require('../model/job');
const User = require('../model/User');

// Route to show all jobs
// Route to list all jobs
router.get('/jobs', async (req, res) => {
  const jobs = await Job.find().populate('poster');
  res.render('post_job', { jobs });
});

router.get('/jobsx', async (req, res) => {
  const userId = req.session.userId;  // Get userId from session

  if (!userId) {
    
    res.render('notlogged');
  }

  try {
    const jobs = await Job.find().populate('poster').populate('acceptedBy');
    const username = await User.findById(userId)
    // console.log(username)
    // Log to check if poster is populated
    // console.log(jobs);

    res.render('job_list', { jobs,username });
  } catch (err) {
    res.status(500).send('Error fetching jobs');
  }
});


// Route to view a single job by ObjectId
router.get('/jobs/:jobId', async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).populate('poster acceptedBy');
    if (!job) {
      return res.status(404).send('Job not found.');
    }
    res.render('jobDetails', { job });
  } catch (err) {
    res.status(400).send('Invalid job ID.');
  }
});

// Route to render job posting page
router.get('/jobs_post', async (req, res) => {
  const userId = req.session.userId;  // Get userId from session

  if (!userId) {
    res.render('notlogged');
  }

  const user = await User.findById(userId);
  const jobs = await Job.find().populate('poster');
  
  res.render('post_job', { jobs, username: user.username, userId });
});

// Route to create a new job post
router.post('/jobs/post', async (req, res) => {
  const { title, description, amount } = req.body;
  const userId = req.session.userId;

  if (!userId) {
    res.render('notlogged');
  }

  // Create a new job with the logged-in user's ID as the poster
  const newJob = new Job({
    title,
    description,
    amount,
    poster: userId.toString(),  // Use userId from session
  });

  try {
    await newJob.save();
    res.redirect('/jobs');  // Redirect to job listing page after posting
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Route to accept a job
router.post('/jobs/accept/:jobId', async (req, res) => {  // Make sure the route starts with '/'
  const { jobId } = req.params;
  // console.log(jobId);  // Corrected to jobId
  
  const userId = req.session.userId;

  if (!userId) {
    res.render('notlogged');
  }

  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(404).send('Job not found.');
  }

  job.isAccepted = true;
  job.acceptedBy = userId;
  await job.save();
  
  // Notify the poster (you can implement a notification system later)
  res.redirect(`/jobs/${jobId}`);
});

// Route to display job details


module.exports = router;
