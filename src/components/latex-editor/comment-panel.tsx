"use client";

import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  ChatCircle,
  X,
  Check,
  DotsThree,
  PaperPlaneTilt,
  ArrowBendUpLeft,
} from "@phosphor-icons/react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CommentAuthor {
  id: string;
  name: string;
  avatar?: string;
}

interface Comment {
  id: string;
  lineNumber: number;
  author: CommentAuthor;
  content: string;
  parentId?: string;
  resolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
}

interface ApiComment {
  id: string;
  lineNumber: number;
  userId: string;
  userName?: string | null;
  userAvatar?: string | null;
  content: string;
  parentId?: string | null;
  resolved: boolean;
  resolvedAt?: string | null;
  resolvedBy?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface CommentPanelProps {
  fileId: string;
  projectId: string;
  currentLine?: number;
  onJumpToLine?: (line: number) => void;
  className?: string;
}

// ---------------------------------------------------------------------------
// Comment Thread Component
// ---------------------------------------------------------------------------

interface CommentThreadProps {
  comment: Comment;
  onReply: (parentId: string, content: string) => void;
  onResolve: (commentId: string, resolved: boolean) => void;
  onDelete: (commentId: string) => void;
  onJumpToLine?: (line: number) => void;
  isExpanded: boolean;
  onToggle: () => void;
}

function CommentThread({
  comment,
  onReply,
  onResolve,
  onDelete,
  onJumpToLine,
  isExpanded,
  onToggle,
}: CommentThreadProps) {
  const [replyText, setReplyText] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleSubmitReply = useCallback(() => {
    if (replyText.trim()) {
      onReply(comment.id, replyText.trim());
      setReplyText("");
      setShowReplyInput(false);
    }
  }, [comment.id, onReply, replyText]);

  const replyCount = comment.replies?.length ?? 0;
  const hasReplies = replyCount > 0;

  return (
    <div
      className={cn(
        "border-l-2 pl-3 py-2 transition-colors",
        comment.resolved
          ? "border-l-success bg-success/5 opacity-60"
          : "border-l-primary bg-surface"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0"
            style={{
              backgroundColor: stringToColor(comment.author.id),
            }}
          >
            {comment.author.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium truncate">
                {comment.author.name}
              </span>
              <button
                onClick={() => onJumpToLine?.(comment.lineNumber)}
                className="text-xs text-ink-muted hover:text-primary"
              >
                Line {comment.lineNumber}
              </button>
            </div>
            <span className="text-xs text-ink-muted">
              {formatRelativeTime(comment.createdAt)}
            </span>
          </div>
        </div>

        {/* Actions menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-ink/10 rounded transition-colors"
          >
            <DotsThree size={16} className="text-ink-muted" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-1 bg-surface border border-ink/10 rounded-lg shadow-lg py-1 min-w-[120px] z-10">
              <button
                onClick={() => {
                  onResolve(comment.id, !comment.resolved);
                  setShowMenu(false);
                }}
                className="w-full px-3 py-1.5 text-left text-sm hover:bg-ink/5 flex items-center gap-2"
              >
                <Check size={14} />
                {comment.resolved ? "Unresolve" : "Resolve"}
              </button>
              <button
                onClick={() => {
                  onDelete(comment.id);
                  setShowMenu(false);
                }}
                className="w-full px-3 py-1.5 text-left text-sm hover:bg-ink/5 text-error flex items-center gap-2"
              >
                <X size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mt-2 text-sm text-ink">{comment.content}</div>

      {/* Reply toggle */}
      {!comment.resolved && (
        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={() => setShowReplyInput(!showReplyInput)}
            className="text-xs text-ink-muted hover:text-primary flex items-center gap-1"
          >
            <ArrowBendUpLeft size={12} />
            Reply
          </button>
          {hasReplies && (
            <button
              onClick={onToggle}
              className="text-xs text-ink-muted hover:text-primary"
            >
              {isExpanded ? `Hide ${replyCount} replies` : `Show ${replyCount} replies`}
            </button>
          )}
        </div>
      )}

      {/* Reply input */}
      {showReplyInput && (
        <div className="mt-2 flex gap-2">
          <input aria-label="Text input"
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmitReply()}
            placeholder="Write a reply..."
            className="flex-1 px-2 py-1 text-sm border border-ink/20 rounded focus:outline-none focus:border-primary"
            autoFocus
          />
          <button
            onClick={handleSubmitReply}
            disabled={!replyText.trim()}
            className="p-1.5 bg-primary text-white rounded disabled:opacity-50"
          >
            <PaperPlaneTilt size={14} />
          </button>
        </div>
      )}

      {/* Replies */}
      {isExpanded && hasReplies && (
        <div className="mt-2 space-y-2 pl-4 border-l border-ink/10">
          {comment.replies?.map((reply) => (
            <div key={reply.id} className="py-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium text-white"
                  style={{ backgroundColor: stringToColor(reply.author.id) }}
                >
                  {reply.author.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-medium">{reply.author.name}</span>
                <span className="text-xs text-ink-muted">
                  {formatRelativeTime(reply.createdAt)}
                </span>
              </div>
              <div className="mt-1 text-xs text-ink ml-7">{reply.content}</div>
            </div>
          ))}
        </div>
      )}

      {/* Resolved badge */}
      {comment.resolved && comment.resolvedAt && (
        <div className="mt-2 flex items-center gap-1 text-xs text-success">
          <Check size={12} />
          Resolved {formatRelativeTime(comment.resolvedAt)}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Comment Panel Component
// ---------------------------------------------------------------------------

export function CommentPanel({
  fileId,
  projectId,
  currentLine,
  onJumpToLine,
  className,
}: CommentPanelProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCommentText, setNewCommentText] = useState("");
  const [newCommentLine, setNewCommentLine] = useState(currentLine ?? 1);
  const [showNewComment, setShowNewComment] = useState(false);
  const [expandedThreads, setExpandedThreads] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"all" | "unresolved">("unresolved");

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/latex/comments?fileId=${fileId}`);
        if (res.ok) {
          const data = await res.json();
          // Group replies under parent comments
          const grouped = groupComments((data.comments ?? []).map(normalizeComment));
          setComments(grouped);
        }
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [fileId]);

  // Create new comment
  const handleCreateComment = useCallback(async () => {
    if (!newCommentText.trim()) return;

    try {
      const res = await fetch("/api/latex/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileId,
          projectId,
          lineNumber: newCommentLine,
          content: newCommentText.trim(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setComments((prev) => [normalizeComment(data.comment), ...prev]);
        setNewCommentText("");
        setShowNewComment(false);
      }
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  }, [fileId, projectId, newCommentText, newCommentLine]);

  // Reply to comment
  const handleReply = useCallback(
    async (parentId: string, content: string) => {
      try {
        const res = await fetch("/api/latex/comments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileId,
            projectId,
            lineNumber: 0, // Replies don't have line numbers
            content,
            parentId,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const normalizedReply = normalizeComment(data.comment);
          // Add reply to parent comment
          setComments((prev) =>
            prev.map((c) => {
              if (c.id === parentId) {
                return {
                  ...c,
                  replies: [...(c.replies ?? []), normalizedReply],
                };
              }
              return c;
            })
          );
        }
      } catch (error) {
        console.error("Failed to reply:", error);
      }
    },
    [fileId, projectId]
  );

  // Resolve/unresolve comment
  const handleResolve = useCallback(
    async (commentId: string, resolved: boolean) => {
      try {
        const res = await fetch(`/api/latex/comments/${commentId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resolved }),
        });

        if (res.ok) {
          setComments((prev) =>
            prev.map((c) => (c.id === commentId ? { ...c, resolved } : c))
          );
        }
      } catch (error) {
        console.error("Failed to resolve:", error);
      }
    },
    []
  );

  // Delete comment
  const handleDelete = useCallback(async (commentId: string) => {
    try {
      const res = await fetch(`/api/latex/comments/${commentId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  }, []);

  // Toggle thread expansion
  const toggleExpanded = useCallback((commentId: string) => {
    setExpandedThreads((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
      }
      return next;
    });
  }, []);

  // Filter comments
  const filteredComments =
    filter === "unresolved"
      ? comments.filter((c) => !c.resolved)
      : comments;

  // Group comments by line for line markers (exported for use in editor gutter)
  const _commentsByLine = groupByLine(comments);

  return (
    <div className={cn("flex flex-col h-full bg-surface", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-ink/10">
        <div className="flex items-center gap-2">
          <ChatCircle size={18} className="text-primary" />
          <span className="font-medium">Comments</span>
          <span className="text-xs text-ink-muted bg-ink/10 px-1.5 py-0.5 rounded">
            {comments.filter((c) => !c.resolved).length}
          </span>
        </div>
        <button
          onClick={() => {
            setNewCommentLine(currentLine ?? 1);
            setShowNewComment(true);
          }}
          className="text-xs bg-primary text-white px-2 py-1 rounded hover:bg-primary/90"
        >
          Add Comment
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-1 p-2 border-b border-ink/10">
        <button
          onClick={() => setFilter("unresolved")}
          className={cn(
            "text-xs px-2 py-1 rounded transition-colors",
            filter === "unresolved"
              ? "bg-primary text-white"
              : "bg-ink/5 text-ink-muted hover:bg-ink/10"
          )}
        >
          Unresolved
        </button>
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "text-xs px-2 py-1 rounded transition-colors",
            filter === "all"
              ? "bg-primary text-white"
              : "bg-ink/5 text-ink-muted hover:bg-ink/10"
          )}
        >
          All
        </button>
      </div>

      {/* New comment form */}
      {showNewComment && (
        <div className="p-3 border-b border-ink/10 bg-primary/5">
          <div className="flex items-center gap-2 mb-2">
            <label className="text-xs text-ink-muted">Line:</label>
            <input aria-label="Number input"
              type="number"
              value={newCommentLine}
              onChange={(e) => setNewCommentLine(parseInt(e.target.value) || 1)}
              min={1}
              className="w-16 px-2 py-0.5 text-sm border border-ink/20 rounded"
            />
          </div>
          <textarea aria-label="Text area"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-2 py-1.5 text-sm border border-ink/20 rounded resize-none focus:outline-none focus:border-primary"
            rows={3}
            autoFocus
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => setShowNewComment(false)}
              className="text-xs px-2 py-1 text-ink-muted hover:text-ink"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateComment}
              disabled={!newCommentText.trim()}
              className="text-xs bg-primary text-white px-3 py-1 rounded disabled:opacity-50"
            >
              Comment
            </button>
          </div>
        </div>
      )}

      {/* Comments list */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-20 text-ink-muted text-sm">
            Loading...
          </div>
        ) : filteredComments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-20 text-ink-muted">
            <ChatCircle size={24} className="opacity-30 mb-2" />
            <span className="text-sm">No comments yet</span>
          </div>
        ) : (
          <div className="divide-y divide-ink/5">
            {filteredComments.map((comment) => (
              <CommentThread
                key={comment.id}
                comment={comment}
                onReply={handleReply}
                onResolve={handleResolve}
                onDelete={handleDelete}
                onJumpToLine={onJumpToLine}
                isExpanded={expandedThreads.has(comment.id)}
                onToggle={() => toggleExpanded(comment.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Comment Gutter Marker Component
// ---------------------------------------------------------------------------

interface CommentGutterMarkerProps {
  lineNumber: number;
  commentCount: number;
  hasUnresolved: boolean;
  onClick: () => void;
}

export function CommentGutterMarker({
  lineNumber,
  commentCount,
  hasUnresolved,
  onClick,
}: CommentGutterMarkerProps) {
  if (commentCount === 0) return null;

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-medium transition-colors",
        hasUnresolved
          ? "bg-primary text-white hover:bg-primary/80"
          : "bg-success/50 text-white hover:bg-success/70"
      )}
      title={`${commentCount} comment${commentCount > 1 ? "s" : ""} on line ${lineNumber}`}
    >
      {commentCount > 9 ? "9+" : commentCount}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

function stringToColor(str: string): string {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
    "#F7DC6F",
  ];
  const hash = str.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

function groupComments(flatComments: Comment[]): Comment[] {
  const roots: Comment[] = [];
  const repliesByParent = new Map<string, Comment[]>();

  // Separate roots and replies
  for (const comment of flatComments) {
    if (comment.parentId) {
      const replies = repliesByParent.get(comment.parentId) ?? [];
      replies.push(comment);
      repliesByParent.set(comment.parentId, replies);
    } else {
      roots.push(comment);
    }
  }

  // Attach replies to roots
  return roots.map((root) => ({
    ...root,
    replies: repliesByParent.get(root.id) ?? [],
  }));
}

function normalizeComment(comment: ApiComment): Comment {
  return {
    id: comment.id,
    lineNumber: comment.lineNumber,
    author: {
      id: comment.userId,
      name: comment.userName?.trim() || "Anonymous",
      avatar: comment.userAvatar ?? undefined,
    },
    content: comment.content,
    parentId: comment.parentId ?? undefined,
    resolved: comment.resolved,
    resolvedAt: comment.resolvedAt ?? undefined,
    resolvedBy: comment.resolvedBy ?? undefined,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };
}

function groupByLine(comments: Comment[]): Map<number, { count: number; hasUnresolved: boolean }> {
  const byLine = new Map<number, { count: number; hasUnresolved: boolean }>();

  for (const comment of comments) {
    const existing = byLine.get(comment.lineNumber) ?? {
      count: 0,
      hasUnresolved: false,
    };
    existing.count++;
    if (!comment.resolved) {
      existing.hasUnresolved = true;
    }
    byLine.set(comment.lineNumber, existing);
  }

  return byLine;
}

export { groupByLine, groupComments };
