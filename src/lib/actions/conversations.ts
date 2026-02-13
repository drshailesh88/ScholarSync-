"use server";

import { db } from "@/lib/db";
import { conversations, messages } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";

export async function getConversations(
  mode?: "chat" | "learn" | "draft" | "research" | "notebook" | "statistics" | "integrity" | "general"
) {
  const userId = await getCurrentUserId();
  return db
    .select()
    .from(conversations)
    .where(
      and(
        eq(conversations.user_id, userId),
        mode ? eq(conversations.mode, mode) : undefined
      )
    )
    .orderBy(desc(conversations.updated_at));
}

export async function getConversation(id: number) {
  const userId = await getCurrentUserId();
  const [convo] = await db
    .select()
    .from(conversations)
    .where(and(eq(conversations.id, id), eq(conversations.user_id, userId)));

  if (!convo) return null;

  const msgs = await db
    .select()
    .from(messages)
    .where(eq(messages.conversation_id, id))
    .orderBy(messages.created_at);

  return { ...convo, messages: msgs };
}

export async function createConversation(data: {
  mode: "chat" | "learn" | "draft" | "research" | "notebook" | "statistics" | "integrity" | "general";
  project_id?: number;
  title?: string;
}) {
  const userId = await getCurrentUserId();
  const [convo] = await db
    .insert(conversations)
    .values({
      user_id: userId,
      mode: data.mode,
      project_id: data.project_id,
      title: data.title || "New Conversation",
    })
    .returning();
  return convo;
}

export async function addMessage(data: {
  conversation_id: number;
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  input_tokens?: number;
  output_tokens?: number;
  model?: string;
}) {
  const [msg] = await db
    .insert(messages)
    .values({
      conversation_id: data.conversation_id,
      role: data.role,
      content: data.content,
      input_tokens: data.input_tokens,
      output_tokens: data.output_tokens,
      model: data.model,
    })
    .returning();

  // Update conversation timestamp
  await db
    .update(conversations)
    .set({ updated_at: new Date() })
    .where(eq(conversations.id, data.conversation_id));

  return msg;
}
