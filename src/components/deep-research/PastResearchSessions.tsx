"use client";

import { useState, useEffect, useCallback } from "react";
import { Clock, FileText, ChevronRight, Loader2 } from "lucide-react";

interface SavedSession {
  id: number;
  topic: string;
  status: string;
  papersFound: number;
  mode: string;
  completedAt: string;
}

interface PastResearchSessionsProps {
  onLoadSession: (sessionId: number) => void;
}

export function PastResearchSessions({ onLoadSession }: PastResearchSessionsProps) {
  const [sessions, setSessions] = useState<SavedSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchSessions() {
      try {
        const res = await fetch("/api/deep-research/sessions");
        if (!res.ok) {
          if (res.status === 401) {
            // Not logged in — just show nothing
            setLoading(false);
            return;
          }
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        if (!cancelled) {
          setSessions(data.sessions || []);
        }
      } catch {
        if (!cancelled) setError("Could not load past research");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSessions();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 text-gray-500 text-sm">
        <Loader2 size={16} className="animate-spin mr-2" />
        Loading past research...
      </div>
    );
  }

  if (error || sessions.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={16} className="text-gray-500" />
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Past Research
        </h3>
      </div>

      <div className="space-y-2">
        {sessions.map((session) => {
          const date = new Date(session.completedAt);
          const relativeDate = formatRelativeDate(date);

          return (
            <button
              key={session.id}
              onClick={() => onLoadSession(session.id)}
              className="w-full text-left flex items-center gap-3 px-4 py-3 bg-gray-800/30 border border-gray-700/30 rounded-xl hover:bg-gray-800/60 hover:border-gray-600/40 transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-gray-700/40 flex items-center justify-center shrink-0">
                <FileText size={16} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-200 group-hover:text-white truncate transition-colors">
                  {session.topic}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  <span className="capitalize">{session.mode}</span>
                  {" · "}
                  {session.papersFound} papers
                  {" · "}
                  {relativeDate}
                </p>
              </div>
              <ChevronRight size={16} className="text-gray-600 group-hover:text-gray-400 shrink-0 transition-colors" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
