import { streamText } from "ai";
import { getModel } from "@/lib/ai/models";
import { searchSimilarChunks } from "@/lib/actions/embeddings";

export async function POST(req: Request) {
  try {
    const { messages, paperIds, mode } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get the latest user message for similarity search
    const lastUserMsg = [...messages].reverse().find((m: { role: string }) => m.role === "user");
    const query = lastUserMsg?.content || "";

    // Search for relevant chunks if we have papers
    let contextChunks: { text: string; similarity: number; paper_id: number }[] = [];
    if (query) {
      try {
        contextChunks = await searchSimilarChunks(query, paperIds, 5);
      } catch {
        // If search fails (no embeddings, etc.), continue without RAG context
      }
    }

    // Build the system prompt with RAG context
    let systemPrompt = `You are ScholarSync, an AI research assistant for academic writing. You help students and researchers with their papers.`;

    if (mode === "notebook") {
      systemPrompt += ` You are in Notebook mode — helping analyze uploaded research sources.`;
    }

    if (contextChunks.length > 0) {
      systemPrompt += `\n\nRelevant context from the user's research papers:\n\n`;
      contextChunks.forEach((chunk, i) => {
        systemPrompt += `--- Source ${i + 1} (relevance: ${(chunk.similarity * 100).toFixed(0)}%) ---\n${chunk.text}\n\n`;
      });
      systemPrompt += `Use the above context to inform your response. Cite specific sources when relevant. If the context doesn't help answer the question, rely on your general knowledge but mention that.`;
    }

    const result = streamText({
      model: getModel(),
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("RAG chat error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process RAG chat" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
