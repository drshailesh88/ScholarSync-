"use server";

import { db } from "@/lib/db";
import {
  slideDecks,
  slides,
  slideDeckVersions,
} from "@/lib/db/schema";
import { eq, and, desc, asc, count } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface VersionSnapshot {
  deck: {
    title: string;
    theme: string | null;
    themeConfig: unknown;
    audienceType: string | null;
    templateId: string | null;
    citationStyle: string | null;
    institutionKit: unknown;
  };
  slides: Array<{
    id: number;
    sortOrder: number;
    layout: string | null;
    title: string | null;
    subtitle: string | null;
    contentBlocks: unknown;
    speakerNotes: string | null;
  }>;
}

export interface VersionRecord {
  id: string;
  deckId: number;
  versionNumber: number;
  label: string | null;
  changeSummary: string | null;
  createdBy: string | null;
  createdAt: Date;
}

// ---------------------------------------------------------------------------
// saveVersion — snapshot the current deck + slides state
// ---------------------------------------------------------------------------

export async function saveVersion(
  deckId: number,
  label?: string,
  changeSummary?: string
): Promise<VersionRecord> {
  const userId = await getCurrentUserId();

  // Fetch current deck
  const [deck] = await db
    .select()
    .from(slideDecks)
    .where(and(eq(slideDecks.id, deckId), eq(slideDecks.userId, userId)));

  if (!deck) throw new Error("Deck not found or not authorized");

  // Fetch all slides
  const deckSlides = await db
    .select()
    .from(slides)
    .where(eq(slides.deckId, deckId))
    .orderBy(asc(slides.sortOrder));

  // Build snapshot
  const snapshot: VersionSnapshot = {
    deck: {
      title: deck.title,
      theme: deck.theme,
      themeConfig: deck.themeConfig,
      audienceType: deck.audienceType,
      templateId: deck.templateId,
      citationStyle: deck.citationStyle,
      institutionKit: deck.institutionKit,
    },
    slides: deckSlides.map((s) => ({
      id: s.id,
      sortOrder: s.sortOrder,
      layout: s.layout,
      title: s.title,
      subtitle: s.subtitle,
      contentBlocks: s.contentBlocks,
      speakerNotes: s.speakerNotes,
    })),
  };

  // Determine next version number
  const [latestVersion] = await db
    .select({ versionNumber: slideDeckVersions.versionNumber })
    .from(slideDeckVersions)
    .where(eq(slideDeckVersions.deckId, deckId))
    .orderBy(desc(slideDeckVersions.versionNumber))
    .limit(1);

  const nextVersion = (latestVersion?.versionNumber ?? 0) + 1;

  // Insert version
  const [version] = await db
    .insert(slideDeckVersions)
    .values({
      deckId,
      versionNumber: nextVersion,
      label: label ?? null,
      snapshot: snapshot as unknown as Record<string, unknown>,
      changeSummary: changeSummary ?? null,
      createdBy: userId,
    })
    .returning();

  return {
    id: version.id,
    deckId: version.deckId,
    versionNumber: version.versionNumber,
    label: version.label,
    changeSummary: version.changeSummary,
    createdBy: version.createdBy,
    createdAt: version.createdAt,
  };
}

// ---------------------------------------------------------------------------
// getVersions — list all versions for a deck
// ---------------------------------------------------------------------------

export async function getVersions(deckId: number): Promise<VersionRecord[]> {
  const userId = await getCurrentUserId();

  // Verify ownership
  const [deck] = await db
    .select({ id: slideDecks.id })
    .from(slideDecks)
    .where(and(eq(slideDecks.id, deckId), eq(slideDecks.userId, userId)));

  if (!deck) throw new Error("Deck not found or not authorized");

  const versions = await db
    .select({
      id: slideDeckVersions.id,
      deckId: slideDeckVersions.deckId,
      versionNumber: slideDeckVersions.versionNumber,
      label: slideDeckVersions.label,
      changeSummary: slideDeckVersions.changeSummary,
      createdBy: slideDeckVersions.createdBy,
      createdAt: slideDeckVersions.createdAt,
    })
    .from(slideDeckVersions)
    .where(eq(slideDeckVersions.deckId, deckId))
    .orderBy(desc(slideDeckVersions.versionNumber));

  return versions;
}

