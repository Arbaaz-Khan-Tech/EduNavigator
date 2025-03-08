// backend/server.js
const express = require('express');
const router = express.Router();

const dotenv = require('dotenv').config();
const fetch = require('node-fetch');

// Configure EJS templating


// Environment variables
const ELEVEN_LABS_API_KEY = process.env.ELEVEN_LABS_API_KEY;
const VOICE_ID = '21m00Tcm4TlvDq8ikWAM';

// Render main page
router.get('/Interview', (req, res) => {
    res.render('puter');
});

// Text-to-speech endpoint
router.post('/synthesize-speech', async (req, res) => {
    try {
        const response = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'audio/mpeg',
                    'Content-Type': 'application/json',
                    'xi-api-key': ELEVEN_LABS_API_KEY
                },
                body: JSON.stringify({
                    text: req.body.text,
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75
                    }
                })
            }
        );

        if (!response.ok) {
            throw new Error(`Eleven Labs API Error: ${response.statusText}`);
        }

        const audioBuffer = await response.buffer();
        res.set('Content-Type', 'audio/mpeg');
        res.send(audioBuffer);
    } catch (error) {
        console.error('TTS Error:', error);
        res.status(500).json({ error: error.message });
    }
});



// server.js
// Add these after the TTS endpoint

// AI response generation endpoint (replace with actual AI integration)
router.post('/generate-response', async (req, res) => {
    try {
        // Replace this with actual AI API call
        const mockResponses = {
            frontend: "What's the difference between CSS Grid and Flexbox?",
            backend: "Explain RESTful API design principles.",
            fullstack: "How would you handle authentication in a MERN stack application?",
            devops: "Explain the blue-green deployment strategy."
        };

        // Simulated delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        res.json({
            response: mockResponses[req.body.field] || "Let's begin the interview. Please tell me about your experience."
        });
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ error: 'Error generating response' });
    }
});

module.exports = router;