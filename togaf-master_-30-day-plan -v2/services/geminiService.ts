import { GoogleGenAI, Type, Schema } from "@google/genai";
import { FlashcardData, Language } from "../types";

const modelId = "gemini-3-flash-preview";

const flashcardSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      front: {
        type: Type.STRING,
        description: "The question, concept, or term to appear on the front of the card.",
      },
      back: {
        type: Type.STRING,
        description: "The concise explanation, answer, or definition for the back of the card.",
      },
      tag: {
        type: Type.STRING,
        description: "A short category tag (e.g., 'Definition', 'Process', 'Role').",
      },
    },
    required: ["front", "back", "tag"],
  },
};

// Helper for fallback content
const getFallbackContent = (topic: string, concepts: string[], language: Language) => {
    const errTitle = language === 'zh' ? "演示模式 / 连接错误" : "Demo Mode / Connection Error";
    const errDesc = language === 'zh' 
        ? "系统检测到 API 密钥未配置或网络连接不稳定。这不影响您的学习进度记录。" 
        : "The API Key is missing or the connection is unstable. Your progress tracking is not affected.";
    const sysTag = language === 'zh' ? "系统" : "System";
    const sylTag = language === 'zh' ? "大纲" : "Syllabus";

    return [
      {
        id: "err-1",
        front: errTitle,
        back: errDesc,
        tag: sysTag,
      },
      {
        id: "err-2",
        front: `Topic: ${topic}`,
        back: `Key concepts: ${concepts.join(", ")}`,
        tag: sylTag,
      }
    ];
};

export const generateFlashcards = async (
  topic: string,
  concepts: string[],
  day: number,
  language: Language
): Promise<FlashcardData[]> => {
  // Check for API Key inside the function to avoid crash on load
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
      console.warn("API_KEY is missing. Returning fallback content.");
      return getFallbackContent(topic, concepts, language);
  }

  try {
    // Lazily initialize client
    const ai = new GoogleGenAI({ apiKey: apiKey });

    const langInstructions = language === 'zh' 
        ? "Language: Simplified Chinese (简体中文). IMPORTANT: Output JSON values in Chinese." 
        : "Language: English. Output JSON values in English.";

    const prompt = `
      You are an expert Enterprise Architect and TOGAF 9.2 / 10 instructor.
      I am a Project Manager learning TOGAF.
      
      Create 6 high-quality, concise learning flashcards for Day ${day} of my study plan.
      The topic is: "${topic}".
      Key concepts to cover: ${concepts.join(", ")}.
      
      ${langInstructions}

      The cards should be suitable for a flashcard app:
      - Front: A clear concept, term, or question.
      - Back: A concise, accurate explanation (max 2-3 sentences).
      
      Focus on practical understanding for a Project Manager.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: flashcardSchema,
        temperature: 0.7,
      },
    });

    const rawText = response.text;
    if (!rawText) {
      throw new Error("No content generated");
    }

    const parsed: any[] = JSON.parse(rawText);

    // Map to our internal type with IDs
    return parsed.map((card, index) => ({
      id: `day-${day}-card-${index}-${Date.now()}`,
      front: card.front,
      back: card.back,
      tag: card.tag,
    }));

  } catch (error) {
    console.error("Error generating flashcards:", error);
    return getFallbackContent(topic, concepts, language);
  }
};
