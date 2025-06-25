const { GoogleGenerativeAI } = require ('@google/generative-ai');

const genAI = new GoogleGenerativeAI("AIzaSyAiZBMGB4IhsgWcDQuoee2Ceh2GX-jX8Jc");

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