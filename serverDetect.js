const express = require('express');
const { spawn } = require('child_process');
const app = express();
const PORT = 3002;

app.get('/detect-face', (req, res) => {
const python = spawn('python', ['face_recognition/recognize.py']);

python.stdout.on('data', (data) => {
console.log("Python says: ${data}");
});

python.stderr.on('data', (data) => {
console.error("Python error: ${data}");
});

python.on('close', () => {
console.log("Python exited");
res.send("Face detection finished");
});
});

app.listen(PORT, () => {
console.log("Server running at http://localhost:${PORT}");
});