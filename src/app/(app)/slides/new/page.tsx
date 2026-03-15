// Empty state: renders nothing when data.length === 0
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, CircleNotch, Sparkle } from "@phosphor-icons/react";
import { PRESET_THEMES } from "@/types/presentation";
import type { AudienceType } from "@/types/presentation";
import { createDeck, createSlide } from "@/lib/actions/presentations";

const AUDIENCE_OPTIONS: { value: AudienceType; label: string; description: string }[] = [
  { value: "general", label: "General", description: "General audience presentation" },
  { value: "conference", label: "Conference", description: "Academic conference talk" },
  { value: "thesis_defense", label: "Thesis Defense", description: "Dissertation or thesis defense" },
  { value: "journal_club", label: "Journal Club", description: "Paper review meeting" },
  { value: "classroom", label: "Classroom", description: "Teaching or lecture" },
  { value: "grant_presentation", label: "Grant", description: "Funding proposal" },
  { value: "poster_session", label: "Poster", description: "Poster presentation" },
];

const THEME_OPTIONS = Object.keys(PRESET_THEMES).slice(0, 8);

type Step = "topic" | "audience" | "theme" | "generating";

export default function NewPresentationPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("topic");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audienceType, setAudienceType] = useState<AudienceType>("general");
  const [themeKey, setThemeKey] = useState("modern");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    if (!title.trim()) return;
    setGenerating(true);
    setError(null);
    setStep("generating");

    try {
      const deck = await createDeck({
        title: title.trim(),
        description: description.trim() || undefined,
        audienceType,
      });

      // Create initial title slide
      await createSlide({
        deckId: deck.id,
        sortOrder: 0,
        layout: "title_slide",
        title: title.trim(),
        contentBlocks: [
          { type: "text", data: { text: description.trim() || "Click to add subtitle", style: "subtitle" } },
        ],
      });

      // Navigate immediately — don't wait for AI generation
      router.push(`/slides/${deck.id}`);

      // Fire-and-forget AI generation (runs in background after navigation)
      if (description.trim()) {
        fetch("/api/slides/generate-stream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            deckId: deck.id,
            title: title.trim(),
            description: description.trim(),
            audienceType,
            themeKey,
          }),
        }).catch(() => {
          // AI generation is a nice-to-have, don't block anything
        });
      }
    } catch {
      setError("Failed to create presentation. Please try again.");
      setGenerating(false);
      setStep("theme");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {(["topic", "audience", "theme"] as const).map((s, i) => (
          <div
            key={s}
            className={`w-2 h-2 rounded-full transition-colors ${
              step === s || (step === "generating" && i === 2)
                ? "bg-brand"
                : ["topic", "audience", "theme"].indexOf(step) > i
                ? "bg-brand/40"
                : "bg-border"
            }`}
          />
        ))}
      </div>

      {/* Step: Topic */}
      {step === "topic" && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-ink mb-2">
              What&apos;s your presentation about?
            </h1>
            <p className="text-sm text-ink-muted">
              Give it a title and optionally describe the content
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Title
            </label>
            <input aria-label="Input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Machine Learning in Drug Discovery"
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-ink placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-brand/30"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Description <span className="text-ink-muted font-normal">(optional)</span>
            </label>
            <textarea aria-label="Text area"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your topic, key points, or paste an abstract..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-ink placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-brand/30 resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep("audience")}
              disabled={!title.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors disabled:opacity-50"
            >
              Next <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step: Audience */}
      {step === "audience" && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-ink mb-2">
              Who&apos;s your audience?
            </h1>
            <p className="text-sm text-ink-muted">
              This helps tailor language, depth, and style
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {AUDIENCE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setAudienceType(opt.value)}
                className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all ${
                  audienceType === opt.value
                    ? "border-brand bg-brand/5"
                    : "border-border hover:border-brand/40"
                }`}
              >
                <span className="text-sm font-semibold text-ink">
                  {opt.label}
                </span>
                <span className="text-xs text-ink-muted mt-0.5">
                  {opt.description}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep("topic")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-ink-muted hover:text-ink transition-colors"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <button
              onClick={() => setStep("theme")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors"
            >
              Next <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step: Theme */}
      {step === "theme" && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-ink mb-2">
              Pick a theme
            </h1>
            <p className="text-sm text-ink-muted">
              You can change this anytime in the editor
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {THEME_OPTIONS.map((key) => {
              const theme = PRESET_THEMES[key];
              return (
                <button
                  key={key}
                  onClick={() => setThemeKey(key)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    themeKey === key
                      ? "border-brand shadow-sm"
                      : "border-border hover:border-brand/40"
                  }`}
                >
                  <div
                    className="w-full aspect-[16/9] rounded-lg"
                    style={{ backgroundColor: theme.backgroundColor }}
                  >
                    <div className="p-2">
                      <div
                        className="w-8 h-1.5 rounded-full mb-1"
                        style={{ backgroundColor: theme.primaryColor }}
                      />
                      <div
                        className="w-12 h-1 rounded-full opacity-50"
                        style={{ backgroundColor: theme.textColor }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-ink capitalize">
                    {key.replace(/_/g, " ")}
                  </span>
                </button>
              );
            })}
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <div className="flex justify-between">
            <button
              onClick={() => setStep("audience")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-ink-muted hover:text-ink transition-colors"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <button
              onClick={handleCreate}
              disabled={generating}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors disabled:opacity-50"
            >
              {generating ? (
                <>
                  <CircleNotch size={16} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkle size={16} />
                  Create Presentation
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step: Generating */}
      {step === "generating" && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-3 border-brand border-t-transparent rounded-full animate-spin mb-6" />
          <h2 className="text-lg font-semibold text-ink mb-2">
            Creating your presentation
          </h2>
          <p className="text-sm text-ink-muted">
            Setting up your deck and generating initial slides...
          </p>
        </div>
      )}
    </div>
  );
}
