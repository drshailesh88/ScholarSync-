/**
 * Hook for Paper Chat (scoped AI Q&A).
 */

"use client";

import { useCallback } from "react";
import { useResearchStore } from "@/stores/research-store";
import type { PaperChatMessage, PaperResult } from "@/lib/research/types";

export function usePaperChat() {
  const store = useResearchStore();

  /**
   * Get papers in the current chat scope.
   */
  const getScopedPapers = useCallback((): PaperResult[] => {
    const { chatScope, chatScopePaperIds, selectedPaperId, results, libraryPapers } =
      useResearchStore.getState();

    const allPapers = [...results, ...libraryPapers];
    // Deduplicate by ID
    const seen = new Set<string>();
    const unique = allPapers.filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });

    switch (chatScope) {
      case "paper": {
        if (selectedPaperId) {
          const paper = unique.find((p) => p.id === selectedPaperId);
          return paper ? [paper] : [];
        }
        return [];
      }
      case "selected":
        return unique.filter((p) => chatScopePaperIds.includes(p.id));
      case "library":
        return libraryPapers;
      default:
        return [];
    }
  }, []);

  /**
   * Get a human-readable scope label.
   */
  const getScopeLabel = useCallback((): string => {
    const papers = getScopedPapers();
    const { chatScope, selectedPaperDetail } = useResearchStore.getState();

    switch (chatScope) {
      case "paper":
        if (selectedPaperDetail?.paper) {
          const p = selectedPaperDetail.paper;
          const firstAuthor = p.authors?.[0]?.split(" ").pop() || "Unknown";
          return `${firstAuthor} et al., ${p.year}`;
        }
        return "No paper selected";
      case "selected":
        return `${papers.length} selected paper${papers.length !== 1 ? "s" : ""}`;
      case "library":
        return `All library papers (${papers.length})`;
      default:
        return "";
    }
  }, [getScopedPapers]);

  /**
   * Send a message in the paper chat.
   */
  const sendMessage = useCallback(
    async (question: string) => {
      if (!question.trim()) return;

      const papers = getScopedPapers();
      if (papers.length === 0) return;

      // Add user message
      const userMsg: PaperChatMessage = {
        id: `msg_${Date.now()}`,
        role: "user",
        content: question.trim(),
        timestamp: Date.now(),
      };
      store.addChatMessage(userMsg);

      // Add placeholder assistant message
      const assistantMsg: PaperChatMessage = {
        id: `msg_${Date.now() + 1}`,
        role: "assistant",
        content: "",
        timestamp: Date.now(),
      };
      store.addChatMessage(assistantMsg);
      store.setIsChatLoading(true);

      try {
        const res = await fetch("/api/research/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: question.trim(),
            papers: papers.map((p) => ({
              id: p.id,
              title: p.title,
              authors: p.authors,
              year: p.year,
              journal: p.journal,
              abstract: p.abstract,
              studyType: p.studyType,
              pmid: p.pmid,
            })),
            scopeLabel: getScopeLabel(),
          }),
        });

        if (!res.ok) throw new Error("Chat failed");

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No stream");

        const decoder = new TextDecoder();
        let fullContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullContent += decoder.decode(value, { stream: true });
          store.updateLastChatMessage(fullContent);
        }
      } catch (error) {
        console.error("Chat error:", error);
        store.updateLastChatMessage(
          "Sorry, I encountered an error processing your question. Please try again."
        );
      } finally {
        store.setIsChatLoading(false);
      }
    },
    [getScopedPapers, getScopeLabel]
  );

  return {
    chatScope: store.chatScope,
    chatScopePaperIds: store.chatScopePaperIds,
    chatMessages: store.chatMessages,
    isChatLoading: store.isChatLoading,
    setChatScope: store.setChatScope,
    setChatScopePaperIds: store.setChatScopePaperIds,
    sendMessage,
    clearChat: store.clearChat,
    getScopedPapers,
    getScopeLabel,
  };
}
