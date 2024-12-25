export type ImageProvider = 'openai' | 'gemini' | 'together';

export interface ApiKeyConfig {
  key: string;
  providers: ImageProvider[];
}