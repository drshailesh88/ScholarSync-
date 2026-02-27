"use client";

import { useState, useRef, useEffect } from "react";
import {
  X,
  LinkSimple,
  Check,
  Users,
  Copy,
  EnvelopeSimple,
  CircleNotch,
} from "@phosphor-icons/react";

// ---------------------------------------------------------------------------
// Invite Collaborator Modal
//
// Simple V1: The invite is the deck URL itself — anyone with the link can
// collaborate in real-time. Permission management can be layered on later.
// ---------------------------------------------------------------------------

interface InviteCollaboratorModalProps {
  deckId: number;
  onClose: () => void;
}

export function InviteCollaboratorModal({
  deckId,
  onClose,
}: InviteCollaboratorModalProps) {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [inviteSent, setInviteSent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/presentation/${deckId}`
      : `/presentation/${deckId}`;

  // Auto-focus email input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for non-secure contexts
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleInviteByEmail() {
    if (!email.trim()) return;
    // V1: Open mailto link with the share URL
    const subject = encodeURIComponent("Collaborate on a presentation");
    const body = encodeURIComponent(
      `I'd like to collaborate on a presentation with you. Open this link to join:\n\n${shareUrl}`
    );
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_blank");
    setInviteSent(true);
    setTimeout(() => setInviteSent(false), 3000);
    setEmail("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface rounded-2xl border border-border shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-brand" />
            <h3 className="text-sm font-semibold text-ink">
              Collaborate on Presentation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-5">
          {/* Copy link section */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-ink-muted font-medium block mb-2">
              Share Link
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-raised border border-border text-xs text-ink-muted truncate">
                <LinkSimple size={14} className="shrink-0 text-brand" />
                <span className="truncate">{shareUrl}</span>
              </div>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-brand text-white hover:bg-brand/90 transition-colors shrink-0"
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
            <p className="mt-1.5 text-[10px] text-ink-muted">
              Anyone with this link can view and edit in real-time
            </p>
          </div>

          {/* Invite by email */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-ink-muted font-medium block mb-2">
              Invite by Email
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-raised border border-border">
                <EnvelopeSimple
                  size={14}
                  className="shrink-0 text-ink-muted"
                />
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleInviteByEmail();
                  }}
                  placeholder="colleague@university.edu"
                  className="flex-1 bg-transparent text-xs text-ink outline-none placeholder:text-ink-muted/50"
                />
              </div>
              <button
                onClick={handleInviteByEmail}
                disabled={!email.trim()}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-border text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                {inviteSent ? (
                  <>
                    <Check size={14} className="text-emerald-500" />
                    Sent
                  </>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </div>

          {/* Info note */}
          <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-blue-500/5 border border-blue-500/10">
            <Users size={14} className="shrink-0 text-blue-500 mt-0.5" />
            <p className="text-[10px] text-blue-500/80 leading-relaxed">
              Collaborators can see each other&apos;s cursors and edit
              simultaneously. Changes sync in real-time and are saved
              automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
