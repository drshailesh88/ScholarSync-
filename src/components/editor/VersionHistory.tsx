"use client";

import { useState, useEffect } from "react";
import { X, Spinner, Eye, ArrowCounterClockwise } from "@phosphor-icons/react";
import { getDocumentVersions, getVersionContent, restoreDocumentVersion, saveNamedVersion } from "@/lib/actions/documents";
import type { JSONContent } from "@tiptap/core";

interface VersionRecord {
  id: number;
  versionNumber: number;
  versionName: string | null;
  autoSaved: boolean | null;
  savedBy: string;
  createdAt: Date | null;
}

interface VersionHistoryProps {
  documentId: number;
  sectionId: number;
  currentContent: JSONContent | null;
  onRestore: (content: JSONContent) => void;
  onClose: () => void;
}

export function VersionHistory({
  documentId,
  sectionId,
  currentContent,
  onRestore,
  onClose,
}: VersionHistoryProps) {
  const [versions, setVersions] = useState<VersionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewContent, setPreviewContent] = useState<JSONContent | null>(null);
  const [restoring, setRestoring] = useState<number | null>(null);

  useEffect(() => {
    getDocumentVersions(documentId)
      .then((data) => setVersions(data as unknown as VersionRecord[]))
      .finally(() => setLoading(false));
  }, [documentId]);

  async function handleSaveVersion() {
    const name = prompt("Version name (e.g., 'Before methods rewrite'):");
    if (!name) return;

    await saveNamedVersion(documentId, sectionId, name, currentContent);
    const updated = await getDocumentVersions(documentId);
    setVersions(updated as unknown as VersionRecord[]);
  }

  async function handleRestore(versionId: number) {
    const confirmed = confirm(
      "Restore this version? Your current content will be saved as a version first."
    );
    if (!confirmed) return;

    setRestoring(versionId);
    try {
      await restoreDocumentVersion(documentId, versionId);
      const content = await getVersionContent(versionId);
      if (content) {
        onRestore(content as JSONContent);
      }
    } finally {
      setRestoring(null);
    }
  }

  async function handlePreview(versionId: number) {
    const content = await getVersionContent(versionId);
    setPreviewContent(content as JSONContent | null);
  }

  function formatTime(date: Date | null): string {
    if (!date) return "unknown";
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return date.toLocaleDateString();
  }

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-surface border-l border-border shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="font-semibold">Version History</h3>
        <button onClick={onClose} className="p-1 hover:bg-surface-raised rounded">
          <X size={18} />
        </button>
      </div>

      {/* Save version button */}
      <div className="p-4 border-b border-border">
        <button
          onClick={handleSaveVersion}
          className="w-full px-3 py-2 text-sm font-medium text-white bg-brand rounded-lg hover:bg-brand/90"
        >
          Save Current Version
        </button>
      </div>

      {/* Version list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Spinner size={24} className="animate-spin" />
          </div>
        ) : versions.length === 0 ? (
          <p className="text-sm text-ink-muted text-center py-8">No versions yet</p>
        ) : (
          versions.map((version) => (
            <div
              key={version.id}
              className="p-3 bg-surface-raised border border-border rounded-lg"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={version.autoSaved ? "text-ink-muted" : "text-brand font-medium"}>
                    {version.autoSaved ? "○" : "●"}
                  </span>
                  <span className="text-sm font-medium">
                    {version.versionName || (version.autoSaved ? "Auto-save" : "Manual save")}
                  </span>
                </div>
              </div>
              <p className="text-xs text-ink-muted mb-3">{formatTime(version.createdAt)}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePreview(version.id)}
                  className="flex-1 px-2 py-1.5 text-xs font-medium text-ink bg-surface border border-border rounded hover:bg-surface-raised"
                >
                  <Eye size={12} className="inline mr-1" />
                  Preview
                </button>
                <button
                  onClick={() => handleRestore(version.id)}
                  disabled={restoring === version.id}
                  className="flex-1 px-2 py-1.5 text-xs font-medium text-white bg-brand rounded hover:bg-brand/90 disabled:opacity-50"
                >
                  {restoring === version.id ? (
                    <Spinner size={12} className="inline mr-1 animate-spin" />
                  ) : (
                    <ArrowCounterClockwise size={12} className="inline mr-1" />
                  )}
                  Restore
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Preview modal */}
      {previewContent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg shadow-xl w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="font-semibold">Version Preview</h3>
              <button
                onClick={() => setPreviewContent(null)}
                className="p-1 hover:bg-surface-raised rounded"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <pre className="text-xs text-ink-muted whitespace-pre-wrap">
                {JSON.stringify(previewContent, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
