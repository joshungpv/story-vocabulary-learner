import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { exec } from 'child_process';

dotenv.config();

function safeJsonParse(text: string): any {
  let cleaned = text.trim();
  
  // 1. Remove markdown code fences
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```[a-zA-Z]*\s*/, '');
    cleaned = cleaned.replace(/\s*```$/, '');
  }
  
  cleaned = cleaned.trim();
  
  // 2. Try parsing directly
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    // 3. Fallback: try to extract the JSON block if there is surrounding text
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    const firstBracket = cleaned.indexOf('[');
    const lastBracket = cleaned.lastIndexOf(']');
    
    let jsonCandidate = '';
    if (firstBrace !== -1 && lastBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
      jsonCandidate = cleaned.substring(firstBrace, lastBrace + 1);
    } else if (firstBracket !== -1 && lastBracket !== -1) {
      jsonCandidate = cleaned.substring(firstBracket, lastBracket + 1);
    }
    
    if (jsonCandidate) {
      try {
        return JSON.parse(jsonCandidate);
      } catch (innerError) {
        console.error('Failed to parse extracted JSON:', jsonCandidate);
      }
    }
    
    console.error('Failed parsing raw text:', text);
    throw e;
  }
}

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === 'MY_GEMINI_API_KEY') {
      throw new Error('GEMINI_API_KEY environment variable is not configured in Secrets.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Check if server is configured with an AI Key
app.get('/api/check-ai-status', (req, res) => {
  const hasServerKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY';
  res.json({ hasServerKey });
});

// API endpoint to generate story based on a theme or list of words
app.post('/api/generate-story', async (req, res) => {
  try {
    const { theme, customWords, apiKey, aiConfig } = req.body;
    
    if (!theme && (!customWords || customWords.trim() === '')) {
      return res.status(400).json({ error: 'Please provide either a theme or custom words.' });
    }

    const provider = aiConfig?.provider || 'gemini';
    const configApiKey = aiConfig?.apiKey || apiKey || req.headers['x-gemini-api-key'] || req.headers['authorization']?.toString().replace('Bearer ', '');
    const baseUrl = aiConfig?.baseUrl || '';
    const modelName = aiConfig?.modelName || (provider === 'gemini' ? 'gemini-3.5-flash' : 'gpt-4o-mini');

    let prompt = '';
    if (theme) {
      prompt = `Generate a beautiful educational story on the theme: "${theme}".`;
    } else {
      prompt = `Generate a beautiful educational story containing these specific English words: "${customWords}".`;
    }

    prompt += `
    
Requirements:
1. The story MUST be written in natural, fluent Vietnamese.
2. Seamlessly embed the target English vocabulary words into the Vietnamese sentences.
3. Every target word MUST be formatted EXACTLY like this: [englishWord](vietnameseMeaning) (e.g., "[gathering](sự tụ họp)").
4. Embed between 5 to 12 English words.
5. Create a corresponding full English translation of the story.
6. Provide phonetic spellings, definitions, and clean, clear example sentences for each target English word.
`;

    const systemInstruction = `You are a premium, expert bilingual ESL (English as a Second Language) teacher who helps students memorize vocabulary by embedding it into rich, memorable stories. 
Ensure the Vietnamese text is completely grammatically correct and matches the flow of standard Vietnamese storytelling.
Every highlighted English word in [word](meaning) format must have a corresponding entry in the vocabulary array. Ensure the formatting of [word](meaning) is perfect with brackets and parentheses.`;

    let storyData: any = null;

    if (provider === 'openai-compatible' || baseUrl) {
      // Use standard fetch for custom OpenAI-compatible API providers (like OpenAI, DeepSeek, Groq, etc.)
      const cleanBaseUrl = baseUrl.trim().replace(/\/$/, '');
      const url = cleanBaseUrl.includes('/chat/completions') ? cleanBaseUrl : `${cleanBaseUrl}/chat/completions`;
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (configApiKey) {
        headers['Authorization'] = `Bearer ${configApiKey.trim()}`;
      }

      // Append explicit schema instructions to make sure the custom model outputs correct JSON schema
      prompt += `
      
IMPORTANT: You MUST return a single, valid JSON object matching this schema exactly. Do not wrap your response in markdown code blocks or code markers. Output raw JSON only.

Expected JSON Structure:
{
  "title": "A creative, beautiful title for the story in English",
  "category": "Theme category e.g., Workplace, Travel, Technology, Cooking, Nature",
  "description": "A brief summary of the story in Vietnamese (1-2 sentences)",
  "vietnameseStory": "The Vietnamese story embedding the English words in format: [englishWord](vietnameseMeaning)",
  "englishStory": "A full, professional English translation of the story.",
  "vocabulary": [
    {
      "word": "englishword",
      "phonetic": "/ˈpiː.pəl/",
      "vietnamese": "người dân",
      "definition": "members of a nation or community",
      "example": "The local people are incredibly friendly."
    }
  ]
}
`;

      const payload = {
        model: modelName,
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.8
      };

      console.log(`[AI-API] Requesting third party provider at: ${url} (model: ${modelName})`);
      const customRes = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      if (!customRes.ok) {
        const errorText = await customRes.text();
        throw new Error(`AI Provider returned error status ${customRes.status}: ${errorText || customRes.statusText}`);
      }

      const rawResponseText = await customRes.text();
      const responseJson: any = safeJsonParse(rawResponseText);
      const rawText = responseJson?.choices?.[0]?.message?.content;
      if (!rawText) {
        throw new Error('Could not retrieve story content from custom AI Provider. Choices array is empty or structure is invalid.');
      }

      // Sanitize potential markdown codeblocks wrapped around the JSON response
      try {
        storyData = safeJsonParse(rawText);
      } catch (parseError: any) {
        console.error('JSON parsing failure. Raw output was:', rawText);
        throw new Error(`Failed to parse response JSON from model: ${parseError.message}`);
      }

    } else {
      // Standard Official Google Gemini API
      let ai;
      if (configApiKey && typeof configApiKey === 'string' && configApiKey.trim() !== '' && configApiKey !== 'null' && configApiKey !== 'undefined') {
        ai = new GoogleGenAI({
          apiKey: configApiKey.trim(),
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });
      } else {
        try {
          ai = getAiClient();
        } catch (apiError: any) {
          console.warn('Gemini client not initialized:', apiError.message);
          return res.status(403).json({ 
            error: 'Gemini API is not configured yet. You can paste your own API key / token in the settings menu or the creator tab inline configuration!',
            isConfigError: true
          });
        }
      }

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A creative, beautiful title for the story in English" },
          category: { type: Type.STRING, description: "Theme category e.g., Workplace, Travel, Technology, Cooking, Nature" },
          description: { type: Type.STRING, description: "A brief summary of the story in Vietnamese (1-2 sentences)" },
          vietnameseStory: { 
            type: Type.STRING, 
            description: "The Vietnamese story embedding the English words in the exact format: [englishWord](vietnameseMeaning). Example: 'Tại một buổi [gathering](sự tụ họp), người chef đang lên kế hoạch...'" 
          },
          englishStory: { type: Type.STRING, description: "A full, professional English translation of the story." },
          vocabulary: {
            type: Type.ARRAY,
            description: "List of the English vocabulary words highlighted in the story",
            items: {
              type: Type.OBJECT,
              properties: {
                word: { type: Type.STRING, description: "The English word exactly as written inside the brackets in the story (lowercase)" },
                phonetic: { type: Type.STRING, description: "The correct IPA phonetic transcription, e.g., /ˈɡæð.ər.ɪŋ/ or /prɪˈpeər/" },
                vietnamese: { type: Type.STRING, description: "The direct Vietnamese translation of the word" },
                definition: { type: Type.STRING, description: "A simple, easy-to-understand English definition" },
                example: { type: Type.STRING, description: "A clean, natural English example sentence demonstrating the word's usage" }
              },
              required: ["word", "phonetic", "vietnamese", "definition", "example"]
            }
          }
        },
        required: ["title", "category", "description", "vietnameseStory", "englishStory", "vocabulary"]
      };

      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema,
          temperature: 0.8,
        }
      });

      if (!response.text) {
        throw new Error('Received empty response from Gemini API.');
      }

      storyData = safeJsonParse(response.text);
    }

    res.json(storyData);

  } catch (error: any) {
    console.error('Error generating story:', error);
    res.status(500).json({ error: error.message || 'An error occurred while generating the story.' });
  }
});

