"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import {
  Article,
  CircleNotch,
  PencilSimple,
  Download,
  Clipboard,
  CheckCircle,
  ArrowsClockwise,
  Lightning,
  FileText,
  FileCode,
  Export,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ManuscriptSection =
  | "introduction"
  | "methods"
  | "results"
  | "discussion"
  | "abstract";

type CitationStyle = "apa" | "vancouver" | "harvard" | "chicago";
type ExportFormat = "docx" | "latex" | "plaintext";

interface SectionData {
  section: ManuscriptSection;
  content: string;
  citations: { key: string; paperId: number; formatted: string }[];
}

interface ManuscriptPanelProps {
  projectId: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTIONS: { key: ManuscriptSection; label: string; description: string }[] = [
  {
    key: "introduction",
    label: "Introduction",
    description: "Background, rationale, objectives, and PICO framework for the review",
  },
  {
    key: "methods",
    label: "Methods",
    description: "Protocol, search strategy, eligibility, screening, data extraction, RoB 2, synthesis",
  },
  {
    key: "results",
    label: "Results",
    description: "PRISMA flow, study characteristics, risk of bias, meta-analysis findings",
  },
  {
    key: "discussion",
    label: "Discussion",
    description: "Summary of findings, comparison with literature, strengths, limitations, implications",
  },
  {
    key: "abstract",
    label: "Abstract",
    description: "Structured abstract summarising objectives, methods, results, and conclusions",
  },
];

const CITATION_STYLES: { value: CitationStyle; label: string }[] = [
  { value: "apa", label: "APA 7th" },
  { value: "vancouver", label: "Vancouver" },
  { value: "harvard", label: "Harvard" },
  { value: "chicago", label: "Chicago" },
];

const EXPORT_FORMATS: { value: ExportFormat; label: string; icon: typeof Download }[] = [
  { value: "docx", label: "DOCX", icon: FileText },
  { value: "latex", label: "LaTeX", icon: FileCode },
  { value: "plaintext", label: "Plain Text", icon: Export },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function countWords(text: string): number {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ManuscriptPanel({ projectId }: ManuscriptPanelProps) {
  const [sections, setSections] = useState<Record<ManuscriptSection, SectionData | null>>({
    introduction: null,
    methods: null,
    results: null,
    discussion: null,
    abstract: null,
  });
  const [activeTab, setActiveTab] = useState<ManuscriptSection>("introduction");
  const [customInstructions, setCustomInstructions] = useState<Record<ManuscriptSection, string>>({
    introduction: "",
    methods: "",
    results: "",
    discussion: "",
    abstract: "",
  });
  const [generatingSection, setGeneratingSection] = useState<ManuscriptSection | null>(null);
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [editingSection, setEditingSection] = useState<ManuscriptSection | null>(null);
  const [editContent, setEditContent] = useState("");
  const [citationStyle, setCitationStyle] = useState<CitationStyle>("apa");
  const [error, setError] = useState<string | null>(null);
  const [copiedSection, setCopiedSection] = useState<ManuscriptSection | null>(null);
  const [exportingFormat, setExportingFormat] = useState<ExportFormat | null>(null);

  const generatedCount = Object.values(sections).filter(Boolean).length;

  // Word counts per section
  const wordCounts = useMemo(() => {
    const counts: Record<ManuscriptSection, number> = {
      introduction: 0,
      methods: 0,
      results: 0,
      discussion: 0,
      abstract: 0,
    };
    for (const key of Object.keys(counts) as ManuscriptSection[]) {
      const data = sections[key];
      if (data) counts[key] = countWords(data.content);
    }
    return counts;
  }, [sections]);

  const totalWords = useMemo(
    () => Object.values(wordCounts).reduce((a: number, b: number) => a + b, 0),
    [wordCounts]
  );

  // Generate a single section
  const generateSection = useCallback(
    async (section: ManuscriptSection) => {
      setGeneratingSection(section);
      setError(null);

      try {
        const res = await fetch("/api/systematic-review/manuscript", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId,
            section,
            citationStyle,
            customInstructions: customInstructions[section] || undefined,
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Generation failed");
        }

        const data = await res.json();
        setSections((prev: Record<ManuscriptSection, SectionData | null>) => ({
          ...prev,
          [section]: data.result,
        }));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to generate section"
        );
      } finally {
        setGeneratingSection(null);
      }
    },
    [projectId, citationStyle, customInstructions]
  );

  // Generate all sections sequentially
  const generateAll = useCallback(async () => {
    setIsGeneratingAll(true);
    setError(null);

    const order: ManuscriptSection[] = ["introduction", "methods", "results", "discussion", "abstract"];

    for (const section of order) {
      setActiveTab(section);
      try {
        setGeneratingSection(section);
        const res = await fetch("/api/systematic-review/manuscript", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId,
            section,
            citationStyle,
            customInstructions: customInstructions[section] || undefined,
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || `Failed to generate ${section}`);
        }

        const data = await res.json();
        setSections((prev: Record<ManuscriptSection, SectionData | null>) => ({
          ...prev,
          [section]: data.result,
        }));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : `Failed to generate ${section}`
        );
        break;
      } finally {
        setGeneratingSection(null);
      }
    }

    setIsGeneratingAll(false);
  }, [projectId, citationStyle, customInstructions]);

