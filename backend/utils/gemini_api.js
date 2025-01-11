const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (recommended)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function callGeminiAPI(prompt) {
    try {
        const model = genAI.model({ model: "gemini-pro" });

        const result = await model.generateText({
            prompt: prompt,
        });
        const response = result.response.candidates[0].text;
        return response;
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
}

module.exports = { callGeminiAPI };
