import { GoogleGenAI, Type } from "@google/genai";
import { World } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function remixWorld(originalWorld: World, userInput: string): Promise<World> {
  const prompt = `
    You are the VIVERE World Remixer. You take existing worlds and create personalized versions based on user preferences.

    Original world:
    ${JSON.stringify(originalWorld, null, 2)}

    User's customization request: "${userInput}"

    Rules:
    1. Keep the world's VOICE and AESTHETIC even when changing content.
    2. Select the most relevant stops (don't just trim — recombine or add new ones if necessary to fit the prompt).
    3. Rewrite narratives to feel like they were written for THIS person and their specific request.
    4. Swap products (accommodation, dining, activities) to match their budget/preferences. Use your internal knowledge or simulate Google Search results to find realistic alternatives.
    5. The remixed world should feel intentional, not filtered.
    6. Ensure the output is a valid JSON object matching the World schema.

    Output the remixed world JSON.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          aesthetic: { type: Type.STRING },
          voice: { type: Type.STRING },
          stops: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                location: { type: Type.STRING },
                narrative: { type: Type.STRING },
                day: { type: Type.NUMBER },
                image: { type: Type.STRING },
                products: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      name: { type: Type.STRING },
                      price: { type: Type.STRING },
                      link: { type: Type.STRING },
                      description: { type: Type.STRING },
                      category: { type: Type.STRING, enum: ['accommodation', 'dining', 'activity', 'transport'] }
                    },
                    required: ['id', 'name', 'price', 'link', 'description', 'category']
                  }
                }
              },
              required: ['id', 'title', 'location', 'narrative', 'day', 'image', 'products']
            }
          }
        },
        required: ['id', 'name', 'description', 'aesthetic', 'voice', 'stops']
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from Gemini");
  
  return JSON.parse(text) as World;
}
