"use server";

import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq, and, desc, isNull } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  const userId = await getCurrentUserId();
  return db
    .select()
    .from(projects)
    .where(and(eq(projects.user_id, userId), isNull(projects.deleted_at)))
    .orderBy(desc(projects.updated_at));
}

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

export async function createProject(data: {
  title: string;
  project_type?: "thesis" | "review_article" | "original_article" | "case_report" | "case_series" | "meta_analysis" | "systematic_review" | "literature_review" | "book_chapter" | "dissertation" | "letter" | "editorial" | "short_communication";
  description?: string;
}) {
  const userId = await getCurrentUserId();
  const [project] = await db
    .insert(projects)
    .values({
      user_id: userId,
      title: data.title,
      project_type: data.project_type || "review_article",
      description: data.description,
    })
    .returning();
  revalidatePath("/projects");
  revalidatePath("/dashboard");
  return project;
}

export async function updateProject(
  id: number,
  data: Partial<{
    title: string;
    description: string;
    status: "planning" | "drafting" | "reviewing" | "completed" | "archived";
    research_question: string;
    target_word_count: number;
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

export async function deleteProject(id: number) {
  const userId = await getCurrentUserId();
  await db
    .update(projects)
    .set({ deleted_at: new Date() })
    .where(and(eq(projects.id, id), eq(projects.user_id, userId)));
  revalidatePath("/projects");
  revalidatePath("/dashboard");
}
