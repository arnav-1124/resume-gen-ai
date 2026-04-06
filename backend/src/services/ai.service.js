const { GoogleGenAI } = require("@google/genai");


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const invokeGeminiAI = async () => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Hello, Gemini, Explain what is an interview",
    })

    console.log(response)
    console.log(response.text)
}

module.exports = { invokeGeminiAI }
