// Empty state: renders nothing when data.length === 0
"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Sparkle,
  CircleNotch,
  Check,
  Warning,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  SourceSelector,
  type SourceType,
  type ImportedDeckSource,
} from "@/components/presentation/source-selector";
import { PRESET_THEMES } from "@/types/presentation";
import type { PosterSize, PosterGridLayout } from "@/types/poster";
import { POSTER_SIZES, POSTER_GRID_LAYOUTS, POSTER_TEMPLATES } from "@/types/poster";

const STEPS = ["Source", "Size & Template", "Theme & Options", "Generate"];

export default function NewPosterPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto py-8 text-center text-sm text-ink-muted">Loading...</div>}>
      <NewPosterContent />
    </Suspense>
  );
}

function NewPosterContent() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // Step 0: Source
  const [sourceType, setSourceType] = useState<SourceType>("text");
  const [paperIds, setPaperIds] = useState<number[]>([]);
  const [documentId, setDocumentId] = useState<number | null>(null);
  const [rawText, setRawText] = useState("");
  const [deepResearchSessionId, setDeepResearchSessionId] = useState<number | null>(null);
  const [importedDeck, setImportedDeck] = useState<ImportedDeckSource | null>(null);

  // Step 1: Size & Template
  const [posterSize, setPosterSize] = useState<PosterSize>("a0_portrait");
  const [gridLayout, setGridLayout] = useState<PosterGridLayout>("three_column");
  const [templateId, setTemplateId] = useState<string | null>(null);

  // Step 2: Theme & Options
  const [title, setTitle] = useState("");
  const [themeKey, setThemeKey] = useState("modern");
  const [instructions, setInstructions] = useState("");
  const [templateExpanded, setTemplateExpanded] = useState(false);

  // Step 3: Generation
  const [preprocessing, setPreprocessing] = useState(false);
  const [preprocessedData, setPreprocessedData] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<{
    deckId: number;
    sectionCount: number;
  } | null>(null);
  const [error, setError] = useState("");

  const canProceedStep0 =
    (sourceType === "papers" && paperIds.length > 0) ||
    (sourceType === "document" && documentId != null) ||
    (sourceType === "text" && rawText.trim().length > 50) ||
    (sourceType === "deep_research" && deepResearchSessionId != null) ||
    (sourceType === "import_deck" && importedDeck != null);

  const canProceedStep2 = title.trim().length > 0;

  const selectedTemplate = templateId ? POSTER_TEMPLATES[templateId] : null;

  async function handlePreprocess() {
    setPreprocessing(true);
    setError("");
    try {
      const effectiveSourceType = sourceType === "import_deck" ? "text" : sourceType;
      const res = await fetch("/api/presentations/preprocess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceType: effectiveSourceType,
          paperIds: effectiveSourceType === "papers" ? paperIds : undefined,
          documentId: effectiveSourceType === "document" ? documentId : undefined,
          rawText: effectiveSourceType === "text" ? (importedDeck?.sourceText ?? rawText) : undefined,
          deepResearchSessionId: effectiveSourceType === "deep_research" ? deepResearchSessionId : undefined,
        }),
      });

      if (!res.ok) throw new Error("Preprocessing failed");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      let fullText = "";
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
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
      const res = await fetch("/api/posters/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preprocessedData,
          title,
          posterSize,
          gridLayout,
          themeKey,
          templateId: templateId || undefined,
          additionalInstructions: instructions || undefined,
        }),
      });

      if (!res.ok) throw new Error("Poster generation failed");

      const result = await res.json();
      setGenerationResult(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setGenerating(false);
    }
  }

  async function handleStartGeneration() {
    setStep(3);
    await handlePreprocess();
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/poster"
          className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-xl font-bold text-ink">New Conference Poster</h1>
      </div>

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

      {/* Step 0: Source Selection */}
      {step === 0 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-ink mb-1">
              Select Source Material
            </h2>
            <p className="text-sm text-ink-muted">
              Choose where to generate your poster from
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
            importedDeck={importedDeck}
            onImportedDeckChange={(deck) => {
              setImportedDeck(deck);
              if (deck && !title.trim()) {
                setTitle(deck.title);
              }
            }}
          />

          {/* Deep Research source option */}
          <div>
            <button
              onClick={() => setSourceType("deep_research")}
              className={cn(
                "w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all",
                sourceType === "deep_research"
                  ? "border-brand bg-brand/5"
                  : "border-border bg-surface-raised hover:border-brand/40"
              )}
            >
              <Sparkle
                size={20}
                className={cn(
                  sourceType === "deep_research" ? "text-brand" : "text-ink-muted"
                )}
              />
              <div>
                <p
                  className={cn(
                    "text-sm font-medium",
                    sourceType === "deep_research" ? "text-brand" : "text-ink"
                  )}
                >
                  From Deep Research
                </p>
                <p className="text-xs text-ink-muted mt-0.5">
                  Import findings from a Deep Research session
                </p>
              </div>
            </button>

            {sourceType === "deep_research" && (
              <div className="mt-3">
                <input aria-label="Number input"
                  type="number"
                  value={deepResearchSessionId ?? ""}
                  onChange={(e) =>
                    setDeepResearchSessionId(
                      e.target.value ? parseInt(e.target.value, 10) : null
                    )
                  }
                  placeholder="Deep Research session ID"
                  className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(1)}
              disabled={!canProceedStep0}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors",
                canProceedStep0
                  ? "bg-brand text-white hover:bg-brand/90"
                  : "bg-surface-raised text-ink-muted cursor-not-allowed"
              )}
            >
              Next <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Size & Template */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-ink mb-1">
              Poster Size & Template
            </h2>
            <p className="text-sm text-ink-muted">
              Choose dimensions and a poster template
            </p>
          </div>

          {/* Poster Size */}
          <div>
            <label className="text-sm font-medium text-ink block mb-2">Poster Size</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.entries(POSTER_SIZES) as [PosterSize, typeof POSTER_SIZES[PosterSize]][]).map(
                ([key, config]) => (
                  <button
                    key={key}
                    onClick={() => setPosterSize(key)}
                    className={cn(
                      "p-3 rounded-xl border text-left transition-colors",
                      posterSize === key
                        ? "border-brand bg-brand/5"
                        : "border-border hover:border-brand/40"
                    )}
                  >
                    <p className="text-xs font-medium text-ink">{config.label}</p>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Grid Layout */}
          <div>
            <label className="text-sm font-medium text-ink block mb-2">Grid Layout</label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.entries(POSTER_GRID_LAYOUTS) as [PosterGridLayout, typeof POSTER_GRID_LAYOUTS[PosterGridLayout]][]).map(
                ([key, config]) => (
                  <button
                    key={key}
                    onClick={() => setGridLayout(key)}
                    className={cn(
                      "p-3 rounded-xl border text-left transition-colors",
                      gridLayout === key
                        ? "border-brand bg-brand/5"
                        : "border-border hover:border-brand/40"
                    )}
                  >
                    <p className="text-xs font-medium text-ink">{config.label}</p>
                    <p className="text-[10px] text-ink-muted mt-0.5">{config.description}</p>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Poster Template */}
          <div>
            <label className="text-sm font-medium text-ink block mb-2">
              Poster Template{" "}
              <span className="text-ink-muted font-normal">(optional)</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(POSTER_TEMPLATES).map(([key, tpl]) => (
                <button
                  key={key}
                  onClick={() => setTemplateId(templateId === key ? null : key)}
                  className={cn(
                    "p-3 rounded-xl border text-left transition-colors",
                    templateId === key
                      ? "border-brand bg-brand/5"
                      : "border-border hover:border-brand/40"
                  )}
                >
                  <p className="text-xs font-medium text-ink">{tpl.name}</p>
                  <p className="text-[10px] text-ink-muted mt-0.5 line-clamp-2">
                    {tpl.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(0)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-ink-muted hover:text-ink transition-colors"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-brand text-white hover:bg-brand/90 transition-colors"
            >
              Next <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Theme & Options */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-ink mb-1">
              Configure Poster
            </h2>
            <p className="text-sm text-ink-muted">
              Set title, theme, and generation preferences
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-ink block mb-2">Poster Title</label>
            <input aria-label="Input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Impact of Novel Therapy on Patient Outcomes"
              className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
              autoFocus
            />
          </div>

          <div>
            <label className="text-sm font-medium text-ink block mb-2">Theme</label>
            <div className="grid grid-cols-7 gap-2">
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
                    className="aspect-square flex items-center justify-center"
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

          {/* Template Structure Preview */}
          {selectedTemplate && (
            <div>
              <button
                onClick={() => setTemplateExpanded(!templateExpanded)}
                className="flex items-center gap-2 text-sm font-medium text-ink hover:text-brand transition-colors"
              >
                {templateExpanded ? <CaretUp size={14} /> : <CaretDown size={14} />}
                Template Structure ({selectedTemplate.name})
              </button>
              {templateExpanded && (
                <div className="mt-3 space-y-1.5 max-h-64 overflow-y-auto">
                  {selectedTemplate.sections.map((section, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 px-3 py-2 rounded-lg bg-surface-raised text-xs"
                    >
                      <span className="text-ink-muted font-mono w-5 shrink-0 text-right">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <span className="font-medium text-ink">{section.title}</span>
                        {section.colSpan && (
                          <span className="ml-1.5 text-ink-muted">(spans {section.colSpan} cols)</span>
                        )}
                        <p className="text-ink-muted mt-0.5 line-clamp-1">{section.guidance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-ink block mb-2">
              Additional Instructions{" "}
              <span className="text-ink-muted font-normal">(optional)</span>
            </label>
            <textarea aria-label="Text area"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g., Emphasize results section, include forest plot..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30 resize-none"
            />
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
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
              <Sparkle size={14} /> Generate Poster
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Generation */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-ink mb-1">
              Generating Poster
            </h2>
            <p className="text-sm text-ink-muted">
              AI is creating your conference poster
            </p>
          </div>

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
              label="Generating poster sections"
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
                Generated poster with {generationResult.sectionCount} sections
                {selectedTemplate ? ` using the ${selectedTemplate.name} template` : ""}!
              </div>

              <button
                onClick={() =>
                  router.push(`/poster/${generationResult.deckId}`)
                }
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors"
              >
                Open Poster Editor <ArrowRight size={14} />
              </button>
            </div>
          )}

          {error && (
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setStep(2);
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
    const t = setTimeout(onTrigger, 500);
    return () => clearTimeout(t);
  });
  return null;
}
