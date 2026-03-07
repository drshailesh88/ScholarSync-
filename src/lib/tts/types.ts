/**
 * TTS Provider Interface
 *
 * Abstracts text-to-speech synthesis so the engine can be swapped
 * (OpenAI TTS -> Chatterbox -> Google Cloud TTS) without changing
 * any calling code.
 */

export interface TTSOptions {
  /** Voice ID (provider-specific). Defaults to provider's best narrative voice. */
  voice?: string;
  /** Playback speed multiplier. 0.5 to 2.0. Default 1.0. */
  speed?: number;
  /** Output format. Default "mp3". */
  format?: "mp3" | "wav" | "opus";
}

export interface TTSResult {
  /** Raw audio data */
  audioBuffer: Buffer;
  /** MIME type of the audio */
  mimeType: string;
  /** File extension (e.g., "mp3") */
  extension: string;
  /** Estimated duration in seconds (approximate from character count) */
  estimatedDurationSeconds: number;
}

export interface TTSProvider {
  /** Human-readable name for logging */
  name: string;
  /** Maximum characters per single synthesis call */
  maxCharacters: number;
  /** Synthesize text to audio */
  synthesize(text: string, options?: TTSOptions): Promise<TTSResult>;
}
