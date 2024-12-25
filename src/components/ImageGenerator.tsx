import React, { useState, useEffect } from 'react';
import { ImageIcon } from 'lucide-react';
import { generateImage } from '../services/imageGeneration';
import type { ImageProvider } from '../types/providers';
import { validateApiKey } from '../services/apiKeyValidation';
import { ProviderSelector } from './ProviderSelector';
import { ImageInput } from './ImageInput';
import { PromptInput } from './PromptInput';

export default function ImageGenerator() {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [provider, setProvider] = useState<ImageProvider>('together');
  const [availableProviders, setAvailableProviders] = useState<ImageProvider[]>(
    []
  );
  const [generatedImage, setGeneratedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (apiKey) {
      const { providers } = validateApiKey(apiKey);
      setAvailableProviders(providers);

      // If current provider is not available, switch to the first available one
      if (providers.length > 0 && !providers.includes(provider)) {
        setProvider(providers[0]);
      }
    } else {
      setAvailableProviders([]);
    }
  }, [apiKey]);

  const handleGenerate = async () => {
    if (!apiKey) {
      setError('Please enter your API key');
      return;
    }
    if (!prompt) {
      setError('Please enter a prompt');
      return;
    }
    if (!availableProviders.includes(provider)) {
      setError('Invalid API key for selected provider');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const imageUrl = await generateImage({ apiKey, prompt, provider });
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError(err.message || 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex items-center justify-center mb-8">
            <ImageIcon className="w-8 h-8 text-purple-600 mr-2" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              AI Image Generator
            </h1>
          </div>

          <div className="space-y-6">
            <ImageInput apiKey={apiKey} onApiKeyChange={setApiKey} />

            {availableProviders.length > 0 && (
              <ProviderSelector
                provider={provider}
                availableProviders={availableProviders}
                onProviderChange={setProvider}
              />
            )}

            <PromptInput
              prompt={prompt}
              loading={loading}
              onPromptChange={setPrompt}
              onGenerate={handleGenerate}
            />

            {error && (
              <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            {generatedImage && (
              <div className="mt-6">
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