// API endpoint to handle real-time interactive conversation roleplay
app.post('/api/conversation-chat', async (req, res) => {
  try {
    const { scenario, history, userMessage, apiKey, aiConfig } = req.body;

    if (!scenario || !userMessage) {
      return res.status(400).json({ error: 'Scenario and userMessage are required.' });
    }

    const provider = aiConfig?.provider || 'gemini';
    const configApiKey = aiConfig?.apiKey || apiKey || req.headers['x-gemini-api-key'] || req.headers['authorization']?.toString().replace('Bearer ', '');
    const baseUrl = aiConfig?.baseUrl || '';
    const modelName = aiConfig?.modelName || (provider === 'gemini' ? 'gemini-3.5-flash' : 'gpt-4o-mini');

    const systemInstruction = `You are an expert English-speaking conversation partner. You are simulating a highly realistic, interactive conversation for the scenario: "${scenario}". 
The user is a Vietnamese native learning English. They are chatting with you to practice natural conversation.

Your goals:
1. Actively play your role in the scenario (e.g., if it is a coffee shop, you are the barista; if a job interview, you are the hiring manager). Keep your response natural, interactive, conversational, and relatively brief (1-3 sentences) as if talking in real-time.
2. Provide a clear, natural translation of your response into Vietnamese so they can understand immediately.
3. Review the user's latest English message ("${userMessage}"). Give them a short, extremely constructive feedback in Vietnamese: point out any grammatical errors, spelling typos, or suggest a more native-like way to phrase what they wanted to say. Be warm, supportive, and educational.
4. Give them 2-3 short, helpful hints (example phrases) in English with Vietnamese translations of how they can respond to your latest message.

You MUST return a JSON object exactly matching this schema:
{
  "aiResponse": "Your actual English response in character",
  "aiResponseTranslation": "Dịch nghĩa tiếng Việt của câu trả lời của bạn",
  "feedback": "Nhận xét ngắn bằng tiếng Việt về câu tiếng Anh vừa rồi của khách hàng (sửa lỗi ngữ pháp/phát âm/chính tả nếu có, hoặc gợi ý cách nói tự nhiên hơn)",
  "hint": "Gợi ý cách trả lời tiếp theo bằng tiếng Anh (kèm dịch Việt, ví dụ: '1. I would like a latte, please. (Vui lòng cho tôi một cốc latte)')"
}`;

    // Format chat history into a readable prompt format
    let historyText = '';
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        const speaker = msg.role === 'user' ? 'Learner (User)' : 'Partner (AI)';
        historyText += `${speaker}: ${msg.text}\n`;
      });
    }
    historyText += `Learner (User): ${userMessage}\nPartner (AI): `;

    let prompt = `Here is the current conversation history in the scenario "${scenario}":
${historyText}

Based on the latest learner message, please generate the next Partner (AI) response, its translation, feedback on the learner's message, and hints for their next turn.`;

    let responseData: any = null;

    if (provider === 'openai-compatible' || baseUrl) {
      // Third-party provider
      const cleanBaseUrl = baseUrl.trim().replace(/\/$/, '');
      const url = cleanBaseUrl.includes('/chat/completions') ? cleanBaseUrl : `${cleanBaseUrl}/chat/completions`;
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (configApiKey) {
        headers['Authorization'] = `Bearer ${configApiKey.trim()}`;
      }

      prompt += `
      
IMPORTANT: Return a raw JSON object matching the requested schema. Do not enclose in markdown code fences or backticks.
JSON Schema:
{
  "aiResponse": "string",
  "aiResponseTranslation": "string",
  "feedback": "string",
  "hint": "string"
}`;

      const payload = {
        model: modelName,
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7
      };

      console.log(`[AI-API-Chat] Requesting third party provider at: ${url} (model: ${modelName})`);
      const customRes = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      if (!customRes.ok) {
        const errorText = await customRes.text();
        throw new Error(`Custom API provider error: ${customRes.statusText || errorText}`);
      }

      const rawResponseText = await customRes.text();
      const responseJson: any = safeJsonParse(rawResponseText);
      const rawText = responseJson?.choices?.[0]?.message?.content;
      if (!rawText) {
        throw new Error('Received empty response content from third-party API.');
      }

      responseData = safeJsonParse(rawText);

    } else {
      // Official Google Gemini API
      let ai;
      if (configApiKey && typeof configApiKey === 'string' && configApiKey.trim() !== '' && configApiKey !== 'null' && configApiKey !== 'undefined') {
        ai = new GoogleGenAI({
          apiKey: configApiKey.trim(),
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });
      } else {
        try {
          ai = getAiClient();
        } catch (err) {
          return res.status(403).json({
            error: 'Gemini API Key is not configured yet. Please configure your key in Settings or the Creator inline block!',
            isConfigError: true
          });
        }
      }

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          aiResponse: { type: Type.STRING, description: "Your English reply in the roleplay context." },
          aiResponseTranslation: { type: Type.STRING, description: "Vietnamese translation of your reply." },
          feedback: { type: Type.STRING, description: "Supportive feedback in Vietnamese regarding spelling, grammar, or phrasing of the user's latest message." },
          hint: { type: Type.STRING, description: "2-3 short example answers in English with Vietnamese meanings that they can use next." }
        },
        required: ["aiResponse", "aiResponseTranslation", "feedback", "hint"]
      };

      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema,
          temperature: 0.7,
        }
      });

      if (!response.text) {
        throw new Error('Received empty response from Gemini API.');
      }

      responseData = safeJsonParse(response.text);
    }

    res.json(responseData);

  } catch (error: any) {
    console.error('Error in conversation chat:', error);
    res.status(500).json({ error: error.message || 'An error occurred during the conversation.' });
  }
});

