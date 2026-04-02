"use client";

import type { LibraryHomeData } from "@/lib/library/home";
import type { LibrarySource, WorkflowState } from "@/lib/library";
import { LibrarySourceCard } from "./LibrarySourceCard";

interface HomeSectionProps {
  title: string;
  sources: LibrarySource[];
  onMoveState?: (libraryId: string, newState: WorkflowState) => void;
  emptyMessage?: string;
}

function HomeSection({ title, sources, onMoveState, emptyMessage }: HomeSectionProps) {
  if (sources.length === 0 && !emptyMessage) return null;

  return (
    <section className="mb-8">
      <h2 className="text-sm font-medium text-ink-muted uppercase tracking-widest mb-3">
        {title}
      </h2>
      {sources.length === 0 ? (
        <p className="text-sm text-ink-muted">{emptyMessage}</p>
      ) : (
        <div className="space-y-2">
          {sources.map((source) => (
            <LibrarySourceCard
              key={source.libraryId}
              source={source}
              onMoveState={onMoveState}
            />
          ))}
        </div>
      )}
    </section>
  );
}

interface HomeScreenProps {
  data: LibraryHomeData;
  onMoveState: (libraryId: string, newState: WorkflowState) => void;
}

export function HomeScreen({ data, onMoveState }: HomeScreenProps) {
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold text-ink mb-6">Library</h1>

      {/* Primary sections */}
      <HomeSection
        title="Continue Reading"
        sources={data.continueReading}
        onMoveState={onMoveState}
      />

      <HomeSection
        title="For Your Active Project"
        sources={data.activeProject}
        onMoveState={onMoveState}
      />

      <HomeSection
        title="Needs Review"
        sources={data.needsReview}
        onMoveState={onMoveState}
      />

      <HomeSection
        title="Recently Saved"
        sources={data.recentlySaved}
        onMoveState={onMoveState}
      />

      {/* Secondary sections (behavior-gated: only shown when data exists) */}
      <HomeSection
        title="Ready to Cite"
        sources={data.readyToCite}
        onMoveState={onMoveState}
      />

      <HomeSection
        title="Recently Highlighted"
        sources={data.recentlyHighlighted}
        onMoveState={onMoveState}
      />

      <HomeSection
        title="Sent to Notebook"
        sources={data.sentToNotebook}
        onMoveState={onMoveState}
      />
    </div>
  );
}
