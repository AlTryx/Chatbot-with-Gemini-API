const express  = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const API_KEY = process.env.GEMINI_API_KEY;
const recognizeFaceRoute = require('./client/src/api/routes/recognizeFace');

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/api/recognizeFace', recognizeFaceRoute);

if (!API_KEY) {
    console.error("GEMINI_API_KEY is not set. Please set it in your environment variables.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if(email && password) {
    // Here you would typically check the credentials against a database
    // For simplicity, we are just returning a dummy token
    res.json({ token: 'test123' });
  } else {
    res.status(400).json({ error: 'Email and password are required' });
}});

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
