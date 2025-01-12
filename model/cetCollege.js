const mongoose = require('mongoose');

const CutoffSchema = new mongoose.Schema({
  category: { type: String, },
  cetScore: { type: Number,  },
  round: { type: Number,  },
  year: { type: Number,  }
});

const BranchSchema = new mongoose.Schema({
  name: { type: String,  },
  cutoffs: [CutoffSchema]
});

const CollegeSchema = new mongoose.Schema({
  name: { type: String, },
  university: { type: String,  },
  location: { type: String,  },
  branches: [BranchSchema]
});

const College = mongoose.model('College', CollegeSchema);

module.exports = College;
