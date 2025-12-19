
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

export const getParadoxExplanation = async (): Promise<string> => {
  try {
    // Create a new instance right before making an API call to ensure it uses the most up-to-date API key.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      // Use gemini-3-pro-preview for complex reasoning and mathematical explanations.
      model: 'gemini-3-pro-preview',
      contents: "Explain the missing square puzzle paradox in detail. Why does a hole appear when pieces are rearranged?",
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    return response.text || "Could not retrieve explanation at this time.";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    
    // If the request fails with an error message containing "Requested entity was not found.", 
    // it might be an issue with the API key or project configuration.
    if (error?.message?.includes("Requested entity was not found.")) {
      return "The requested model was not found or the API key selection is invalid. Please try selecting your API key again using the key icon in the header.";
    }

    return "Error connecting to the mathematical knowledge base. The paradox arises because the two triangles have slightly different slopes (0.375 vs 0.4), making the combined hypotenuse slightly bent.";
  }
};
