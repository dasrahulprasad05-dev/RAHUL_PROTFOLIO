import { config } from "../config/env.js";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface GenerateOptions {
  system: string;
  messages: ChatMessage[];
  stream?: boolean;
  onToken?: (token: string) => void | Promise<void>;
}

export interface GenerateResult {
  text: string;
  stream?: AsyncGenerator<string, void, unknown>;
}

// Fallback models if the primary fails
const FALLBACK_MODELS = [
  "gemini-3.1-flash-lite",
  "gemini-3.5-flash",
  "gemini-flash-lite-latest",
];

// Statuses where trying the next model can help (not found, rate limit, overload, server error)
function shouldTryNext(status: number): boolean {
  return status === 404 || status === 429 || status >= 500;
}

function sanitizeUrl(url: string): string {
  return url.replace(/key=[^&]+/g, "key=[REDACTED]");
}

/**
 * Builds Google Gemini API request body.
 */
function buildGeminiRequestBody(system: string, messages: ChatMessage[]) {
  return {
    system_instruction: {
      parts: [{ text: system }],
    },
    contents: messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 600,
      topP: 0.9,
    },
  };
}

/**
 * Generates text or a token stream via Gemini.
 */
export async function generate(options: GenerateOptions): Promise<GenerateResult> {
  const apiKey = (config.llmApiKey || "").trim();
  if (!apiKey) {
    throw new Error("LLM_API_KEY is not configured in backend environment.");
  }

  const primaryModel = config.llmModel || "gemini-3.1-flash-lite";
  const modelsToTry = [primaryModel, ...FALLBACK_MODELS.filter((m) => m !== primaryModel)];

  const bodyData = buildGeminiRequestBody(options.system, options.messages);

  if (options.stream) {
    return generateStreaming(apiKey, modelsToTry, bodyData, options.onToken);
  } else {
    return generateNonStreaming(apiKey, modelsToTry, bodyData);
  }
}

async function generateNonStreaming(
  apiKey: string,
  models: string[],
  bodyData: unknown
): Promise<GenerateResult> {
  let lastError: Error | null = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        const status = response.status;
        console.error(`[llm] ${model} failed: HTTP ${status} ${errorText.slice(0, 200)}`);
        if (shouldTryNext(status) && models.indexOf(model) < models.length - 1) {
          continue;
        }
        throw new Error(`LLM upstream error (${status}): ${errorText.slice(0, 200)}`);
      }

      const data = (await response.json()) as {
        candidates?: Array<{
          content?: {
            parts?: Array<{ text?: string }>;
          };
        }>;
      };

      const text =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I don't have that information. You can reach out directly via the contact page.";

      return { text: text.trim() };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      lastError = new Error(sanitizeUrl(msg));
    }
  }

  throw lastError || new Error("Failed to generate response from AI provider.");
}

async function generateStreaming(
  apiKey: string,
  models: string[],
  bodyData: unknown,
  onToken?: (token: string) => void | Promise<void>
): Promise<GenerateResult> {
  let response: Response | null = null;
  let lastError: Error | null = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        const status = res.status;
        console.error(`[llm] ${model} stream failed: HTTP ${status} ${errorText.slice(0, 200)}`);
        if (shouldTryNext(status) && models.indexOf(model) < models.length - 1) {
          continue;
        }
        throw new Error(`LLM stream upstream error (${status}): ${errorText.slice(0, 200)}`);
      }

      if (!res.body) {
        throw new Error("No response body received for streaming.");
      }

      response = res;
      break;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      lastError = new Error(sanitizeUrl(msg));
    }
  }

  if (!response || !response.body) {
    throw lastError || new Error("Failed to establish stream with AI provider.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  async function* tokenGenerator(): AsyncGenerator<string, void, unknown> {
    let buffer = "";
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("data: ")) {
            const jsonStr = trimmed.slice(6);
            try {
              const parsed = JSON.parse(jsonStr) as {
                candidates?: Array<{
                  content?: {
                    parts?: Array<{ text?: string }>;
                  };
                }>;
              };
              const chunkText = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
              if (chunkText) {
                if (onToken) {
                  await onToken(chunkText);
                }
                yield chunkText;
              }
            } catch {
              // Ignore incomplete SSE json chunks
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  return {
    text: "",
    stream: tokenGenerator(),
  };
}
