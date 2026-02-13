"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkle, TextT } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { createDeck, createSlide } from "@/lib/actions/presentations";
import { PRESET_THEMES } from "@/types/presentation";
import type { AudienceType } from "@/types/presentation";
import { GenerationWizard } from "@/components/presentation/generation-wizard";

const AUDIENCE_OPTIONS: { key: AudienceType; label: string; description: string }[] = [
  { key: "general", label: "General", description: "Standard academic presentation" },
  { key: "thesis_defense", label: "Thesis Defense", description: "Formal thesis or dissertation defense" },
  { key: "conference", label: "Conference", description: "Conference talk or poster session" },
  { key: "journal_club", label: "Journal Club", description: "Informal paper discussion" },
  { key: "classroom", label: "Classroom", description: "Teaching or lecture" },
];

export default function NewPresentationPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto py-8 text-center text-sm text-ink-muted">Loading...</div>}>
      <NewPresentationContent />
    </Suspense>
  );
}

function NewPresentationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAiMode = searchParams.get("mode") === "ai";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [themeKey, setThemeKey] = useState("modern");
  const [audience, setAudience] = useState<AudienceType>("general");
  const [creating, setCreating] = useState(false);

  async function handleCreate() {
    if (!title.trim()) return;
    setCreating(true);
    try {
      const deck = await createDeck({
        title: title.trim(),
        description: description.trim() || undefined,
        audienceType: audience,
        themeConfig: PRESET_THEMES[themeKey],
        sourceType: "custom",
      });

      await createSlide({
        deckId: deck.id,
        sortOrder: 0,
        layout: "title_slide",
        title: title.trim(),
        subtitle: description.trim() || "Click to edit",
        contentBlocks: [],
      });

      router.push(`/presentation/${deck.id}`);
    } catch (err) {
      console.error("Failed to create deck:", err);
      setCreating(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/presentation"
          className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-xl font-bold text-ink">
          {isAiMode ? "AI Presentation Generator" : "New Presentation"}
        </h1>
      </div>

      {isAiMode ? (
        <GenerationWizard />
      ) : (
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-ink block mb-2">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., CRISPR Gene Therapy in Sickle Cell Disease"
              className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30 placeholder:text-ink-muted/50"
              autoFocus
            />
          </div>

          <div>
            <label className="text-sm font-medium text-ink block mb-2">
              Description <span className="text-ink-muted font-normal">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of your presentation"
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30 placeholder:text-ink-muted/50 resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-ink block mb-2">Audience Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AUDIENCE_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setAudience(opt.key)}
                  className={cn(
                    "p-3 rounded-xl border text-left transition-colors",
                    audience === opt.key
                      ? "border-brand bg-brand/5"
                      : "border-border hover:border-brand/40"
                  )}
                >
                  <p className="text-xs font-medium text-ink">{opt.label}</p>
                  <p className="text-[10px] text-ink-muted mt-0.5">{opt.description}</p>
                </button>
              ))}
            </div>
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
                    className="aspect-video flex items-center justify-center relative"
                    style={{ backgroundColor: config.backgroundColor }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: config.primaryColor }} />
                    <span className="text-[9px] font-bold" style={{ color: config.primaryColor }}>
                      {config.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleCreate}
              disabled={!title.trim() || creating}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-colors",
                title.trim() && !creating
                  ? "bg-brand text-white hover:bg-brand/90"
                  : "bg-surface-raised text-ink-muted cursor-not-allowed"
              )}
            >
              <TextT size={16} />
              {creating ? "Creating..." : "Create Blank Deck"}
            </button>
            <Link
              href="/presentation/new?mode=ai"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-brand text-brand hover:bg-brand/5 transition-colors"
            >
              <Sparkle size={16} />
              Generate with AI
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
