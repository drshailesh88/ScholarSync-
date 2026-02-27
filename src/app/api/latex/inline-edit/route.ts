import { streamText } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { getLatexWriteModel, getLatexUtilModel } from "@/lib/ai/models";

const editRequestSchema = z.object({
  selectedText: z.string().max(10000),
  instruction: z.string().max(1000),
  surroundingContext: z.string().max(5000).optional(),
  complexity: z.enum(["simple", "complex"]).optional(),
});

// Simple edits (grammar, formalize, shorten) -> GPT-5 Nano (20x cheaper)
// Complex edits (strengthen, expand, restructure) -> Claude Sonnet (writing quality)
const SIMPLE_PATTERNS = [
  "grammar", "fix grammar", "correct", "formalize", "formal",
  "shorten", "shorter", "concise", "brief",
  "simplify", "simple",
];

function classifyComplexity(instruction: string): "simple" | "complex" {
  const lower = instruction.toLowerCase();
  return SIMPLE_PATTERNS.some((p) => lower.includes(p)) ? "simple" : "complex";
}

export async function POST(req: Request) {
  try {
    await getCurrentUserId();
    const body = await req.json();
    const parsed = editRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { selectedText, instruction, surroundingContext } = parsed.data;
    const complexity = parsed.data.complexity ?? classifyComplexity(instruction);

    const model = complexity === "simple" ? getLatexUtilModel() : getLatexWriteModel();

    const systemPrompt = `You are an expert LaTeX editor. The user has selected text in their LaTeX document and wants you to modify it.

Rules:
- Return ONLY the modified LaTeX text — no explanations, no markdown code fences
- Preserve all LaTeX commands and structure
- Keep the same general length unless asked to expand or shorten
- Maintain academic writing style
- Do not add or remove \\section{}, \\begin{}, \\end{} commands unless specifically asked`;

    const userPrompt = surroundingContext
      ? `Context around the selection:\n${surroundingContext}\n\nSelected text to modify:\n${selectedText}\n\nInstruction: ${instruction}`
      : `Selected text to modify:\n${selectedText}\n\nInstruction: ${instruction}`;

    const result = streamText({
      model,
      system: systemPrompt,
      prompt: userPrompt,
    });

    return result.toTextStreamResponse();
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
