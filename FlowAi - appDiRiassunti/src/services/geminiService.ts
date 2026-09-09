import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface AnalysisResult {
  summary: string;
  concepts: string[];
}

export async function analyzeContent(content: string, type: 'text' | 'url'): Promise<AnalysisResult> {
  const model = "gemini-3-flash-preview";
  
  const prompt = type === 'text' 
    ? `Analyze the following text and provide a concise summary (2-3 paragraphs) and a list of 5-7 key concepts or important terms.
       Text: ${content}`
    : `Analyze the content of the following URL and provide a concise summary (2-3 paragraphs) and a list of 5-7 key concepts or important terms.
       URL: ${content}`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "A concise summary of the content (2-3 paragraphs).",
            },
            concepts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of 5-7 key concepts or important terms.",
            },
          },
          required: ["summary", "concepts"],
        },
        // If it's a URL, we might want to use urlContext if the model supports it for better results
        tools: type === 'url' ? [{ urlContext: {} }] : undefined,
      },
    });

    const result = JSON.parse(response.text || "{}");
    return {
      summary: result.summary || "Could not generate summary.",
      concepts: result.concepts || [],
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze content. Please try again.");
  }
}

export interface Flashcard {
  front: string;
  back: string;
}

export async function generateFlashcards(summary: string, language: 'en' | 'it' = 'en'): Promise<Flashcard[]> {
  const model = "gemini-3-flash-preview";
  const prompt = language === 'it'
    ? `Basandoti su questo riassunto: "${summary}", genera 5-8 flashcard per lo studio. Ogni flashcard deve avere una domanda (front) e una risposta (back).`
    : `Based on this summary: "${summary}", generate 5-8 flashcards for studying. Each flashcard should have a question (front) and an answer (back).`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              front: { type: Type.STRING },
              back: { type: Type.STRING }
            },
            required: ["front", "back"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Flashcards Generation Error:", error);
    throw new Error("Failed to generate flashcards.");
  }
}
