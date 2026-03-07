"use client";

import { useState, useRef, useEffect } from "react";
import {
  PaperPlaneRight,
  CircleNotch,
  ArrowRight,
  Plus,
  ArrowSquareOut,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useSlidesStore } from "@/stores/slides-store";
import { VisualOptionCard, type VisualOption } from "./visual-option-card";
import { VISUAL_TYPE_PRESETS } from "../agent/visual-mode";
import type { ContentBlock } from "@/types/presentation";
import type { RefObject } from "react";

const QUICK_PROMPTS = [
  "Research methodology pipeline",
  "Compare two approaches",
  "Key findings overview",
  "Study timeline",
  "Data analysis workflow",
];

interface VisualizePopoverProps {
  isOpen: boolean;
  anchorRef: RefObject<HTMLElement | null>;
  onClose: () => void;
  initialType?: string | null;
}

export function VisualizePopover({
  isOpen,
  anchorRef,
  onClose,
  initialType,
}: VisualizePopoverProps) {
  const activeSlide = useSlidesStore((s) => s.getActiveSlide());
  const audienceType = useSlidesStore((s) => s.audienceType);
  const updateSlide = useSlidesStore((s) => s.updateSlide);
  const addSlide = useSlidesStore((s) => s.addSlide);
  const themeConfig = useSlidesStore((s) => s.themeConfig);
  const setRightPanel = useSlidesStore((s) => s.setRightPanel);
  const setAgentMode = useSlidesStore((s) => s.setAgentMode);
  const institutionKit = useSlidesStore((s) => s.institutionKit);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<VisualOption[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [preferredType, setPreferredType] = useState<string | null>(initialType ?? null);
  const [showQuickPrompts, setShowQuickPrompts] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 });

  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset state when popover opens
  const [prevOpen, setPrevOpen] = useState(isOpen);
  if (isOpen !== prevOpen) {
    setPrevOpen(isOpen);
    if (isOpen) {
      setInput("");
      setOptions([]);
      setSelectedIndex(null);
      setPreferredType(initialType ?? null);
      setShowQuickPrompts(false);
      setLoading(false);
    }
  }

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  // Position popover below anchor
  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const anchor = anchorRef.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      setMenuPosition({ left: rect.left, top: rect.bottom + 6 });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [anchorRef, isOpen]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (popoverRef.current?.contains(target)) return;
      if (anchorRef.current?.contains(target)) return;
      onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [anchorRef, isOpen, onClose]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  async function handleGenerate(prompt?: string, typeOverride?: string) {
    const text = prompt || input.trim();
    if (!text || loading) return;

    setLoading(true);
    setOptions([]);
    setSelectedIndex(null);

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
    onClose();
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
    onClose();
  }

  function handleOpenFullStudio() {
    setRightPanel("agent");
    setAgentMode("visual");
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      data-testid="visualize-popover"
      className="fixed z-[1000] w-[400px] max-h-[500px] overflow-hidden rounded-xl border border-border bg-surface shadow-xl flex flex-col"
      style={{ left: menuPosition.left, top: menuPosition.top }}
    >
      {/* Quick Input */}
      <div className="p-3 border-b border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate();
          }}
          className="flex gap-2"
        >
          <input
            ref={inputRef}
            data-testid="visualize-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to visualize..."
            disabled={loading}
            className="flex-1 px-2.5 py-1.5 rounded-lg bg-surface-raised border border-border text-xs text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
          <button
            type="submit"
            data-testid="visualize-generate-btn"
            disabled={loading || !input.trim()}
            className="px-3 py-1.5 rounded-lg bg-brand text-white text-xs font-medium hover:bg-brand/90 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <CircleNotch size={14} className="animate-spin" />
            ) : (
              <span className="flex items-center gap-1">
                <PaperPlaneRight size={12} />
                Generate
              </span>
            )}
          </button>
        </form>
        {institutionKit?.primaryColor && (
          <p className="text-[9px] text-brand mt-1.5 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: institutionKit.primaryColor }} />
            Using institutional colors
          </p>
        )}
      </div>

      {/* Type Chips */}
      <div className="px-3 py-2 border-b border-border">
        <div className="flex flex-wrap gap-1">
          {VISUAL_TYPE_PRESETS.map((preset) => (
            <button
              key={preset.type}
              data-testid="visualize-type-chip"
              data-type={preset.type}
              onClick={() => {
                setPreferredType(preset.type);
                inputRef.current?.focus();
              }}
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

      {/* Quick Prompts (collapsible) */}
      {options.length === 0 && !loading && (
        <div className="border-b border-border">
          <button
            data-testid="visualize-quick-prompts-toggle"
            onClick={() => setShowQuickPrompts(!showQuickPrompts)}
            className="flex items-center gap-1 w-full px-3 py-1.5 text-[10px] text-ink-muted hover:text-ink transition-colors"
          >
            {showQuickPrompts ? <CaretUp size={10} /> : <CaretDown size={10} />}
            Quick Prompts
          </button>
          {showQuickPrompts && (
            <div className="px-3 pb-2 space-y-0.5">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  data-testid="visualize-quick-prompt"
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
      )}

      {/* Results Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2" data-testid="visualize-results">
        {loading && (
          <div className="flex flex-col items-center justify-center py-6 gap-2">
            <CircleNotch size={20} className="text-brand animate-spin" />
            <p className="text-[10px] text-ink-muted">Generating visual options...</p>
          </div>
        )}

        {!loading && options.length > 0 && (
          <>
            <p className="text-[10px] text-ink-muted">
              {options.length} options — click to select
            </p>
            <div className="grid grid-cols-2 gap-2">
              {options.map((opt, i) => (
                <VisualOptionCard
                  key={i}
                  option={opt}
                  selected={selectedIndex === i}
                  theme={themeConfig}
                  onSelect={() => setSelectedIndex(i)}
                  compact
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Insert Actions */}
      {selectedIndex != null && (
        <div className="p-2 border-t border-border bg-brand/5 flex gap-2">
          <button
            data-testid="visualize-insert-here"
            onClick={handleInsertHere}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand text-white hover:bg-brand/90 transition-colors"
          >
            <ArrowRight size={12} /> Insert on Slide
          </button>
          <button
            data-testid="visualize-new-slide"
            onClick={() => void handleInsertNewSlide()}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-brand text-brand hover:bg-brand/5 transition-colors"
          >
            <Plus size={12} /> New Slide
          </button>
        </div>
      )}

      {/* Open Full Visual Studio */}
      <div className="px-3 py-2 border-t border-border">
        <button
          data-testid="visualize-open-studio"
          onClick={handleOpenFullStudio}
          className="flex items-center gap-1 text-[10px] text-ink-muted hover:text-brand transition-colors"
        >
          <ArrowSquareOut size={10} />
          Open Full Visual Studio
        </button>
      </div>
    </div>
  );
}
