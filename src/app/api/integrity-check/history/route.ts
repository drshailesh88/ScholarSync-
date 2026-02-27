import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { integrityChecks } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return new Response(
        JSON.stringify({ error: "Not authenticated" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    const { searchParams } = new URL(req.url);
    const limit = Math.min(
      Math.max(parseInt(searchParams.get("limit") ?? "20", 10) || 20, 1),
      100,
    );
    const offset = Math.max(
      parseInt(searchParams.get("offset") ?? "0", 10) || 0,
      0,
    );

    const [checks, countResult] = await Promise.all([
      db
        .select({
          id: integrityChecks.id,
          createdAt: integrityChecks.createdAt,
          aiScore: integrityChecks.aiScore,
          plagiarismScore: integrityChecks.plagiarismScore,
          wordCount: integrityChecks.wordCount,
          engine: integrityChecks.aiDetectionEngine,
          checkType: integrityChecks.checkType,
          projectId: integrityChecks.projectId,
        })
        .from(integrityChecks)
        .where(eq(integrityChecks.userId, userId))
        .orderBy(desc(integrityChecks.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(integrityChecks)
        .where(eq(integrityChecks.userId, userId)),
    ]);

    return new Response(
      JSON.stringify({ checks, total: countResult[0]?.count ?? 0 }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Failed to fetch integrity check history", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch history" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
