const express = require('express');
const { generateToken, verifyToken } = require('../../utils/jwt.js');
const generatePrompt = require('../../controllers/prompt.js');
const getGeminiResponse = require('../../controllers/gemini.js');
const parseGeminiResponse = require('../../controllers/respons.js')
const cloudinary = require("cloudinary").v2;
require('dotenv').config();
const fs = require('fs')
const multer = require('multer');
const path = require('path');
const { Result } = require('pg');

const router = express.Router();
const upload = multer({ dest: "uploads/" });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

router.post('/',  upload.single("image"), async (req, res) => {
    try {
        const login_token = req.cookies.login_token;

        const { medicine_name, medicine_code } = req.body;
        const file = req.file;

        const code = medicine_code || null;

        // Basic validation
        if (!medicine_name || !file) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        if (!login_token) {
            return res.status(400).json({ error: 'you are not login' });
        }

        // Upload image to Cloudinary
        const cloudRes = await cloudinary.uploader.upload(file.path, {
            folder: "medicines"
        });

        // delete temp file after upload
        fs.unlinkSync(file.path);

        const imageUrl = cloudRes.secure_url;
        const data = verifyToken(login_token);

        const prompt = generatePrompt(medicine_name, imageUrl, code);
        const reply = await getGeminiResponse(prompt);
        const parsed = parseGeminiResponse(reply);

        res.json({
            medicine_name: medicine_name,
            data: parsed,
        });

    } catch (err) {
        console.error('Error in /verify-medicine:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router