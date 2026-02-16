"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  PaperPlaneRight,
  PaperclipHorizontal,
  Spinner,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { usePDFStore } from "@/stores/pdf-store";
import type {
  PDFTextSelection,
  PDFChatMessage,
  SourceQuote,
  PaperMetadata,
} from "@/lib/pdf/types";
import { PDFChatMessageComponent } from "./PDFChatMessage";
import { PDFSuggestedQuestions } from "./PDFSuggestedQuestions";

interface PDFChatPanelProps {
  paperId: string;
  paperMetadata: PaperMetadata | null;
  currentSelection?: PDFTextSelection | null;
  onNavigateToPage: (
    page: number,
    startOffset?: number,
    endOffset?: number
  ) => void;
  onInsertCitation?: (
    paperId: string,
    page: number,
    quote: string
  ) => void;
  onInsertDraft?: (text: string) => void;
}

const SUGGESTED_QUESTIONS = [
  "What was the primary endpoint?",
  "Describe the study population",
  "What were the main findings?",
  "What were the limitations?",
  "Explain the statistical methods used",
];

export function PDFChatPanel({
  paperId,
  paperMetadata,
  currentSelection,
  onNavigateToPage,
  onInsertCitation,
  onInsertDraft,
}: PDFChatPanelProps) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    chatMessages,
    isChatLoading,
    addChatMessage,
    setChatLoading,
    highlights,
  } = usePDFStore();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, scrollToBottom]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isChatLoading) return;

      // Build message with selection context if present
      let messageContent = text.trim();
      if (currentSelection) {
        messageContent = `[Selection from page ${currentSelection.pageNumber}: "${currentSelection.text.slice(0, 200)}${currentSelection.text.length > 200 ? "..." : ""}"]\n\n${messageContent}`;
      }

      // Add user message
      const userMessage: PDFChatMessage = {
        id: `msg-${Date.now()}`,
        role: "user",
        content: text.trim(),
        createdAt: new Date(),
      };
      addChatMessage(userMessage);
      setInputValue("");
      setChatLoading(true);

      try {
        const response = await fetch("/api/research/pdf-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paperId,
            message: messageContent,
            highlights: highlights
              .filter((h) => h.paperId === paperId)
              .map((h) => ({
                pageNumber: h.pageNumber,
                text: h.selectedText,
                note: h.note,
                color: h.color,
                targetSection: h.targetSection,
              })),
            paperMetadata,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get response");
        }

        const data = await response.json();

        const assistantMessage: PDFChatMessage = {
          id: `msg-${Date.now()}-ai`,
          role: "assistant",
          content: data.content || "I could not generate a response.",
          sourceQuotes: data.sourceQuotes || [],
          createdAt: new Date(),
        };
        addChatMessage(assistantMessage);
      } catch {
        const errorMessage: PDFChatMessage = {
          id: `msg-${Date.now()}-error`,
          role: "assistant",
          content:
            "Sorry, I encountered an error processing your request. Please try again.",
          createdAt: new Date(),
        };
        addChatMessage(errorMessage);
      } finally {
        setChatLoading(false);
      }
    },
    [
      paperId,
      paperMetadata,
      currentSelection,
      highlights,
      isChatLoading,
      addChatMessage,
      setChatLoading,
    ]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const handleShowInPDF = useCallback(
    (pageNumber: number, startOffset: number, endOffset: number) => {
      onNavigateToPage(pageNumber, startOffset, endOffset);
    },
    [onNavigateToPage]
  );

  const handleCiteQuote = useCallback(
    (quote: SourceQuote) => {
      onInsertCitation?.(paperId, quote.pageNumber, quote.quotedText);
    },
    [paperId, onInsertCitation]
  );

  const handleSaveAsNote = useCallback((_quote: SourceQuote) => {
    // This will be wired to the evidence note system
  }, []);

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-border shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-ink">PDF Chat</h3>
            <p className="text-xs text-ink-muted truncate max-w-[260px]">
              {paperMetadata?.title || "Ask about this paper"}
            </p>
          </div>
          <span className="text-xs text-ink-muted bg-surface-raised px-2 py-0.5 rounded-full">
            This paper
          </span>
        </div>
        {highlights.length > 0 && (
          <p className="text-xs text-ink-muted mt-1">
            {highlights.length} highlight{highlights.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3">
        {chatMessages.length === 0 ? (
          <div className="py-4">
            <PDFSuggestedQuestions
              questions={SUGGESTED_QUESTIONS}
              onSelect={(q) => sendMessage(q)}
            />
          </div>
        ) : (
          <div className="py-2">
            {chatMessages.map((msg) => (
              <PDFChatMessageComponent
                key={msg.id}
                message={msg}
                onShowInPDF={handleShowInPDF}
                onCiteQuote={handleCiteQuote}
                onSaveAsNote={handleSaveAsNote}
                onInsertAsDraft={onInsertDraft}
              />
            ))}
            {isChatLoading && (
              <div className="flex items-center gap-2 py-3 text-ink-muted">
                <Spinner size={16} className="animate-spin" />
                <span className="text-sm">Analyzing paper...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-3 py-2.5 border-t border-border shrink-0">
        {currentSelection && (
          <div className="flex items-center gap-1 mb-2 px-2 py-1 rounded bg-brand/5 border border-brand/10">
            <PaperclipHorizontal size={12} className="text-brand shrink-0" />
            <span className="text-xs text-brand truncate">
              Selection from p.{currentSelection.pageNumber} attached
            </span>
          </div>
        )}
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about this paper..."
            rows={1}
            className={cn(
              "flex-1 text-sm bg-surface-raised border border-border rounded-lg px-3 py-2",
              "text-ink placeholder:text-ink-muted/50 resize-none",
              "focus:outline-none focus:ring-1 focus:ring-brand",
              "max-h-24 overflow-y-auto"
            )}
            style={{
              height: "auto",
              minHeight: "36px",
            }}
          />
          <button
            onClick={() => sendMessage(inputValue)}
            disabled={!inputValue.trim() || isChatLoading}
            className={cn(
              "p-2 rounded-lg transition-colors shrink-0",
              inputValue.trim() && !isChatLoading
                ? "text-white bg-brand hover:bg-brand-hover"
                : "text-ink-muted bg-surface-raised cursor-not-allowed"
            )}
            aria-label="Send message"
          >
            <PaperPlaneRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
