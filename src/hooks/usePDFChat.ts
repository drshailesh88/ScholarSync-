"use client";

import { useCallback } from "react";
import { usePDFStore } from "@/stores/pdf-store";
import type { PDFChatMessage, PDFTextSelection } from "@/lib/pdf/types";

/**
 * Hook for managing the PDF chat panel.
 */
export function usePDFChat() {
  const store = usePDFStore();

  /** Send a message to the PDF chat */
  const sendMessage = useCallback(
    async (
      content: string,
      options?: {
        selection?: PDFTextSelection;
      }
    ) => {
      if (!content.trim() || store.isChatLoading || !store.currentPaperId) return;

      // Build message with selection context
      let messageContent = content.trim();
      if (options?.selection) {
        messageContent = `[Selection from page ${options.selection.pageNumber}: "${options.selection.text.slice(0, 200)}"]\n\n${messageContent}`;
      }

      const userMessage: PDFChatMessage = {
        id: `msg-${Date.now()}`,
        role: "user",
        content: content.trim(),
        createdAt: new Date(),
      };
      store.addChatMessage(userMessage);
      store.setChatLoading(true);

      try {
        const response = await fetch("/api/research/pdf-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paperId: store.currentPaperId,
            message: messageContent,
            highlights: store.highlights
              .filter((h) => h.paperId === store.currentPaperId)
              .map((h) => ({
                pageNumber: h.pageNumber,
                text: h.selectedText,
                note: h.note,
                color: h.color,
                targetSection: h.targetSection,
              })),
            paperMetadata: store.paperMetadata,
          }),
        });

        if (!response.ok) throw new Error("Chat request failed");

        const data = await response.json();
        const assistantMessage: PDFChatMessage = {
          id: `msg-${Date.now()}-ai`,
          role: "assistant",
          content: data.content || "I could not generate a response.",
          sourceQuotes: data.sourceQuotes || [],
          createdAt: new Date(),
        };
        store.addChatMessage(assistantMessage);
      } catch {
        store.addChatMessage({
          id: `msg-${Date.now()}-error`,
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          createdAt: new Date(),
        });
      } finally {
        store.setChatLoading(false);
      }
    },
    [store]
  );

  return {
    messages: store.chatMessages,
    isLoading: store.isChatLoading,
    sendMessage,
    clearChat: store.clearChat,
  };
}
