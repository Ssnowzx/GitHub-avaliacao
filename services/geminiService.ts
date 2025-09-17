import { GoogleGenAI } from "@google/genai";
import { PROMPT_TEMPLATE, README_PROMPT_TEMPLATE } from "../constants";
import { Language } from "../translations";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error(
    "API key is missing. Please set the GEMINI_API_KEY environment variable."
  );
}

const ai = new GoogleGenAI({ apiKey });
const modelName = "gemini-2.5-flash";

const callGemini = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        temperature: 0.1,
      },
    });

    // The .text accessor throws an error if the response is blocked.
    const text = response.text;

    if (text === undefined || text === null || text.trim() === "") {
      throw new Error(
        "The AI returned an empty response. This might be due to a content policy or an issue with the profile."
      );
    }

    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown API error occurred.";
    throw new Error(
      `Failed to get a response from the AI model. Reason: ${errorMessage}`
    );
  }
};

const callGeminiWithTimeout = (
  prompt: string,
  timeoutMs: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(
        new Error(
          `The request timed out after ${
            timeoutMs / 1000
          } seconds. The server may be busy or the profile is too complex to analyze quickly. Please try again later.`
        )
      );
    }, timeoutMs);

    callGemini(prompt)
      .then((result) => {
        clearTimeout(timeoutId);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
};

const API_TIMEOUT = 60000; // 60 seconds

export const analyzeGitHubProfile = async (
  githubUrl: string,
  lang: Language
): Promise<string> => {
  const fullPrompt = PROMPT_TEMPLATE(githubUrl, lang);
  return callGeminiWithTimeout(fullPrompt, API_TIMEOUT);
};

export const generateProfileReadme = async (
  analysis: string,
  lang: Language
): Promise<string> => {
  const fullPrompt = README_PROMPT_TEMPLATE(analysis, lang);
  const result = await callGeminiWithTimeout(fullPrompt, API_TIMEOUT);
  // Clean up the response to ensure it's just the markdown code
  return result
    .replace(/```markdown/g, "")
    .replace(/```/g, "")
    .trim();
};
