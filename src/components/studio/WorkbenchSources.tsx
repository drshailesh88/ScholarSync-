"use client";

import { useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useResearchStore } from "@/stores/research-store";
import { useReferenceStore } from "@/stores/reference-store";
import { usePaperDetail } from "@/hooks/usePaperDetail";
import { useEvidenceTable } from "@/hooks/useEvidenceTable";
import { getUserPapers } from "@/lib/actions/papers";
import { normalizeTitle } from "@/lib/search/dedup";
import { ReferenceSidebar } from "@/components/citations/reference-sidebar";
import { SearchTab } from "@/components/research/SearchTab";
import { LibraryTab } from "@/components/research/LibraryTab";
import type { PaperResult } from "@/lib/research/types";
import {
  useWorkbenchStore,
  type WorkbenchSourcesTab,
} from "@/stores/workbench-store";

type UserPaper = Awaited<ReturnType<typeof getUserPapers>>[number];

function getPaperSource(source: unknown): "pubmed" | "semantic_scholar" {
  return source === "semantic_scholar" ? "semantic_scholar" : "pubmed";
}

function dbPaperToPaperResult(dbPaper: UserPaper): PaperResult {
  return {
    id: dbPaper.doi
      ? `doi_${dbPaper.doi.replace(/[^a-zA-Z0-9]/g, "_")}`
      : dbPaper.pubmed_id
        ? `pm_${dbPaper.pubmed_id}`
        : `db_${dbPaper.id}`,
    title: dbPaper.title,
    authors: Array.isArray(dbPaper.authors)
      ? dbPaper.authors.map((author: unknown) =>
          typeof author === "string"
            ? author
            : `${(author as { given?: string }).given || ""} ${(author as { family?: string }).family || ""}`.trim()
        )
      : [],
    journal: dbPaper.journal || "",
    year: dbPaper.year || 0,
    doi: dbPaper.doi || undefined,
    pmid: dbPaper.pubmed_id || undefined,
    abstract: dbPaper.abstract || undefined,
    studyType: dbPaper.study_type || undefined,
    citationCount: dbPaper.citation_count || 0,
    influentialCitationCount: dbPaper.influential_citation_count || undefined,
    referenceCount: dbPaper.reference_count || undefined,
    s2Id: dbPaper.semantic_scholar_id || undefined,
    source: getPaperSource(dbPaper.source),
    publicationTypes: Array.isArray(dbPaper.publication_types) ? dbPaper.publication_types : [],
    fieldsOfStudy: Array.isArray(dbPaper.fields_of_study) ? dbPaper.fields_of_study : [],
    openAccessPdfUrl: dbPaper.open_access_url || dbPaper.pdf_url || undefined,
    isOpenAccess: Boolean(dbPaper.open_access_url || dbPaper.pdf_url),
    sources: [getPaperSource(dbPaper.source)],
    inLibrary: true,
    verificationStatus: "pending",
  };
}

function papersMatch(
  a: Pick<PaperResult, "doi" | "pmid" | "title">,
  b: Pick<PaperResult, "doi" | "pmid" | "title">
): boolean {
  if (a.doi && b.doi && a.doi.toLowerCase() === b.doi.toLowerCase()) return true;
  if (a.pmid && b.pmid && a.pmid === b.pmid) return true;
  return normalizeTitle(a.title) === normalizeTitle(b.title);
}

interface WorkbenchSourcesProps {
  onOpenCitationDialog: () => void;
  onInsertCitation: (referenceIds: string[]) => void;
}

export function WorkbenchSources({
  onOpenCitationDialog,
  onInsertCitation: _onInsertCitation,
}: WorkbenchSourcesProps) {
  const subTab = useWorkbenchStore((s) => s.activeSourcesTab);
  const setSubTab = useWorkbenchStore((s) => s.setActiveSourcesTab);
  const store = useResearchStore();
  const detail = usePaperDetail();
  const evidence = useEvidenceTable();
  const references = useReferenceStore((s) => s.references);
  const referenceNumberMap = useReferenceStore((s) => s.referenceNumberMap);

  // Hydrate library papers from DB
  useEffect(() => {
    let cancelled = false;
    getUserPapers()
      .then((papers) => {
        if (cancelled) return;
        const hydratedPapers = papers.map(dbPaperToPaperResult);
        useResearchStore.setState((state) => {
          let libraryChanged = false;
          const mergedLibrary = [...state.libraryPapers];
          for (const hydratedPaper of hydratedPapers) {
            if (!mergedLibrary.some((paper) => papersMatch(paper, hydratedPaper))) {
              mergedLibrary.push(hydratedPaper);
              libraryChanged = true;
            }
          }

          let resultsChanged = false;
          const updatedResults = state.results.map((result) => {
            if (!mergedLibrary.some((paper) => papersMatch(paper, result))) {
              return result;
            }
            if (result.inLibrary) return result;
            resultsChanged = true;
            return { ...result, inLibrary: true };
          });

          if (!libraryChanged && !resultsChanged) return state;
          return {
            libraryPapers: mergedLibrary,
            results: updatedResults,
          };
        });
      })
      .catch((error) => console.error("Failed to hydrate library:", error));
    return () => { cancelled = true; };
  }, []);

  const handleInsertCitation = useCallback((paper: PaperResult) => {
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

  // Cited references list
  const citedRefs = Array.from(referenceNumberMap.entries())
    .sort(([, a], [, b]) => a - b)
    .map(([refId, num]) => {
      const ref = references.get(refId);
      return ref ? { id: refId, num, ref } : null;
    })
    .filter(Boolean) as { id: string; num: number; ref: NonNullable<ReturnType<typeof references.get>> }[];

  const subTabs: { key: WorkbenchSourcesTab; label: string; count?: number }[] = [
    { key: "search", label: "Search" },
    { key: "library", label: "Library", count: store.libraryPapers.length },
    { key: "cited", label: "Cited", count: citedRefs.length },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Sub-tab switcher */}
      <div className="flex gap-1 px-3 py-1.5 shrink-0" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        {subTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSubTab(tab.key)}
            className="px-2.5 py-1 rounded-md text-[12px] font-medium transition-colors"
            style={{
              background: subTab === tab.key ? "rgba(109,40,217,0.06)" : "transparent",
              color: subTab === tab.key ? "#6D28D9" : "#A8A29E",
            }}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span className="ml-1 text-[10px]" style={{ opacity: 0.6 }}>({tab.count})</span>
            )}
          </button>
        ))}
      </div>

      {/* Sub-tab content */}
      <div className="flex-1 overflow-hidden">
        {subTab === "search" && <SearchTab />}
        {subTab === "library" && (
          <LibraryTab
            papers={store.libraryPapers}
            selectedPaperIds={evidence.selectedPaperIds}
            onTogglePaperSelection={evidence.togglePaperSelection}
            onViewDetail={(id) => {
              setSubTab("search");
              detail.openPaperDetail(id);
            }}
            onInsertCitation={handleInsertCitation}
            onRemoveFromLibrary={store.removeFromLibrary}
            onBuildEvidenceTable={() => setSubTab("search")}
          />
        )}
        {subTab === "cited" && (
          <div className="h-full [&>div]:h-full [&>div]:w-full [&>div]:border-l-0">
            <ReferenceSidebar
              open
              onClose={() => setSubTab("search")}
              onOpenCitationDialog={onOpenCitationDialog}
            />
          </div>
        )}
      </div>
    </div>
  );
}