  // Editing
  const startEdit = (section: ManuscriptSection) => {
    const data = sections[section];
    if (!data) return;
    setEditingSection(section);
    setEditContent(data.content);
  };

  const saveEdit = () => {
    if (!editingSection || !sections[editingSection]) return;
    setSections((prev: Record<ManuscriptSection, SectionData | null>) => ({
      ...prev,
      [editingSection]: {
        ...prev[editingSection]!,
        content: editContent,
      },
    }));
    setEditingSection(null);
    setEditContent("");
  };

  const cancelEdit = () => {
    setEditingSection(null);
    setEditContent("");
  };

  // Auto-save: debounce editContent changes
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!editingSection || !sections[editingSection]) return;
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      setSections((prev: Record<ManuscriptSection, SectionData | null>) => ({
        ...prev,
        [editingSection]: {
          ...prev[editingSection]!,
          content: editContent,
        },
      }));
    }, 1500);
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [editContent, editingSection]); // eslint-disable-line react-hooks/exhaustive-deps

  // Copy section
  const copySection = (section: ManuscriptSection) => {
    const data = sections[section];
    if (!data) return;
    navigator.clipboard.writeText(data.content);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Export handler
  const handleExport = async (format: ExportFormat) => {
    const generatedSections = Object.entries(sections).filter(
      ([, data]) => data !== null
    ) as [ManuscriptSection, SectionData][];
    if (generatedSections.length === 0) return;

    setExportingFormat(format);
    setError(null);

    try {
      const sectionsMap: Record<string, string> = {};
      for (const [key, data] of generatedSections) {
        sectionsMap[key] = data.content;
      }

      if (format === "plaintext") {
        // Client-side plain text export
        const sectionOrder: ManuscriptSection[] = ["introduction", "methods", "results", "discussion", "abstract"];
        const lines = ["SYSTEMATIC REVIEW MANUSCRIPT DRAFT", "", `Citation Style: ${citationStyle.toUpperCase()}`, ""];

        for (const key of sectionOrder) {
          const data = sections[key];
          if (!data) continue;
          const label = SECTIONS.find((s) => s.key === key)?.label ?? key;
          lines.push(`=== ${label.toUpperCase()} ===`, "", data.content, "");
        }

        lines.push(
          "---",
          "Note: [PLACEHOLDER] markers indicate areas requiring manual input.",
          "All content should be verified for accuracy before submission."
        );

        const blob = new Blob([lines.join("\n")], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "manuscript-draft.txt";
        a.click();
        URL.revokeObjectURL(url);
      } else if (format === "latex") {
        // Client-side LaTeX export
        const sectionOrder: ManuscriptSection[] = ["introduction", "methods", "results", "discussion", "abstract"];
        const lines = [
          "\\documentclass[12pt]{article}",
          "\\usepackage[utf8]{inputenc}",
          "\\usepackage{geometry}",
          "\\geometry{a4paper, margin=1in}",
          "\\usepackage{setspace}",
          "\\doublespacing",
          "",
          "\\title{Systematic Review Manuscript Draft}",
          "\\date{\\today}",
          "",
          "\\begin{document}",
          "\\maketitle",
          "",
        ];

        for (const key of sectionOrder) {
          const data = sections[key];
          if (!data) continue;
          const label = SECTIONS.find((s) => s.key === key)?.label ?? key;
          // Escape LaTeX special characters in content
          const escaped = data.content
            .replace(/\\/g, "\\textbackslash{}")
            .replace(/[&%$#_{}~^]/g, (m: string) => `\\${m}`);
          lines.push(`\\section{${label}}`, "", escaped, "");
        }

        lines.push("\\end{document}");

        const blob = new Blob([lines.join("\n")], { type: "application/x-latex" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "manuscript-draft.tex";
        a.click();
        URL.revokeObjectURL(url);
      } else {
        // DOCX via API
        const res = await fetch("/api/systematic-review/manuscript-export", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId,
            title: "Systematic Review Manuscript Draft",
            sections: sectionsMap,
            format: "docx",
            citationStyle,
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "DOCX export failed");
        }

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "manuscript-draft.docx";
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to export ${format}`);
    } finally {
      setExportingFormat(null);
    }
  };

  const currentData = sections[activeTab];
  const isEditing = editingSection === activeTab;
  const isLoading = generatingSection === activeTab;

  return (
    <div className="sr-content max-w-5xl space-y-6">
      {/* Header */}
      <div className="sr-panel p-6">
        <h2 className="sr-panel-title">
          <Article weight="duotone" className="text-brand" size={22} />
          Manuscript Draft Generator
        </h2>
        <p className="text-sm text-ink-muted mt-1">
          Generate IMRAD-structured manuscript sections from your review data.
          Each section is auto-populated using your PICO, screening results,
          meta-analysis, and risk of bias assessments.
        </p>

        {/* Controls row */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {/* Citation style selector */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-ink-muted font-medium">Citation Style</label>
            <select
              value={citationStyle}
              onChange={(e) => setCitationStyle(e.target.value as CitationStyle)}
              className="px-2.5 py-1.5 bg-surface-raised border border-border rounded-md text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
            >
              {CITATION_STYLES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div className="h-5 w-px bg-border" />

          {/* Generate all */}
          <button
            onClick={generateAll}
            disabled={isGeneratingAll || !!generatingSection}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand text-white rounded-md text-sm font-medium hover:bg-brand-hover disabled:opacity-50 transition-colors"
          >
            {isGeneratingAll ? (
              <>
                <CircleNotch weight="bold" className="animate-spin" size={16} />
                Generating...
              </>
            ) : (
              <>
                <Lightning weight="bold" size={16} />
                Generate All Sections
              </>
            )}
          </button>

          {/* Export buttons */}
          {generatedCount > 0 && (
            <>
              <div className="h-5 w-px bg-border" />
              {EXPORT_FORMATS.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => handleExport(value)}
                  disabled={exportingFormat !== null}
                  className="flex items-center gap-1.5 px-3 py-2 border border-border rounded-md text-sm text-ink-muted hover:text-ink disabled:opacity-50 transition-colors"
                >
                  {exportingFormat === value ? (
                    <CircleNotch weight="bold" className="animate-spin" size={14} />
                  ) : (
                    <Icon size={14} />
                  )}
                  {label}
                </button>
              ))}
            </>
          )}
        </div>

        {/* Word count summary */}
        {generatedCount > 0 && (
          <div className="mt-3 flex items-center gap-4 text-[11px] text-ink-muted">
            <span className="font-medium">
              Total: {totalWords.toLocaleString()} words
            </span>
            <span className="text-ink-faint">
              {generatedCount}/{SECTIONS.length} sections
            </span>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400 flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-300"
          >
            &#x2715;
          </button>
        </div>
      )}

      {/* Section tabs + content */}
      <div className="sr-panel overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-border">
          {SECTIONS.map(({ key, label }) => {
            const isActive = activeTab === key;
            const hasContent = !!sections[key];
            const wc = wordCounts[key];

            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={cn(
                  "relative flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "text-brand"
                    : "text-ink-muted hover:text-ink hover:bg-surface-raised/50"
                )}
              >
                {generatingSection === key ? (
                  <CircleNotch weight="bold" className="animate-spin" size={14} />
                ) : hasContent ? (
                  <CheckCircle weight="fill" className="text-emerald-500" size={14} />
                ) : null}
                {label}
                {hasContent && (
                  <span className="text-[10px] text-ink-faint font-normal">
                    {wc.toLocaleString()}w
                  </span>
                )}
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-t" />
                )}
              </button>
            );
          })}
        </div>

        {/* Section content area */}
        <div className="p-5">
          {/* Section header + actions */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-ink">
                {SECTIONS.find((s) => s.key === activeTab)?.label}
              </h3>
              <p className="text-[11px] text-ink-faint mt-0.5">
                {SECTIONS.find((s) => s.key === activeTab)?.description}
              </p>
            </div>
            <div className="flex gap-1.5">
              {currentData && (
                <>
                  <button
                    onClick={() => copySection(activeTab)}
                    className={cn(
                      "flex items-center gap-1 px-2.5 py-1.5 border border-border rounded-md text-xs transition-colors",
                      copiedSection === activeTab
                        ? "text-emerald-500 border-emerald-500/30"
                        : ""
                    )}
                    title="Copy to clipboard"
                  >
                    {copiedSection === activeTab ? (
                      <>
                        <CheckCircle size={12} weight="bold" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Clipboard size={12} />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={() =>
                      isEditing ? saveEdit() : startEdit(activeTab)
                    }
                    className="flex items-center gap-1 px-2.5 py-1.5 border border-border rounded-md text-xs text-ink-muted hover:text-ink transition-colors"
                    title={isEditing ? "Save edits" : "Edit section"}
                  >
                    <PencilSimple size={12} />
                    {isEditing ? "Save" : "Edit"}
                  </button>
                </>
              )}
              {/* Regenerate button */}
              <button
                onClick={() => generateSection(activeTab)}
                disabled={!!generatingSection || isGeneratingAll}
                className="flex items-center gap-1 px-3 py-1.5 bg-brand text-white rounded-md text-xs font-medium hover:bg-brand-hover disabled:opacity-50 transition-colors"
              >
                {isLoading ? (
                  <>
                    <CircleNotch weight="bold" className="animate-spin" size={12} />
                    Generating...
                  </>
                ) : currentData ? (
                  <>
                    <ArrowsClockwise size={12} weight="bold" />
                    Regenerate
                  </>
                ) : (
                  "Generate"
                )}
              </button>
            </div>
          </div>

          {/* Custom instructions per section */}
          <div className="mb-3">
            <label className="text-[11px] text-ink-muted font-medium block mb-1">
              Custom instructions for this section
            </label>
            <input
              type="text"
              value={customInstructions[activeTab]}
              onChange={(e) =>
                setCustomInstructions((prev) => ({
                  ...prev,
                  [activeTab]: e.target.value,
                }))
              }
              placeholder="e.g. Focus on RCTs only, include subgroup analyses..."
              className="w-full px-3 py-1.5 bg-surface-raised border border-border rounded-md text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>

          {/* Word count badge for active section */}
          {currentData && (
            <div className="mb-3 flex items-center gap-3 text-[11px]">
              <span className="px-2 py-0.5 rounded-full bg-surface-raised text-ink-muted">
                {wordCounts[activeTab].toLocaleString()} words
              </span>
              {currentData.citations.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-surface-raised text-ink-muted">
                  {currentData.citations.length} citations
                </span>
              )}
            </div>
          )}

          {/* Content */}
          <div className="border border-border rounded-lg overflow-hidden bg-surface min-h-[300px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64 text-ink-muted">
                <CircleNotch
                  weight="bold"
                  className="animate-spin mb-3"
                  size={24}
                />
                <p className="text-sm">
                  Generating {SECTIONS.find((s) => s.key === activeTab)?.label?.toLowerCase()}...
                </p>
                <p className="text-[11px] text-ink-faint mt-1">
                  This may take 15-30 seconds
                </p>
              </div>
            ) : isEditing && currentData ? (
              <div className="p-4 space-y-3">
                <textarea
                  aria-label="Edit section content"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-80 px-3 py-2 bg-surface-raised border border-border rounded text-sm text-ink leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-brand/30 font-mono"
                />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-ink-faint">
                    {countWords(editContent).toLocaleString()} words
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-1.5 text-xs text-ink-muted hover:text-ink transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveEdit}
                      className="px-3 py-1.5 bg-brand text-white rounded-md text-xs font-medium hover:bg-brand-hover transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            ) : currentData ? (
              <div className="p-4">
                <div className="sr-content">
                  {currentData.content}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-ink-muted">
                <Article size={32} className="mb-2 text-ink-faint" />
                <p className="text-sm">No content generated yet</p>
                <p className="text-[11px] text-ink-faint mt-1">
                  Click &quot;Generate&quot; to create this section using your
                  project data
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info footer */}
      <div className="text-xs text-ink-faint p-3 bg-surface-raised rounded-lg border border-border">
        <strong>About this draft:</strong> AI-generated content is based on
        your project&apos;s PICO, screening results, meta-analysis, and risk of
        bias data. All sections follow PRISMA 2020 reporting guidelines.
        [PLACEHOLDER] markers indicate areas requiring manual input. Review and
        edit all content before submission.
      </div>
    </div>
  );
}
