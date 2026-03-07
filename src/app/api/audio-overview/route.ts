import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { db } from "@/lib/db";
import { conversations, papers } from "@/lib/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { getStoredOverview } from "@/lib/rag/source-summarizer";
import { generateAudioScript, type AudioOverviewMode } from "@/lib/ai/audio-overview";
import { OpenAITTSProvider, synthesizeLongText } from "@/lib/tts/openai-tts";
import {
  uploadAudioOverview,
  downloadAudioOverview,
} from "@/lib/storage/r2";

export const runtime = "nodejs";

const audioOverviewRequestSchema = z.object({
  conversationId: z.number().int().positive(),
  paperIds: z.array(z.number().int().positive()).min(1).max(25),
  mode: z.enum(["research", "learn"]).optional(),
  customPrompt: z.string().max(500).optional(),
  length: z.enum(["brief", "default", "detailed"]).optional(),
});

interface CachedAudioOverview {
  hash: string;
  audioUrl: string;
  storagePath: string;
  script: string;
  durationSeconds: number;
  generatedAt: string;
  mode?: AudioOverviewMode;
}

function normalizeAuthors(authors: unknown): string[] {
  if (!Array.isArray(authors)) return [];

  return authors
    .map((author) => {
      if (typeof author === "string") return author.trim();
      if (!author || typeof author !== "object") return "";

      const record = author as Record<string, unknown>;
      const name =
        (typeof record.name === "string" && record.name) ||
        (typeof record.full_name === "string" && record.full_name) ||
        (typeof record.author === "string" && record.author);

      return name ? name.trim() : "";
    })
    .filter(Boolean)
    .slice(0, 5);
}

function parseCachedAudioOverview(value: unknown): CachedAudioOverview | null {
  if (!value || typeof value !== "object") return null;

  const record = value as Record<string, unknown>;

  if (
    typeof record.hash !== "string" ||
    typeof record.audioUrl !== "string" ||
    typeof record.storagePath !== "string" ||
    typeof record.script !== "string" ||
    typeof record.durationSeconds !== "number" ||
    typeof record.generatedAt !== "string"
  ) {
    return null;
  }

  return {
    hash: record.hash,
    audioUrl: record.audioUrl,
    storagePath: record.storagePath,
    script: record.script,
    durationSeconds: record.durationSeconds,
    generatedAt: record.generatedAt,
    mode: record.mode === "learn" ? "learn" : "research",
  };
}

