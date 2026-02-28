"use server";

import { db } from "@/lib/db";
import {
  slideDecks,
  slides,
  presentationCoachEvaluations,
} from "@/lib/db/schema";
import { eq, and, desc, asc, count, sql } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { auditLog } from "@/lib/security/audit-log";
import type {
  ContentBlock,
  ThemeConfig,
  AudienceType,
  SlideLayout,
  CoachEvaluation,
} from "@/types/presentation";

// ---------------------------------------------------------------------------
// Deck CRUD
// ---------------------------------------------------------------------------

export async function createDeck(data: {
  title: string;
  description?: string;
  projectId?: number;
  documentId?: number;
  audienceType?: AudienceType;
  themeConfig?: ThemeConfig;
  sourceType?: "synthesis" | "papers" | "custom";
}) {
  const userId = await getCurrentUserId();
  const [deck] = await db
    .insert(slideDecks)
    .values({
      userId,
      title: data.title,
      description: data.description,
      projectId: data.projectId,
      documentId: data.documentId,
      audienceType: data.audienceType ?? "general",
      themeConfig: data.themeConfig as unknown as Record<string, unknown>,
      sourceType: data.sourceType ?? "custom",
      theme: "modern",
    })
    .returning();
  return deck;
}

export async function getDeck(deckId: number) {
  const userId = await getCurrentUserId();
  const [deck] = await db
    .select({
      id: slideDecks.id,
      projectId: slideDecks.projectId,
      userId: slideDecks.userId,
      documentId: slideDecks.documentId,
      title: slideDecks.title,
      description: slideDecks.description,
      theme: slideDecks.theme,
      audienceType: slideDecks.audienceType,
      generationStatus: slideDecks.generationStatus,
      themeConfig: slideDecks.themeConfig,
      slideOrder: slideDecks.slideOrder,
      totalSlides: slideDecks.totalSlides,
      sourceType: slideDecks.sourceType,
      templateId: slideDecks.templateId,
      citationStyle: slideDecks.citationStyle,
      shareToken: slideDecks.shareToken,
      shareEnabled: slideDecks.shareEnabled,
      createdAt: slideDecks.createdAt,
      updatedAt: slideDecks.updatedAt,
    })
    .from(slideDecks)
    .where(and(eq(slideDecks.id, deckId), eq(slideDecks.userId, userId)));

  if (!deck) return null;

  const deckSlides = await db
    .select({
      id: slides.id,
      deckId: slides.deckId,
      sortOrder: slides.sortOrder,
      layout: slides.layout,
      title: slides.title,
      subtitle: slides.subtitle,
      content: slides.content,
      contentBlocks: slides.contentBlocks,
      speakerNotes: slides.speakerNotes,
      sourceCitations: slides.sourceCitations,
      generatedByAi: slides.generatedByAi,
      hasChart: slides.hasChart,
      hasTable: slides.hasTable,
      hasImage: slides.hasImage,
      visualData: slides.visualData,
      createdAt: slides.createdAt,
      lastEditedAt: slides.lastEditedAt,
    })
    .from(slides)
    .where(eq(slides.deckId, deckId))
    .orderBy(asc(slides.sortOrder));

  return { ...deck, slides: deckSlides };
}

export async function getDecksForProject(projectId: number) {
  const userId = await getCurrentUserId();
  return db
    .select({
      id: slideDecks.id,
      projectId: slideDecks.projectId,
      title: slideDecks.title,
      description: slideDecks.description,
      theme: slideDecks.theme,
      audienceType: slideDecks.audienceType,
      generationStatus: slideDecks.generationStatus,
      totalSlides: slideDecks.totalSlides,
      sourceType: slideDecks.sourceType,
      createdAt: slideDecks.createdAt,
      updatedAt: slideDecks.updatedAt,
    })
    .from(slideDecks)
    .where(
      and(eq(slideDecks.projectId, projectId), eq(slideDecks.userId, userId))
    )
    .orderBy(desc(slideDecks.updatedAt));
}

export async function getUserDecks() {
  const userId = await getCurrentUserId();

  const slideCountSq = db
    .select({
      deckId: slides.deckId,
      slideCount: count(slides.id).as("slide_count"),
    })
    .from(slides)
    .groupBy(slides.deckId)
    .as("slide_counts");

  const rows = await db
    .select({
      id: slideDecks.id,
      title: slideDecks.title,
      description: slideDecks.description,
      theme: slideDecks.theme,
      audienceType: slideDecks.audienceType,
      generationStatus: slideDecks.generationStatus,
      themeConfig: slideDecks.themeConfig,
      totalSlides: sql<number>`coalesce(${slideCountSq.slideCount}, ${slideDecks.totalSlides}, 0)`.as("total_slides_live"),
      sourceType: slideDecks.sourceType,
      createdAt: slideDecks.createdAt,
      updatedAt: slideDecks.updatedAt,
    })
    .from(slideDecks)
    .leftJoin(slideCountSq, eq(slideDecks.id, slideCountSq.deckId))
    .where(eq(slideDecks.userId, userId))
    .orderBy(desc(slideDecks.updatedAt));

  return rows;
}

