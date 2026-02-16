"use client";

import { SearchInput } from "./SearchInput";
import { ResearchPlan } from "./ResearchPlan";
import { AISummaryCard } from "./AISummaryCard";
import { ResultsTable } from "./ResultsTable";
import { PaperDetailPanel } from "./PaperDetailPanel";
import { EvidenceTableSetup, EvidenceTableView } from "./EvidenceTable";
import { SynthesisDialog } from "./SynthesisDialog";
import { usePaperSearch } from "@/hooks/usePaperSearch";
import { usePaperDetail } from "@/hooks/usePaperDetail";
import { useEvidenceTable } from "@/hooks/useEvidenceTable";
import { useResearchStore } from "@/stores/research-store";
import type { PaperResult, SynthesisReportType } from "@/lib/research/types";
import { useCallback, useState } from "react";

export function SearchTab() {
  const search = usePaperSearch();
  const detail = usePaperDetail();
  const evidence = useEvidenceTable();
  const store = useResearchStore();

  const [showEvidenceSetup, setShowEvidenceSetup] = useState(false);
  const [showSynthesis, setShowSynthesis] = useState(false);
  const [synthesisReport, setSynthesisReport] = useState<string | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const handleInsertCitation = useCallback((paper: PaperResult) => {
    // Dispatch event that the editor/citation system can listen for
    window.dispatchEvent(
      new CustomEvent("scholarsync:insert-citation", {
        detail: {
          title: paper.title,
          authors: paper.authors,
          year: paper.year,
          journal: paper.journal,
          doi: paper.doi,
          pmid: paper.pmid,
        },
      })
    );
  }, []);

  const handleAddToLibrary = useCallback((paper: PaperResult) => {
    store.addToLibrary(paper);
  }, []);

  const handleBuildEvidenceTable = useCallback(() => {
    if (evidence.selectedPaperIds.length >= 2) {
      setShowEvidenceSetup(true);
    }
  }, [evidence.selectedPaperIds.length]);

  const handleCreateFromPreset = useCallback(
    (presetKey: string) => {
      const table = evidence.createFromPreset(presetKey);
      if (table) {
        setShowEvidenceSetup(false);
        evidence.runBatchExtraction(table);
      }
    },
    [evidence]
  );

  const handleSynthesize = useCallback(
    async (reportType: SynthesisReportType, customInstructions?: string) => {
      setIsSynthesizing(true);
      setSynthesisReport(null);

      const { selectedPaperIds, results, libraryPapers } =
        useResearchStore.getState();
      const allPapers = [...results, ...libraryPapers];
      const papers = selectedPaperIds
        .map((id) => allPapers.find((p) => p.id === id))
        .filter(Boolean);

      try {
        const res = await fetch("/api/research/synthesize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            papers,
            reportType,
            customInstructions,
            mode: "generate",
          }),
        });

        if (!res.ok) throw new Error("Synthesis failed");

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No stream");

        const decoder = new TextDecoder();
        let content = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          content += decoder.decode(value, { stream: true });
          setSynthesisReport(content);
        }
      } catch (error) {
        console.error("Synthesis error:", error);
        setSynthesisReport("Failed to generate synthesis. Please try again.");
      } finally {
        setIsSynthesizing(false);
      }
    },
    []
  );

  // Paper detail view
  if (detail.selectedPaperDetail) {
    return (
      <PaperDetailPanel
        detail={detail.selectedPaperDetail}
        onBack={() => detail.closePaperDetail()}
        onInsertCitation={() =>
          handleInsertCitation(detail.selectedPaperDetail!.paper)
        }
        onAddToLibrary={() =>
          handleAddToLibrary(detail.selectedPaperDetail!.paper)
        }
      />
    );
  }

  // Evidence table setup view
  if (showEvidenceSetup) {
    return (
      <EvidenceTableSetup
        selectedPaperCount={evidence.selectedPaperIds.length}
        onCreateFromPreset={handleCreateFromPreset}
        onCreateCustom={() => {}}
        onBack={() => setShowEvidenceSetup(false)}
      />
    );
  }

  // Evidence table view
  if (evidence.activeEvidenceTable) {
    return (
      <EvidenceTableView
        table={evidence.activeEvidenceTable}
        isExtracting={evidence.isExtracting}
        extractionProgress={evidence.extractionProgress}
        onBack={() => evidence.setActiveEvidenceTable(null)}
        onExportCSV={() => evidence.exportTable("csv")}
        onExportBibTeX={() => evidence.exportTable("bibtex")}
        onSynthesize={() => setShowSynthesis(true)}
      />
    );
  }

  // Synthesis dialog
  if (showSynthesis) {
    return (
      <SynthesisDialog
        selectedPaperCount={evidence.selectedPaperIds.length}
        isSynthesizing={isSynthesizing}
        report={synthesisReport}
        onGenerate={handleSynthesize}
        onInsertIntoEditor={() => {
          // TODO: Insert synthesis into editor with citation nodes
          setShowSynthesis(false);
        }}
        onBack={() => {
          setShowSynthesis(false);
          setSynthesisReport(null);
        }}
      />
    );
  }

  // Main search view
  return (
    <div className="flex flex-col h-full">
      {/* Search input */}
      <div className="px-3 py-2 border-b border-border-subtle">
        <SearchInput
          query={search.query}
          onQueryChange={search.setQuery}
          filters={search.filters}
          onFiltersChange={search.setFilters}
          parsedChips={search.parsedChips}
          onRemoveChip={search.removeChip}
          onSearch={() => search.initiateSearch()}
          isSearching={search.isSearching}
        />
      </div>

      {/* Research plan */}
      {search.showPlan && (
        <div className="py-2">
          <ResearchPlan
            plan={search.searchPlan || { originalQuery: search.query, pubmedQuery: search.query, meshTerms: [], synonyms: {}, suggestedFilters: {}, estimatedResults: "Unknown", rationale: "" }}
            isLoading={search.isGeneratingPlan}
            onRunSearch={() => search.executeSearch()}
            onCancel={() => store.setShowPlan(false)}
            onUpdatePlan={(plan) => store.setSearchPlan(plan)}
          />
        </div>
      )}

      {/* AI Summary */}
      {store.aiSummary && (
        <AISummaryCard
          summary={store.aiSummary}
          isLoading={store.isGeneratingSummary}
          paperCount={Math.min(search.results.length, 5)}
        />
      )}

      {/* Evidence table action bar */}
      {evidence.selectedPaperIds.length >= 2 && (
        <div className="mx-3 mb-2 flex items-center justify-between p-2 rounded-lg bg-brand/5 border border-brand/10">
          <span className="text-[10px] text-brand font-medium">
            {evidence.selectedPaperIds.length} papers selected
          </span>
          <button
            onClick={handleBuildEvidenceTable}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-brand text-white text-[10px] font-medium hover:bg-brand-hover transition-colors"
          >
            Build Evidence Table
          </button>
        </div>
      )}

      {/* Results */}
      <ResultsTable
        results={search.results}
        totalResults={search.totalResults}
        isSearching={search.isSearching}
        selectedPaperIds={evidence.selectedPaperIds}
        onTogglePaperSelection={evidence.togglePaperSelection}
        onSelectAll={evidence.selectAllPapers}
        onClearSelection={evidence.clearPaperSelection}
        onViewDetail={(id) => detail.openPaperDetail(id)}
        onInsertCitation={handleInsertCitation}
        onAddToLibrary={handleAddToLibrary}
        onLoadMore={search.loadMore}
        hasMore={search.results.length < search.totalResults}
      />

      {/* Empty state */}
      {search.results.length === 0 && !search.isSearching && !search.showPlan && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <p className="text-xs text-ink-muted text-center">
            {store.hasSearchedBefore
              ? "No results found. Try different search terms or adjust filters."
              : "Search for academic papers across PubMed and Semantic Scholar."}
          </p>
        </div>
      )}
    </div>
  );
}
