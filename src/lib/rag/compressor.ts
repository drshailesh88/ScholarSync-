import { generateText } from "ai";
import { getSmallModel } from "@/lib/ai/models";
import type { RerankedChunk } from "./reranker";

export interface CompressedChunk extends RerankedChunk {
  compressedText: string;
}

/**
 * Compress chunks to only the sentences relevant to the query.
 * Optional — adds latency but improves context quality.
 */
export async function compressChunks(
  query: string,
  chunks: RerankedChunk[]
): Promise<CompressedChunk[]> {
  const compressed = await Promise.all(
    chunks.map(async (chunk) => {
      const { text } = await generateText({
        model: getSmallModel(),
        system:
          "Extract ONLY the sentences from the given text that are relevant to the question. Return the exact sentences, not paraphrases. If the entire text is relevant, return it all. If nothing is relevant, return an empty string.",
        prompt: `Question: ${query}\n\nText:\n${chunk.text}`,
        maxOutputTokens: 300,
      });
      return { ...chunk, compressedText: text.trim() || chunk.text };
    })
  );
  return compressed.filter((c) => c.compressedText.length > 0);
}