export async function updateDeck(
  deckId: number,
  data: {
    title?: string;
    description?: string;
    theme?: string;
    audienceType?: AudienceType;
    themeConfig?: ThemeConfig;
    generationStatus?: "pending" | "processing" | "completed" | "failed";
    generationPrompt?: string;
    slideOrder?: number[];
    totalSlides?: number;
  }
) {
  const userId = await getCurrentUserId();
  const [updated] = await db
    .update(slideDecks)
    .set({
      ...data,
      themeConfig: data.themeConfig as unknown as Record<string, unknown>,
      slideOrder: data.slideOrder as number[],
      updatedAt: new Date(),
    })
    .where(and(eq(slideDecks.id, deckId), eq(slideDecks.userId, userId)))
    .returning();
  return updated;
}

export async function deleteDeck(deckId: number) {
  const userId = await getCurrentUserId();
  await db
    .delete(slideDecks)
    .where(and(eq(slideDecks.id, deckId), eq(slideDecks.userId, userId)));

  auditLog({
    action: "deck.deleted",
    userId,
    resourceType: "deck",
    resourceId: deckId,
  });
}

// ---------------------------------------------------------------------------
// Slide CRUD
// ---------------------------------------------------------------------------

export async function createSlide(data: {
  deckId: number;
  sortOrder: number;
  layout?: SlideLayout;
  title?: string;
  subtitle?: string;
  contentBlocks?: ContentBlock[];
  speakerNotes?: string;
  generatedByAi?: boolean;
}) {
  const [slide] = await db
    .insert(slides)
    .values({
      deckId: data.deckId,
      sortOrder: data.sortOrder,
      layout: data.layout ?? "title_content",
      title: data.title ?? "New Slide",
      subtitle: data.subtitle,
      contentBlocks: (data.contentBlocks ?? []) as Record<string, unknown>[],
      speakerNotes: data.speakerNotes,
      generatedByAi: data.generatedByAi ?? false,
    })
    .returning();

  // Update total slides count
  const allSlides = await db
    .select({ id: slides.id })
    .from(slides)
    .where(eq(slides.deckId, data.deckId));

  await db
    .update(slideDecks)
    .set({ totalSlides: allSlides.length, updatedAt: new Date() })
    .where(eq(slideDecks.id, data.deckId));

  return slide;
}

export async function updateSlide(
  slideId: number,
  data: {
    layout?: SlideLayout;
    title?: string;
    subtitle?: string;
    contentBlocks?: ContentBlock[];
    speakerNotes?: string;
    content?: unknown;
  }
) {
  const [updated] = await db
    .update(slides)
    .set({
      ...(data.layout && { layout: data.layout }),
      ...(data.title !== undefined && { title: data.title }),
      ...(data.subtitle !== undefined && { subtitle: data.subtitle }),
      ...(data.contentBlocks && { contentBlocks: data.contentBlocks as Record<string, unknown>[] }),
      ...(data.speakerNotes !== undefined && {
        speakerNotes: data.speakerNotes,
      }),
      ...(data.content !== undefined && { content: data.content as Record<string, unknown> }),
      lastEditedAt: new Date(),
    })
    .where(eq(slides.id, slideId))
    .returning();
  return updated;
}

export async function deleteSlide(slideId: number) {
  const [deleted] = await db
    .delete(slides)
    .where(eq(slides.id, slideId))
    .returning();

  if (deleted) {
    // Re-order remaining slides
    const remaining = await db
      .select({ id: slides.id, sortOrder: slides.sortOrder })
      .from(slides)
      .where(eq(slides.deckId, deleted.deckId))
      .orderBy(asc(slides.sortOrder));

    for (let i = 0; i < remaining.length; i++) {
      if (remaining[i].sortOrder !== i) {
        await db
          .update(slides)
          .set({ sortOrder: i })
          .where(eq(slides.id, remaining[i].id));
      }
    }

    // Update total slides count
    await db
      .update(slideDecks)
      .set({ totalSlides: remaining.length, updatedAt: new Date() })
      .where(eq(slideDecks.id, deleted.deckId));
  }

  return deleted;
}

export async function reorderSlides(
  deckId: number,
  slideIds: number[]
) {
  for (let i = 0; i < slideIds.length; i++) {
    await db
      .update(slides)
      .set({ sortOrder: i })
      .where(and(eq(slides.id, slideIds[i]), eq(slides.deckId, deckId)));
  }

  await db
    .update(slideDecks)
    .set({ slideOrder: slideIds as number[], updatedAt: new Date() })
    .where(eq(slideDecks.id, deckId));
}

// ---------------------------------------------------------------------------
// Coach Evaluations
// ---------------------------------------------------------------------------

export async function saveCoachEvaluation(
  deckId: number,
  evaluation: CoachEvaluation
) {
  const [saved] = await db
    .insert(presentationCoachEvaluations)
    .values({
      deckId,
      structureScore: evaluation.structureScore,
      evidenceScore: evaluation.evidenceScore,
      narrativeScore: evaluation.narrativeScore,
      designScore: evaluation.designScore,
      audienceFitScore: evaluation.audienceFitScore,
      overallScore: evaluation.overallScore,
      slideInsights: evaluation.slideInsights as unknown as Record<string, unknown>[],
      suggestions: evaluation.suggestions as unknown as Record<string, unknown>[],
    })
    .returning();
  return saved;
}

export async function getLatestCoachEvaluation(deckId: number) {
  const [evaluation] = await db
    .select()
    .from(presentationCoachEvaluations)
    .where(eq(presentationCoachEvaluations.deckId, deckId))
    .orderBy(desc(presentationCoachEvaluations.createdAt))
    .limit(1);
  return evaluation ?? null;
}
