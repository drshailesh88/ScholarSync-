"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Plus, Trash, PencilSimple } from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  createScope,
  deleteScope,
  getUserScopes,
  updateScope,
  type ScopeRecord,
  type CreateScopeInput,
} from "@/lib/actions/scopes";

function ScopeForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: ScopeRecord;
  onSave: (input: CreateScopeInput & { isActive?: boolean }) => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [includedDomains, setIncludedDomains] = useState(
    initial?.includedDomains.join(", ") ?? ""
  );
  const [excludedDomains, setExcludedDomains] = useState(
    initial?.excludedDomains.join(", ") ?? ""
  );
  const [includedKeywords, setIncludedKeywords] = useState(
    initial?.includedKeywords.join(", ") ?? ""
  );
  const [excludedKeywords, setExcludedKeywords] = useState(
    initial?.excludedKeywords.join(", ") ?? ""
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSave({
        name,
        includedDomains: includedDomains
          .split(",")
          .map((d) => d.trim())
          .filter(Boolean),
        excludedDomains: excludedDomains
          .split(",")
          .map((d) => d.trim())
          .filter(Boolean),
        includedKeywords: includedKeywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
        excludedKeywords: excludedKeywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save scope");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="mb-1 block text-[13px] font-medium text-ink" htmlFor="scope-name">
          Name
        </label>
        <input
          autoFocus
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[14px] text-ink"
          id="scope-name"
          maxLength={100}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Government Sources"
          required
          value={name}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[12px] text-ink-muted" htmlFor="included-domains">
            Include domains (comma-separated)
          </label>
          <input
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[13px] text-ink"
            id="included-domains"
            onChange={(e) => setIncludedDomains(e.target.value)}
            placeholder="nih.gov, gov.uk"
            value={includedDomains}
          />
        </div>
        <div>
          <label className="mb-1 block text-[12px] text-ink-muted" htmlFor="excluded-domains">
            Exclude domains (comma-separated)
          </label>
          <input
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[13px] text-ink"
            id="excluded-domains"
            onChange={(e) => setExcludedDomains(e.target.value)}
            placeholder="reddit.com, twitter.com"
            value={excludedDomains}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[12px] text-ink-muted" htmlFor="included-keywords">
            Include keywords (comma-separated)
          </label>
          <input
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[13px] text-ink"
            id="included-keywords"
            onChange={(e) => setIncludedKeywords(e.target.value)}
            placeholder="policy, regulation"
            value={includedKeywords}
          />
        </div>
        <div>
          <label className="mb-1 block text-[12px] text-ink-muted" htmlFor="excluded-keywords">
            Exclude keywords (comma-separated)
          </label>
          <input
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[13px] text-ink"
            id="excluded-keywords"
            onChange={(e) => setExcludedKeywords(e.target.value)}
            placeholder="opinion, editorial"
            value={excludedKeywords}
          />
        </div>
      </div>

      {error && (
        <p className="text-[13px] text-red-500">{error}</p>
      )}

      <div className="flex gap-2">
        <button
          className="rounded-full bg-[var(--brand)] px-4 py-2 text-[13px] font-medium text-white hover:opacity-90 disabled:opacity-50"
          disabled={saving || !name.trim()}
          type="submit"
        >
          {saving ? "Saving..." : initial ? "Update Scope" : "Create Scope"}
        </button>
        <button
          className="rounded-full border border-[var(--border)] px-4 py-2 text-[13px] text-ink hover:bg-[var(--surface-raised)]"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function ScopesSettingsPage() {
  const [scopes, setScopes] = useState<ScopeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const loadScopes = useCallback(async () => {
    try {
      const data = await getUserScopes();
      setScopes(data);
    } catch {
      // Table may not exist yet
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadScopes();
  }, [loadScopes]);

  const handleCreate = async (input: CreateScopeInput) => {
    await createScope(input);
    setShowCreate(false);
    await loadScopes();
  };

  const handleUpdate = async (
    scopeId: number,
    input: CreateScopeInput & { isActive?: boolean }
  ) => {
    await updateScope(scopeId, input);
    setEditingId(null);
    await loadScopes();
  };

  const handleDelete = async (scopeId: number) => {
    await deleteScope(scopeId);
    await loadScopes();
  };

  const handleToggleActive = async (scope: ScopeRecord) => {
    await updateScope(scope.id, { isActive: !scope.isActive });
    await loadScopes();
  };

  return (
    <div className="mx-auto w-full max-w-[780px] px-4 py-8 md:py-10">
      <div className="mb-6 flex items-center gap-3">
        <Link
          className="rounded-full p-1.5 text-ink-muted hover:bg-[var(--surface-raised)] hover:text-ink"
          href="/explore"
        >
          <ArrowLeft size={18} weight="bold" />
        </Link>
        <h1 className="text-[20px] font-semibold text-ink">Manage Scopes</h1>
        <span className="ml-auto text-[13px] text-ink-muted">
          {scopes.length} / 20
        </span>
      </div>

      <p className="mb-6 text-[14px] text-ink-muted">
        Scopes let you narrow search results to specific domains and keywords.
        Create up to 20 custom scopes.
      </p>

      {!showCreate && editingId === null && scopes.length < 20 && (
        <button
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-[13px] text-ink hover:bg-[var(--surface-raised)]"
          onClick={() => setShowCreate(true)}
          type="button"
        >
          <Plus size={14} weight="bold" />
          New Scope
        </button>
      )}

      {showCreate && (
        <div className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] p-4">
          <h2 className="mb-3 text-[14px] font-semibold text-ink">
            Create Scope
          </h2>
          <ScopeForm onCancel={() => setShowCreate(false)} onSave={handleCreate} />
        </div>
      )}

      {loading ? (
        <p className="text-[14px] text-ink-muted">Loading scopes...</p>
      ) : scopes.length === 0 && !showCreate ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-8 text-center text-[14px] text-ink-muted">
          No scopes yet. Create one to narrow your searches.
        </div>
      ) : (
        <div className="space-y-3">
          {scopes.map((scope) =>
            editingId === scope.id ? (
              <div
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] p-4"
                key={scope.id}
              >
                <h2 className="mb-3 text-[14px] font-semibold text-ink">
                  Edit Scope
                </h2>
                <ScopeForm
                  initial={scope}
                  onCancel={() => setEditingId(null)}
                  onSave={(input) => handleUpdate(scope.id, input)}
                />
              </div>
            ) : (
              <div
                className={cn(
                  "flex items-center justify-between rounded-2xl border border-[var(--border)] px-4 py-3",
                  scope.isActive
                    ? "bg-[var(--background)]"
                    : "bg-[var(--surface-raised)] opacity-60"
                )}
                key={scope.id}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-medium text-ink">
                    {scope.name}
                  </p>
                  <p className="truncate text-[12px] text-ink-muted">
                    {[
                      scope.includedDomains.length > 0 &&
                        `+${scope.includedDomains.join(", ")}`,
                      scope.excludedDomains.length > 0 &&
                        `-${scope.excludedDomains.join(", ")}`,
                      scope.includedKeywords.length > 0 &&
                        `kw: ${scope.includedKeywords.join(", ")}`,
                    ]
                      .filter(Boolean)
                      .join(" · ") || "No filters configured"}
                  </p>
                </div>

                <div className="ml-3 flex items-center gap-1">
                  <button
                    className={cn(
                      "rounded-lg px-2 py-1 text-[11px] font-medium",
                      scope.isActive
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-[var(--surface-raised)] text-ink-muted"
                    )}
                    onClick={() => handleToggleActive(scope)}
                    type="button"
                  >
                    {scope.isActive ? "Active" : "Inactive"}
                  </button>
                  <button
                    className="rounded-lg p-1.5 text-ink-muted hover:bg-[var(--surface-raised)] hover:text-ink"
                    onClick={() => setEditingId(scope.id)}
                    type="button"
                  >
                    <PencilSimple size={14} />
                  </button>
                  <button
                    className="rounded-lg p-1.5 text-ink-muted hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                    onClick={() => handleDelete(scope.id)}
                    type="button"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
