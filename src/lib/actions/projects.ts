"use server";

import { db } from "@/lib/db";
import { projects, projectPapers, synthesisDocuments } from "@/lib/db/schema";
import { eq, and, desc, isNull, sql, count } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ProjectType =
  | "thesis"
  | "review_article"
  | "original_article"
  | "case_report"
  | "case_series"
  | "meta_analysis"
  | "systematic_review"
  | "literature_review"
  | "book_chapter"
  | "dissertation"
  | "letter"
  | "editorial"
  | "short_communication";

type ProjectStatus = "planning" | "drafting" | "reviewing" | "completed" | "archived";

// ---------------------------------------------------------------------------
// Read
// ---------------------------------------------------------------------------

/** Fetch all non-deleted projects for the current user with paper & doc counts */
export async function getProjects() {
  const userId = await getCurrentUserId();

  // Main project rows
  const rows = await db
    .select()
    .from(projects)
    .where(and(eq(projects.user_id, userId), isNull(projects.deleted_at)))
    .orderBy(desc(projects.updated_at));

  if (rows.length === 0) return [];

  const projectIds = rows.map((r) => r.id);

  // Paper counts per project
  const paperCounts = await db
    .select({
      project_id: projectPapers.project_id,
      count: count(),
    })
    .from(projectPapers)
    .where(sql`${projectPapers.project_id} IN ${projectIds}`)
    .groupBy(projectPapers.project_id);

  // Document counts per project
  const docCounts = await db
    .select({
      project_id: synthesisDocuments.project_id,
      count: count(),
    })
    .from(synthesisDocuments)
    .where(
      and(
        sql`${synthesisDocuments.project_id} IN ${projectIds}`,
        isNull(synthesisDocuments.deleted_at)
      )
    )
    .groupBy(synthesisDocuments.project_id);

  const paperMap = new Map(paperCounts.map((r) => [r.project_id, r.count]));
  const docMap = new Map(docCounts.map((r) => [r.project_id, r.count]));

  return rows.map((p) => ({
    ...p,
    paper_count: paperMap.get(p.id) ?? 0,
    doc_count: docMap.get(p.id) ?? 0,
  }));
}

/** Fetch a single project by id (ownership-checked) */
export async function getProject(id: number) {
  const userId = await getCurrentUserId();
  const [project] = await db
    .select()
    .from(projects)
    .where(
      and(
        eq(projects.id, id),
        eq(projects.user_id, userId),
        isNull(projects.deleted_at)
      )
    );
  return project || null;
}

// ---------------------------------------------------------------------------
// Create
// ---------------------------------------------------------------------------

export async function createProject(data: {
  title: string;
  project_type?: ProjectType;
  description?: string;
  target_journal?: string;
  deadline?: string; // ISO date string, e.g. "2026-03-15"
  citation_style?: string;
}) {
  const userId = await getCurrentUserId();
  const [project] = await db
    .insert(projects)
    .values({
      user_id: userId,
      title: data.title,
      project_type: data.project_type || "review_article",
      description: data.description,
      target_journal: data.target_journal,
      deadline: data.deadline,
      citation_style: data.citation_style || "vancouver",
      status: "planning",
    })
    .returning();
  revalidatePath("/projects");
  revalidatePath("/dashboard");
  return project;
}

// ---------------------------------------------------------------------------
// Update
// ---------------------------------------------------------------------------

export async function updateProject(
  id: number,
  data: Partial<{
    title: string;
    description: string;
    status: ProjectStatus;
    research_question: string;
    target_word_count: number;
    target_journal: string;
    deadline: string;
    citation_style: string;
  }>
) {
  const userId = await getCurrentUserId();
  const [project] = await db
    .update(projects)
    .set({ ...data, updated_at: new Date() })
    .where(and(eq(projects.id, id), eq(projects.user_id, userId)))
    .returning();
  revalidatePath("/projects");
  revalidatePath("/dashboard");
  return project;
}

/** Convenience: update only the status field */
export async function updateProjectStatus(id: number, status: ProjectStatus) {
  return updateProject(id, { status });
}

// ---------------------------------------------------------------------------
// Delete / Archive
// ---------------------------------------------------------------------------

/** Soft-delete a project */
export async function deleteProject(id: number) {
  const userId = await getCurrentUserId();
  await db
    .update(projects)
    .set({ deleted_at: new Date() })
    .where(and(eq(projects.id, id), eq(projects.user_id, userId)));
  revalidatePath("/projects");
  revalidatePath("/dashboard");
}

/** Archive a project (sets status to "archived") */
export async function archiveProject(id: number) {
  return updateProject(id, { status: "archived" });
}
