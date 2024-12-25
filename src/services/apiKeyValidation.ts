import type { ApiKeyConfig, ImageProvider } from '../types/providers';

export function validateApiKey(apiKey: string): ApiKeyConfig {
  const providers: ImageProvider[] = [];

  // OpenAI API keys typically start with 'sk-'
  if (apiKey.startsWith('sk-')) {
    providers.push('openai');
  }

  // Gemini API keys are typically 39 characters long
  if (apiKey.length === 39) {
    providers.push('gemini');
  }

  // Together AI keys start with 'tok_'
  if (apiKey.startsWith('tok_')) {
    providers.push('together');
  }

  return {
    key: apiKey,
    providers,
  };
}
