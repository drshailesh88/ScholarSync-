"use server";

import { db } from "@/lib/db";
import { slideDecks, slides } from "@/lib/db/schema";
import { eq, and, asc } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import crypto from "crypto";
import { hashPassword, verifyPassword } from "@/lib/security/password";
import { auditLog } from "@/lib/security/audit-log";

// ---------------------------------------------------------------------------
// Rate limiting for password verification
// ---------------------------------------------------------------------------
const passwordAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60_000; // 1 minute

// Periodically clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of passwordAttempts) {
    if (now > entry.resetAt) {
      passwordAttempts.delete(key);
    }
  }
}, 5 * 60_000);

function checkRateLimit(token: string): { allowed: boolean } {
  const now = Date.now();
  const entry = passwordAttempts.get(token);

  if (!entry || now > entry.resetAt) {
    passwordAttempts.set(token, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return { allowed: false };
  }

  entry.count += 1;
  return { allowed: true };
}

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

  auditLog({
    action: "share.permission_changed",
    userId,
    resourceType: "deck",
    resourceId: deckId,
    metadata: { shareEnabled: true },
  });

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

  auditLog({
    action: "share.permission_changed",
    userId,
    resourceType: "deck",
    resourceId: deckId,
    metadata: { shareEnabled: false },
  });

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

  const hashedPassword = settings.password
    ? await hashPassword(settings.password)
    : null;

  const [deck] = await db
    .update(slideDecks)
    .set({
      sharePassword: hashedPassword,
      shareExpiresAt: settings.expiresAt ?? null,
      updatedAt: new Date(),
    })
    .where(and(eq(slideDecks.id, deckId), eq(slideDecks.userId, userId)))
    .returning();

  if (!deck) throw new Error("Deck not found or not owned by user");

  if (settings.password !== undefined) {
    auditLog({
      action: "share.password_set",
      userId,
      resourceType: "deck",
      resourceId: deckId,
      metadata: { passwordSet: settings.password !== null },
    });
  }

  return { success: true };
}

// ---------------------------------------------------------------------------
// Public: fetch deck by share token (no auth required)
// ---------------------------------------------------------------------------
export async function getDeckByShareToken(token: string) {
  const [deck] = await db
    .select({
      id: slideDecks.id,
      title: slideDecks.title,
      description: slideDecks.description,
      theme: slideDecks.theme,
      themeConfig: slideDecks.themeConfig,
      shareEnabled: slideDecks.shareEnabled,
      sharePassword: slideDecks.sharePassword,
      shareExpiresAt: slideDecks.shareExpiresAt,
    })
    .from(slideDecks)
    .where(eq(slideDecks.shareToken, token));

  if (!deck) return null;
  if (!deck.shareEnabled) return null;

  // Check expiry
  if (deck.shareExpiresAt && new Date() > deck.shareExpiresAt) {
    return null;
  }

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
    })
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
export async function verifySharePassword(
  token: string,
  password: string
): Promise<boolean | { error: string }> {
  // Rate limit check
  const { allowed } = checkRateLimit(token);
  if (!allowed) {
    return { error: "Too many attempts. Please try again later." };
  }

  const [deck] = await db
    .select({
      sharePassword: slideDecks.sharePassword,
      shareEnabled: slideDecks.shareEnabled,
    })
    .from(slideDecks)
    .where(eq(slideDecks.shareToken, token));

  if (!deck || !deck.shareEnabled) return false;
  if (!deck.sharePassword) return true; // no password set
  return verifyPassword(password, deck.sharePassword);
}
