
import { GoogleGenAI } from "@google/genai";

// Assume API key is set in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateSummary = async (text: string): Promise<string> => {
  if (!API_KEY) {
    return "API key not configured. Cannot generate summary.";
  }
  
  try {
    const prompt = `Summarize the following humanitarian project description into a single, powerful paragraph (around 50-70 words) suitable for a donation appeal. Focus on the problem, our action, and the impact of a donation. Do not use markdown. Here is the description: "${text}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating summary with Gemini API:", error);
    return "Could not generate summary at this time.";
  }
};
