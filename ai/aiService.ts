import { SYSTEM_PROMPT } from './prompts/system';
import { MOVIE_RECOMMENDATION_PROMPT } from './prompts/movieRecommendations';
import { AI_CONFIG } from './config';

interface Recommendations {
  movies?: string[];
  tvShows?: string[];
}

interface OpenAIResponse {
  choices: { message: { content: string } }[];
}

export async function getAIRecommendations(
  prompt: string,
): Promise<Recommendations> {
  const openAiUrl =
    process.env.OPEN_AI_API_URL ||
    'https://api.openai.com/v1/chat/completions';

  const openAiKey = process.env.OPEN_AI_API_KEY;
  if (!openAiKey) {
    throw new Error('OpenAI API key is not configured');
  }

  const requestBody = {
    model: AI_CONFIG.model,
    max_tokens: AI_CONFIG.maxTokens,
    response_format: AI_CONFIG.responseFormat,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `User request: "${prompt}"` },
      { role: 'user', content: MOVIE_RECOMMENDATION_PROMPT },
    ],
  };

  const response = await fetch(openAiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openAiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || 'OpenAI request failed',
    );
  }

  const data: OpenAIResponse = await response.json();
  const content = data.choices[0]?.message?.content;

  if (!content) {
    throw new Error('No content received from OpenAI');
  }

  try {
    return JSON.parse(content);
  } catch {
    throw new Error('Failed to parse OpenAI response');
  }
}

