"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Question,
  ChartBar,
  ThumbsUp,
  PaperPlaneRight,
  Broadcast,
  Warning,
} from "@phosphor-icons/react";
import {
  getSessionByJoinCode,
  submitQuestion,
  upvoteQuestion,
  submitPollResponse,
  incrementAudienceCount,
} from "@/lib/actions/live-session";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LiveQuestion {
  id: string;
  content: string;
  authorName: string | null;
  slideIndex: number | null;
  upvotes: number | null;
  status: string | null;
  createdAt: Date;
}

interface PollResult {
  optionIndex: number;
  count: number;
}

interface LivePoll {
  id: string;
  question: string;
  options: unknown;
  status: string | null;
  responses: PollResult[];
  totalVotes: number;
}

interface SessionInfo {
  id: string;
  joinCode: string;
  status: string | null;
  currentSlideIndex: number | null;
  audienceCount: number | null;
}

// ---------------------------------------------------------------------------
// Fingerprint (simple browser fingerprint for dedup)
// ---------------------------------------------------------------------------

function getFingerprint(): string {
  if (typeof window === "undefined") return "ssr";
  let fp = localStorage.getItem("live-fingerprint");
  if (!fp) {
    fp = crypto.randomUUID();
    localStorage.setItem("live-fingerprint", fp);
  }
  return fp;
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function LiveSessionPage() {
  const params = useParams();
  const code = (params.code as string)?.toUpperCase();

  const [session, setSession] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"questions" | "polls">("questions");

  // Questions state
  const [questions, setQuestions] = useState<LiveQuestion[]>([]);
  const [questionText, setQuestionText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(new Set());

  // Polls state
  const [polls, setPolls] = useState<LivePoll[]>([]);
  const [votedPollIds, setVotedPollIds] = useState<Set<string>>(new Set());
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [voting, setVoting] = useState(false);

  const [ended, setEnded] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  // ---------------------------------------------------------------------------
  // Initialize session
  // ---------------------------------------------------------------------------

  useEffect(() => {
    async function init() {
      try {
        const s = await getSessionByJoinCode(code);
        if (!s) {
          setError("Session not found or has ended.");
          setLoading(false);
          return;
        }
        setSession({
          id: s.id,
          joinCode: s.joinCode,
          status: s.status,
          currentSlideIndex: s.currentSlideIndex,
          audienceCount: s.audienceCount,
        });
        await incrementAudienceCount(s.id);
        setLoading(false);
      } catch {
        setError("Failed to join session.");
        setLoading(false);
      }
    }
    if (code) init();
  }, [code]);

  // ---------------------------------------------------------------------------
  // SSE subscription
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (!session?.id) return;

    const es = new EventSource(
      `/api/live-session/${session.id}/stream`
    );
    eventSourceRef.current = es;

    es.addEventListener("questions_update", (e) => {
      try {
        setQuestions(JSON.parse(e.data));
      } catch { /* ignore */ }
    });

    es.addEventListener("polls_update", (e) => {
      try {
        setPolls(JSON.parse(e.data));
      } catch { /* ignore */ }
    });

    es.addEventListener("session_update", (e) => {
      try {
        const data = JSON.parse(e.data);
        setSession((prev) =>
          prev
            ? {
                ...prev,
                currentSlideIndex: data.currentSlideIndex,
                audienceCount: data.audienceCount,
                status: data.status,
              }
            : prev
        );
      } catch { /* ignore */ }
    });

    es.addEventListener("session_ended", () => {
      setEnded(true);
    });

    es.onerror = () => {
      // EventSource will automatically reconnect
    };

    return () => {
      es.close();
      eventSourceRef.current = null;
    };
  }, [session?.id]);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleSubmitQuestion = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!session || !questionText.trim()) return;
      setSubmitting(true);
      try {
        await submitQuestion(
          session.id,
          questionText.trim(),
          authorName.trim() || undefined,
          getFingerprint(),
          session.currentSlideIndex ?? undefined
        );
        setQuestionText("");
      } catch {
        // ignore
      }
      setSubmitting(false);
    },
    [session, questionText, authorName]
  );

  const handleUpvote = useCallback(
    async (questionId: string) => {
      if (upvotedIds.has(questionId)) return;
      setUpvotedIds((prev) => new Set(prev).add(questionId));
      try {
        await upvoteQuestion(questionId, getFingerprint());
      } catch {
        // revert
        setUpvotedIds((prev) => {
          const next = new Set(prev);
          next.delete(questionId);
          return next;
        });
      }
    },
    [upvotedIds]
  );

  const handleVote = useCallback(
    async (pollId: string) => {
      if (selectedOption === null || votedPollIds.has(pollId)) return;
      setVoting(true);
      try {
        await submitPollResponse(pollId, selectedOption, getFingerprint());
        setVotedPollIds((prev) => new Set(prev).add(pollId));
        setSelectedOption(null);
      } catch {
        // ignore
      }
      setVoting(false);
    },
    [selectedOption, votedPollIds]
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-dvh bg-slate-950 flex items-center justify-center">
        <div className="animate-pulse text-white/50">Joining session...</div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-dvh bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <Warning weight="bold" className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">
            Cannot Join Session
          </h1>
          <p className="text-white/50 mb-6">{error}</p>
          <Link
            href="/live"
            className="px-6 py-2.5 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-400 transition-colors"
          >
            Try Another Code
          </Link>
        </div>
      </div>
    );
  }

  if (ended) {
    return (
      <div className="min-h-dvh bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <Broadcast weight="bold" className="w-12 h-12 text-white/30 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Session Ended</h1>
          <p className="text-white/50">
            The presenter has ended this live session.
          </p>
        </div>
      </div>
    );
  }

  const activePoll = polls.find((p) => p.status === "active");

  return (
    <div className="min-h-dvh bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="shrink-0 px-4 py-3 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-white/70">Live</span>
            <span className="text-xs text-white/30 font-mono">{code}</span>
          </div>
          <div className="text-xs text-white/40">
            Slide {(session.currentSlideIndex ?? 0) + 1}
          </div>
        </div>
      </header>

      {/* Tab bar */}
      <div className="shrink-0 flex border-b border-white/5">
        <button
          onClick={() => setTab("questions")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            tab === "questions"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-white/40 hover:text-white/60"
          }`}
        >
          <Question weight="bold" className="w-4 h-4" />
          Questions
          {questions.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-white/10">
              {questions.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab("polls")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            tab === "polls"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-white/40 hover:text-white/60"
          }`}
        >
          <ChartBar weight="bold" className="w-4 h-4" />
          Polls
          {activePoll && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            {tab === "questions" ? (
              <motion.div
                key="questions"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="p-4 space-y-4"
              >
                {/* Submit question form */}
                <form onSubmit={handleSubmitQuestion} className="space-y-2">
                  <textarea aria-label="Text area"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Type your question..."
                    rows={2}
                    maxLength={500}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                  <div className="flex items-center gap-2">
                    <input aria-label="Text input"
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="Your name (optional)"
                      maxLength={50}
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    />
                    <button
                      type="submit"
                      disabled={!questionText.trim() || submitting}
                      className="flex items-center gap-1.5 px-4 py-2 bg-blue-500 hover:bg-blue-400 disabled:bg-white/10 disabled:text-white/30 text-white text-xs font-medium rounded-lg transition-colors"
                    >
                      <PaperPlaneRight weight="bold" className="w-3.5 h-3.5" />
                      {submitting ? "..." : "Ask"}
                    </button>
                  </div>
                </form>

                {/* Question list */}
                <div className="space-y-2">
                  {questions
                    .filter((q) => q.status !== "dismissed")
                    .map((q) => (
                      <motion.div
                        key={q.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${
                          q.status === "highlighted"
                            ? "bg-amber-500/10 border-amber-500/30"
                            : q.status === "answered"
                            ? "bg-emerald-500/5 border-emerald-500/20"
                            : "bg-white/[0.02] border-white/5"
                        }`}
                      >
                        {/* Upvote */}
                        <button
                          onClick={() => handleUpvote(q.id)}
                          disabled={upvotedIds.has(q.id)}
                          className={`flex flex-col items-center gap-0.5 pt-0.5 transition-colors ${
                            upvotedIds.has(q.id)
                              ? "text-blue-400"
                              : "text-white/30 hover:text-white/60"
                          }`}
                        >
                          <ThumbsUp
                            weight={upvotedIds.has(q.id) ? "fill" : "bold"}
                            className="w-5 h-5"
                          />
                          <span className="text-[10px] font-bold tabular-nums">
                            {q.upvotes ?? 0}
                          </span>
                        </button>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white/90 leading-relaxed">
                            {q.content}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-white/30">
                              {q.authorName || "Anonymous"}
                            </span>
                            {q.status === "highlighted" && (
                              <span className="text-[10px] font-medium text-amber-400">
                                Highlighted
                              </span>
                            )}
                            {q.status === "answered" && (
                              <span className="text-[10px] font-medium text-emerald-400">
                                Answered
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  {questions.filter((q) => q.status !== "dismissed").length === 0 && (
                    <p className="text-center text-sm text-white/30 py-8">
                      No questions yet. Be the first to ask!
                    </p>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="polls"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-4 space-y-4"
              >
                {activePoll ? (
                  <PollCard
                    poll={activePoll}
                    hasVoted={votedPollIds.has(activePoll.id)}
                    selectedOption={selectedOption}
                    onSelectOption={setSelectedOption}
                    onVote={() => handleVote(activePoll.id)}
                    voting={voting}
                  />
                ) : (
                  <p className="text-center text-sm text-white/30 py-8">
                    No active poll right now. The presenter will open one soon.
                  </p>
                )}

                {/* Closed polls */}
                {polls
                  .filter((p) => p.status === "closed")
                  .map((poll) => (
                    <PollCard
                      key={poll.id}
                      poll={poll}
                      hasVoted={true}
                      selectedOption={null}
                      onSelectOption={() => {}}
                      onVote={() => {}}
                      voting={false}
                      closed
                    />
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PollCard
// ---------------------------------------------------------------------------

function PollCard({
  poll,
  hasVoted,
  selectedOption,
  onSelectOption,
  onVote,
  voting,
  closed = false,
}: {
  poll: LivePoll;
  hasVoted: boolean;
  selectedOption: number | null;
  onSelectOption: (idx: number) => void;
  onVote: () => void;
  voting: boolean;
  closed?: boolean;
}) {
  const options = (poll.options as string[]) || [];
  const showResults = hasVoted || closed;

  return (
    <div
      className={`p-4 rounded-xl border ${
        closed
          ? "bg-white/[0.02] border-white/5 opacity-70"
          : "bg-white/[0.03] border-white/10"
      }`}
    >
      <h3 className="text-sm font-semibold text-white mb-3">{poll.question}</h3>

      <div className="space-y-2">
        {options.map((option, idx) => {
          const voteCount =
            poll.responses.find((r) => r.optionIndex === idx)?.count ?? 0;
          const pct =
            poll.totalVotes > 0
              ? Math.round((voteCount / poll.totalVotes) * 100)
              : 0;

          return (
            <div key={idx}>
              {showResults ? (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/80">{option}</span>
                    <span className="text-white/50 tabular-nums">
                      {pct}% ({voteCount})
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => onSelectOption(idx)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                    selectedOption === idx
                      ? "bg-blue-500/15 border-blue-500/40 text-blue-300"
                      : "bg-white/[0.02] border-white/10 text-white/70 hover:bg-white/5"
                  }`}
                >
                  {option}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {!showResults && (
        <button
          onClick={onVote}
          disabled={selectedOption === null || voting}
          className="mt-3 w-full py-2.5 bg-blue-500 hover:bg-blue-400 disabled:bg-white/10 disabled:text-white/30 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {voting ? "Voting..." : "Vote"}
        </button>
      )}

      {showResults && (
        <p className="mt-2 text-[10px] text-white/30 text-center">
          {poll.totalVotes} vote{poll.totalVotes !== 1 ? "s" : ""}
          {closed ? " - Poll closed" : ""}
        </p>
      )}
    </div>
  );
}
