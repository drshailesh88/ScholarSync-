"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { PaperPlaneRight, Check, ArrowCounterClockwise, CircleNotch } from "@phosphor-icons/react";

const PRESET_CHIPS = [
  { label: "Improve", instruction: "Improve the writing quality" },
  { label: "Formalize", instruction: "Make more formal and academic" },
  { label: "Shorten", instruction: "Make more concise" },
  { label: "Fix grammar", instruction: "Fix grammar and spelling" },
] as const;

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

  // Keyboard shortcuts: Escape to dismiss, Enter to accept when result is ready
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (result !== null && !streaming) {
          // If showing result, revert first
          handleRevert();
        } else {
          onDismiss();
        }
      }
      // Enter to accept (only when result is shown and not streaming, and input not focused)
      if (e.key === "Enter" && result !== null && !streaming && document.activeElement !== inputRef.current) {
        e.preventDefault();
        handleAccept();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, streaming, onDismiss]);

  const handleSubmit = useCallback(
    async (overrideInstruction?: string) => {
      const instr = overrideInstruction ?? instruction.trim();
      if (!instr || streaming) return;

      setStreaming(true);
      setResult("");
      abortRef.current = new AbortController();

      try {
        const res = await fetch("/api/latex/inline-edit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            selectedText,
            instruction: instr,
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

  const handleFormSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      handleSubmit();
    },
    [handleSubmit]
  );

  const handleAccept = useCallback(() => {
    if (result && !result.startsWith("Error:")) {
      onApply(result);
    }
  }, [result, onApply]);

  const handleRevert = useCallback(() => {
    abortRef.current?.abort();
    setResult(null);
    setInstruction("");
    setStreaming(false);
    onDismiss();
  }, [onDismiss]);

  // Clamp position to viewport
  const clampedTop = Math.min(position.top, typeof window !== "undefined" ? window.innerHeight - 200 : position.top);
  const clampedLeft = Math.max(8, Math.min(position.left, typeof window !== "undefined" ? window.innerWidth - 340 : position.left));

  return (
    <div
      className="fixed z-50 animate-in fade-in slide-in-from-bottom-2 duration-200"
      style={{ top: clampedTop, left: clampedLeft }}
    >
      <div className="w-80 rounded-xl glass-panel border border-border shadow-lg overflow-hidden">
        {/* Preset chips */}
        {result === null && !streaming && (
          <div className="flex items-center gap-1 px-2 pt-2 pb-0.5 flex-wrap">
            {/* empty state: renders nothing when no data */}
            {PRESET_CHIPS.map((chip) => (
              <button
                key={chip.label}
                onClick={() => {
                  setInstruction(chip.instruction);
                  handleSubmit(chip.instruction);
                }}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium text-ink-muted border border-border-subtle hover:text-brand hover:border-brand/30 hover:bg-brand/5 transition-colors"
              >
                {chip.label}
              </button>
            ))}
          </div>
        )}

        {/* Input bar */}
        <form onSubmit={handleFormSubmit} className="flex items-center gap-2 p-2">
          <input aria-label="Text input"
            ref={inputRef}
            type="text"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="Edit instruction..."
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

        {/* Diff-style result preview */}
        {result !== null && (
          <div className="border-t border-border-subtle">
            <div className="px-3 py-2 max-h-40 overflow-y-auto space-y-1.5">
              {/* Original (strikethrough) */}
              <div className="text-[10px] font-mono leading-relaxed">
                <span className="text-[9px] font-sans font-medium text-red-400/70 uppercase tracking-wider">Original</span>
                <p className="text-ink-muted line-through decoration-red-400/40 mt-0.5 whitespace-pre-wrap">
                  {selectedText.length > 200 ? selectedText.slice(0, 200) + "..." : selectedText}
                </p>
              </div>
              {/* Suggestion */}
              <div className="text-[10px] font-mono leading-relaxed">
                <span className="text-[9px] font-sans font-medium text-emerald-400/70 uppercase tracking-wider">Suggestion</span>
                <p className="text-ink whitespace-pre-wrap mt-0.5">
                  {result || (streaming ? "Thinking..." : "")}
                </p>
              </div>
            </div>
            {!streaming && (
              <div className="flex items-center justify-between px-2 py-1.5 border-t border-border-subtle">
                <div className="flex items-center gap-1">
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
                    Dismiss
                  </button>
                </div>
                <span className="text-[9px] text-ink-muted">
                  Enter accept · Esc dismiss
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