// ---------------------------------------------------------------------------
// getVersionSnapshot — returns the full snapshot for a version
// ---------------------------------------------------------------------------

export async function getVersionSnapshot(
  versionId: string
): Promise<VersionSnapshot> {
  const userId = await getCurrentUserId();

  const [version] = await db
    .select()
    .from(slideDeckVersions)
    .where(eq(slideDeckVersions.id, versionId));

  if (!version) throw new Error("Version not found");

  // Verify ownership via deck
  const [deck] = await db
    .select({ id: slideDecks.id })
    .from(slideDecks)
    .where(
      and(eq(slideDecks.id, version.deckId), eq(slideDecks.userId, userId))
    );

  if (!deck) throw new Error("Not authorized");

  return version.snapshot as unknown as VersionSnapshot;
}

// ---------------------------------------------------------------------------
// restoreVersion — overwrite current deck state with a version snapshot
// ---------------------------------------------------------------------------

export async function restoreVersion(
  deckId: number,
  versionId: string
): Promise<void> {
  const userId = await getCurrentUserId();

  // Verify ownership
  const [deck] = await db
    .select()
    .from(slideDecks)
    .where(and(eq(slideDecks.id, deckId), eq(slideDecks.userId, userId)));

  if (!deck) throw new Error("Deck not found or not authorized");

  // Auto-save current state before restoring
  await saveVersion(deckId, "Auto-save before restore");

  // Fetch snapshot
  const snapshot = await getVersionSnapshot(versionId);

  // Update deck metadata
  await db
    .update(slideDecks)
    .set({
      title: snapshot.deck.title,
      theme: snapshot.deck.theme ?? "modern",
      themeConfig: snapshot.deck.themeConfig as Record<string, unknown>,
      audienceType: snapshot.deck.audienceType as "general" | "academic" | "industry" | "committee" | null,
      templateId: snapshot.deck.templateId,
      citationStyle: snapshot.deck.citationStyle ?? "apa",
      institutionKit: snapshot.deck.institutionKit as Record<string, unknown>,
      updatedAt: new Date(),
    })
    .where(eq(slideDecks.id, deckId));

  // Delete all current slides
  await db.delete(slides).where(eq(slides.deckId, deckId));

  // Re-insert slides from snapshot
  if (snapshot.slides.length > 0) {
    await db.insert(slides).values(
      snapshot.slides.map((s) => ({
        deckId,
        sortOrder: s.sortOrder,
        layout: s.layout as "title_content" | "title_only" | "two_column" | "blank" | "section_header" | "image_full" | "comparison" | "quote" | null,
        title: s.title,
        subtitle: s.subtitle,
        contentBlocks: (s.contentBlocks ?? []) as Record<string, unknown>[],
        speakerNotes: s.speakerNotes,
      }))
    );
  }

  // Update total slides count
  await db
    .update(slideDecks)
    .set({ totalSlides: snapshot.slides.length })
    .where(eq(slideDecks.id, deckId));
}

// ---------------------------------------------------------------------------
// deleteVersion — remove a specific version
// ---------------------------------------------------------------------------

export async function deleteVersion(versionId: string): Promise<void> {
  const userId = await getCurrentUserId();

  const [version] = await db
    .select()
    .from(slideDeckVersions)
    .where(eq(slideDeckVersions.id, versionId));

  if (!version) throw new Error("Version not found");

  // Verify ownership via deck
  const [deck] = await db
    .select({ id: slideDecks.id })
    .from(slideDecks)
    .where(
      and(eq(slideDecks.id, version.deckId), eq(slideDecks.userId, userId))
    );

  if (!deck) throw new Error("Not authorized");

  await db
    .delete(slideDeckVersions)
    .where(eq(slideDeckVersions.id, versionId));
}
