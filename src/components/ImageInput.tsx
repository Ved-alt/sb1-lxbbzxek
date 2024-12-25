import React from 'react';
import { KeyRound } from 'lucide-react';

interface ImageInputProps {
  apiKey: string;
  onApiKeyChange: (value: string) => void;
}

export function ImageInput({ apiKey, onApiKeyChange }: ImageInputProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <KeyRound className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="password"
        value={apiKey}
        onChange={(e) => onApiKeyChange(e.target.value)}
        placeholder="Enter your OpenAI, Gemini, or Together AI key"
        className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      />
    </div>
  );
}