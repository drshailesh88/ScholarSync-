"use client";

import { useState } from "react";
import { Lock } from "@phosphor-icons/react";
import { verifySharePassword } from "@/lib/actions/share";
import { SharedPresentationViewer } from "./shared-presentation-viewer";
import type { InstitutionKit } from "@/types/presentation";

type InstitutionKitProp = Partial<InstitutionKit> | null;

interface SlideData {
  id: number;
  sortOrder: number;
  layout: string | null;
  title: string | null;
  subtitle: string | null;
  contentBlocks: unknown;
  speakerNotes: string | null;
}

interface SharePasswordGateProps {
  token: string;
  deck: {
    id: number;
    title: string;
    description: string | null;
    theme: string | null;
    themeConfig: unknown;
    institutionKit: unknown;
    hasPassword: boolean;
    slides: SlideData[];
  };
}

export function SharePasswordGate({ token, deck }: SharePasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const valid = await verifySharePassword(token, password);
      if (valid) {
        setUnlocked(true);
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (unlocked) {
    return (
      <SharedPresentationViewer
        title={deck.title}
        slides={deck.slides}
        theme={deck.theme}
        themeConfig={deck.themeConfig}
        institutionKit={deck.institutionKit as InstitutionKitProp}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#0f172a] border border-white/8 rounded-xl p-8">
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#6366f1]/10 flex items-center justify-center">
            <Lock size={24} className="text-[#6366f1]" />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-[#f1f5f9]">
              Password Protected
            </h1>
            <p className="text-sm text-[#94a3b8] mt-1">
              Enter the password to view this presentation.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input aria-label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoFocus
              className="w-full px-4 py-2.5 bg-[#1e293b] border border-white/8 rounded-lg text-[#f1f5f9] placeholder-[#64748b] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 focus:border-[#6366f1]/50 transition-colors"
            />
            {error && (
              <p className="mt-2 text-xs text-red-400">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-2.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "View Presentation"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#64748b]">
          {deck.title}
        </p>
      </div>
    </div>
  );
}
