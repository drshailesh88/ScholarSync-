import { NextResponse } from "next/server";
import { createDeck, createSlide } from "@/lib/actions/presentations";
import { getCurrentUserId } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { PPTX_MAX_FILE_SIZE, isPptxFile, parsePptx } from "@/lib/slides/pptx-import";
import { storeImportedSlideAsset } from "@/lib/slides/pptx-asset-storage";
import type { ContentBlock } from "@/types/presentation";

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateLimitResponse = await checkRateLimit(userId, "presentations", RATE_LIMITS.ai);
    if (rateLimitResponse) return rateLimitResponse;

    const formData = await req.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Please upload a .pptx file" }, { status: 400 });
    }

    if (!isPptxFile(file.name, file.type)) {
      return NextResponse.json({ error: "Please upload a .pptx file" }, { status: 400 });
    }

    if (file.size > PPTX_MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File exceeds 50MB limit" }, { status: 400 });
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    let parsed;
    try {
      parsed = await parsePptx(bytes, {
        fileName: file.name,
        includeAssets: true,
      });
    } catch (error) {
      if (error instanceof Error && error.message === "PASSWORD_PROTECTED_PPTX") {
        return NextResponse.json(
          { error: "Password-protected files are not supported" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "Could not read this file. Is it a valid PowerPoint presentation?" },
        { status: 400 }
      );
    }

    const deck = await createDeck({
      title: parsed.title,
      description: `Imported from ${file.name}${parsed.themeName ? ` (theme: ${parsed.themeName})` : ""}`,
      sourceType: "custom",
    });

    for (const [index, slide] of parsed.slides.entries()) {
      const contentBlocks: ContentBlock[] = slide.contentBlocks.map((block) => structuredClone(block));

      for (const asset of slide.imageAssets) {
        if (!asset.data) continue;
        const stored = await storeImportedSlideAsset(asset.data, asset.extension, asset.mimeType);
        const imageBlock = contentBlocks[asset.blockIndex];
        if (imageBlock?.type === "image") {
          imageBlock.data.url = stored.url;
        }
      }

      await createSlide({
        deckId: deck.id,
        sortOrder: index,
        layout: slide.layout,
        title: slide.title,
        subtitle: slide.subtitle || undefined,
        contentBlocks,
        speakerNotes: slide.speakerNotes || undefined,
      });
    }

    const warnings = parsed.slideCount === 0
      ? [...parsed.warnings, "Presentation contains no slides"]
      : parsed.warnings;

    log.info("PPTX imported", {
      deckId: deck.id,
      slideCount: parsed.slideCount,
      warnings: warnings.length,
    });

    return NextResponse.json({
      deckId: deck.id,
      slideCount: parsed.slideCount,
      warnings,
    });
  } catch (error) {
    log.error("PPTX import error", error);
    return NextResponse.json({ error: "Import failed" }, { status: 500 });
  }
}
