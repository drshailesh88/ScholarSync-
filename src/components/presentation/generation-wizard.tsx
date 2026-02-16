"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Sparkle,
  CircleNotch,
  Check,
  Warning,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { SourceSelector, type SourceType } from "./source-selector";
import { PRESET_THEMES } from "@/types/presentation";
import type { AudienceType } from "@/types/presentation";

const STEPS = ["Select Source", "Configure", "Generate"];

const AUDIENCE_OPTIONS: { key: AudienceType; label: string }[] = [
  { key: "general", label: "General" },
  { key: "thesis_defense", label: "Thesis Defense" },
  { key: "conference", label: "Conference" },
  { key: "journal_club", label: "Journal Club" },
  { key: "classroom", label: "Classroom" },
];

export function GenerationWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // Step 1: Source
  const [sourceType, setSourceType] = useState<SourceType>("text");
  const [paperIds, setPaperIds] = useState<number[]>([]);
  const [documentId, setDocumentId] = useState<number | null>(null);
  const [rawText, setRawText] = useState("");

  // Step 2: Config
  const [title, setTitle] = useState("");
  const [audienceType, setAudienceType] = useState<AudienceType>("general");
  const [slideCount, setSlideCount] = useState(12);
  const [themeKey, setThemeKey] = useState("modern");
  const [instructions, setInstructions] = useState("");

  // Step 3: Generation
  const [preprocessing, setPreprocessing] = useState(false);
  const [preprocessedData, setPreprocessedData] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<{
    deckId: number;
    slideCount: number;
  } | null>(null);
  const [error, setError] = useState("");

  const canProceedStep1 =
    (sourceType === "papers" && paperIds.length > 0) ||
    (sourceType === "document" && documentId != null) ||
    (sourceType === "text" && rawText.trim().length > 50);

  const canProceedStep2 = title.trim().length > 0;

  async function handlePreprocess() {
    setPreprocessing(true);
    setError("");
    try {
      const res = await fetch("/api/presentations/preprocess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceType,
          paperIds: sourceType === "papers" ? paperIds : undefined,
          documentId: sourceType === "document" ? documentId : undefined,
          rawText: sourceType === "text" ? rawText : undefined,
        }),
      });

      if (!res.ok) throw new Error("Preprocessing failed");

      // Read the streaming response
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      let fullText = "";
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        // Extract text content from the data stream format
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("0:")) {
            try {
              fullText += JSON.parse(line.slice(2));
            } catch {
              // skip malformed chunks
            }
          }
        }
      }

      setPreprocessedData(fullText);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Preprocessing failed");
    } finally {
      setPreprocessing(false);
    }
  }

  async function handleGenerate() {
    setGenerating(true);
    setError("");
    try {
      const res = await fetch("/api/presentations/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preprocessedData,
          title,
          audienceType,
          slideCount,
          themeKey,
          additionalInstructions: instructions || undefined,
        }),
      });

      if (!res.ok) throw new Error("Generation failed");

      const result = await res.json();
      setGenerationResult(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setGenerating(false);
    }
  }

  async function handleStartGeneration() {
    setStep(2);
    await handlePreprocess();
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium",
                i < step
                  ? "bg-brand text-white"
                  : i === step
                    ? "bg-brand/10 text-brand border border-brand"
                    : "bg-surface-raised text-ink-muted border border-border"
              )}
            >
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span
              className={cn(
                "text-xs",
                i === step ? "text-ink font-medium" : "text-ink-muted"
              )}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <div className="w-8 h-px bg-border mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      {step === 0 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-ink mb-1">
              Select Source Material
            </h2>
            <p className="text-sm text-ink-muted">
              Choose where to generate your presentation from
            </p>
          </div>

          <SourceSelector
            sourceType={sourceType}
            onSourceTypeChange={setSourceType}
            selectedPaperIds={paperIds}
            onPaperIdsChange={setPaperIds}
            selectedDocumentId={documentId}
            onDocumentIdChange={setDocumentId}
            rawText={rawText}
            onRawTextChange={setRawText}
          />

          <div className="flex justify-end">
            <button
              onClick={() => setStep(1)}
              disabled={!canProceedStep1}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors",
                canProceedStep1
                  ? "bg-brand text-white hover:bg-brand/90"
                  : "bg-surface-raised text-ink-muted cursor-not-allowed"
              )}
            >
              Next <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-ink mb-1">
              Configure Presentation
            </h2>
            <p className="text-sm text-ink-muted">
              Set title, audience, and generation preferences
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-ink block mb-2">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Presentation title"
              className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
              autoFocus
            />
          </div>

          <div>
            <label className="text-sm font-medium text-ink block mb-2">Audience</label>
            <div className="flex flex-wrap gap-2">
              {AUDIENCE_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setAudienceType(opt.key)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-medium border transition-colors",
                    audienceType === opt.key
                      ? "border-brand bg-brand/5 text-brand"
                      : "border-border text-ink-muted hover:border-brand/40"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-ink block mb-2">
              Target Slide Count: {slideCount}
            </label>
            <input
              type="range"
              min={5}
              max={30}
              value={slideCount}
              onChange={(e) => setSlideCount(parseInt(e.target.value, 10))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-ink block mb-2">Theme</label>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(PRESET_THEMES).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setThemeKey(key)}
                  className={cn(
                    "rounded-lg overflow-hidden border-2 transition-all",
                    themeKey === key
                      ? "border-brand ring-1 ring-brand/30"
                      : "border-border hover:border-brand/40"
                  )}
                >
                  <div
                    className="aspect-video flex items-center justify-center"
                    style={{ backgroundColor: config.backgroundColor }}
                  >
                    <span
                      className="text-[8px] font-bold"
                      style={{ color: config.primaryColor }}
                    >
                      {config.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-ink block mb-2">
              Additional Instructions{" "}
              <span className="text-ink-muted font-normal">(optional)</span>
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g., Focus on methodology, include more charts..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30 resize-none"
            />
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(0)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-ink-muted hover:text-ink transition-colors"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <button
              onClick={handleStartGeneration}
              disabled={!canProceedStep2}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors",
                canProceedStep2
                  ? "bg-brand text-white hover:bg-brand/90"
                  : "bg-surface-raised text-ink-muted cursor-not-allowed"
              )}
            >
              <Sparkle size={14} /> Generate
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-ink mb-1">
              Generating Presentation
            </h2>
            <p className="text-sm text-ink-muted">
              AI is creating your slide deck
            </p>
          </div>

          {/* Progress */}
          <div className="space-y-3">
            <ProgressItem
              label="Preprocessing content"
              status={
                preprocessing
                  ? "loading"
                  : preprocessedData
                    ? "done"
                    : error && !preprocessedData
                      ? "error"
                      : "pending"
              }
            />
            <ProgressItem
              label="Generating slides"
              status={
                generating
                  ? "loading"
                  : generationResult
                    ? "done"
                    : error && preprocessedData && !generationResult
                      ? "error"
                      : "pending"
              }
            />
          </div>

          {/* Auto-trigger generation after preprocess */}
          {preprocessedData && !generating && !generationResult && !error && (
            <AutoTrigger onTrigger={handleGenerate} />
          )}

          {error && (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              <Warning size={16} />
              {error}
            </div>
          )}

          {generationResult && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 text-sm">
                <Check size={16} weight="bold" />
                Generated {generationResult.slideCount} slides successfully!
              </div>

              <button
                onClick={() =>
                  router.push(`/presentation/${generationResult.deckId}`)
                }
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors"
              >
                Open Presentation <ArrowRight size={14} />
              </button>
            </div>
          )}

          {error && (
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setStep(1);
                  setError("");
                  setPreprocessedData("");
                  setGenerationResult(null);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-ink-muted hover:text-ink transition-colors"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                onClick={() => {
                  setError("");
                  if (!preprocessedData) {
                    handlePreprocess();
                  } else {
                    handleGenerate();
                  }
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProgressItem({
  label,
  status,
}: {
  label: string;
  status: "pending" | "loading" | "done" | "error";
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-raised">
      {status === "loading" && (
        <CircleNotch size={16} className="text-brand animate-spin" />
      )}
      {status === "done" && (
        <Check size={16} className="text-green-500" weight="bold" />
      )}
      {status === "error" && (
        <Warning size={16} className="text-red-500" />
      )}
      {status === "pending" && (
        <div className="w-4 h-4 rounded-full border-2 border-border" />
      )}
      <span
        className={cn(
          "text-sm",
          status === "loading" && "text-brand",
          status === "done" && "text-ink",
          status === "error" && "text-red-500",
          status === "pending" && "text-ink-muted"
        )}
      >
        {label}
      </span>
    </div>
  );
}

function AutoTrigger({ onTrigger }: { onTrigger: () => void }) {
  useState(() => {
    // Trigger generation automatically after a small delay
    const t = setTimeout(onTrigger, 500);
    return () => clearTimeout(t);
  });
  return null;
}
