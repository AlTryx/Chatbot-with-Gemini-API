const express = require('express');
const router = express.Router();
const {handleScreenshot} = require('./controllers/imageController');

router.post('/uploadScreenshot', (req, res) => {
    console.log('POST /api/uploadScreenshot получена');
    console.log('Body:', req.body);
    handleScreenshot(req.body.image, (message) => {
        res.json({ message });
    });
});

router.get('/uploadScreenshot', (req, res) => {
    res.json({ message: "GET uploadScreenshot работи!" });
});

module.exports = router;