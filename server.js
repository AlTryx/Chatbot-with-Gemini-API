const express  = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const API_KEY = process.env.GEMINI_API_KEY;

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(bodyParser.json({ limit: '10mb' }));

const handleScreenshotRoute = require('./client/src/api/routes/handleScreenshot');
app.use('/api', handleScreenshotRoute);

if (!API_KEY) {
    console.error("GEMINI_API_KEY is not set. Please set it in your environment variables.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Puuuuuuuu');
});

app.post('/ask', async (req, res) => {
const userMessage = req.body.message;

try {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
  const result = await model.generateContent(userMessage);
  const response = await result.response;
  const text = response.text();

  res.json({ reply: text });
} catch (error) {
  console.error('Error generating content from Gemini:', error);
  res.status(500).json({ error: 'Failed to get response from Gemini' });
}
});

app.use((req, res) => {
  res.status(404).send(`Not found: ${req.method} ${req.url}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
