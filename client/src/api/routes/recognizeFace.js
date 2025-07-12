const express = require('express');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const router = express.Router();

router.post('/', async (req, res) => {
    const { image, name } = req.body;
    if (!image || !name){
        return res.status(400).json({ error: 'Missing image or name' });
    }
    
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const fileName = `face_${Date.now()}.png`;
    const filePath = path.resolve(__dirname, '../../../../faces', fileName);
    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            console.error('Error saving image:', err);
            return res.status(500).json({ error: 'Failed to save image' });
        }
    });
    
    const scriptPath = path.resolve(__dirname, '../../../../detect_and_save.py');

    const python = spawn('python', [scriptPath, filePath, name]);

    python.stdout.on('data', (data) => {
        const result = data.toString().trim();
        if (result === "saved") return res.json({ status: "saved" });
        if (result === "no_face") return res.status(400).json({ error: "No face detected" });
        return res.status(500).json({ error: "Failed to save image" });
    });
});

module.exports = router;