const express = require('express');
const router = express.Router();
const { handleFaceRecognition } = require('./handleFaceProssing');

router.post('/recognizeFace', handleFaceRecognition);

module.exports = router;