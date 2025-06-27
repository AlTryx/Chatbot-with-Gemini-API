const express  = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get('/', (req, res) => {
  res.send('Hello from the server!');
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
