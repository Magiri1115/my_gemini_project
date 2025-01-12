const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function callGeminiAPI(prompt) {
    try {
        const model = genAI.model({ model: "gemini-pro" });
        const result = await model.generateText({ prompt });
        const response = result.response.candidates[0].text;
        return response;
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
}

module.exports = { callGeminiAPI };

//難易度分析とトピック抽出
async function analyzeDifficulty(prompt) {
    try {
        const model = genAI.model({ model: "gemini-pro" });
        const result = await model.generateText({ prompt: `On a scale of 1 to 10 how difficult is this problem? ${prompt}`});
        const response = result.response.candidates[0].text;
        return response;
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
}
async function extractTopics(prompt) {
    try {
        const model = genAI.model({ model: "gemini-pro" });
        const result = await model.generateText({ prompt: `Extract topics from this text in json format: ${prompt}` });
        const response = result.response.candidates[0].text;
        return response; // JSON文字列を返す
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
}
module.exports = { callGeminiAPI, analyzeDifficulty, extractTopics };
