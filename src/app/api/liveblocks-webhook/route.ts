import { NextResponse } from "next/server";
import { Liveblocks } from "@liveblocks/node";
import type { SlideLayout, ContentBlock } from "@/types/presentation";

// ---------------------------------------------------------------------------
// Liveblocks Webhook — persists collaborative changes to PostgreSQL
//
// When Liveblocks storage is updated by any collaborator, this webhook
// syncs the changes back to the database so PostgreSQL remains the
// source of truth.
//
// Setup: Configure this URL in the Liveblocks dashboard under Webhooks:
//   POST https://your-domain.com/api/liveblocks-webhook
//   Events: storageUpdated
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  if (!process.env.LIVEBLOCKS_SECRET_KEY) {
    return NextResponse.json(
      { error: "Liveblocks not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { type, data } = body;

    // We only care about storage update events
    if (type !== "storageUpdated") {
      return NextResponse.json({ ok: true });
    }

    const roomId = data?.roomId as string | undefined;
    if (!roomId || !roomId.startsWith("presentation:")) {
      return NextResponse.json({ ok: true });
    }

    const deckId = Number(roomId.replace("presentation:", ""));
    if (isNaN(deckId)) {
      return NextResponse.json({ error: "Invalid room ID" }, { status: 400 });
    }

    // Fetch the current room storage from Liveblocks
    const liveblocks = new Liveblocks({
      secret: process.env.LIVEBLOCKS_SECRET_KEY,
    });

    const storage = await liveblocks.getStorageDocument(roomId, "json");

    if (!storage || !storage.data) {
      return NextResponse.json({ ok: true });
    }

    // Dynamically import the server actions to avoid bundling issues
    const { updateSlide } = await import("@/lib/actions/presentations");

    // Persist each slide from Liveblocks storage to PostgreSQL
    // storage.data is JsonObject; access .slides via bracket notation to avoid index sig error
    const storageData = storage.data as Record<string, unknown>;
    const slidesMap = storageData["slides"];
    if (slidesMap && typeof slidesMap === "object") {
      const slideEntries = Object.entries(slidesMap as Record<string, unknown>) as [string, Record<string, unknown>][];

      await Promise.all(
        slideEntries.map(async ([slideIdStr, slideData]) => {
          const slideId = Number(slideIdStr);
          if (isNaN(slideId)) return;

          await updateSlide(slideId, {
            // Cast layout string to SlideLayout — validated at generation time
            layout: slideData.layout as SlideLayout | undefined,
            title: slideData.title as string | undefined,
            subtitle: slideData.subtitle as string | undefined,
            // Cast contentBlocks — stored as JSON array, matches ContentBlock[] shape
            contentBlocks: slideData.contentBlocks as ContentBlock[] | undefined,
            speakerNotes: slideData.speakerNotes as string | undefined,
          });
        })
      );
    }

    return NextResponse.json({ ok: true, synced: true });
  } catch (err) {
    console.error("[liveblocks-webhook] Error:", err);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
