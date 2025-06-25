require('dotenv').config();
const { GoogleGenerativeAI } = require ('@google/generative-ai');
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("GEMINI_API_KEY is not set. Please set it in your environment variables.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function testGemini(){
    try{
        const model = genAI.getGenerativeModel({model: "gemini-2.0-flash"});
        const result = await model.generateContent("Tell me something funny");
        const response = await result.response;
        const responseText = response.text();
        console.log("response is: ", responseText);
    } catch (error) {
        console.error("Error testing Gemini:", error);
    }
}

testGemini();