// API endpoint to test the configured AI model connection
app.post('/api/test-connection', async (req, res) => {
  try {
    const { apiKey, aiConfig } = req.body;
    const provider = aiConfig?.provider || 'gemini';
    const configApiKey = aiConfig?.apiKey || apiKey || req.headers['x-gemini-api-key'] || req.headers['authorization']?.toString().replace('Bearer ', '');
    const baseUrl = aiConfig?.baseUrl || '';
    const modelName = aiConfig?.modelName || (provider === 'gemini' ? 'gemini-2.5-flash' : 'gpt-4o-mini');



    // Early check: if a Gemini provider gets an OpenAI-style key (sk-…), warn early
    if (
      configApiKey &&
      typeof configApiKey === 'string' &&
      configApiKey.trim().startsWith('sk-') &&
      (provider === 'gemini' || (!baseUrl && !aiConfig?.provider))
    ) {
      return res.status(400).json({
        success: false,
        isApiKeyMismatch: true,
        error: 'API Key bắt đầu bằng "sk-" có vẻ là của OpenAI hoặc bên thứ 3, không phải Google Gemini. ' +
          'Vui lòng chuyển nhà cung cấp (Provider) sang "OpenAI-Compatible" ' +
          'hoặc nhập đúng Gemini API Key (thường bắt đầu bằng "AIzaSy...").',
      });
    }

    if (provider === 'openai-compatible' || baseUrl) {
      const cleanBaseUrl = baseUrl.trim().replace(/\/$/, '');
      const url = cleanBaseUrl.includes('/chat/completions') ? cleanBaseUrl : `${cleanBaseUrl}/chat/completions`;
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (configApiKey) {
        headers['Authorization'] = `Bearer ${configApiKey.trim()}`;
      }

      const payload = {
        model: modelName,
        messages: [
          { role: 'user', content: 'Say OK' }
        ],
        max_tokens: 50,
        temperature: 0.1
      };



      const customRes = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      if (!customRes.ok) {
        const errorText = await customRes.text();

        throw new Error(`AI Provider returned error status ${customRes.status}: ${errorText || customRes.statusText}`);
      }

      const rawResponseText = await customRes.text();

      const responseJson: any = safeJsonParse(rawResponseText);

      
      const message = responseJson?.choices?.[0]?.message;
      const rawText = (message?.content || message?.reasoning_content || '').toString().trim();
      
      if (rawText === '') {
        throw new Error('Received empty response content from custom AI Provider.');
      }

      return res.json({ success: true, message: 'Kết nối thành công tới OpenAI-Compatible Provider!' });
    } else {
      let ai;
      if (configApiKey && typeof configApiKey === 'string' && configApiKey.trim() !== '' && configApiKey !== 'null' && configApiKey !== 'undefined') {
        ai = new GoogleGenAI({
          apiKey: configApiKey.trim(),
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });
      } else {
        try {
          ai = getAiClient();
        } catch (err: any) {
          return res.status(403).json({
            success: false,
            error: 'Chưa cấu hình API Key cho Gemini.'
          });
        }
      }

      const response = await ai.models.generateContent({
        model: modelName,
        contents: 'Say OK',
      });

      if (!response.text) {
        throw new Error('Nhận phản hồi rỗng từ Gemini API.');
      }

      return res.json({ success: true, message: 'Kết nối thành công tới Google Gemini API!' });
    }
  } catch (error: any) {
    console.error('Error in test-connection:', error);
    // The SDK wraps errors in a message string that may be JSON or plain text
    let msg = error?.message || 'Lỗi không xác định khi kết nối.';
    // If the message is JSON (e.g. from ApiError), extract the human-readable part
    try {
      const parsed = JSON.parse(msg);
      msg = parsed?.error?.message || msg;
    } catch { /* not JSON — use as-is */ }
    res.status(500).json({ success: false, error: msg });
  }
});

