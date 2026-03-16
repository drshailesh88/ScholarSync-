"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ClockCounterClockwise,
  Trash,
  ArrowUUpLeft,
  Spinner,
} from "@phosphor-icons/react";

interface Version {
  id: string;
  description: string | null;
  createdAt: string;
}

interface VersionHistoryPanelProps {
  fileId: string;
  onBeforeSave?: () => Promise<void> | void;
  onRestore: (content: string) => void;
  onClose?: () => void;
}

export function VersionHistoryPanel({
  fileId,
  onBeforeSave,
  onRestore,
  onClose,
}: VersionHistoryPanelProps) {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [restoring, setRestoring] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch versions on mount
  useEffect(() => {
    loadVersions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileId]);

  async function loadVersions() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/latex/versions?fileId=${fileId}`);
      if (!res.ok) throw new Error("Failed to load versions");
      const data = await res.json();
      setVersions(data.versions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load versions");
    } finally {
      setLoading(false);
    }
  }

  async function handleRestore(versionId: string) {
    if (!confirm("Restore this version? Current content will be replaced.")) {
      return;
    }

    setRestoring(versionId);
    setError(null);
    try {
      // First get the version content
      const getRes = await fetch(`/api/latex/versions/${versionId}`);
      if (!getRes.ok) throw new Error("Failed to get version");
      const versionData = await getRes.json();

      // Then restore it
      const restoreRes = await fetch(`/api/latex/versions/${versionId}/restore`, {
        method: "POST",
      });
      if (!restoreRes.ok) throw new Error("Failed to restore version");

      // Notify parent with restored content
      onRestore(versionData.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to restore version");
    } finally {
      setRestoring(null);
    }
  }

  async function handleDelete(versionId: string) {
    if (!confirm("Delete this version? This cannot be undone.")) {
      return;
    }

    setDeleting(versionId);
    setError(null);
    try {
      const res = await fetch(`/api/latex/versions/${versionId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete version");

      // Remove from local state
      setVersions((prev) => prev.filter((v) => v.id !== versionId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete version");
    } finally {
      setDeleting(null);
    }
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function handleSaveVersion() {
    setSaving(true);
    setError(null);
    try {
      await onBeforeSave?.();
      const res = await fetch("/api/latex/versions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId }),
      });
      if (!res.ok) throw new Error("Failed to save version");
      await loadVersions();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save version");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-sm flex items-center gap-2">
          <ClockCounterClockwise className="h-4 w-4" />
          Version History
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            ×
          </button>
        )}
      </div>

      {error && (
        <div className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <Button
          onClick={() => void handleSaveVersion()}
          disabled={saving || restoring !== null || deleting !== null}
          className="w-full"
        >
          {saving ? (
            <>
              <Spinner className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Current Version"
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {versions.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No saved versions yet.
            <br />
            <span className="text-xs">
              Click &ldquo;Save Version&rdquo; to create a snapshot.
            </span>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {versions.map((version) => (
              <li
                key={version.id}
                className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {version.description || "Untitled version"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(version.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleRestore(version.id)}
                      disabled={restoring === version.id || deleting === version.id}
                      className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded disabled:opacity-50"
                      title="Restore this version"
                    >
                      {restoring === version.id ? (
                        <Spinner className="h-4 w-4 animate-spin" />
                      ) : (
                        <ArrowUUpLeft className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(version.id)}
                      disabled={restoring === version.id || deleting === version.id}
                      className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded disabled:opacity-50"
                      title="Delete this version"
                    >
                      {deleting === version.id ? (
                        <Spinner className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
