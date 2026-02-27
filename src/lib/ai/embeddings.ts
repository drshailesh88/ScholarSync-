import OpenAI from "openai";
import { getLangfuse, isLangfuseConfigured } from "@/lib/langfuse";

let _openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  }
  return _openai;
}

/**
 * Generate embeddings for one or more text inputs using OpenAI text-embedding-3-small.
 * Returns an array of 1536-dimensional vectors.
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];

  const trace = isLangfuseConfigured()
    ? getLangfuse().trace({ name: "embedding", metadata: { count: texts.length } })
    : null;

  const generation = trace?.generation({
    name: "text-embedding-3-small",
    model: "text-embedding-3-small",
    input: { textCount: texts.length, totalChars: texts.reduce((s, t) => s + t.length, 0) },
  });

  const response = await getOpenAI().embeddings.create({
    model: "text-embedding-3-small",
    input: texts,
  });

  generation?.end({
    usage: { input: response.usage?.prompt_tokens, output: 0 },
  });

  return response.data.map((d) => d.embedding);
}

/**
 * Generate a single embedding vector.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const [embedding] = await generateEmbeddings([text]);
  return embedding;
}
