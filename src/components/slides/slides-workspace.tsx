"use client";

import { useEffect, useState, useMemo, lazy, Suspense } from "react";
import Link from "next/link";
import { useSlidesStore } from "@/stores/slides-store";
import { SlidesModeLayout } from "./slides-mode/slides-mode-layout";
import { ChatModeLayout } from "./chat-mode/chat-mode-layout";
import { ModeSelectionScreen } from "./mode-selector";
import { ThemeProvider } from "./shared/theme-engine";

const PresenterMode = lazy(() =>
  import("@/components/presentation/presenter-mode").then((m) => ({
    default: m.PresenterMode,
  }))
);

interface SlidesWorkspaceProps {
  deckId: number;
}

export function SlidesWorkspace({ deckId }: SlidesWorkspaceProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modeChosen, setModeChosen] = useState(false);

  const loadDeck = useSlidesStore((s) => s.loadDeck);
  const mode = useSlidesStore((s) => s.mode);
  const setMode = useSlidesStore((s) => s.setMode);
  const isPresenting = useSlidesStore((s) => s.isPresenting);
  const setIsPresenting = useSlidesStore((s) => s.setIsPresenting);
  const slides = useSlidesStore((s) => s.slides);
  const activeSlideId = useSlidesStore((s) => s.activeSlideId);
  const themeKey = useSlidesStore((s) => s.themeKey);
  const themeConfig = useSlidesStore((s) => s.themeConfig);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      const ok = await loadDeck(deckId);
      if (cancelled) return;
      if (!ok) {
        setError("Deck not found or access denied.");
      }
      setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [deckId, loadDeck]);

  // Derive modeChosen from loading/slides state instead of using an effect
  const shouldSkipModeSelection = useMemo(
    () => !loading && slides.length > 0,
    [loading, slides.length]
  );
  const effectiveModeChosen = modeChosen || shouldSkipModeSelection;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-ink-muted">Loading presentation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-sm text-red-500 mb-2">{error}</p>
          <Link
            href="/slides"
            className="text-xs text-brand hover:underline"
          >
            Back to presentations
          </Link>
        </div>
      </div>
    );
  }

  // Mode selection screen for new/empty decks
  if (!effectiveModeChosen && slides.length === 0) {
    return (
      <ModeSelectionScreen
        onSelect={(selectedMode) => {
          setMode(selectedMode);
          setModeChosen(true);
        }}
      />
    );
  }

  return (
    <ThemeProvider theme={themeConfig}>
      <div className="h-screen flex flex-col bg-surface">
        {/* Main workspace — Slides or Create mode */}
        {mode === "slides" ? <SlidesModeLayout /> : <ChatModeLayout />}

        {/* Presenter mode overlay */}
        {isPresenting && (
          <Suspense
            fallback={
              <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
                <div className="text-white text-sm">Loading presenter mode...</div>
              </div>
            }
          >
            <PresenterMode
              slides={slides.map((s) => ({
                id: s.id,
                title: s.title,
                subtitle: s.subtitle,
                layout: s.layout,
                contentBlocks: s.contentBlocks,
                speakerNotes: s.speakerNotes,
              }))}
              startIndex={
                slides.findIndex((s) => s.id === activeSlideId) >= 0
                  ? slides.findIndex((s) => s.id === activeSlideId)
                  : 0
              }
              onExit={() => setIsPresenting(false)}
              themeKey={themeKey}
              themeConfig={themeConfig}
            />
          </Suspense>
        )}
      </div>
    </ThemeProvider>
  );
}
