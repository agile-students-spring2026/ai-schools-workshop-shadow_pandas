// src/services/aiService.js
import OpenAI from "openai";

let client;

const getClient = () => {
  if (!client) {
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not set! Using dummy AI response.");
      return {
        chat: {
          completions: {
            create: async () => ({
              choices: [{ message: { content: "AI key missing" } }],
            }),
          },
        },
      };
    }
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
};

export const generateSummary = async (district) => {
  const prompt = `Summarize this school district for parents in 1-2 sentences: ${JSON.stringify(district)}`;
  const res = await getClient().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });
  return res.choices[0].message.content;
};