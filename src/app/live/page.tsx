"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Broadcast } from "@phosphor-icons/react";

export default function LiveJoinPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (trimmed.length !== 6) {
      setError("Please enter a 6-character code");
      return;
    }
    setLoading(true);
    setError("");
    router.push(`/live/${trimmed}`);
  }

  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-900 via-slate-950 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm text-center">
        {/* Logo / branding */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/15 mb-4">
            <Broadcast weight="bold" className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Join Live Session
          </h1>
          <p className="text-sm text-white/50">
            Enter the 6-character code shown on the presenter&apos;s screen
          </p>
        </div>

        {/* Join form */}
        <form onSubmit={handleJoin} className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase().slice(0, 6));
              setError("");
            }}
            placeholder="ABC123"
            maxLength={6}
            autoFocus
            autoComplete="off"
            className="w-full text-center text-3xl font-mono font-bold tracking-[0.3em] px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          />

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={code.trim().length !== 6 || loading}
            className="w-full py-3.5 px-6 bg-blue-500 hover:bg-blue-400 disabled:bg-white/10 disabled:text-white/30 text-white font-semibold rounded-2xl transition-all text-lg"
          >
            {loading ? "Joining..." : "Join"}
          </button>
        </form>

        <p className="mt-8 text-xs text-white/30">
          No account required. Your questions are anonymous by default.
        </p>
      </div>
    </div>
  );
}
