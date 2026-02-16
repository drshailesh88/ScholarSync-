"use client";

import { User, Robot } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { PDFChatMessage as ChatMessageType, SourceQuote } from "@/lib/pdf/types";
import { PDFSourceQuote } from "./PDFSourceQuote";

interface PDFChatMessageProps {
  message: ChatMessageType;
  onShowInPDF: (pageNumber: number, startOffset: number, endOffset: number) => void;
  onCiteQuote?: (quote: SourceQuote) => void;
  onSaveAsNote?: (quote: SourceQuote) => void;
  onInsertAsDraft?: (text: string) => void;
}

export function PDFChatMessageComponent({
  message,
  onShowInPDF,
  onCiteQuote,
  onSaveAsNote,
  onInsertAsDraft,
}: PDFChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-2.5 py-3", isUser ? "flex-row-reverse" : "")}>
      {/* Avatar */}
      <div
        className={cn(
          "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
          isUser ? "bg-brand/15 text-brand" : "bg-surface-raised text-ink-muted"
        )}
      >
        {isUser ? <User size={14} weight="bold" /> : <Robot size={14} />}
      </div>

      {/* Message content */}
      <div className={cn("flex-1 min-w-0", isUser ? "text-right" : "")}>
        <div
          className={cn(
            "inline-block text-sm text-ink leading-relaxed max-w-full text-left",
            isUser
              ? "bg-brand/10 rounded-2xl rounded-tr-sm px-3 py-2"
              : ""
          )}
        >
          {/* Render message content with basic formatting */}
          {message.content.split("\n").map((line, i) => (
            <p key={i} className={cn(i > 0 && "mt-1.5")}>
              {line}
            </p>
          ))}
        </div>

        {/* Source quotes */}
        {message.sourceQuotes && message.sourceQuotes.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.sourceQuotes.map((quote) => (
              <PDFSourceQuote
                key={quote.id}
                quote={quote}
                onShowInPDF={onShowInPDF}
                onCite={onCiteQuote}
                onSaveAsNote={onSaveAsNote}
                onInsertAsDraft={onInsertAsDraft}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
