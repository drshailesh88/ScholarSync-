/**
 * SSE endpoint for live session real-time updates.
 *
 * GET /api/live-session/[sessionId]/stream
 *
 * Polls the database every 2 seconds and sends events:
 *   - questions_update: full question list
 *   - polls_update: full polls + results
 *   - session_update: audience count, current slide, status
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  liveSessions,
  liveQuestions,
  livePolls,
  livePollResponses,
} from "@/lib/db/schema";
import { eq, desc, asc, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;

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
            .select()
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
            .select()
            .from(liveQuestions)
            .where(eq(liveQuestions.sessionId, sessionId))
            .orderBy(desc(liveQuestions.upvotes), asc(liveQuestions.createdAt));

          send("questions_update", questions);

          // Fetch polls with results
          const polls = await db
            .select()
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
