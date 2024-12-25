import React from 'react';
import { Send, Loader2 } from 'lucide-react';

interface PromptInputProps {
  prompt: string;
  loading: boolean;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
}

export function PromptInput({ prompt, loading, onPromptChange, onGenerate }: PromptInputProps) {
  return (
    <div className="relative">
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="Describe the image you want to generate..."
        className="block w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent min-h-[100px]"
      />
      <button
        onClick={onGenerate}
        disabled={loading}
        className="absolute bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-400 disabled:cursor-not-allowed flex items-center"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Generate
          </>
        )}
      </button>
    </div>
  );
}