"use client";

import { useState } from "react";
import {
  NotePencil,
  Info,
  HighlighterCircle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { LibrarySource } from "@/lib/library/types";
import type { ReaderMode } from "./reader-view";

type PanelTab = "notes" | "metadata" | "highlights";

interface WorkbenchPanelProps {
  source: LibrarySource;
  mode: ReaderMode;
  onModeChange: (mode: ReaderMode) => void;
}

export function WorkbenchPanel({ source }: WorkbenchPanelProps) {
  const [activeTab, setActiveTab] = useState<PanelTab>("notes");

  const tabs: { key: PanelTab; label: string; icon: React.ReactNode }[] = [
    { key: "notes", label: "Notes", icon: <NotePencil size={15} /> },
    { key: "metadata", label: "Metadata", icon: <Info size={15} /> },
    { key: "highlights", label: "Highlights", icon: <HighlighterCircle size={15} /> },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="flex border-b border-[var(--border)] shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-3 text-xs font-medium transition-colors border-b-2 -mb-px flex-1 justify-center",
              activeTab === tab.key
                ? "border-[var(--brand)] text-[var(--brand)]"
                : "border-transparent text-[var(--ink-muted)] hover:text-[var(--ink)]"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "notes" && <NotesTab source={source} />}
        {activeTab === "metadata" && <MetadataTab source={source} />}
        {activeTab === "highlights" && <HighlightsTab />}
      </div>
    </div>
  );
}

function NotesTab({ source }: { source: LibrarySource }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-[var(--ink-muted)] uppercase tracking-wider">
        Notes
      </p>
      {source.notes ? (
        <p className="text-sm text-[var(--ink)] leading-relaxed whitespace-pre-wrap">
          {source.notes}
        </p>
      ) : (
        <p className="text-sm text-[var(--ink-muted)] italic">
          No notes yet. Notes editing will be available in a future update.
        </p>
      )}
    </div>
  );
}

function MetadataTab({ source }: { source: LibrarySource }) {
  const fields: { label: string; value: string | null | undefined }[] = [
    { label: "Type", value: source.sourceType === "paper" ? "Paper" : "Web Source" },
    { label: "Title", value: source.title },
    { label: "Authors", value: source.authors.join(", ") || null },
    { label: "Year", value: source.year?.toString() },
    { label: "Journal", value: source.journal },
    { label: "DOI", value: source.doi },
    { label: "Domain", value: source.domain },
    { label: "Study Type", value: source.studyType },
    { label: "PubMed ID", value: source.pubmedId },
    { label: "Source Category", value: source.sourceCategory },
    { label: "Trust Tier", value: source.trustTier },
    { label: "Workflow State", value: source.workflowState },
    { label: "Read Status", value: source.readStatus },
    { label: "Reading Progress", value: `${source.readingProgress}%` },
    { label: "Added", value: new Date(source.addedAt).toLocaleDateString() },
    { label: "Collection", value: source.collection },
    { label: "Tags", value: source.tags.length > 0 ? source.tags.join(", ") : null },
  ];

  return (
    <div className="space-y-2">
      {fields
        .filter((f) => f.value != null && f.value !== "" && f.value !== "0%")
        .map((field) => (
          <div key={field.label} className="flex justify-between gap-3 py-1.5 border-b border-[var(--border-subtle)]">
            <span className="text-xs text-[var(--ink-muted)] shrink-0">{field.label}</span>
            <span className="text-xs text-[var(--ink)] text-right break-all">{field.value}</span>
          </div>
        ))}
    </div>
  );
}

function HighlightsTab() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-[var(--ink-muted)] uppercase tracking-wider">
        Highlights
      </p>
      <p className="text-sm text-[var(--ink-muted)] italic">
        No highlights yet. Highlighting will be available in Phase 14.
      </p>
    </div>
  );
}
