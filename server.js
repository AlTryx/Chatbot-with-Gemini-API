const express  = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// const genAI = new GoogleGenerativeAI("AIzaSyAiZBMGB4IhsgWcDQuoee2Ceh2GX-jX8Jc")

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});