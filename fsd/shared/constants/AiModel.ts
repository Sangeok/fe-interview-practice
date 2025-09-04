import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const generateScript = geminiModel.startChat({
  generationConfig,
  history: [],
});
