
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("Gemini API key is not set. Product description generation will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateProductDescription = async (productName: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Gemini API key not configured. Please enter a description manually.";
  }
  
  try {
    const prompt = `Generate a compelling and brief eCommerce product description for a product named "${productName}". The description should be around 50-70 words, highlighting its key features and benefits in an engaging tone. Do not use markdown.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ parts: [{ text: prompt }] }],
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating product description with Gemini:", error);
    return "Failed to generate description. Please enter one manually.";
  }
};