// ---------------------------------------------------------------------------
// POST - Generate an audio overview for a notebook conversation
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  const log = logger.withRequestId();

  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const rateLimitResponse = await checkRateLimit(
      userId,
      "audio-overview",
      RATE_LIMITS["audio-overview"]
    );
    if (rateLimitResponse) return rateLimitResponse;

    const body: unknown = await req.json();
    const parsed = audioOverviewRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid request" },
        { status: 400 }
      );
    }

    const mode: AudioOverviewMode = parsed.data.mode ?? "research";
    const paperIds = [...new Set(parsed.data.paperIds)].sort((a, b) => a - b);
    const customPrompt = parsed.data.customPrompt?.trim() || "";
    const length = parsed.data.length ?? "default";
    const paperIdsHash = `${mode}:${length}:${customPrompt.slice(0, 50)}:${paperIds.join(",")}`;

    const [convo] = await db
      .select({
        id: conversations.id,
        audio_overview: conversations.audio_overview,
      })
      .from(conversations)
      .where(
        and(
          eq(conversations.id, parsed.data.conversationId),
          eq(conversations.user_id, userId)
        )
      );

    if (!convo) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    const cached = parseCachedAudioOverview(convo.audio_overview);
    if (cached && cached.hash === paperIdsHash && cached.audioUrl) {
      return NextResponse.json({
        audioUrl: cached.audioUrl,
        script: cached.script,
        durationSeconds: cached.durationSeconds,
        cached: true,
      });
    }

    const paperRows = await db
      .select({
        id: papers.id,
        title: papers.title,
        authors: papers.authors,
      })
      .from(papers)
      .where(inArray(papers.id, paperIds));

    const paperOverviews = (
      await Promise.all(
        paperRows.map(async (paper) => {
          const overview = await getStoredOverview(paper.id);
          if (!overview) return null;

          return {
            title: paper.title,
            authors: normalizeAuthors(paper.authors).slice(0, 3),
            overview,
          };
        })
      )
    ).filter((item): item is NonNullable<typeof item> => Boolean(item));

    if (paperOverviews.length === 0) {
      return NextResponse.json(
        {
          error:
            "No source notes available. Generate source notes first (View Source Notes panel).",
        },
        { status: 400 }
      );
    }

    log.info("Generating audio script", {
      conversationId: parsed.data.conversationId,
      paperCount: paperOverviews.length,
      mode,
    });

    const script = await generateAudioScript({
      paperOverviews,
      mode,
      customPrompt: customPrompt || undefined,
      length,
    });

    log.info("Synthesizing audio", {
      conversationId: parsed.data.conversationId,
      scriptLength: script.text.length,
    });

    const ttsProvider = new OpenAITTSProvider();
    const ttsResult = await synthesizeLongText(ttsProvider, script.text, {
      voice: "nova",
      format: "mp3",
    });

    const audioId = crypto.randomUUID();
    const storagePath = await uploadAudioOverview(
      parsed.data.conversationId,
      audioId,
      ttsResult.audioBuffer,
      ttsResult.extension
    );

    const audioUrl = `/api/audio-overview?stream=${parsed.data.conversationId}/${audioId}.${ttsResult.extension}`;

    await db
      .update(conversations)
      .set({
        audio_overview: {
          hash: paperIdsHash,
          mode,
          audioUrl,
          storagePath,
          script: script.text,
          durationSeconds: ttsResult.estimatedDurationSeconds,
          generatedAt: script.generatedAt,
        },
        updated_at: new Date(),
      })
      .where(
        and(
          eq(conversations.id, parsed.data.conversationId),
          eq(conversations.user_id, userId)
        )
      );

    log.info("Audio overview generated", {
      conversationId: parsed.data.conversationId,
      durationSeconds: ttsResult.estimatedDurationSeconds,
      audioSizeBytes: ttsResult.audioBuffer.length,
    });

    return NextResponse.json({
      audioUrl,
      script: script.text,
      durationSeconds: ttsResult.estimatedDurationSeconds,
      cached: false,
    });
  } catch (error) {
    log.error("Audio overview error", error);
    return NextResponse.json(
      { error: "Failed to generate audio overview. Please try again." },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// GET - Stream a stored audio file
// ---------------------------------------------------------------------------

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const streamPath = searchParams.get("stream");

  if (!streamPath) {
    return NextResponse.json(
      { error: "Missing stream parameter" },
      { status: 400 }
    );
  }

  let userId: string;
  try {
    userId = await getCurrentUserId();
  } catch {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const [conversationIdRaw] = streamPath.split("/");
  const conversationId = Number.parseInt(conversationIdRaw, 10);

  if (!Number.isFinite(conversationId)) {
    return NextResponse.json({ error: "Invalid stream path" }, { status: 400 });
  }

  const [convo] = await db
    .select({ audio_overview: conversations.audio_overview })
    .from(conversations)
    .where(
      and(
        eq(conversations.id, conversationId),
        eq(conversations.user_id, userId)
      )
    );

  if (!convo) {
    return NextResponse.json({ error: "Audio not found" }, { status: 404 });
  }

  const cached = parseCachedAudioOverview(convo.audio_overview);
  const storagePath = `audio-overviews/${streamPath}`;

  if (!cached || cached.storagePath !== storagePath) {
    return NextResponse.json({ error: "Audio not found" }, { status: 404 });
  }

  const buffer = await downloadAudioOverview(storagePath);
  if (!buffer) {
    return NextResponse.json({ error: "Audio not found" }, { status: 404 });
  }

  const ext = streamPath.split(".").pop()?.toLowerCase() || "mp3";
  const mimeTypes: Record<string, string> = {
    mp3: "audio/mpeg",
    wav: "audio/wav",
    opus: "audio/opus",
    aac: "audio/aac",
    flac: "audio/flac",
  };

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": mimeTypes[ext] || "audio/mpeg",
      "Content-Length": String(buffer.length),
      "Cache-Control": "private, max-age=3600",
    },
  });
}
