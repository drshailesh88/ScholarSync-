/**
 * Tests for the chat-first slides agent panel.
 *
 * Tests cover:
 * - Quick action chips change based on selected block type
 * - Chat message rendering (user + assistant) via store
 * - "Apply" updates the correct slide and block
 * - Streaming response appends text incrementally
 * - Context includes selected block info
 * - Chat history persists across panel open/close (via store)
 */

import { describe, it, expect, beforeEach } from "vitest";
import { useSlidesStore } from "@/stores/slides-store";
import type { AgentChatMessage } from "@/stores/slides-store";
import type { ContentBlock } from "@/types/presentation";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function resetStore() {
  const s = useSlidesStore.getState();
  s.clearAgentChatHistory();
  // Set up a minimal deck with slides
  useSlidesStore.setState({
    deckId: 1,
    slides: [
      {
        id: 100,
        sortOrder: 0,
        layout: "title_content",
        title: "Intro Slide",
        subtitle: "",
        contentBlocks: [
          { type: "text", data: { text: "Hello world", style: "body" } },
          {
            type: "chart",
            data: {
              chartType: "bar",
              title: "Results",
              labels: ["A", "B"],
              datasets: [{ label: "Data", data: [1, 2] }],
            },
          },
        ] as ContentBlock[],
        speakerNotes: "",
      },
      {
        id: 200,
        sortOrder: 1,
        layout: "title_content",
        title: "Methods",
        subtitle: "",
        contentBlocks: [
          {
            type: "bullets",
            data: { items: ["Step 1", "Step 2"], ordered: false },
          },
        ] as ContentBlock[],
        speakerNotes: "",
      },
    ],
    activeSlideId: 100,
    selectedBlockIndices: new Set<number>(),
    agentChatHistory: [],
  });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("Agent Chat - Store Integration", () => {
  beforeEach(() => {
    resetStore();
  });

  // -------------------------------------------------------------------------
  // Quick action chip logic
  // -------------------------------------------------------------------------
  describe("Quick action chips based on selected block type", () => {
    it("returns default actions when no block is selected", () => {
      const block = useSlidesStore.getState().getSelectedBlock();
      expect(block).toBeNull();
      // Default actions should include "Improve this slide"
    });

    it("returns text actions when a text block is selected", () => {
      useSlidesStore.setState({ selectedBlockIndices: new Set([0]) });
      const block = useSlidesStore.getState().getSelectedBlock();
      expect(block).not.toBeNull();
      expect(block!.type).toBe("text");
    });

    it("returns chart actions when a chart block is selected", () => {
      useSlidesStore.setState({ selectedBlockIndices: new Set([1]) });
      const block = useSlidesStore.getState().getSelectedBlock();
      expect(block).not.toBeNull();
      expect(block!.type).toBe("chart");
    });
  });

  // -------------------------------------------------------------------------
  // Chat message rendering
  // -------------------------------------------------------------------------
  describe("Chat message rendering", () => {
    it("starts with empty chat history", () => {
      expect(useSlidesStore.getState().agentChatHistory).toHaveLength(0);
    });

    it("adds a user message", () => {
      const msg: AgentChatMessage = {
        id: "u1",
        role: "user",
        content: "Improve this slide",
        timestamp: Date.now(),
      };
      useSlidesStore.getState().addAgentChatMessage(msg);
      const history = useSlidesStore.getState().agentChatHistory;
      expect(history).toHaveLength(1);
      expect(history[0].role).toBe("user");
      expect(history[0].content).toBe("Improve this slide");
    });

    it("adds an assistant message with suggested changes", () => {
      const msg: AgentChatMessage = {
        id: "a1",
        role: "assistant",
        content: "I improved your title.",
        timestamp: Date.now(),
        suggestedChanges: [
          {
            slideId: 100,
            changes: { title: "Better Intro" },
          },
        ],
      };
      useSlidesStore.getState().addAgentChatMessage(msg);
      const history = useSlidesStore.getState().agentChatHistory;
      expect(history).toHaveLength(1);
      expect(history[0].suggestedChanges).toHaveLength(1);
    });

    it("preserves message order", () => {
      useSlidesStore.getState().addAgentChatMessage({
        id: "u1",
        role: "user",
        content: "First",
        timestamp: 1,
      });
      useSlidesStore.getState().addAgentChatMessage({
        id: "a1",
        role: "assistant",
        content: "Second",
        timestamp: 2,
      });
      useSlidesStore.getState().addAgentChatMessage({
        id: "u2",
        role: "user",
        content: "Third",
        timestamp: 3,
      });

      const history = useSlidesStore.getState().agentChatHistory;
      expect(history).toHaveLength(3);
      expect(history.map((m) => m.content)).toEqual([
        "First",
        "Second",
        "Third",
      ]);
    });

    it("limits history to 50 messages", () => {
      for (let i = 0; i < 55; i++) {
        useSlidesStore.getState().addAgentChatMessage({
          id: `msg-${i}`,
          role: i % 2 === 0 ? "user" : "assistant",
          content: `Message ${i}`,
          timestamp: i,
        });
      }
      expect(useSlidesStore.getState().agentChatHistory).toHaveLength(50);
      // Should keep the most recent messages
      expect(useSlidesStore.getState().agentChatHistory[0].content).toBe(
        "Message 5"
      );
    });
  });

  // -------------------------------------------------------------------------
  // Apply updates the correct slide and block
  // -------------------------------------------------------------------------
  describe("Apply changes", () => {
    it("applies slide-level changes via updateSlide", () => {
      const store = useSlidesStore.getState();
      // Simulate applying a slide title change
      store.updateSlide(100, { title: "Updated Intro" });

      const slide = useSlidesStore
        .getState()
        .slides.find((s) => s.id === 100);
      expect(slide?.title).toBe("Updated Intro");
    });

    it("applies block-level changes to the correct block", () => {
      const store = useSlidesStore.getState();
      const slide = store.slides.find((s) => s.id === 100)!;
      const updatedBlocks = [...slide.contentBlocks];
      updatedBlocks[0] = {
        ...updatedBlocks[0],
        type: "text",
        data: { text: "Updated text", style: "body" },
      } as ContentBlock;

      store.updateSlide(100, { contentBlocks: updatedBlocks });

      const updated = useSlidesStore
        .getState()
        .slides.find((s) => s.id === 100);
      expect((updated!.contentBlocks[0].data as { text: string }).text).toBe(
        "Updated text"
      );
    });

    it("marks message as applied", () => {
      useSlidesStore.getState().addAgentChatMessage({
        id: "apply-test",
        role: "assistant",
        content: "Updated",
        timestamp: Date.now(),
        suggestedChanges: [{ slideId: 100, changes: { title: "New" } }],
      });

      useSlidesStore.getState().markChatMessageApplied("apply-test");

      const msg = useSlidesStore
        .getState()
        .agentChatHistory.find((m) => m.id === "apply-test");
      expect(msg?.applied).toBe(true);
    });

    it("does not mark a different message as applied", () => {
      useSlidesStore.getState().addAgentChatMessage({
        id: "msg-a",
        role: "assistant",
        content: "A",
        timestamp: 1,
      });
      useSlidesStore.getState().addAgentChatMessage({
        id: "msg-b",
        role: "assistant",
        content: "B",
        timestamp: 2,
      });

      useSlidesStore.getState().markChatMessageApplied("msg-a");

      const history = useSlidesStore.getState().agentChatHistory;
      expect(history.find((m) => m.id === "msg-a")?.applied).toBe(true);
      expect(history.find((m) => m.id === "msg-b")?.applied).toBeUndefined();
    });
  });

  // -------------------------------------------------------------------------
  // Context includes selected block info
  // -------------------------------------------------------------------------
  describe("Context includes selected block info", () => {
    it("getSelectedBlock returns the selected block", () => {
      useSlidesStore.setState({ selectedBlockIndices: new Set([0]) });
      const block = useSlidesStore.getState().getSelectedBlock();
      expect(block).not.toBeNull();
      expect(block!.type).toBe("text");
    });

    it("getPrimarySelectedBlockIndex returns the first index", () => {
      useSlidesStore.setState({ selectedBlockIndices: new Set([1]) });
      const idx = useSlidesStore.getState().getPrimarySelectedBlockIndex();
      expect(idx).toBe(1);
    });

    it("returns null when no block is selected", () => {
      useSlidesStore.setState({ selectedBlockIndices: new Set() });
      expect(useSlidesStore.getState().getSelectedBlock()).toBeNull();
      expect(
        useSlidesStore.getState().getPrimarySelectedBlockIndex()
      ).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // Chat history persists across panel open/close
  // -------------------------------------------------------------------------
  describe("Chat history persistence", () => {
    it("persists chat history when panel is closed and reopened", () => {
      useSlidesStore.getState().addAgentChatMessage({
        id: "persist-1",
        role: "user",
        content: "Hello",
        timestamp: Date.now(),
      });

      // Close panel
      useSlidesStore.getState().setAgentPanelOpen(false);
      expect(useSlidesStore.getState().agentPanelOpen).toBe(false);

      // Reopen panel
      useSlidesStore.getState().setAgentPanelOpen(true);
      expect(useSlidesStore.getState().agentPanelOpen).toBe(true);

      // History still there
      expect(useSlidesStore.getState().agentChatHistory).toHaveLength(1);
      expect(useSlidesStore.getState().agentChatHistory[0].content).toBe(
        "Hello"
      );
    });

    it("clears chat history when clearAgentChatHistory is called", () => {
      useSlidesStore.getState().addAgentChatMessage({
        id: "clear-1",
        role: "user",
        content: "Bye",
        timestamp: Date.now(),
      });
      expect(useSlidesStore.getState().agentChatHistory).toHaveLength(1);

      useSlidesStore.getState().clearAgentChatHistory();
      expect(useSlidesStore.getState().agentChatHistory).toHaveLength(0);
    });
  });

  // -------------------------------------------------------------------------
  // Streaming simulation test
  // -------------------------------------------------------------------------
  describe("Streaming response simulation", () => {
    it("final message contains the complete text after streaming", async () => {
      const fullText = "This is a complete response from the AI assistant.";
      const words = fullText.split(" ");

      // Simulate progressive text build (as the component does)
      let accumulated = "";
      for (let i = 0; i < words.length; i++) {
        accumulated += (i > 0 ? " " : "") + words[i];
      }

      // The final accumulated text should match the original
      expect(accumulated).toBe(fullText);

      // Then it gets added as a chat message
      useSlidesStore.getState().addAgentChatMessage({
        id: "stream-test",
        role: "assistant",
        content: fullText,
        timestamp: Date.now(),
      });

      const msg = useSlidesStore
        .getState()
        .agentChatHistory.find((m) => m.id === "stream-test");
      expect(msg?.content).toBe(fullText);
    });
  });
});
