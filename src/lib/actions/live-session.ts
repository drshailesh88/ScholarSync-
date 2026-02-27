"use server";

import { db } from "@/lib/db";
import {
  liveSessions,
  liveQuestions,
  livePolls,
  livePollResponses,
} from "@/lib/db/schema";
import { eq, and, desc, sql, asc } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateJoinCode(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  return Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

// ---------------------------------------------------------------------------
// Session Management
// ---------------------------------------------------------------------------

export async function startLiveSession(deckId: number) {
  const userId = await getCurrentUserId();

  // End any existing active sessions for this deck
  await db
    .update(liveSessions)
    .set({ status: "ended", endedAt: new Date() })
    .where(
      and(
        eq(liveSessions.deckId, deckId),
        eq(liveSessions.userId, userId),
        eq(liveSessions.status, "active")
      )
    );

  // Create new session with unique join code
  let joinCode = generateJoinCode();
  let attempts = 0;
  while (attempts < 10) {
    try {
      const [session] = await db
        .insert(liveSessions)
        .values({
          deckId,
          userId,
          joinCode,
          status: "active",
          settings: { allowAnonymous: true, moderateQuestions: false, maxQuestions: 100 },
        })
        .returning();
      return session;
    } catch (e: unknown) {
      // Unique constraint violation — try new code
      if (
        e instanceof Error &&
        e.message.includes("unique")
      ) {
        joinCode = generateJoinCode();
        attempts++;
      } else {
        throw e;
      }
    }
  }
  throw new Error("Failed to generate unique join code");
}

export async function endLiveSession(sessionId: string) {
  const userId = await getCurrentUserId();
  const [session] = await db
    .update(liveSessions)
    .set({ status: "ended", endedAt: new Date() })
    .where(
      and(
        eq(liveSessions.id, sessionId),
        eq(liveSessions.userId, userId)
      )
    )
    .returning();
  return session;
}

export async function getActiveSession(deckId: number) {
  const userId = await getCurrentUserId();
  const [session] = await db
    .select()
    .from(liveSessions)
    .where(
      and(
        eq(liveSessions.deckId, deckId),
        eq(liveSessions.userId, userId),
        eq(liveSessions.status, "active")
      )
    )
    .limit(1);
  return session ?? null;
}

/** Public — no auth required */
export async function getSessionByJoinCode(code: string) {
  const [session] = await db
    .select()
    .from(liveSessions)
    .where(
      and(
        eq(liveSessions.joinCode, code.toUpperCase()),
        eq(liveSessions.status, "active")
      )
    )
    .limit(1);
  return session ?? null;
}

export async function updateSessionSlideIndex(
  sessionId: string,
  slideIndex: number
) {
  await db
    .update(liveSessions)
    .set({ currentSlideIndex: slideIndex })
    .where(eq(liveSessions.id, sessionId));
}

export async function incrementAudienceCount(sessionId: string) {
  await db
    .update(liveSessions)
    .set({
      audienceCount: sql`${liveSessions.audienceCount} + 1`,
    })
    .where(eq(liveSessions.id, sessionId));
}

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------

export async function submitQuestion(
  sessionId: string,
  content: string,
  authorName?: string,
  authorFingerprint?: string,
  slideIndex?: number
) {
  const [question] = await db
    .insert(liveQuestions)
    .values({
      sessionId,
      content: content.trim(),
      authorName: authorName?.trim() || null,
      authorFingerprint: authorFingerprint || null,
      slideIndex: slideIndex ?? null,
    })
    .returning();
  return question;
}

export async function upvoteQuestion(
  questionId: string,
  _fingerprint: string
) {
  // Simple upvote increment (could add fingerprint-based dedup later)
  const [question] = await db
    .update(liveQuestions)
    .set({
      upvotes: sql`${liveQuestions.upvotes} + 1`,
    })
    .where(eq(liveQuestions.id, questionId))
    .returning();
  return question;
}

export async function updateQuestionStatus(
  questionId: string,
  status: "pending" | "answered" | "dismissed" | "highlighted"
) {
  const updates: Record<string, unknown> = { status };
  if (status === "answered") {
    updates.answeredAt = new Date();
  }
  // If highlighting, un-highlight all other questions in the same session first
  if (status === "highlighted") {
    const [question] = await db
      .select({ sessionId: liveQuestions.sessionId })
      .from(liveQuestions)
      .where(eq(liveQuestions.id, questionId))
      .limit(1);
    if (question) {
      await db
        .update(liveQuestions)
        .set({ status: "pending" })
        .where(
          and(
            eq(liveQuestions.sessionId, question.sessionId),
            eq(liveQuestions.status, "highlighted")
          )
        );
    }
  }
  const [updated] = await db
    .update(liveQuestions)
    .set(updates)
    .where(eq(liveQuestions.id, questionId))
    .returning();
  return updated;
}

export async function getQuestions(sessionId: string) {
  return db
    .select()
    .from(liveQuestions)
    .where(eq(liveQuestions.sessionId, sessionId))
    .orderBy(desc(liveQuestions.upvotes), asc(liveQuestions.createdAt));
}

// ---------------------------------------------------------------------------
// Polls
// ---------------------------------------------------------------------------

export async function createPoll(
  sessionId: string,
  question: string,
  options: string[],
  slideIndex?: number
) {
  const [poll] = await db
    .insert(livePolls)
    .values({
      sessionId,
      question: question.trim(),
      options,
      slideIndex: slideIndex ?? null,
      status: "draft",
    })
    .returning();
  return poll;
}

export async function activatePoll(pollId: string) {
  // Close any other active polls in the same session
  const [poll] = await db
    .select({ sessionId: livePolls.sessionId })
    .from(livePolls)
    .where(eq(livePolls.id, pollId))
    .limit(1);
  if (poll) {
    await db
      .update(livePolls)
      .set({ status: "closed" })
      .where(
        and(
          eq(livePolls.sessionId, poll.sessionId),
          eq(livePolls.status, "active")
        )
      );
  }
  const [activated] = await db
    .update(livePolls)
    .set({ status: "active" })
    .where(eq(livePolls.id, pollId))
    .returning();
  return activated;
}

export async function closePoll(pollId: string) {
  const [closed] = await db
    .update(livePolls)
    .set({ status: "closed" })
    .where(eq(livePolls.id, pollId))
    .returning();
  return closed;
}

export async function submitPollResponse(
  pollId: string,
  optionIndex: number,
  voterFingerprint: string
) {
  try {
    const [response] = await db
      .insert(livePollResponses)
      .values({
        pollId,
        optionIndex,
        voterFingerprint,
      })
      .onConflictDoNothing()
      .returning();
    return response ?? null; // null means duplicate vote
  } catch {
    return null;
  }
}

export async function getPollResults(pollId: string) {
  const responses = await db
    .select({
      optionIndex: livePollResponses.optionIndex,
      count: sql<number>`count(*)::int`,
    })
    .from(livePollResponses)
    .where(eq(livePollResponses.pollId, pollId))
    .groupBy(livePollResponses.optionIndex);

  const totalVotes = responses.reduce((sum, r) => sum + r.count, 0);

  return {
    responses,
    totalVotes,
  };
}

export async function getPolls(sessionId: string) {
  return db
    .select()
    .from(livePolls)
    .where(eq(livePolls.sessionId, sessionId))
    .orderBy(desc(livePolls.createdAt));
}

export async function getActivePoll(sessionId: string) {
  const [poll] = await db
    .select()
    .from(livePolls)
    .where(
      and(
        eq(livePolls.sessionId, sessionId),
        eq(livePolls.status, "active")
      )
    )
    .limit(1);
  return poll ?? null;
}
