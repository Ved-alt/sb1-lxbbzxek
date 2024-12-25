import React from 'react';
import type { ImageProvider } from '../types/providers';
import { Button } from './ui/Button';

interface ProviderSelectorProps {
  provider: ImageProvider;
  availableProviders: ImageProvider[];
  onProviderChange: (provider: ImageProvider) => void;
}

export function ProviderSelector({ 
  provider, 
  availableProviders, 
  onProviderChange 
}: ProviderSelectorProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600">Available AI Models:</p>
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={() => onProviderChange('openai')}
          variant={provider === 'openai' ? 'primary' : 'outline'}
          className="flex-1"
          disabled={!availableProviders.includes('openai')}
        >
          OpenAI DALL-E
        </Button>
        <Button
          onClick={() => onProviderChange('gemini')}
          variant={provider === 'gemini' ? 'primary' : 'outline'}
          className="flex-1"
          disabled={!availableProviders.includes('gemini')}
        >
          Gemini Pro Vision
        </Button>
        <Button
          onClick={() => onProviderChange('together')}
          variant={provider === 'together' ? 'primary' : 'outline'}
          className="flex-1"
          disabled={!availableProviders.includes('together')}
        >
          Together AI
        </Button>
      </div>
    </div>
  );
}