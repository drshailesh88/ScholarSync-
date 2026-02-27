import { streamText } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { getLatexWriteModel } from "@/lib/ai/models";

const draftChatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(50000),
      })
    )
    .max(20),
  currentSection: z.string().max(10000).optional(),
  documentOutline: z.string().max(2000).optional(),
  intensity: z.enum(["focus", "collaborate", "accelerate"]).optional(),
});

const INTENSITY_INSTRUCTIONS: Record<string, string> = {
  focus: "Only respond when the user explicitly asks a question. Be concise and precise. Do not volunteer suggestions.",
  collaborate: "Balance between responding to questions and offering helpful suggestions. Point out potential improvements but let the user lead.",
  accelerate: "Be proactive. Suggest improvements, offer to generate sections, restructure arguments, and push the paper forward. Take initiative.",
};

export async function POST(req: Request) {
  try {
    await getCurrentUserId();
    const body = await req.json();
    const parsed = draftChatSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { messages, currentSection, documentOutline, intensity } = parsed.data;

    // Smart context windowing: send section + outline, not full document
    let contextBlock = "";
    if (currentSection) {
      contextBlock += `\n\n--- CURRENT SECTION ---\n${currentSection}`;
    }
    if (documentOutline) {
      contextBlock += `\n\n--- DOCUMENT OUTLINE ---\n${documentOutline}`;
    }

    const intensityMode = intensity ?? "collaborate";

    const systemPrompt = `You are an expert academic writing assistant for LaTeX papers. You help researchers write, structure, and improve their papers.

${INTENSITY_INSTRUCTIONS[intensityMode]}

Guidelines:
- When suggesting LaTeX code, use proper formatting and standard packages
- Provide academically rigorous advice — cite conventions, not opinions
- Be specific: refer to the user's actual content when making suggestions
- Keep responses focused and actionable
- When generating LaTeX, return clean code that can be directly inserted
${contextBlock}`;

    const result = streamText({
      model: getLatexWriteModel(),
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    return result.toTextStreamResponse();
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
