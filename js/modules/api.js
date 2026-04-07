// ============================================
// Etymology OS Engine — API Module (Gemini)
// ============================================

import { getApiKey } from '../utils/storage.js';

export async function generateUnknownWord() {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('API key is not set. Please configure it in Settings.');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  // Use a structured prompt to ensure we get exactly what we need
  const prompt = `
You are an expert etymologist and English teacher.
Select a relatively uncommon or interesting English word that has a clear Prefix, Root, and Suffix.
Do NOT select any of these common words: transformation, report, construct, circumspect, transport.
Provide a detailed etymological breakdown of the word, its meaning, its modern definition in both English and Japanese.
Calculate "semanticDrift" as a float from 0.0 to 1.0 representing how far the modern meaning has drifted from the etymological literal meaning.
If the semanticDrift is >= 0.4, provide a "mnemonicStory" (a memorable story bridging the literal and modern meaning) in Japanese. Otherwise set it to null.

Return exactly and ONLY a JSON object (no markdown formatting, no \`\`\`json) matching this schema:
{
  "word": "string",
  "difficulty": "number from 3 to 5",
  "decomposition": {
    "prefix": { "morpheme": "string", "meaning": "string" },
    "root": { "morpheme": "string", "meaning": "string" },
    "suffix": { "morpheme": "string", "meaning": "string" }
  },
  "etymologicalMeaning": "string",
  "etymologicalMeaningJa": "string",
  "modernDefinition": "string",
  "modernDefinitionJa": "string",
  "semanticDrift": "number",
  "mnemonicStory": "string or null"
}
Ensure the morphemes are separated. For example: prefix: "in", root: "evit", suffix: "able".
`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!resultText) {
      throw new Error('Invalid response format from Gemini API');
    }

    // Try parsing the text directly (we requested strict JSON format)
    const wordData = JSON.parse(resultText);
    
    return wordData;

  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}
