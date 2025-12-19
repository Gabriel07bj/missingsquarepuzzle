
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

export const getParadoxExplanation = async (): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Explain the missing square puzzle paradox in detail. Why does a hole appear when pieces are rearranged?",
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    return response.text || "Could not retrieve explanation at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to the mathematical knowledge base. The paradox arises because the two triangles have slightly different slopes (0.375 vs 0.4), making the combined hypotenuse slightly bent.";
  }
};
