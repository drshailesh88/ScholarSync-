"use server";

import { db } from "@/lib/db";
import { conversations, messages, users } from "@/lib/db/schema";
import { eq, and, asc } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import crypto from "crypto";

// ---------------------------------------------------------------------------
// Enable sharing — uses existing token when present, otherwise generates one
// ---------------------------------------------------------------------------
export async function enableNotebookSharing(conversationId: number) {
  const userId = await getCurrentUserId();

  const [existing] = await db
    .select({ shareToken: conversations.share_token })
    .from(conversations)
    .where(
      and(
        eq(conversations.id, conversationId),
        eq(conversations.user_id, userId)
      )
    );

  if (!existing) throw new Error("Conversation not found or not owned by user");

  const token = existing.shareToken ?? crypto.randomUUID();

  const [convo] = await db
    .update(conversations)
    .set({
      share_token: token,
      share_enabled: true,
      updated_at: new Date(),
    })
    .where(
      and(
        eq(conversations.id, conversationId),
        eq(conversations.user_id, userId)
      )
    )
    .returning({ shareToken: conversations.share_token });

  if (!convo?.shareToken) {
    throw new Error("Failed to enable notebook sharing");
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return {
    token: convo.shareToken,
    shareUrl: `${baseUrl}/share/notebook/${convo.shareToken}`,
  };
}

// ---------------------------------------------------------------------------
// Disable sharing — keeps token but sets share_enabled = false
// ---------------------------------------------------------------------------
export async function disableNotebookSharing(conversationId: number) {
  const userId = await getCurrentUserId();

  const [convo] = await db
    .update(conversations)
    .set({
      share_enabled: false,
      updated_at: new Date(),
    })
    .where(
      and(
        eq(conversations.id, conversationId),
        eq(conversations.user_id, userId)
      )
    )
    .returning({ id: conversations.id });

  if (!convo) throw new Error("Conversation not found or not owned by user");
  return { success: true };
}

// ---------------------------------------------------------------------------
// Get share settings for the owner
// ---------------------------------------------------------------------------
export async function getNotebookShareSettings(conversationId: number) {
  const userId = await getCurrentUserId();

  const [convo] = await db
    .select({
      shareToken: conversations.share_token,
      shareEnabled: conversations.share_enabled,
      sharePassword: conversations.share_password,
      shareExpiresAt: conversations.share_expires_at,
    })
    .from(conversations)
    .where(
      and(
        eq(conversations.id, conversationId),
        eq(conversations.user_id, userId)
      )
    );

  if (!convo) return null;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return {
    ...convo,
    shareUrl: convo.shareToken
      ? `${baseUrl}/share/notebook/${convo.shareToken}`
      : null,
  };
}

// ---------------------------------------------------------------------------
// Update share settings (password, expiry)
// ---------------------------------------------------------------------------
export async function updateNotebookShareSettings(
  conversationId: number,
  settings: {
    password?: string | null;
    expiresAt?: Date | null;
  }
) {
  const userId = await getCurrentUserId();

  const [convo] = await db
    .update(conversations)
    .set({
      share_password: settings.password ?? null,
      share_expires_at: settings.expiresAt ?? null,
      updated_at: new Date(),
    })
    .where(
      and(
        eq(conversations.id, conversationId),
        eq(conversations.user_id, userId)
      )
    )
    .returning({ id: conversations.id });

  if (!convo) throw new Error("Conversation not found or not owned by user");
  return { success: true };
}

// ---------------------------------------------------------------------------
// Public: fetch conversation by share token (no auth required)
// ---------------------------------------------------------------------------
export async function getNotebookByShareToken(token: string) {
  // NO getCurrentUserId() call — this is public
  const [convo] = await db
    .select({
      id: conversations.id,
      title: conversations.title,
      mode: conversations.mode,
      userId: conversations.user_id,
      shareEnabled: conversations.share_enabled,
      sharePassword: conversations.share_password,
      shareExpiresAt: conversations.share_expires_at,
      createdAt: conversations.created_at,
    })
    .from(conversations)
    .where(eq(conversations.share_token, token));

  if (!convo) return null;
  if (!convo.shareEnabled) return null;

  // Check expiry
  if (convo.shareExpiresAt && new Date() > convo.shareExpiresAt) {
    return null;
  }

  // Fetch messages
  const msgs = await db
    .select({
      id: messages.id,
      role: messages.role,
      content: messages.content,
      retrieved_chunks: messages.retrieved_chunks,
      created_at: messages.created_at,
    })
    .from(messages)
    .where(eq(messages.conversation_id, convo.id))
    .orderBy(asc(messages.created_at));

  // Fetch owner name
  const [owner] = await db
    .select({ fullName: users.full_name })
    .from(users)
    .where(eq(users.id, convo.userId));

  return {
    id: convo.id,
    title: convo.title || "Untitled Notebook",
    mode: convo.mode,
    ownerName: owner?.fullName || "A researcher",
    hasPassword: !!convo.sharePassword,
    createdAt: convo.createdAt,
    messages: msgs,
  };
}

// ---------------------------------------------------------------------------
// Public: verify share password
// ---------------------------------------------------------------------------
export async function verifyNotebookSharePassword(
  token: string,
  password: string
) {
  const [convo] = await db
    .select({
      sharePassword: conversations.share_password,
      shareEnabled: conversations.share_enabled,
    })
    .from(conversations)
    .where(eq(conversations.share_token, token));

  if (!convo || !convo.shareEnabled) return false;
  if (!convo.sharePassword) return true;
  return convo.sharePassword === password;
}
