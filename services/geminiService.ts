import { GoogleGenAI } from "@google/genai";
import { PROMPT_TEMPLATE, README_PROMPT_TEMPLATE } from "../constants";
import { Language } from "../translations";
import {
  getFullGitHubProfile,
  GitHubProfileData,
} from "./githubProfileService";

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

function profileDataToText(profile: GitHubProfileData): string {
  let text = `\n---\nPROFILE DATA:\n`;
  text += `Username: ${profile.username}\n`;
  if (profile.name) text += `Name: ${profile.name}\n`;
  if (profile.bio) text += `Bio: ${profile.bio}\n`;
  if (profile.blog) text += `Blog: ${profile.blog}\n`;
  if (profile.location) text += `Location: ${profile.location}\n`;
  if (profile.email) text += `Email: ${profile.email}\n`;
  text += `Public Repos: ${profile.public_repos}\n`;
  text += `Pinned Repos:\n`;
  if (profile.pinned_repos.length === 0) {
    text += `  (none)\n`;
  } else {
    profile.pinned_repos.forEach((repo, i) => {
      text += `  - ${repo.name}\n`;
      if (repo.description) text += `    Description: ${repo.description}\n`;
      if (repo.language) text += `    Language: ${repo.language}\n`;
      if (repo.license) text += `    License: ${repo.license}\n`;
      text += `    Has README: ${repo.hasReadme ? "yes" : "no"}\n`;
      text += `    Has Workflow: ${repo.hasWorkflow ? "yes" : "no"}\n`;
      if (repo.topics.length) text += `    Topics: ${repo.topics.join(", ")}\n`;
    });
  }
  text += `---\n`;
  return text;
}

export const analyzeGitHubProfile = async (
  githubUrl: string,
  lang: Language
): Promise<string> => {
  // Extrai username da URL
  const username = githubUrl.split("github.com/")[1]?.replace("/", "");
  if (!username) throw new Error("URL inválida para perfil do GitHub");
  // Busca dados reais do perfil
  const profileData = await getFullGitHubProfile(username);
  const profileText = profileDataToText(profileData);
  // Monta prompt incluindo dados reais
  const fullPrompt = PROMPT_TEMPLATE(githubUrl, lang) + "\n" + profileText;
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
