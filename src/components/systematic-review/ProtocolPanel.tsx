"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Scroll,
  CircleNotch,
  PencilSimple,
  Download,
  CheckCircle,
  CaretDown,
  CaretRight,
  FilePdf,
  FileText,
  FileHtml,
  Clipboard,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useSystematicReviewStore } from "@/stores/systematic-review-store";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ProtocolSection {
  id: string;
  title: string;
  content: string;
  guidance: string;
}

interface Protocol {
  title: string;
  sections: ProtocolSection[];
  generatedAt: string;
  prosperoId?: string;
}

interface ProtocolPanelProps {
  projectId: number;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ProtocolPanel({ projectId }: ProtocolPanelProps) {
  const [protocol, setProtocol] = useState<Protocol | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [additionalContext, setAdditionalContext] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [prosperoId, setProsperoId] = useState("");
  const [prosperoSaved, setProsperoSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { reviewConfig } = useSystematicReviewStore();

  // Load saved PROSPERO ID
  useEffect(() => {
    if (reviewConfig?.protocolRegistration) {
      setProsperoId(reviewConfig.protocolRegistration);
    }
  }, [reviewConfig?.protocolRegistration]);

  // Generate protocol
  const generate = useCallback(async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const res = await fetch("/api/systematic-review/protocol", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          additionalContext: additionalContext || undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Generation failed");
      }

      const data = await res.json();
      setProtocol(data.protocol);
      // Expand all sections by default
      setExpandedSections(
        new Set(data.protocol.sections.map((s: ProtocolSection) => s.id))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setIsGenerating(false);
    }
  }, [projectId, additionalContext]);

  // Toggle section
  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Start editing a section
  const startEdit = (section: ProtocolSection) => {
    setEditingSection(section.id);
    setEditContent(section.content);
  };

  // Save section edit
  const saveEdit = () => {
    if (!protocol || !editingSection) return;
    setProtocol({
      ...protocol,
      sections: protocol.sections.map((s) =>
        s.id === editingSection ? { ...s, content: editContent } : s
      ),
    });
    setEditingSection(null);
    setEditContent("");
  };

  // Save PROSPERO ID
  const saveProsperoId = async () => {
    try {
      const res = await fetch("/api/systematic-review/protocol", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, prosperoId }),
      });
      if (res.ok) {
        setProsperoSaved(true);
        setTimeout(() => setProsperoSaved(false), 3000);
        if (protocol) {
          setProtocol({ ...protocol, prosperoId });
        }
      }
    } catch {
      setError("Failed to save PROSPERO ID. Please try again.");
    }
  };

  // Export
  const exportProtocol = async (format: "text" | "html") => {
    if (!protocol) return;

    try {
      const res = await fetch(`/api/systematic-review/protocol?projectId=${projectId}&format=${format}`, {
        method: "GET",
      });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `protocol.${format === "text" ? "txt" : "html"}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Failed to export protocol. Please try again.");
    }
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    if (!protocol) return;
    const text = protocol.sections
      .map((s) => `${s.title}\n${"─".repeat(s.title.length)}\n\n${s.content}`)
      .join("\n\n\n");
    navigator.clipboard.writeText(text);
  };

  const expandAll = () =>
    setExpandedSections(
      new Set(protocol?.sections.map((s) => s.id) || [])
    );
  const collapseAll = () => setExpandedSections(new Set());

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
          <Scroll weight="duotone" className="text-brand" />
          Protocol Builder
        </h2>
        <p className="text-sm text-ink-muted mt-1">
          Generate a PROSPERO-compatible systematic review protocol pre-filled
          from your project configuration. Edit sections as needed, then export
          for registration.
        </p>
      </div>

      {/* PROSPERO ID */}
      <div className="flex items-end gap-3 p-4 bg-surface border border-border rounded-lg">
        <div className="flex-1">
          <label className="text-xs text-ink-muted font-medium block mb-1">
            PROSPERO Registration ID
          </label>
          <input
            type="text"
            value={prosperoId}
            onChange={(e) => setProsperoId(e.target.value)}
            placeholder="e.g. CRD42024XXXXXX"
            className="w-full px-3 py-1.5 bg-surface-alt border border-border rounded text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
        <button
          onClick={saveProsperoId}
          disabled={!prosperoId.trim()}
          className="flex items-center gap-1 px-3 py-1.5 bg-brand text-white rounded text-sm font-medium hover:bg-brand/90 disabled:opacity-50 transition-colors"
        >
          {prosperoSaved ? (
            <>
              <CheckCircle weight="bold" size={14} />
              Saved
            </>
          ) : (
            "Save ID"
          )}
        </button>
      </div>

      {/* Generation controls */}
      {!protocol && (
        <div className="space-y-3">
          <textarea
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            placeholder="Optional: Add any additional context for protocol generation (e.g., specific methodology preferences, planned subgroup analyses)..."
            className="w-full h-24 px-4 py-3 bg-surface border border-border rounded-lg text-sm text-ink placeholder:text-ink-faint resize-y focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
          <button
            onClick={generate}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand text-white rounded-md text-sm font-medium hover:bg-brand/90 disabled:opacity-50 transition-colors"
          >
            {isGenerating ? (
              <>
                <CircleNotch
                  weight="bold"
                  className="animate-spin"
                  size={16}
                />
                Generating protocol (16 sections)...
              </>
            ) : (
              <>
                <Scroll weight="bold" size={16} />
                Generate Protocol
              </>
            )}
          </button>
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400 flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">&#x2715;</button>
            </div>
          )}
        </div>
      )}

      {/* Generated protocol */}
      {protocol && (
        <>
          {/* Controls bar */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={expandAll}
                className="text-xs text-brand hover:underline"
              >
                Expand all
              </button>
              <span className="text-xs text-ink-muted">·</span>
              <button
                onClick={collapseAll}
                className="text-xs text-brand hover:underline"
              >
                Collapse all
              </button>
              <span className="text-xs text-ink-muted">·</span>
              <button
                onClick={() => {
                  setProtocol(null);
                  setExpandedSections(new Set());
                }}
                className="text-xs text-ink-muted hover:underline"
              >
                Regenerate
              </button>
            </div>

            <div className="flex gap-1">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 px-2.5 py-1 border border-border rounded text-xs text-ink-muted hover:text-ink transition-colors"
                title="Copy to clipboard"
              >
                <Clipboard size={12} />
                Copy
              </button>
              <button
                onClick={() => exportProtocol("text")}
                className="flex items-center gap-1 px-2.5 py-1 border border-border rounded text-xs text-ink-muted hover:text-ink transition-colors"
                title="Download as plain text"
              >
                <FileText size={12} />
                TXT
              </button>
              <button
                onClick={() => exportProtocol("html")}
                className="flex items-center gap-1 px-2.5 py-1 border border-border rounded text-xs text-ink-muted hover:text-ink transition-colors"
                title="Download as HTML (open in browser → Print to PDF)"
              >
                <FileHtml size={12} />
                HTML
              </button>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-2">
            {protocol.sections.map((section, idx) => {
              const expanded = expandedSections.has(section.id);
              const isEditing = editingSection === section.id;

              return (
                <div
                  key={section.id}
                  className="border border-border rounded-lg overflow-hidden"
                >
                  {/* Section header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-surface-alt transition-colors"
                  >
                    <span className="text-xs text-ink-muted w-5 text-right flex-shrink-0">
                      {idx + 1}.
                    </span>
                    <span className="text-sm text-ink font-medium flex-1">
                      {section.title}
                    </span>
                    {expanded ? (
                      <CaretDown
                        size={14}
                        className="text-ink-muted flex-shrink-0"
                      />
                    ) : (
                      <CaretRight
                        size={14}
                        className="text-ink-muted flex-shrink-0"
                      />
                    )}
                  </button>

                  {/* Section content */}
                  {expanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-border">
                      {/* Guidance */}
                      <p className="text-[11px] text-ink-faint italic mb-3">
                        {section.guidance}
                      </p>

                      {isEditing ? (
                        <div className="space-y-2">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full h-40 px-3 py-2 bg-surface-alt border border-border rounded text-sm text-ink resize-y focus:outline-none focus:ring-2 focus:ring-brand/30"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={saveEdit}
                              className="px-3 py-1 bg-brand text-white rounded text-xs font-medium hover:bg-brand/90"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingSection(null)}
                              className="px-3 py-1 text-xs text-ink-muted hover:text-ink"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="relative group">
                          <div className="text-sm text-ink leading-relaxed whitespace-pre-wrap">
                            {section.content}
                          </div>
                          <button
                            onClick={() => startEdit(section)}
                            className="absolute top-0 right-0 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-surface-alt text-ink-muted hover:text-brand transition-all"
                            title="Edit section"
                          >
                            <PencilSimple weight="bold" size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Info */}
          <div className="text-xs text-ink-faint p-3 bg-surface-alt rounded-lg border border-border">
            <strong>Next steps:</strong> Review and edit each section, then
            export as HTML or TXT. Open the HTML file in your browser and use
            Print → Save as PDF to create a PDF. Register your protocol at{" "}
            <a
              href="https://www.crd.york.ac.uk/prospero/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline"
            >
              PROSPERO
            </a>{" "}
            and save your registration ID above.
          </div>
        </>
      )}
    </div>
  );
}
