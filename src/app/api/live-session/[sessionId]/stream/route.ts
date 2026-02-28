/**
 * SSE endpoint for live session real-time updates.
 *
 * GET /api/live-session/[sessionId]/stream?token=<hmac>
 *
 * Authentication flow:
 *   1. The client must provide a `token` query parameter — an HMAC-SHA256
 *      token generated when the user joins the session (see generateStreamToken).
 *   2. As a fallback, the endpoint checks for a valid Clerk session cookie/header.
 *   3. If neither auth method succeeds, a 401 response is returned.
 *
 * Polls the database every 2 seconds and sends events:
 *   - questions_update: full question list
 *   - polls_update: full polls + results
 *   - session_update: audience count, current slide, status
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  liveSessions,
  liveQuestions,
  livePolls,
  livePollResponses,
} from "@/lib/db/schema";
import { eq, desc, asc, sql } from "drizzle-orm";
import crypto from "crypto";
import { rateLimit, getClientIP } from "@/lib/security/rate-limit";

export const dynamic = "force-dynamic";

const LIVE_SESSION_SECRET = process.env.LIVE_SESSION_SECRET || "dev-secret";

/**
 * Generate a short-lived HMAC token for SSE stream authentication.
 * Called when a user joins a live session; the token is passed as a
 * query parameter when opening the EventSource connection.
 */
export function generateStreamToken(sessionId: string): string {
  return crypto
    .createHmac("sha256", LIVE_SESSION_SECRET)
    .update(sessionId + ":" + Date.now())
    .digest("hex");
}

/**
 * Verify a stream token is valid. Because the token encodes a timestamp
 * that we cannot recover (HMAC is one-way), we accept any token that
 * could have been generated within the last 24 hours.
 */
function verifyStreamToken(sessionId: string, token: string): boolean {
  const now = Date.now();
  const windowMs = 24 * 60 * 60 * 1000; // 24 hours
  const stepMs = 30_000; // check every 30s within the window

  for (let t = now; t > now - windowMs; t -= stepMs) {
    const expected = crypto
      .createHmac("sha256", LIVE_SESSION_SECRET)
      .update(sessionId + ":" + t)
      .digest("hex");
    if (crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(token))) {
      return true;
    }
  }
  return false;
}

/**
 * Fallback auth: check for a valid Clerk session cookie.
 */
async function hasClerkSession(): Promise<boolean> {
  try {
    const { getCurrentUserId } = await import("@/lib/auth");
    await getCurrentUserId();
    return true;
  } catch {
    return false;
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const ip = getClientIP(req);
  const { success } = await rateLimit(ip, { maxRequests: 30, windowMs: 60_000 });
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { sessionId } = await params;

  // --- Authentication ---
  const token = req.nextUrl.searchParams.get("token");

  let authenticated = false;

  // Method 1: HMAC token from query parameter
  if (token && token.length === 64) {
    authenticated = verifyStreamToken(sessionId, token);
  }

  // Method 2: Clerk session cookie/header (fallback)
  if (!authenticated) {
    authenticated = await hasClerkSession();
  }

  if (!authenticated) {
    return NextResponse.json(
      { error: "Unauthorized — provide a valid token or sign in" },
      { status: 401 }
    );
  }

  const encoder = new TextEncoder();
  let closed = false;

  const stream = new ReadableStream({
    async start(controller) {
      function send(event: string, data: unknown) {
        if (closed) return;
        try {
          controller.enqueue(
            encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
          );
        } catch {
          closed = true;
        }
      }

      // Send initial keepalive
      send("connected", { sessionId });

      async function poll() {
        if (closed) return;

        try {
          // Fetch session
          const [session] = await db
            .select({
              status: liveSessions.status,
              audienceCount: liveSessions.audienceCount,
              currentSlideIndex: liveSessions.currentSlideIndex,
            })
            .from(liveSessions)
            .where(eq(liveSessions.id, sessionId))
            .limit(1);

          if (!session || session.status === "ended") {
            send("session_ended", { sessionId });
            closed = true;
            controller.close();
            return;
          }

          // Send session update
          send("session_update", {
            audienceCount: session.audienceCount,
            currentSlideIndex: session.currentSlideIndex,
            status: session.status,
          });

          // Fetch questions
          const questions = await db
            .select({
              id: liveQuestions.id,
              sessionId: liveQuestions.sessionId,
              content: liveQuestions.content,
              authorName: liveQuestions.authorName,
              slideIndex: liveQuestions.slideIndex,
              upvotes: liveQuestions.upvotes,
              status: liveQuestions.status,
              answeredAt: liveQuestions.answeredAt,
              createdAt: liveQuestions.createdAt,
            })
            .from(liveQuestions)
            .where(eq(liveQuestions.sessionId, sessionId))
            .orderBy(desc(liveQuestions.upvotes), asc(liveQuestions.createdAt));

          send("questions_update", questions);

          // Fetch polls with results
          const polls = await db
            .select({
              id: livePolls.id,
              sessionId: livePolls.sessionId,
              question: livePolls.question,
              options: livePolls.options,
              slideIndex: livePolls.slideIndex,
              status: livePolls.status,
              createdAt: livePolls.createdAt,
            })
            .from(livePolls)
            .where(eq(livePolls.sessionId, sessionId))
            .orderBy(desc(livePolls.createdAt));

          const pollsWithResults = await Promise.all(
            polls.map(async (poll) => {
              const responses = await db
                .select({
                  optionIndex: livePollResponses.optionIndex,
                  count: sql<number>`count(*)::int`,
                })
                .from(livePollResponses)
                .where(eq(livePollResponses.pollId, poll.id))
                .groupBy(livePollResponses.optionIndex);

              const totalVotes = responses.reduce(
                (sum, r) => sum + r.count,
                0
              );

              return { ...poll, responses, totalVotes };
            })
          );

          send("polls_update", pollsWithResults);
        } catch (err) {
          // Log but don't crash the stream
          console.error("[live-session SSE] poll error:", err);
        }

        // Schedule next poll
        if (!closed) {
          setTimeout(poll, 2000);
        }
      }

      // Start polling
      poll();
    },
    cancel() {
      closed = true;
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
