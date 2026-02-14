import { NextResponse } from "next/server";
import { generateText } from "ai";
import { getSmallModel } from "@/lib/ai/models";
import { getSlideEditorSystemPrompt } from "@/lib/ai/prompts/presentation";
import type { SlideEditAction, ContentBlock } from "@/types/presentation";

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
    const body: EditSlideRequest = await req.json();

    if (!body.action || !body.contentBlocks) {
      return NextResponse.json(
        { error: "action and contentBlocks are required" },
        { status: 400 }
      );
    }

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
