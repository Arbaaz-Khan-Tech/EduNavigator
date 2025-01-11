
const express = require('express');

const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Model, KaldiRecognizer } = require('vosk');
const ffmpeg = require('fluent-ffmpeg');



// Vosk model setup (assuming you have the English model)
const model = new Model('F:\vap 5 (Rec)\routes\vosk-model-small-en-us-0.15');

// Multer setup to handle file uploads
const upload = multer({ dest: 'uploads/' });

// Convert audio to the format required by Vosk
function convertAudio(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .inputFormat('wav')
            .audioChannels(1)
            .audioFrequency(16000)
            .output(outputPath)
            .on('end', () => resolve(outputPath))
            .on('error', (err) => reject(err))
            .run();
    });
}


router.get('/speech',(req,res)=>{
    res.render('speech')
})
// Endpoint to handle audio file upload
router.post('/upload-audio', upload.single('audio'), async (req, res) => {
    const audioPath = path.join(__dirname, req.file.path);
    const convertedPath = path.join(__dirname, 'uploads', `${req.file.filename}-converted.wav`);

    try {
        // Convert the uploaded audio to a format that Vosk can process
        await convertAudio(audioPath, convertedPath);

        // Process audio with Vosk
        const audioFile = fs.readFileSync(convertedPath);
        const rec = new KaldiRecognizer(model, 16000);
        rec.acceptWaveform(audioFile);

        const filePath = path.join(__dirname, 'uploads', req.file.filename);

if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
} else {
    console.error('File not found:', filePath);
}

        // Get the result from Vosk
        const result = JSON.parse(rec.finalResult());
        const transcription = result.text;

        // Basic speech analysis (similar to before)
        const feedback = analyzeSpeech(transcription);

        res.json({ transcription, feedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing audio' });
    } finally {
        // Clean up the uploaded and converted audio files
        fs.unlinkSync(audioPath);
        fs.unlinkSync(convertedPath);
    }
});

// Basic analysis function to provide feedback (can be extended)
function analyzeSpeech(transcription) {
    let feedback = 'Your speech was clear.';

    // Analyze based on word count or other criteria
    const wordCount = transcription.split(' ').length;
    
    if (wordCount < 50) {
        feedback += ' Try to elaborate more on your ideas.';
    }
    
    if (/uh|um|like/.test(transcription)) {
        feedback += ' Avoid using too many filler words like "uh", "um", or "like".';
    }

    return feedback;
}




module.exports = router;