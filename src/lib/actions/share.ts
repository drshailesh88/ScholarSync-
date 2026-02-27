"use server";

import { db } from "@/lib/db";
import { slideDecks, slides } from "@/lib/db/schema";
import { eq, and, asc } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import crypto from "crypto";

// ---------------------------------------------------------------------------
// Enable sharing — generates a unique token and sets shareEnabled = true
// ---------------------------------------------------------------------------
export async function enableDeckSharing(deckId: number) {
  const userId = await getCurrentUserId();
  const token = crypto.randomUUID();

  const [deck] = await db
    .update(slideDecks)
    .set({
      shareToken: token,
      shareEnabled: true,
      updatedAt: new Date(),
    })
    .where(and(eq(slideDecks.id, deckId), eq(slideDecks.userId, userId)))
    .returning();

  if (!deck) throw new Error("Deck not found or not owned by user");

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return {
    token: deck.shareToken!,
    shareUrl: `${baseUrl}/share/${deck.shareToken}`,
  };
}

// ---------------------------------------------------------------------------
// Disable sharing — keeps the token but sets shareEnabled = false
// ---------------------------------------------------------------------------
export async function disableDeckSharing(deckId: number) {
  const userId = await getCurrentUserId();

  const [deck] = await db
    .update(slideDecks)
    .set({
      shareEnabled: false,
      updatedAt: new Date(),
    })
    .where(and(eq(slideDecks.id, deckId), eq(slideDecks.userId, userId)))
    .returning();

  if (!deck) throw new Error("Deck not found or not owned by user");
  return { success: true };
}

// ---------------------------------------------------------------------------
// Get share settings for the owner
// ---------------------------------------------------------------------------
export async function getDeckShareSettings(deckId: number) {
  const userId = await getCurrentUserId();

  const [deck] = await db
    .select({
      shareToken: slideDecks.shareToken,
      shareEnabled: slideDecks.shareEnabled,
      sharePassword: slideDecks.sharePassword,
      shareExpiresAt: slideDecks.shareExpiresAt,
    })
    .from(slideDecks)
    .where(and(eq(slideDecks.id, deckId), eq(slideDecks.userId, userId)));

  if (!deck) return null;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return {
    ...deck,
    shareUrl: deck.shareToken
      ? `${baseUrl}/share/${deck.shareToken}`
      : null,
  };
}

// ---------------------------------------------------------------------------
// Update share settings (password, expiry)
// ---------------------------------------------------------------------------
export async function updateShareSettings(
  deckId: number,
  settings: {
    password?: string | null;
    expiresAt?: Date | null;
  }
) {
  const userId = await getCurrentUserId();

  const [deck] = await db
    .update(slideDecks)
    .set({
      sharePassword: settings.password ?? null,
      shareExpiresAt: settings.expiresAt ?? null,
      updatedAt: new Date(),
    })
    .where(and(eq(slideDecks.id, deckId), eq(slideDecks.userId, userId)))
    .returning();

  if (!deck) throw new Error("Deck not found or not owned by user");
  return { success: true };
}

// ---------------------------------------------------------------------------
// Public: fetch deck by share token (no auth required)
// ---------------------------------------------------------------------------
export async function getDeckByShareToken(token: string) {
  const [deck] = await db
    .select()
    .from(slideDecks)
    .where(eq(slideDecks.shareToken, token));

  if (!deck) return null;
  if (!deck.shareEnabled) return null;

  // Check expiry
  if (deck.shareExpiresAt && new Date() > deck.shareExpiresAt) {
    return null;
  }

  const deckSlides = await db
    .select()
    .from(slides)
    .where(eq(slides.deckId, deck.id))
    .orderBy(asc(slides.sortOrder));

  return {
    id: deck.id,
    title: deck.title,
    description: deck.description,
    theme: deck.theme,
    themeConfig: deck.themeConfig,
    hasPassword: !!deck.sharePassword,
    slides: deckSlides,
  };
}

// ---------------------------------------------------------------------------
// Public: verify share password
// ---------------------------------------------------------------------------
export async function verifySharePassword(token: string, password: string) {
  const [deck] = await db
    .select({
      sharePassword: slideDecks.sharePassword,
      shareEnabled: slideDecks.shareEnabled,
    })
    .from(slideDecks)
    .where(eq(slideDecks.shareToken, token));

  if (!deck || !deck.shareEnabled) return false;
  if (!deck.sharePassword) return true; // no password set
  return deck.sharePassword === password;
}
