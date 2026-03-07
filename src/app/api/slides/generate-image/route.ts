import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import {
  generateSlideImage,
  type SlideImageAspectRatio,
  type SlideImageStyle,
} from "@/lib/slides/image-generation";

const requestSchema = z.object({
  prompt: z.string().trim().min(1).max(4000),
  style: z.enum(["realistic", "illustration", "diagram", "abstract"]).optional(),
  aspectRatio: z.enum(["16:9", "4:3", "1:1", "3:4"]).optional(),
});

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateLimitResponse = await checkRateLimit(
      userId,
      "slide-images",
      RATE_LIMITS["slide-images"]
    );
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const parseResult = requestSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const payload = await generateSlideImage({
      prompt: parseResult.data.prompt,
      style: parseResult.data.style as SlideImageStyle | undefined,
      aspectRatio: parseResult.data.aspectRatio as SlideImageAspectRatio | undefined,
    });

    return NextResponse.json({
      imageUrl: payload.imageUrl,
      attribution: payload.attribution,
    });
  } catch (error) {
    log.error("Slide image generation failed", error);
    return NextResponse.json(
      { error: "Image generation failed" },
      { status: 500 }
    );
  }
}
