import { generateText } from "ai";
import { getSmallModel } from "@/lib/ai/models";

export async function generateHypotheticalAnswer(
  query: string
): Promise<string> {
  const { text } = await generateText({
    model: getSmallModel(),
    system:
      "You are a medical textbook. Write a brief, factual 2-3 sentence answer to this research question. Use precise medical terminology. Do not hedge or qualify — state facts directly as a textbook would.",
    prompt: query,
    maxOutputTokens: 200,
  });
  return text;
}
