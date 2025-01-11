const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

let tempCounter = 1; // Initialize a counter for temp files

router.get('/PBl_1', (req, res) => {
    res.render('PBl_1');
});

// Endpoint to execute C code
router.post('/execute/code', (req, res) => {
    const code = req.body.code;

    // Check if code is provided
    if (!code) {
        return res.status(400).send('No code provided');
    }

    // Define temporary file paths
    const tempDir = path.join(os.tmpdir(), `temp${tempCounter}.c`);
    const tempExe = path.join(os.tmpdir(), `temp${tempCounter}.exe`);

    // Increment the counter for the next file name
    tempCounter++;

    // Save the code to a temporary C file
    try {
        fs.writeFileSync(tempDir, code, 'utf-8');
    } catch (err) {
        return res.status(500).send(`Error saving file: ${err.message}`);
    }

    // Compile the C code
    exec(`gcc ${tempDir} -o ${tempExe}`, (compileError) => {
        if (compileError) {
            return res.status(400).send(`Compilation Error: ${compileError.message}`);
        }

        // Execute the compiled code
        exec(tempExe, (execError, stdout, stderr) => {
            if (execError) {
                return res.status(400).send(`Execution Error: ${stderr}`);
            }
            res.send(`Output: ${stdout}`);
        });
    });
});

module.exports = router;