// API endpoint to dynamically generate a roleplay starting context based on selected story
app.post('/api/conversation-init', async (req, res) => {
  try {
    const { storyTitle, storyDescription, vocabulary, apiKey, aiConfig } = req.body;

    const provider = aiConfig?.provider || 'gemini';
    const configApiKey = aiConfig?.apiKey || apiKey || req.headers['x-gemini-api-key'] || req.headers['authorization']?.toString().replace('Bearer ', '');
    const baseUrl = aiConfig?.baseUrl || '';
    const modelName = aiConfig?.modelName || (provider === 'gemini' ? 'gemini-3.5-flash' : 'gpt-4o-mini');

    const vocabularyListStr = vocabulary && Array.isArray(vocabulary) 
      ? vocabulary.map((v: any) => `${v.word} (${v.vietnamese})`).join(', ')
      : '';

    const systemInstruction = `You are an expert English-speaking conversation partner. You are initiating a highly realistic, interactive roleplay conversation designed around the lesson/story titled: "${storyTitle}".
The story theme is about: "${storyDescription}".
The vocabulary words the learner wants to practice are: ${vocabularyListStr}.

Your goals:
1. Choose an appropriate roleplay role for yourself and for the learner based on this topic (e.g. if the story is about cooking, you are a chef and they are an assistant; if about tech, you are a co-founder and they are a developer).
2. Generate a natural, welcoming opening message (1-2 sentences) in English to start the roleplay. Do not give any meta-commentary, just speak as the character immediately.
3. Provide a clear translation of this opening message in Vietnamese.
4. Provide a Vietnamese title for this dynamic roleplay scenario.
5. Provide a Vietnamese short description of the scenario.
6. Provide 2-3 initial English hints/phrases with Vietnamese translation for the user to reply.

You MUST return a JSON object exactly matching this schema:
{
  "scenarioTitle": "Tên kịch bản tiếng Việt",
  "scenarioDescription": "Mô tả kịch bản tiếng Việt",
  "openingEn": "The actual character opening line in English",
  "openingVi": "Dịch tiếng Việt của câu mở đầu",
  "initialHint": "Gợi ý cách bắt đầu bằng tiếng Anh (ví dụ: '1. Hello chef, I am ready to help. (Chào đầu bếp, tôi đã sẵn sàng giúp đỡ)')"
}`;

    let responseData: any = null;
    const prompt = `Please create the initial roleplay opening for the story: "${storyTitle}".`;

    if (provider === 'openai-compatible' || baseUrl) {
      const cleanBaseUrl = baseUrl.trim().replace(/\/$/, '');
      const url = cleanBaseUrl.includes('/chat/completions') ? cleanBaseUrl : `${cleanBaseUrl}/chat/completions`;
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (configApiKey) {
        headers['Authorization'] = `Bearer ${configApiKey.trim()}`;
      }

      const payload = {
        model: modelName,
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7
      };

      const customRes = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      if (!customRes.ok) {
        const errorText = await customRes.text();
        throw new Error(`Custom API provider error: ${errorText}`);
      }

      const rawResponseText = await customRes.text();
      const responseJson: any = safeJsonParse(rawResponseText);
      const rawText = responseJson?.choices?.[0]?.message?.content;
      responseData = safeJsonParse(rawText);
    } else {
      let ai;
      if (configApiKey && typeof configApiKey === 'string' && configApiKey.trim() !== '' && configApiKey !== 'null' && configApiKey !== 'undefined') {
        ai = new GoogleGenAI({
          apiKey: configApiKey.trim(),
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });
      } else {
        try {
          ai = getAiClient();
        } catch (err) {
          return res.status(403).json({
            error: 'Chưa cấu hình API Key cho Gemini.',
            isConfigError: true
          });
        }
      }

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          scenarioTitle: { type: Type.STRING },
          scenarioDescription: { type: Type.STRING },
          openingEn: { type: Type.STRING },
          openingVi: { type: Type.STRING },
          initialHint: { type: Type.STRING }
        },
        required: ["scenarioTitle", "scenarioDescription", "openingEn", "openingVi", "initialHint"]
      };

      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema,
          temperature: 0.7,
        }
      });

      responseData = safeJsonParse(response.text);
    }

    res.json(responseData);
  } catch (error: any) {
    console.error('Error in conversation-init:', error);
    res.status(500).json({ error: error.message || 'Lỗi khởi tạo cuộc hội thoại.' });
  }
});

// ── Global error handler middleware ──────────────────────────────────────────
// Catches every unhandled error thrown by API routes and returns JSON instead
// of the default Express HTML error page.
app.use((err: any, req: any, res: any, next: any) => {
  // Only intercept /api/ paths — let Vite/static middleware handle the rest
  if (req.path.startsWith('/api/')) {
    console.error('[API Error]', err?.message || err);
    res.status(err?.status || 500).json({
      success: false,
      error: err?.message || 'Lỗi máy chủ nội bộ. Vui lòng thử lại sau.',
    });
  } else {
    next(err);
  }
});

function openBrowser(url: string) {
  const start = process.platform === 'darwin'
    ? 'open'
    : process.platform === 'win32'
      ? 'start'
      : 'xdg-open';

  if (process.platform === 'win32') {
    exec(`cmd.exe /c start ${url}`);
  } else {
    exec(`${start} ${url}`);
  }
}

// Configure Vite or Serve static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = __dirname;
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    const url = `http://localhost:${PORT}`;
    console.log(`Server running on ${url}`);
    if (process.env.NODE_ENV === 'production' && process.env.DISABLE_OPEN_BROWSER !== 'true') {
      openBrowser(url);
    }
  });
}

startServer();

