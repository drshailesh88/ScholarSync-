"use client";

import { useState, useRef, useEffect } from "react";
import {
  PaperPlaneRight,
  CircleNotch,
  ArrowRight,
  Plus,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useSlidesStore } from "@/stores/slides-store";
import type { ContentBlock } from "@/types/presentation";
import {
  VisualOptionCard,
  type VisualOption,
} from "../shared/visual-option-card";

// ---------------------------------------------------------------------------
// Visual Mode — Napkin-style visual generation palette
// User types prompt → AI returns 4-6 visual options → user picks one → insert
// ---------------------------------------------------------------------------

export const VISUAL_TYPE_PRESETS = [
  { label: "Flowchart", type: "flowchart" },
  { label: "Mind Map", type: "mindmap" },
  { label: "Process", type: "process_flow" },
  { label: "Comparison", type: "comparison" },
  { label: "Hierarchy", type: "hierarchy" },
  { label: "Timeline", type: "timeline" },
  { label: "Cycle", type: "cycle" },
  { label: "Stats", type: "stats_row" },
  { label: "Funnel", type: "funnel" },
  { label: "Matrix", type: "matrix" },
  { label: "Radial", type: "radial" },
  { label: "Venn", type: "venn" },
  { label: "Icon Array", type: "icon_array" },
  { label: "Pictograph", type: "pictograph" },
  { label: "Word Cloud", type: "word_cloud" },
] as const;

export function VisualMode() {
  const activeSlide = useSlidesStore((s) => s.getActiveSlide());
  const _deckId = useSlidesStore((s) => s.deckId);
  const audienceType = useSlidesStore((s) => s.audienceType);
  const updateSlide = useSlidesStore((s) => s.updateSlide);
  const addSlide = useSlidesStore((s) => s.addSlide);
  const themeConfig = useSlidesStore((s) => s.themeConfig);
  const institutionKit = useSlidesStore((s) => s.institutionKit);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<VisualOption[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [preferredType, setPreferredType] = useState<string | null>(null);
  const [lastPrompt, setLastPrompt] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (options.length > 0) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [options]);

  async function handleGenerate(prompt?: string, typeOverride?: string) {
    const text = prompt || input.trim();
    if (!text || loading) return;

    setLoading(true);
    setOptions([]);
    setSelectedIndex(null);
    setLastPrompt(text);

    try {
      const res = await fetch("/api/slides/generate-visual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: text,
          preferredType: typeOverride || preferredType,
          slideContent: activeSlide
            ? JSON.stringify({
                title: activeSlide.title,
                contentBlocks: activeSlide.contentBlocks,
              })
            : "",
          audienceType,
          brandColors: institutionKit?.primaryColor ? {
            primary: institutionKit.primaryColor,
            secondary: institutionKit.secondaryColor || "",
            accent: institutionKit.accentColor || "",
          } : undefined,
        }),
      });

      if (!res.ok) throw new Error("Generation failed");
      const data = await res.json();

      if (data.options && Array.isArray(data.options)) {
        setOptions(data.options);
      }
    } catch {
      setOptions([]);
    } finally {
      setLoading(false);
    }
  }

  function handleInsertHere() {
    if (selectedIndex == null || !activeSlide) return;
    const block = options[selectedIndex].block as ContentBlock;
    updateSlide(activeSlide.id, {
      contentBlocks: [...activeSlide.contentBlocks, block],
    });
  }

  async function handleInsertNewSlide() {
    if (selectedIndex == null) return;
    const opt = options[selectedIndex];
    const block = opt.block as ContentBlock;
    const blockData = block.data as Record<string, unknown>;
    const slideTitle =
      (blockData.title as string) ||
      (blockData.caption as string) ||
      opt.label ||
      "Visual Slide";
    const newSlide = await addSlide(activeSlide?.id);
    if (newSlide) {
      updateSlide(newSlide.id, { title: slideTitle, contentBlocks: [block] });
    }
  }

  function handleRegenerate(type: string) {
    setPreferredType(type);
    if (lastPrompt) {
      handleGenerate(lastPrompt, type);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Prompt Input */}
      <div className="p-4 border-b border-border">
        <p className="text-[10px] text-ink-muted mb-2">
          Describe what you want to visualize
        </p>
        {institutionKit?.primaryColor && (
          <p className="text-[9px] text-brand mb-1.5 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: institutionKit.primaryColor }} />
            Using institutional colors
          </p>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate();
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., CRISPR gene editing pipeline..."
            disabled={loading}
            className="flex-1 px-2.5 py-1.5 rounded-lg bg-surface-raised border border-border text-xs text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-2.5 py-1.5 rounded-lg bg-brand text-white hover:bg-brand/90 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <CircleNotch size={14} className="animate-spin" />
            ) : (
              <PaperPlaneRight size={14} />
            )}
          </button>
        </form>

        {/* Quick prompts */}
        {options.length === 0 && !loading && (
          <div className="mt-3 space-y-1">
            {[
              "Research methodology pipeline",
              "Compare two treatment approaches",
              "Key findings overview with stats",
              "Study design hierarchy",
              "Data analysis cycle",
            ].map((p) => (
              <button
                key={p}
                onClick={() => {
                  setInput(p);
                  handleGenerate(p);
                }}
                className="block w-full text-left px-2 py-1 rounded text-[10px] text-ink-muted hover:text-brand hover:bg-surface-raised transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Visual Type Filter */}
      {(options.length > 0 || lastPrompt) && (
        <div className="px-4 py-2 border-b border-border">
          <p className="text-[10px] text-ink-muted mb-1.5">Show as:</p>
          <div className="flex flex-wrap gap-1">
            {VISUAL_TYPE_PRESETS.map((preset) => (
              <button
                key={preset.type}
                onClick={() => handleRegenerate(preset.type)}
                disabled={loading}
                className={cn(
                  "px-2 py-0.5 rounded-full text-[9px] font-medium transition-colors border",
                  preferredType === preset.type
                    ? "bg-brand/10 text-brand border-brand/30"
                    : "text-ink-muted border-border hover:border-brand/20 hover:text-brand"
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Options Grid */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading && (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <CircleNotch size={24} className="text-brand animate-spin" />
            <p className="text-[10px] text-ink-muted">Generating visual options...</p>
          </div>
        )}

        {!loading && options.length > 0 && (
          <>
            <p className="text-[10px] text-ink-muted">
              {options.length} options — click to select
            </p>
            {options.map((opt, i) => (
              <VisualOptionCard
                key={i}
                option={opt}
                selected={selectedIndex === i}
                theme={themeConfig}
                onSelect={() => setSelectedIndex(i)}
              />
            ))}
          </>
        )}

        {!loading && options.length === 0 && lastPrompt && (
          <div className="text-center py-6">
            <p className="text-xs text-ink-muted mb-2">No visuals generated</p>
            <button
              onClick={() => handleGenerate(lastPrompt)}
              className="text-[10px] text-brand hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Insert Actions */}
      {selectedIndex != null && (
        <div className="p-3 border-t border-border bg-brand/5 flex gap-2">
          <button
            onClick={handleInsertHere}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-medium bg-brand text-white hover:bg-brand/90 transition-colors"
          >
            <ArrowRight size={12} /> Insert here
          </button>
          <button
            onClick={handleInsertNewSlide}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium border border-brand text-brand hover:bg-brand/5 transition-colors"
          >
            <Plus size={12} /> New slide
          </button>
        </div>
      )}
    </div>
  );
}

