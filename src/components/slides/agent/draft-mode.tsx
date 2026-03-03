"use client";

import { useState, useRef, useEffect } from "react";
import { PaperPlaneRight, CircleNotch, ArrowRight, Plus } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useSlidesStore } from "@/stores/slides-store";
import type { ContentBlock } from "@/types/presentation";

interface DraftMessage {
  role: "user" | "agent";
  content: string;
  blocks?: ContentBlock[];
  timestamp: Date;
}

export function DraftMode() {
  const activeSlide = useSlidesStore((s) => s.getActiveSlide());
  const deckId = useSlidesStore((s) => s.deckId);
  const audienceType = useSlidesStore((s) => s.audienceType);
  const updateSlide = useSlidesStore((s) => s.updateSlide);
  const addSlide = useSlidesStore((s) => s.addSlide);

  const [messages, setMessages] = useState<DraftMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMsg: DraftMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/slides/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "draft",
          prompt: userMsg.content,
          deckId,
          slideContent: activeSlide
            ? JSON.stringify({
                title: activeSlide.title,
                contentBlocks: activeSlide.contentBlocks,
              })
            : "",
          audienceType,
        }),
      });

      if (!res.ok) throw new Error("Draft failed");

      const data = await res.json();

      const agentMsg: DraftMessage = {
        role: "agent",
        content: data.text ?? "Here's what I generated:",
        blocks: data.contentBlocks ?? [],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content: "Sorry, something went wrong. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function insertIntoCurrentSlide(blocks: ContentBlock[]) {
    if (!activeSlide) return;
    updateSlide(activeSlide.id, {
      contentBlocks: [...activeSlide.contentBlocks, ...blocks],
    });
  }

  async function insertAsNewSlide(blocks: ContentBlock[]) {
    const newSlide = await addSlide(activeSlide?.id);
    if (newSlide) {
      updateSlide(newSlide.id, { contentBlocks: blocks });
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-6">
            <p className="text-xs text-ink-muted mb-3">
              Describe the content you need and I&apos;ll generate slide-ready blocks
            </p>
            <div className="space-y-1.5">
              {[
                "Create a comparison table of 3 methods",
                "Generate a bar chart from this data",
                "Write bullet points about methodology",
                "Add a timeline of study phases",
              ].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  className="block w-full text-left px-3 py-1.5 rounded-lg text-[10px] text-ink-muted hover:text-brand hover:bg-surface-raised transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i}>
            <div
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[90%] rounded-xl px-3 py-2 text-xs",
                  msg.role === "user"
                    ? "bg-brand text-white"
                    : "bg-surface-raised text-ink border border-border"
                )}
              >
                {msg.content}
              </div>
            </div>

            {/* Insertable blocks */}
            {msg.blocks && msg.blocks.length > 0 && (
              <div className="mt-2 ml-2 p-2 rounded-lg border border-brand/20 bg-brand/5">
                <div className="text-[10px] font-medium text-brand mb-2">
                  {msg.blocks.length} block{msg.blocks.length !== 1 ? "s" : ""} ready to insert
                </div>
                <div className="space-y-1 mb-2">
                  {msg.blocks.map((block, bi) => (
                    <div
                      key={bi}
                      className="text-[10px] text-ink-muted px-2 py-1 rounded bg-surface-raised"
                    >
                      {block.type}: {getBlockPreview(block)}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => insertIntoCurrentSlide(msg.blocks!)}
                    className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium bg-brand text-white hover:bg-brand/90 transition-colors"
                  >
                    <ArrowRight size={10} /> Insert here
                  </button>
                  <button
                    onClick={() => insertAsNewSlide(msg.blocks!)}
                    className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium border border-brand text-brand hover:bg-brand/5 transition-colors"
                  >
                    <Plus size={10} /> New slide
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-surface-raised rounded-xl px-3 py-2 border border-border">
              <CircleNotch size={14} className="text-brand animate-spin" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe content to generate..."
            disabled={loading}
            className="flex-1 px-2.5 py-1.5 rounded-lg bg-surface-raised border border-border text-xs text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-2.5 py-1.5 rounded-lg bg-brand text-white hover:bg-brand/90 transition-colors disabled:opacity-50"
          >
            <PaperPlaneRight size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}

function getBlockPreview(block: ContentBlock): string {
  switch (block.type) {
    case "text":
      return block.data.text.substring(0, 50) + (block.data.text.length > 50 ? "..." : "");
    case "bullets":
      return `${block.data.items.length} items`;
    case "chart":
      return `${block.data.chartType} chart: ${block.data.title}`;
    case "table":
      return `${block.data.rows.length} rows x ${block.data.headers.length} cols`;
    case "citation":
      return block.data.source;
    case "math":
      return block.data.expression.substring(0, 30);
    case "callout":
      return `${block.data.type}: ${block.data.text.substring(0, 30)}...`;
    default:
      return block.type;
  }
}
