import { generateText } from "ai";
import { getSmallModel } from "@/lib/ai/models";
import type { DomainConfig } from "@/lib/search/domains/types";

export async function generateHypotheticalAnswer(
  query: string,
  domain?: DomainConfig
): Promise<string> {
  const persona =
    domain?.personas.textbook ??
    "You are a medical textbook. Write a brief, factual 2-3 sentence answer to this research question. Use precise medical terminology. Do not hedge or qualify — state facts directly as a textbook would.";

  const { text } = await generateText({
    model: getSmallModel(),
    system: persona,
    prompt: query,
    maxOutputTokens: 200,
  });
  return text;
}
