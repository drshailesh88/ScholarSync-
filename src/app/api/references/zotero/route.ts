import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { fetchZoteroLibrary } from "@/lib/references/zotero";
import { logger } from "@/lib/logger";

const zoteroSchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
  userId: z.string().min(1, "User ID is required"),
  maxItems: z.number().int().min(1).max(1000).optional(),
});

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    // Authentication
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parseResult = zoteroSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { apiKey, userId: zoteroUserId, maxItems } = parseResult.data;

    log.info("Fetching Zotero library", {
      userId,
      zoteroUserId,
      maxItems: maxItems ?? 500,
    });

    const references = await fetchZoteroLibrary({
      apiKey,
      userId: zoteroUserId,
      maxItems,
    });

    return NextResponse.json({
      references,
      count: references.length,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch Zotero library";
    log.error("Zotero fetch error", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
