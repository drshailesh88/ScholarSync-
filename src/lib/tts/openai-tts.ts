/**
 * OpenAI TTS Provider
 *
 * Uses the OpenAI Audio Speech API (POST /v1/audio/speech).
 * Requires OPENAI_API_KEY environment variable.
 *
 * Model: tts-1 (faster, cheaper) for MVP. tts-1-hd for premium tier.
 * Voice: "nova" - clear, warm, good for educational narration.
 * Output: mp3
 */

import type { TTSProvider, TTSOptions, TTSResult } from "./types";

const OPENAI_TTS_URL = "https://api.openai.com/v1/audio/speech";
const DEFAULT_VOICE = "nova";
const DEFAULT_MODEL = "tts-1";
const MAX_CHARS = 4096;

const MIME_TYPES: Record<string, string> = {
  mp3: "audio/mpeg",
  wav: "audio/wav",
  opus: "audio/opus",
};

// Average speech rate: ~150 words/min, ~5 chars/word -> ~750 chars/min
function estimateDuration(text: string): number {
  return Math.max(1, Math.ceil((text.length / 750) * 60));
}

function clampSpeed(speed: number): number {
  return Math.max(0.25, Math.min(4.0, speed));
}

function splitIntoChunks(text: string, maxChars: number): string[] {
  if (text.length <= maxChars) return [text];

  const chunks: string[] = [];
  let remaining = text.trim();

  while (remaining.length > 0) {
    if (remaining.length <= maxChars) {
      chunks.push(remaining);
      break;
    }

    const slice = remaining.slice(0, maxChars);
    const lastSentenceBoundary = Math.max(
      slice.lastIndexOf(". "),
      slice.lastIndexOf("? "),
      slice.lastIndexOf("! "),
      slice.lastIndexOf(".\n"),
      slice.lastIndexOf("?\n"),
      slice.lastIndexOf("!\n")
    );

    if (lastSentenceBoundary > 200) {
      const endIndex = lastSentenceBoundary + 1;
      chunks.push(remaining.slice(0, endIndex).trim());
      remaining = remaining.slice(endIndex).trimStart();
    } else {
      chunks.push(slice.trim());
      remaining = remaining.slice(maxChars).trimStart();
    }
  }

  return chunks.filter(Boolean);
}

export class OpenAITTSProvider implements TTSProvider {
  name = "OpenAI TTS";
  maxCharacters = MAX_CHARS;

  async synthesize(text: string, options?: TTSOptions): Promise<TTSResult> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    const input = text.length > MAX_CHARS ? text.slice(0, MAX_CHARS) : text;
    const format = options?.format ?? "mp3";
    const voice = options?.voice ?? DEFAULT_VOICE;
    const speed = clampSpeed(options?.speed ?? 1.0);

    const response = await fetch(OPENAI_TTS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        input,
        voice,
        response_format: format,
        speed,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI TTS failed (${response.status}): ${errorText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);

    return {
      audioBuffer,
      mimeType: MIME_TYPES[format] ?? "audio/mpeg",
      extension: format,
      estimatedDurationSeconds: estimateDuration(input),
    };
  }
}

/**
 * For long texts (>4096 chars), split into chunks and synthesize sequentially,
 * then concatenate the audio buffers.
 *
 * Splits at sentence boundaries to avoid cutting mid-word.
 */
export async function synthesizeLongText(
  provider: TTSProvider,
  text: string,
  options?: TTSOptions
): Promise<TTSResult> {
  if (text.length <= provider.maxCharacters) {
    return provider.synthesize(text, options);
  }

  const format = options?.format ?? "mp3";
  const chunks = splitIntoChunks(text, provider.maxCharacters);

  // MVP concatenation is frame-safe for MP3. For non-MP3 formats, keep
  // single-call behavior only (no reliable concat without transcoding).
  if (chunks.length > 1 && format !== "mp3") {
    throw new Error("Long-form chunked synthesis currently supports mp3 format only");
  }

  const buffers: Buffer[] = [];
  let totalDuration = 0;
  let mimeType = "audio/mpeg";
  let extension: string = format;

  for (const chunk of chunks) {
    const result = await provider.synthesize(chunk, options);
    buffers.push(result.audioBuffer);
    totalDuration += result.estimatedDurationSeconds;
    mimeType = result.mimeType;
    extension = result.extension;
  }

  return {
    audioBuffer: Buffer.concat(buffers),
    mimeType,
    extension,
    estimatedDurationSeconds: totalDuration,
  };
}
