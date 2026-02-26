"use client";

import { useState, useCallback } from "react";
import {
  Article,
  CircleNotch,
  PencilSimple,
  Download,
  Clipboard,
  CheckCircle,
  ArrowRight,
  Lightning,
  FileText,
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
    key: "abstract",
    label: "Abstract",
    description: "Structured abstract (Background, Objectives, Methods, Results, Conclusions)",
  },
  {
    key: "introduction",
    label: "Introduction",
    description: "Background, rationale, and review objectives using PICO framework",
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
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ManuscriptPanel({ projectId }: ManuscriptPanelProps) {
  const [sections, setSections] = useState<Record<ManuscriptSection, SectionData | null>>({
    abstract: null,
    introduction: null,
    methods: null,
    results: null,
    discussion: null,
  });
  const [activeSection, setActiveSection] = useState<ManuscriptSection>("introduction");
  const [generatingSection, setGeneratingSection] = useState<ManuscriptSection | null>(null);
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [editingSection, setEditingSection] = useState<ManuscriptSection | null>(null);
  const [editContent, setEditContent] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copiedSection, setCopiedSection] = useState<ManuscriptSection | null>(null);
  const [isExportingDocx, setIsExportingDocx] = useState(false);

  const generatedCount = Object.values(sections).filter(Boolean).length;

  // Build existing sections map for context when generating abstract
  const getExistingSectionsMap = useCallback((): Record<string, string> => {
    const map: Record<string, string> = {};
    for (const [key, data] of Object.entries(sections)) {
      if (data) map[key] = data.content;
    }
    return map;
  }, [sections]);

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
            customInstructions: customInstructions || undefined,
            existingSections:
              section === "abstract" ? getExistingSectionsMap() : undefined,
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Generation failed");
        }

        const data = await res.json();
        setSections((prev) => ({
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
    [projectId, customInstructions, getExistingSectionsMap]
  );

  // Generate all sections sequentially
  const generateAll = useCallback(async () => {
    setIsGeneratingAll(true);
    setError(null);

    const order: ManuscriptSection[] = [
      "introduction",
      "methods",
      "results",
      "discussion",
      "abstract",
    ];

    for (const section of order) {
      setActiveSection(section);
      try {
        setGeneratingSection(section);
        const res = await fetch("/api/systematic-review/manuscript", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId,
            section,
            customInstructions: customInstructions || undefined,
            existingSections:
              section === "abstract" ? getExistingSectionsMap() : undefined,
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(
            err.error || `Failed to generate ${section}`
          );
        }

        const data = await res.json();
        setSections((prev) => ({
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
  }, [projectId, customInstructions, getExistingSectionsMap]);

  // Start editing
  const startEdit = (section: ManuscriptSection) => {
    const data = sections[section];
    if (!data) return;
    setEditingSection(section);
    setEditContent(data.content);
  };

  // Save edit
  const saveEdit = () => {
    if (!editingSection || !sections[editingSection]) return;
    setSections((prev) => ({
      ...prev,
      [editingSection]: {
        ...prev[editingSection]!,
        content: editContent,
      },
    }));
    setEditingSection(null);
    setEditContent("");
  };

  // Copy section to clipboard
  const copySection = (section: ManuscriptSection) => {
    const data = sections[section];
    if (!data) return;
    navigator.clipboard.writeText(data.content);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Export as markdown file
  const exportMarkdown = async () => {
    const generatedSections = Object.values(sections).filter(
      Boolean
    ) as SectionData[];
    if (generatedSections.length === 0) return;

    // Build markdown client-side for immediate download
    const sectionOrder: ManuscriptSection[] = [
      "abstract",
      "introduction",
      "methods",
      "results",
      "discussion",
    ];
    const sectionTitles: Record<ManuscriptSection, string> = {
      abstract: "Abstract",
      introduction: "Introduction",
      methods: "Methods",
      results: "Results",
      discussion: "Discussion",
    };

    const sorted = generatedSections.sort(
      (a, b) =>
        sectionOrder.indexOf(a.section) - sectionOrder.indexOf(b.section)
    );

    const lines = [
      "# Systematic Review Manuscript Draft",
      "",
      `*Generated on ${new Date().toLocaleDateString()} — AI-assisted draft requiring human review and editing.*`,
      "",
      "---",
      "",
    ];

    for (const s of sorted) {
      lines.push(`## ${sectionTitles[s.section]}`);
      lines.push("");
      lines.push(s.content);
      lines.push("");
      lines.push("---");
      lines.push("");
    }

    lines.push(
      "*Note: [PLACEHOLDER] markers indicate areas requiring manual input. All content should be verified for accuracy before submission.*"
    );

    const markdown = lines.join("\n");
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "manuscript-draft.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export as DOCX via API
  const exportDocx = async () => {
    const generatedSections = Object.entries(sections).filter(
      ([, data]) => data !== null
    ) as [ManuscriptSection, SectionData][];
    if (generatedSections.length === 0) return;

    setIsExportingDocx(true);
    setError(null);

    try {
      const sectionsMap: Record<string, string> = {};
      for (const [key, data] of generatedSections) {
        sectionsMap[key] = data.content;
      }

      const res = await fetch("/api/systematic-review/manuscript-export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          title: "Systematic Review Manuscript Draft",
          sections: sectionsMap,
          format: "docx",
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to export DOCX");
    } finally {
      setIsExportingDocx(false);
    }
  };

  const currentData = sections[activeSection];
  const isEditing = editingSection === activeSection;
  const isLoading = generatingSection === activeSection;

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
          <Article weight="duotone" className="text-brand" />
          Manuscript Draft Generator
        </h2>
        <p className="text-sm text-ink-muted mt-1">
          Generate IMRAD-structured manuscript sections from your review data.
          Each section is pre-filled using your PICO, screening results,
          meta-analysis, and risk of bias assessments.
        </p>
      </div>

      {/* Custom instructions */}
      <div className="p-4 bg-surface border border-border rounded-lg space-y-3">
        <label className="text-xs text-ink-muted font-medium block">
          Custom Instructions (optional)
        </label>
        <textarea
          value={customInstructions}
          onChange={(e) => setCustomInstructions(e.target.value)}
          placeholder="e.g., Focus on clinical implications, use APA style, emphasize heterogeneity..."
          className="w-full h-16 px-3 py-2 bg-surface-alt border border-border rounded text-sm text-ink placeholder:text-ink-faint resize-y focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
        <div className="flex gap-2">
          <button
            onClick={generateAll}
            disabled={isGeneratingAll || !!generatingSection}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand text-white rounded-md text-sm font-medium hover:bg-brand/90 disabled:opacity-50 transition-colors"
          >
            {isGeneratingAll ? (
              <>
                <CircleNotch weight="bold" className="animate-spin" size={16} />
                Generating all sections...
              </>
            ) : (
              <>
                <Lightning weight="bold" size={16} />
                Generate All Sections
              </>
            )}
          </button>
          {generatedCount > 0 && (
            <>
              <button
                onClick={exportMarkdown}
                className="flex items-center gap-1.5 px-3 py-2 border border-border rounded-md text-sm text-ink-muted hover:text-ink transition-colors"
              >
                <Download size={14} />
                Export Markdown
              </button>
              <button
                onClick={exportDocx}
                disabled={isExportingDocx}
                className="flex items-center gap-1.5 px-3 py-2 border border-border rounded-md text-sm text-ink-muted hover:text-ink disabled:opacity-50 transition-colors"
              >
                {isExportingDocx ? (
                  <>
                    <CircleNotch weight="bold" className="animate-spin" size={14} />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download size={14} />
                    Download DOCX
                  </>
                )}
              </button>
              <a
                href="/studio"
                className="flex items-center gap-1.5 px-3 py-2 border border-border rounded-md text-sm text-ink-muted hover:text-ink transition-colors"
              >
                <FileText size={14} />
                Open in Studio
              </a>
            </>
          )}
        </div>
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

      {/* Section selector + content */}
      <div className="flex gap-4">
        {/* Left: section list */}
        <div className="w-56 flex-shrink-0 space-y-1">
          {SECTIONS.map(({ key, label }) => {
            const hasContent = !!sections[key];
            const isActive = activeSection === key;
            const isCurrentlyGenerating = generatingSection === key;

            return (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left transition-colors",
                  isActive
                    ? "bg-brand/10 text-brand font-medium"
                    : "text-ink-muted hover:bg-surface-alt hover:text-ink"
                )}
              >
                {isCurrentlyGenerating ? (
                  <CircleNotch
                    weight="bold"
                    className="animate-spin flex-shrink-0"
                    size={14}
                  />
                ) : hasContent ? (
                  <CheckCircle
                    weight="fill"
                    className="text-emerald-500 flex-shrink-0"
                    size={14}
                  />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-current flex-shrink-0" />
                )}
                {label}
                {isActive && (
                  <ArrowRight
                    size={12}
                    className="ml-auto flex-shrink-0"
                  />
                )}
              </button>
            );
          })}

          {/* Progress indicator */}
          <div className="pt-3 px-3">
            <div className="text-[11px] text-ink-faint">
              {generatedCount} / {SECTIONS.length} sections generated
            </div>
            <div className="mt-1 h-1 bg-surface-alt rounded-full overflow-hidden">
              <div
                className="h-full bg-brand rounded-full transition-all"
                style={{
                  width: `${(generatedCount / SECTIONS.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Right: content area */}
        <div className="flex-1 min-w-0">
          {/* Section header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-ink">
                {SECTIONS.find((s) => s.key === activeSection)?.label}
              </h3>
              <p className="text-[11px] text-ink-faint mt-0.5">
                {SECTIONS.find((s) => s.key === activeSection)?.description}
              </p>
            </div>
            <div className="flex gap-1">
              {currentData && (
                <>
                  <button
                    onClick={() => copySection(activeSection)}
                    className={cn(
                      "flex items-center gap-1 px-2.5 py-1 border border-border rounded text-xs transition-colors",
                      copiedSection === activeSection
                        ? "text-emerald-500 border-emerald-500/30"
                        : "text-ink-muted hover:text-ink"
                    )}
                    title="Copy to clipboard"
                  >
                    {copiedSection === activeSection ? (
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
                      isEditing ? saveEdit() : startEdit(activeSection)
                    }
                    className="flex items-center gap-1 px-2.5 py-1 border border-border rounded text-xs text-ink-muted hover:text-ink transition-colors"
                    title={isEditing ? "Save edits" : "Edit section"}
                  >
                    <PencilSimple size={12} />
                    {isEditing ? "Save" : "Edit"}
                  </button>
                </>
              )}
              <button
                onClick={() => generateSection(activeSection)}
                disabled={!!generatingSection || isGeneratingAll}
                className="flex items-center gap-1 px-2.5 py-1 bg-brand text-white rounded text-xs font-medium hover:bg-brand/90 disabled:opacity-50 transition-colors"
              >
                {isLoading ? (
                  <>
                    <CircleNotch
                      weight="bold"
                      className="animate-spin"
                      size={12}
                    />
                    Generating...
                  </>
                ) : currentData ? (
                  "Regenerate"
                ) : (
                  "Generate"
                )}
              </button>
            </div>
          </div>

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
                  Generating {SECTIONS.find((s) => s.key === activeSection)?.label?.toLowerCase()}...
                </p>
                <p className="text-[11px] text-ink-faint mt-1">
                  This may take 15-30 seconds
                </p>
              </div>
            ) : isEditing && currentData ? (
              <div className="p-4 space-y-3">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-80 px-3 py-2 bg-surface-alt border border-border rounded text-sm text-ink leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-brand/30 font-mono"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="px-3 py-1 bg-brand text-white rounded text-xs font-medium hover:bg-brand/90"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setEditingSection(null);
                      setEditContent("");
                    }}
                    className="px-3 py-1 text-xs text-ink-muted hover:text-ink"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : currentData ? (
              <div className="p-4">
                <div className="text-sm text-ink leading-relaxed whitespace-pre-wrap">
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
      <div className="text-xs text-ink-faint p-3 bg-surface-alt rounded-lg border border-border">
        <strong>About this draft:</strong> AI-generated content is based on
        your project&apos;s PICO, screening results, meta-analysis, and risk of
        bias data. All sections follow PRISMA 2020 reporting guidelines.
        [PLACEHOLDER] markers indicate areas requiring manual input. Review and
        edit all content before submission. Use &quot;Open in Studio&quot; to
        continue editing in the full-featured editor.
      </div>
    </div>
  );
}
