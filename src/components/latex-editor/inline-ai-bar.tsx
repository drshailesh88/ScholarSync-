"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { PaperPlaneRight, Check, ArrowCounterClockwise, CircleNotch } from "@phosphor-icons/react";

interface InlineAiBarProps {
  selectedText: string;
  position: { top: number; left: number };
  onApply: (newText: string) => void;
  onDismiss: () => void;
}

export function InlineAiBar({ selectedText, position, onApply, onDismiss }: InlineAiBarProps) {
  const [instruction, setInstruction] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [streaming, setStreaming] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Dismiss on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onDismiss]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!instruction.trim() || streaming) return;

      setStreaming(true);
      setResult("");
      abortRef.current = new AbortController();

      try {
        const res = await fetch("/api/latex/inline-edit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            selectedText,
            instruction: instruction.trim(),
          }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) {
          setResult("Error: could not process edit");
          setStreaming(false);
          return;
        }

        const reader = res.body?.getReader();
        if (!reader) {
          setResult("Error: no response");
          setStreaming(false);
          return;
        }

        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          setResult(accumulated);
        }
      } catch (err: unknown) {
        if ((err as Error).name !== "AbortError") {
          setResult("Error: request failed");
        }
      } finally {
        setStreaming(false);
      }
    },
    [instruction, selectedText, streaming]
  );

  const handleAccept = useCallback(() => {
    if (result) {
      onApply(result);
    }
  }, [result, onApply]);

  const handleRevert = useCallback(() => {
    abortRef.current?.abort();
    setResult(null);
    setInstruction("");
    setStreaming(false);
  }, []);

  return (
    <div
      className="fixed z-50 animate-in fade-in slide-in-from-bottom-2 duration-200"
      style={{ top: position.top, left: position.left }}
    >
      <div className="w-80 rounded-xl glass-panel border border-border shadow-lg overflow-hidden">
        {/* Input bar */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2">
          <input
            ref={inputRef}
            type="text"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="Make more formal..."
            disabled={streaming}
            className="flex-1 px-2.5 py-1.5 rounded-lg bg-surface-raised border border-border text-xs text-ink placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-brand/40 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!instruction.trim() || streaming}
            className="p-1.5 rounded-lg bg-brand text-white hover:bg-brand-hover transition-colors disabled:opacity-50"
          >
            {streaming ? (
              <CircleNotch size={14} className="animate-spin" />
            ) : (
              <PaperPlaneRight size={14} />
            )}
          </button>
        </form>

        {/* Result preview */}
        {result !== null && (
          <div className="border-t border-border-subtle">
            <div className="px-3 py-2 max-h-32 overflow-y-auto">
              <p className="text-xs text-ink whitespace-pre-wrap font-mono leading-relaxed">
                {result || (streaming ? "Thinking..." : "")}
              </p>
            </div>
            {!streaming && (
              <div className="flex items-center gap-1 px-2 py-1.5 border-t border-border-subtle">
                <button
                  onClick={handleAccept}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                >
                  <Check size={12} />
                  Accept
                </button>
                <button
                  onClick={handleRevert}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
                >
                  <ArrowCounterClockwise size={12} />
                  Revert
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
