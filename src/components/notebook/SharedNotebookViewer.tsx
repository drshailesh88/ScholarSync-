"use client";

import { Fragment, type ReactNode } from "react";
import { Sparkle, Notebook } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface SharedMessage {
  id: number;
  role: string;
  content: string;
  retrieved_chunks: unknown;
  created_at: Date | string | null;
}

interface SourceMetadata {
  sourceIndex: number;
  paperTitle: string;
  pageNumber: number | null;
  sectionType: string | null;
}

interface SharedNotebookViewerProps {
  title: string;
  ownerName: string;
  mode: string;
  createdAt: Date | string | null;
  messages: SharedMessage[];
}

function renderCitedTextReadOnly(
  text: string,
  sources: SourceMetadata[]
): ReactNode {
  const parts = text.split(/(\[\d+\])/g);
  return parts.map((part, i) => {
    const match = part.match(/\[(\d+)\]/);
    if (match) {
      const sourceIdx = parseInt(match[1], 10);
      const source = sources[sourceIdx - 1];
      if (!source) {
        return <Fragment key={i}>{part}</Fragment>;
      }

      const shortTitle = (() => {
        const title = source.paperTitle;
        const colonIdx = title.indexOf(":");
        if (colonIdx > 0 && colonIdx <= 40) {
          return title.substring(0, colonIdx);
        }
        return title.length > 30 ? title.substring(0, 28) + "…" : title;
      })();

      const pageLabel = source.pageNumber ? `, p.${source.pageNumber}` : "";

      return (
        <span
          key={i}
          className="inline-flex items-center gap-1 mx-0.5 px-2 py-0.5 bg-[#6366f1]/10 border border-[#6366f1]/20 text-[#818cf8] rounded-md text-[10px] font-semibold align-baseline"
          title={source.paperTitle}
        >
          {shortTitle}{pageLabel}
        </span>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function SharedNotebookViewer({
  title,
  ownerName,
  mode,
  createdAt,
  messages,
}: SharedNotebookViewerProps) {
  return (
    <div className="min-h-screen bg-[#020617]">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <Notebook size={18} className="text-[#6366f1]" />
            <h1 className="text-base font-semibold text-[#f1f5f9]">{title}</h1>
          </div>
          <p className="text-xs text-[#64748b]">
            Shared by {ownerName}
            {createdAt &&
              ` · ${new Date(createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}`}
            {mode === "learn" && " · Learn Mode"}
          </p>
        </div>
      </header>

      {/* Messages */}
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-[#64748b]">
              This notebook has no messages yet.
            </p>
          </div>
        )}

        {messages.map((msg) => {
          const sources =
            msg.retrieved_chunks && Array.isArray(msg.retrieved_chunks)
              ? (msg.retrieved_chunks as SourceMetadata[])
              : [];

          return (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-[#6366f1]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkle size={14} className="text-[#6366f1]" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[75%] px-4 py-3 rounded-2xl text-sm",
                  msg.role === "user"
                    ? "bg-white/5 text-[#e2e8f0]"
                    : "bg-[#6366f1]/5 text-[#e2e8f0]"
                )}
              >
                <p className="whitespace-pre-wrap leading-relaxed">
                  {msg.role === "assistant" && sources.length > 0
                    ? renderCitedTextReadOnly(msg.content, sources)
                    : msg.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-4 text-center">
        <p className="text-[10px] text-[#475569]">
          Shared from ScholarSync · AI-assisted research analysis
        </p>
      </footer>
    </div>
  );
}
