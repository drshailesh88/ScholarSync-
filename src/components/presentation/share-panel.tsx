"use client";

import { useState, useEffect, useCallback } from "react";
import {
  X,
  Copy,
  Check,
  LinkSimple,
  Lock,
  CalendarBlank,
} from "@phosphor-icons/react";
import {
  enableDeckSharing,
  disableDeckSharing,
  getDeckShareSettings,
  updateShareSettings,
} from "@/lib/actions/share";

interface SharePanelProps {
  deckId: number;
  onClose: () => void;
}

export function SharePanel({ deckId, onClose }: SharePanelProps) {
  const [loading, setLoading] = useState(true);
  const [shareEnabled, setShareEnabled] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadSettings = useCallback(async () => {
    setLoading(true);
    try {
      const settings = await getDeckShareSettings(deckId);
      if (settings) {
        setShareEnabled(settings.shareEnabled ?? false);
        setShareUrl(settings.shareUrl ?? null);
        setPassword(settings.sharePassword ?? "");
        setExpiresAt(
          settings.shareExpiresAt
            ? new Date(settings.shareExpiresAt).toISOString().split("T")[0]
            : ""
        );
      }
    } catch (err) {
      console.error("Failed to load share settings:", err);
    } finally {
      setLoading(false);
    }
  }, [deckId]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  async function handleToggleShare() {
    setSaving(true);
    try {
      if (!shareEnabled) {
        const result = await enableDeckSharing(deckId);
        setShareEnabled(true);
        setShareUrl(result.shareUrl);
      } else {
        await disableDeckSharing(deckId);
        setShareEnabled(false);
      }
    } catch (err) {
      console.error("Failed to toggle sharing:", err);
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveSettings() {
    setSaving(true);
    try {
      await updateShareSettings(deckId, {
        password: password || null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      });
    } catch (err) {
      console.error("Failed to save share settings:", err);
    } finally {
      setSaving(false);
    }
  }

  async function handleCopy() {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-surface border border-border rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <LinkSimple size={18} className="text-brand" />
            <h2 className="text-sm font-semibold text-ink">Share Presentation</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-4 space-y-5">
          {loading ? (
            <div className="py-8 text-center text-sm text-ink-muted">
              Loading share settings...
            </div>
          ) : (
            <>
              {/* Enable toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-ink">
                    Public sharing
                  </p>
                  <p className="text-xs text-ink-muted mt-0.5">
                    Anyone with the link can view this presentation
                  </p>
                </div>
                <button
                  onClick={handleToggleShare}
                  disabled={saving}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    shareEnabled ? "bg-brand" : "bg-surface-raised"
                  } ${saving ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      shareEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Share URL */}
              {shareEnabled && shareUrl && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-ink-muted block mb-1.5">
                      Share link
                    </label>
                    <div className="flex gap-2">
                      <input aria-label="Input"
                        readOnly
                        value={shareUrl}
                        className="flex-1 px-3 py-2 bg-surface-raised border border-border-subtle rounded-lg text-xs text-ink truncate focus:outline-none"
/>
                      <button
                        onClick={handleCopy}
                        className="px-3 py-2 bg-brand hover:bg-brand-hover text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                      >
                        {copied ? (
                          <>
                            <Check size={14} />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-xs font-medium text-ink-muted flex items-center gap-1.5 mb-1.5">
                      <Lock size={12} />
                      Password protection (optional)
                    </label>
                    <input aria-label="Text input"
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Leave empty for no password"
                      className="w-full px-3 py-2 bg-surface-raised border border-border-subtle rounded-lg text-xs text-ink placeholder-ink-muted focus:outline-none focus:ring-1 focus:ring-brand/50"
                    />
                  </div>

                  {/* Expiry */}
                  <div>
                    <label className="text-xs font-medium text-ink-muted flex items-center gap-1.5 mb-1.5">
                      <CalendarBlank size={12} />
                      Expiration date (optional)
                    </label>
                    <input aria-label="Date"
                      type="date"
                      value={expiresAt}
                      onChange={(e) => setExpiresAt(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3 py-2 bg-surface-raised border border-border-subtle rounded-lg text-xs text-ink focus:outline-none focus:ring-1 focus:ring-brand/50"
                    />
                  </div>

                  {/* Save button */}
                  <button
                    onClick={handleSaveSettings}
                    disabled={saving}
                    className="w-full py-2 bg-surface-raised hover:bg-surface-raised/80 text-ink text-xs font-medium rounded-lg border border-border-subtle transition-colors disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Settings"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
