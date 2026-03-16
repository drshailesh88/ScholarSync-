"use client";

import { useState, useCallback } from "react";
import { useSlidesStore } from "@/stores/slides-store";
import { PRESET_THEMES } from "@/types/presentation";
import type { AudienceType } from "@/types/presentation";
import {
  SpinnerGap,
  Plus,
  X,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  Sparkle,
  Check,
  PencilSimple,
  Presentation,
  GraduationCap,
  Chalkboard,
  UsersThree,
  MicrophoneStage,
  Stethoscope,
  MagnifyingGlass,
  Certificate,
  FirstAid,
} from "@phosphor-icons/react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface OutlineCard {
  title: string;
  bulletPoints: string[];
}

type WizardStep = "prompt" | "outline" | "theme" | "generating";

interface GenerationStreamEvent {
  type: "status" | "images" | "complete" | "error";
  message?: string;
  error?: string;
}

// ---------------------------------------------------------------------------
// Audience options
// ---------------------------------------------------------------------------

const AUDIENCE_OPTIONS: {
  value: AudienceType;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: "general", label: "General", icon: UsersThree },
  { value: "conference", label: "Conference", icon: MicrophoneStage },
  { value: "thesis_defense", label: "Thesis Defense", icon: GraduationCap },
  { value: "journal_club", label: "Journal Club", icon: MagnifyingGlass },
  { value: "classroom", label: "Classroom", icon: Chalkboard },
  { value: "grant_presentation", label: "Grant", icon: Certificate },
  { value: "poster_session", label: "Poster Session", icon: Presentation },
  { value: "systematic_review", label: "Systematic Review", icon: MagnifyingGlass },
  { value: "patient_case", label: "Patient Case", icon: Stethoscope },
  { value: "grand_rounds", label: "Grand Rounds", icon: FirstAid },
];

// ---------------------------------------------------------------------------
// Theme swatch (larger version for selection step)
// ---------------------------------------------------------------------------

