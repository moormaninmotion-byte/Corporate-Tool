import { GoogleGenAI } from "@google/genai";

export const callGeminiAPI = async (systemInstruction: string, userQuery: string): Promise<string> => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userQuery,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        
        return response.text;

    } catch (error: any) {
        console.error("Gemini API Error:", error);
        if (error.message && (error.message.includes('API key not valid') || error.message.includes('API_KEY_INVALID'))) {
            throw new Error("The API key configured for this application is invalid.");
        }
        if (error.message) {
            throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred while communicating with the API.");
    }
};
