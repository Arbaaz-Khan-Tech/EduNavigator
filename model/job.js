const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Refers to the User model for job poster
    required: true,
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Refers to the User model for the user who accepted the job
    default: null, // Initially no one has accepted the job
  },
  isAccepted: {
    type: Boolean,
    default: false,  // By default, a job is not accepted
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically adds the job creation time
  },
});

module.exports = mongoose.model('Job', jobSchema);
