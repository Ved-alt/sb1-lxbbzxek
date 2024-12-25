interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{
        text?: string;
        inlineData?: {
          mimeType: string;
          data: string;
        };
      }>;
    };
  }>;
  error?: { message: string };
}

export async function generateGeminiImage(
  apiKey: string,
  prompt: string
): Promise<string> {
  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 1,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
        ],
      }),
    }
  );

  const data: GeminiResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error?.message || 'Failed to generate image with Gemini'
    );
  }

  const imageData = data.candidates?.[0]?.content?.parts[0]?.inlineData?.data;
  if (!imageData) {
    throw new Error('No image data received from Gemini');
  }

  return `data:image/png;base64,${imageData}`;
}
