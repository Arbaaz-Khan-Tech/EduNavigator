const express = require('express');
const router = express.Router();
const College = require('../model/cetCollege');

// Home Route - Display Form
router.get('/cetCollege', async (req, res) => {
  try {
    const universities = await College.distinct('university');
    const branches = await College.distinct('branches.name');

    const categories = ['GOPENS','GSCS','GSTS','GNT1S','GNT2S','GOBCS','LOPENS','LSCS','Ladies Home','LNT1H','LOBCH','PWDOPENH','LSCH','LSTH','LNT2H','PWDOPENH','EWS','TFWS'];

    res.render('cetCollege', { universities, branches, categories });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Handle Form Submission and Display Results
router.post('/recommendcet', async (req, res) => {
  const { cetScore, category, branch, university } = req.body;
  try {
    const query = {
      branches: {
        $elemMatch: {
          name: branch,
          cutoffs: {
            $elemMatch: {
              category: category,
              cetScore: { $lte: cetScore }
            }
          }
        }
      }
    };
    // Add university filter if a specific university is selected
    if (university !== 'Any') {
      query.university = university;
    }
    const colleges = await College.find(query);
    res.render('cet_results', { colleges, cetScore, category, branch, university });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
module.exports = router;