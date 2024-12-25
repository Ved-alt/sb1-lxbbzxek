import { generateOpenAIImage } from './providers/openai';
import { generateGeminiImage } from './providers/gemini';
import { generateTogetherImage } from './providers/together';
import type { ImageProvider } from '../types/providers';

interface GenerateImageParams {
  apiKey: string;
  prompt: string;
  provider: ImageProvider;
}

export async function generateImage({ apiKey, prompt, provider }: GenerateImageParams): Promise<string> {
  switch (provider) {
    case 'openai':
      return generateOpenAIImage(apiKey, prompt);
    case 'gemini':
      return generateGeminiImage(apiKey, prompt);
    case 'together':
      return generateTogetherImage(apiKey, prompt);
    default:
      throw new Error('Unsupported provider');
  }
}