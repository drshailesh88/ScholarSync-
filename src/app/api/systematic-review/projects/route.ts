/**
 * GET /api/systematic-review/projects
 *
 * List all systematic review projects for the current user,
 * with paper counts and screening progress.
 */

import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  projects,
  projectPapers,
  systematicReviewConfig,
  screeningDecisions,
} from "@/lib/db/schema";
import { eq, and, sql, count } from "drizzle-orm";

export async function GET() {
  try {
    const userId = await getCurrentUserId();

    // Get all systematic_review projects for this user
    const srProjects = await db
      .select({
        id: projects.id,
        title: projects.title,
        description: projects.description,
        researchQuestion: projects.research_question,
        status: projects.status,
        createdAt: projects.created_at,
        updatedAt: projects.updated_at,
      })
      .from(projects)
      .where(
        and(
          eq(projects.user_id, userId),
          eq(projects.project_type, "systematic_review")
        )
      )
      .orderBy(sql`${projects.updated_at} DESC NULLS LAST`);

    // Enrich with config, paper counts, and screening progress
    const enriched = await Promise.all(
      srProjects.map(async (project) => {
        // Get SR config
        const [config] = await db
          .select({ reviewStage: systematicReviewConfig.reviewStage })
          .from(systematicReviewConfig)
          .where(eq(systematicReviewConfig.projectId, project.id))
          .limit(1);

        // Count papers
        const [paperCount] = await db
          .select({ count: count() })
          .from(projectPapers)
          .where(eq(projectPapers.project_id, project.id));

        // Count screening decisions
        const [screenedCount] = await db
          .select({ count: count() })
          .from(screeningDecisions)
          .where(eq(screeningDecisions.projectId, project.id));

        const totalPapers = paperCount?.count ?? 0;
        const totalScreened = screenedCount?.count ?? 0;
        const screeningProgress =
          totalPapers > 0
            ? Math.round((totalScreened / totalPapers) * 100)
            : 0;

        return {
          ...project,
          reviewStage: config?.reviewStage ?? "search_strategy",
          paperCount: totalPapers,
          screeningProgress,
        };
      })
    );

    return NextResponse.json({ projects: enriched });
  } catch (error) {
    console.error("SR projects list error", error);
    return NextResponse.json(
      { error: "Failed to list projects" },
      { status: 500 }
    );
  }
}