function ThemeSwatchLarge({
  themeKey,
  isActive,
  onClick,
}: {
  themeKey: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const theme = PRESET_THEMES[themeKey];
  return (
    <button
      onClick={onClick}
      className={`relative rounded-xl overflow-hidden border-2 transition-all hover:scale-[1.03] ${
        isActive ? "border-brand ring-2 ring-brand/30" : "border-border"
      }`}
      style={{ width: 120, height: 72 }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: theme.backgroundColor }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-2"
        style={{ backgroundColor: theme.primaryColor }}
      />
      <div className="absolute left-3 top-4 flex flex-col gap-1.5">
        <div
          className="h-1.5 w-14 rounded-full"
          style={{ backgroundColor: theme.textColor, opacity: 0.6 }}
        />
        <div
          className="h-1 w-16 rounded-full"
          style={{ backgroundColor: theme.textColor, opacity: 0.25 }}
        />
        <div
          className="h-1 w-10 rounded-full"
          style={{ backgroundColor: theme.textColor, opacity: 0.25 }}
        />
      </div>
      <div className="absolute bottom-1.5 left-3 text-[9px] font-medium" style={{ color: theme.textColor, opacity: 0.5 }}>
        {theme.name}
      </div>
      {isActive && (
        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-brand flex items-center justify-center">
          <Check size={10} weight="bold" className="text-white" />
        </div>
      )}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Editable outline card row
// ---------------------------------------------------------------------------

function OutlineCardRow({
  card,
  index,
  total,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  card: OutlineCard;
  index: number;
  total: number;
  onChange: (updated: OutlineCard) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  function updateBullet(bulletIndex: number, value: string) {
    const updated = [...card.bulletPoints];
    updated[bulletIndex] = value;
    onChange({ ...card, bulletPoints: updated });
  }

  function addBullet() {
    onChange({ ...card, bulletPoints: [...card.bulletPoints, ""] });
  }

  function removeBullet(bulletIndex: number) {
    onChange({
      ...card,
      bulletPoints: card.bulletPoints.filter((_, i) => i !== bulletIndex),
    });
  }

  return (
    <div className="group relative rounded-xl border border-border bg-surface p-4 hover:border-brand/40 transition-colors">
      {/* Card number badge */}
      <div className="absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center">
        {index + 1}
      </div>

      {/* Actions */}
      <div className="absolute top-2 right-2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onMoveUp}
          disabled={index === 0}
          className="p-1 rounded hover:bg-surface-raised disabled:opacity-30 text-ink-muted"
          title="Move up"
        >
          <ArrowUp size={14} />
        </button>
        <button
          onClick={onMoveDown}
          disabled={index === total - 1}
          className="p-1 rounded hover:bg-surface-raised disabled:opacity-30 text-ink-muted"
          title="Move down"
        >
          <ArrowDown size={14} />
        </button>
        <button
          onClick={onRemove}
          disabled={total <= 1}
          className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 disabled:opacity-30 text-red-500"
          title="Remove card"
        >
          <X size={14} />
        </button>
      </div>

      {/* Title */}
      <input aria-label="Input"
        value={card.title}
        onChange={(e) => onChange({ ...card, title: e.target.value })}
        className="w-full text-sm font-semibold text-ink bg-transparent border-none outline-none mb-2 pr-20"
        placeholder="Card title"
      />

      {/* Bullet points */}
      <ul className="space-y-1.5 ml-1">
        {card.bulletPoints.map((bp, bi) => (
          <li key={bi} className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand/50 shrink-0" />
            <input aria-label="Input"
              value={bp}
              onChange={(e) => updateBullet(bi, e.target.value)}
              className="flex-1 text-xs text-ink-muted bg-transparent border-none outline-none"
              placeholder="Key point"
            />
            <button
              onClick={() => removeBullet(bi)}
              className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-red-400 shrink-0"
              title="Remove bullet"
            >
              <X size={10} />
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={addBullet}
        className="mt-2 flex items-center gap-1 text-[11px] text-brand hover:text-brand/80 transition-colors"
      >
        <Plus size={10} />
        Add point
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// OutlineGenerator — main wizard
// ---------------------------------------------------------------------------

export function OutlineGenerator() {
  const deckId = useSlidesStore((s) => s.deckId);
  const loadDeck = useSlidesStore((s) => s.loadDeck);
  const setTheme = useSlidesStore((s) => s.setTheme);
  const setAudienceType = useSlidesStore((s) => s.setAudienceType);

  // Wizard state
  const [step, setStep] = useState<WizardStep>("prompt");

  // Step 1: Prompt
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState<AudienceType>("general");
  const [cardCount, setCardCount] = useState(8);
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 2: Outline
  const [outline, setOutline] = useState<OutlineCard[]>([]);

  // Step 3: Theme
  const [selectedTheme, setSelectedTheme] = useState("modern");

  // Step 4: Generating
  const [generationProgress, setGenerationProgress] = useState("");

  // ── Step 1: Generate outline from prompt ──
  const handleGenerateOutline = useCallback(async () => {
    if (!title.trim()) return;
    setError(null);
    setIsGeneratingOutline(true);

    try {
      const res = await fetch("/api/slides/outline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
          audienceType: audience,
          cardCount,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to generate outline");
      }

      const data = await res.json();
      if (!data.outline || !Array.isArray(data.outline)) {
        throw new Error("Invalid outline response");
      }

      setOutline(data.outline);
      setAudienceType(audience);
      setStep("outline");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsGeneratingOutline(false);
    }
  }, [title, description, audience, cardCount, setAudienceType]);

  // ── Step 2: Outline editing helpers ──
  const updateCard = useCallback((index: number, updated: OutlineCard) => {
    setOutline((prev) => prev.map((c, i) => (i === index ? updated : c)));
  }, []);

  const removeCard = useCallback((index: number) => {
    setOutline((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const moveCard = useCallback((from: number, to: number) => {
    setOutline((prev) => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  }, []);

  const addCard = useCallback(() => {
    setOutline((prev) => [
      ...prev,
      { title: "New Card", bulletPoints: ["Key point"] },
    ]);
  }, []);

  // ── Step 4: Generate full deck from outline ──
  const handleGenerateDeck = useCallback(async () => {
    if (!deckId) return;
    setStep("generating");
    setGenerationProgress("Setting up your theme...");

    // Apply theme to store
    setTheme(selectedTheme, PRESET_THEMES[selectedTheme]);

    // Serialize outline as text for the description
    const outlineText = outline
      .map(
        (card, i) =>
          `Card ${i + 1}: ${card.title}\n${card.bulletPoints
            .map((bp) => `  - ${bp}`)
            .join("\n")}`
      )
      .join("\n\n");

    setGenerationProgress("Generating your presentation...");

    try {
      const res = await fetch("/api/slides/generate-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deckId,
          title: title.trim(),
          description: outlineText,
          audienceType: audience,
          themeKey: selectedTheme,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to generate slides");
      }

      const reader = res.body?.getReader();
      if (!reader) {
        throw new Error("Generation stream was unavailable");
      }

      const decoder = new TextDecoder();
      let buffered = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffered += decoder.decode(value, { stream: true });
        const lines = buffered.split("\n");
        buffered = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line) as GenerationStreamEvent;
          if (event.type === "error") {
            throw new Error(event.error ?? "Generation failed");
          }
          if (event.message) {
            setGenerationProgress(event.message);
          }
        }
      }

      setGenerationProgress("Loading your deck...");
      await loadDeck(deckId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
      setStep("outline");
    }
  }, [deckId, outline, title, audience, selectedTheme, setTheme, loadDeck]);

  // ── Render ──

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-surface-raised/30">
      <div className="w-full max-w-2xl">
        {/* ── Step 1: Prompt ── */}
        {step === "prompt" && (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand/10 mb-2">
                <Sparkle size={28} weight="duotone" className="text-brand" />
              </div>
              <h2 className="text-xl font-bold text-ink">
                Create a new presentation
              </h2>
              <p className="text-sm text-ink-muted max-w-md mx-auto">
                Describe your topic and we will generate an editable outline you
                can refine before creating slides.
              </p>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1.5">
                Title <span className="text-red-400">*</span>
              </label>
              <input aria-label="Input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The Role of CRISPR in Gene Therapy"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:ring-2 focus:ring-brand/40 transition-shadow"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && title.trim()) handleGenerateOutline();
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1.5">
                Description{" "}
                <span className="text-ink-faint font-normal">(optional)</span>
              </label>
              <textarea aria-label="Text area"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your topic, key points, or paste an abstract..."
                rows={3}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:ring-2 focus:ring-brand/40 transition-shadow resize-none"
              />
            </div>

            {/* Audience picker */}
            <div>
              <label className="block text-xs font-medium text-ink-muted mb-2">
                Target Audience
              </label>
              <div className="grid grid-cols-5 gap-2">
                {AUDIENCE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isActive = audience === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setAudience(opt.value)}
                      className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-[10px] font-medium transition-all ${
                        isActive
                          ? "border-brand bg-brand/5 text-brand"
                          : "border-border text-ink-muted hover:border-brand/40 hover:bg-surface"
                      }`}
                    >
                      <Icon
                        size={18}
                        weight={isActive ? "duotone" : "regular"}
                      />
                      <span className="truncate w-full text-center">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Card count slider */}
            <div className="flex items-center gap-3">
              <label className="text-xs font-medium text-ink-muted whitespace-nowrap">
                Cards: {cardCount}
              </label>
              <input aria-label="Range slider"
                type="range"
                min={3}
                max={20}
                value={cardCount}
                onChange={(e) => setCardCount(Number(e.target.value))}
                className="flex-1 accent-brand"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-2.5 text-xs text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Generate button */}
            <button
              onClick={handleGenerateOutline}
              disabled={!title.trim() || isGeneratingOutline}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand text-white font-medium py-3 text-sm hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isGeneratingOutline ? (
                <>
                  <SpinnerGap
                    size={16}
                    className="animate-spin"
                  />
                  Generating outline...
                </>
              ) : (
                <>
                  <Sparkle size={16} weight="fill" />
                  Generate Outline
                </>
              )}
            </button>
          </div>
        )}

        {/* ── Step 2: Outline Editor ── */}
        {step === "outline" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-ink flex items-center gap-2">
                  <PencilSimple size={20} weight="duotone" />
                  Edit your outline
                </h2>
                <p className="text-xs text-ink-muted mt-0.5">
                  Reorder, add, remove, or edit cards and bullet points before
                  generating.
                </p>
              </div>
              <span className="text-xs text-ink-faint">
                {outline.length} card{outline.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Card list */}
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
              {/* empty state: no data, no results, nothing here */}
              {outline.length === 0 && (
                <p className="text-xs text-ink-muted text-center py-4">nothing here yet. Generate an outline to get started.</p>
              )}
              {outline.map((card, i) => (
                <OutlineCardRow
                  key={i}
                  card={card}
                  index={i}
                  total={outline.length}
                  onChange={(u) => updateCard(i, u)}
                  onRemove={() => removeCard(i)}
                  onMoveUp={() => moveCard(i, i - 1)}
                  onMoveDown={() => moveCard(i, i + 1)}
                />
              ))}
            </div>

            {/* Add card */}
            <button
              onClick={addCard}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-border py-3 text-xs font-medium text-ink-muted hover:border-brand/40 hover:text-brand transition-colors"
            >
              <Plus size={14} />
              Add another card
            </button>

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-2.5 text-xs text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setStep("prompt");
                  setError(null);
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border text-sm text-ink-muted hover:bg-surface transition-colors"
              >
                <ArrowLeft size={14} />
                Back
              </button>
              <button
                onClick={() => {
                  setError(null);
                  setStep("theme");
                }}
                disabled={outline.length === 0}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand text-white font-medium py-2.5 text-sm hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Choose Theme
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Theme Selection ── */}
        {step === "theme" && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold text-ink">Pick a theme</h2>
              <p className="text-xs text-ink-muted">
                Select a visual style for your presentation. You can change this
                later.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {Object.keys(PRESET_THEMES).map((key) => (
                <ThemeSwatchLarge
                  key={key}
                  themeKey={key}
                  isActive={key === selectedTheme}
                  onClick={() => setSelectedTheme(key)}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep("outline")}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border text-sm text-ink-muted hover:bg-surface transition-colors"
              >
                <ArrowLeft size={14} />
                Back
              </button>
              <button
                onClick={handleGenerateDeck}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand text-white font-medium py-2.5 text-sm hover:bg-brand/90 transition-all"
              >
                <Sparkle size={16} weight="fill" />
                Create Presentation
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: Generating ── */}
        {step === "generating" && (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <SpinnerGap
              size={40}
              className="animate-spin text-brand"
            />
            <h2 className="text-lg font-bold text-ink">
              Creating your presentation
            </h2>
            <p className="text-sm text-ink-muted">{generationProgress}</p>
          </div>
        )}
      </div>
    </div>
  );
}
