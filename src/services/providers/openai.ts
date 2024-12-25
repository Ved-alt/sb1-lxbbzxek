interface OpenAIResponse {
  data: Array<{ url: string }>;
  error?: { message: string };
}

export async function generateOpenAIImage(apiKey: string, prompt: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt,
      n: 1,
      size: "1024x1024"
    })
  });

  const data: OpenAIResponse = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || 'Failed to generate image with OpenAI');
  }

  return data.data[0].url;
}