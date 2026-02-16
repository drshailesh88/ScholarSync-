import { NextResponse } from "next/server";
import { generateText } from "ai";
import { getSmallModel } from "@/lib/ai/models";
import { getSlideEditorSystemPrompt } from "@/lib/ai/prompts/presentation";
import type { SlideEditAction, ContentBlock } from "@/types/presentation";
import { z } from "zod";

const editSlideContentBlockSchema = z.object({
  type: z.string().min(1),
  data: z.record(z.string(), z.unknown()),
});

const editSlideRequestSchema = z.object({
  action: z.enum(["simplify", "elaborate", "add_examples", "improve_flow", "make_academic", "add_citations"], {
    error: "Invalid slide edit action",
  }),
  title: z.string().max(500).optional(),
  subtitle: z.string().max(500).optional(),
  contentBlocks: z
    .array(editSlideContentBlockSchema)
    .min(1, "At least one content block is required"),
  speakerNotes: z.string().max(5000).optional(),
  additionalContext: z.string().max(2000).optional(),
});

interface EditSlideRequest {
  action: SlideEditAction;
  title?: string;
  subtitle?: string;
  contentBlocks: ContentBlock[];
  speakerNotes?: string;
  additionalContext?: string;
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const parsed = editSlideRequestSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const body = parsed.data as EditSlideRequest;

    const systemPrompt = getSlideEditorSystemPrompt(body.action);

    const slideContent = JSON.stringify({
      title: body.title,
      subtitle: body.subtitle,
      contentBlocks: body.contentBlocks,
      speakerNotes: body.speakerNotes,
    });

    let userPrompt = `Here is the current slide content:\n${slideContent}`;
    if (body.additionalContext) {
      userPrompt += `\n\nAdditional context: ${body.additionalContext}`;
    }

    const { text } = await generateText({
      model: getSmallModel(),
      system: systemPrompt,
      prompt: userPrompt,
    });

    const cleanText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const result = JSON.parse(cleanText);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Edit slide error:", error);
    return NextResponse.json(
      { error: "Slide editing failed" },
      { status: 500 }
    );
  }
}
