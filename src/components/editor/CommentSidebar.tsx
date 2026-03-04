"use client";

import { useState, useEffect, useCallback } from "react";
import type { Editor } from "@tiptap/react";
import {
  ChatCircle,
  FunnelSimple,
  X,
  Check,
  ArrowBendDownRight,
  Trash,
  ArrowClockwise,
  TextB,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  getDocumentCommentsLocal,
  addDocumentCommentLocal,
  resolveDocumentCommentLocal,
  unresolveDocumentCommentLocal,
  deleteDocumentCommentLocal,
} from "@/lib/editor/document-comments-local";
import type {
  DocumentCommentThread,
  DocumentComment,
} from "@/lib/actions/document-comments";

type FilterMode = "all" | "unresolved" | "resolved";

interface NewInlineCommentEvent {
  textRangeStart: number;
  textRangeEnd: number;
  quotedText: string;
}

interface CommentSidebarProps {
  documentId: string;
  editor: Editor;
  onClose: () => void;
}

export function CommentSidebar({
  documentId,
  editor,
  onClose,
}: CommentSidebarProps) {
  const [threads, setThreads] = useState<DocumentCommentThread[]>([]);
  const [filter, setFilter] = useState<FilterMode>("all");
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [pendingInlineComment, setPendingInlineComment] =
    useState<NewInlineCommentEvent | null>(null);

  // Load comments on mount and when documentId changes
  useEffect(() => {
    setThreads(getDocumentCommentsLocal(documentId));
  }, [documentId]);

  // Reload comments helper (for use in event handlers)
  const reloadComments = useCallback(() => {
    setThreads(getDocumentCommentsLocal(documentId));
  }, [documentId]);

  // Listen for new inline comment events from SelectionToolbar
  useEffect(() => {
    function handleNewInlineComment(e: Event) {
      const detail = (e as CustomEvent<NewInlineCommentEvent>).detail;
      if (detail) {
        setPendingInlineComment(detail);
        setReplyTo("new-inline");
        setReplyContent("");
      }
    }

    window.addEventListener("scholarsync:new-inline-comment", handleNewInlineComment);
    return () => {
      window.removeEventListener(
        "scholarsync:new-inline-comment",
        handleNewInlineComment
      );
    };
  }, []);

  // Filter comments
  const filteredThreads = threads.filter((thread) => {
    if (filter === "all") return true;
    if (filter === "unresolved") return !thread.comment.isResolved;
    return thread.comment.isResolved;
  });

  // Scroll to comment in editor
  const scrollToComment = useCallback(
    (comment: DocumentComment) => {
      if (
        comment.textRangeStart !== null &&
        comment.textRangeEnd !== null
      ) {
        editor
          .chain()
          .focus()
          .setTextSelection({
            from: comment.textRangeStart,
            to: comment.textRangeEnd,
          })
          .scrollIntoView()
          .run();
      }
    },
    [editor]
  );

  // Format timestamp
  const formatTimestamp = useCallback((isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  }, []);

  // Add a new comment
  const handleAddComment = useCallback(() => {
    if (!newComment.trim()) return;

    if (pendingInlineComment) {
      // Add as inline comment
      addDocumentCommentLocal(documentId, {
        content: newComment.trim(),
        textRangeStart: pendingInlineComment.textRangeStart,
        textRangeEnd: pendingInlineComment.textRangeEnd,
        quotedText: pendingInlineComment.quotedText,
      });
      setPendingInlineComment(null);
    } else {
      // Add as general document comment
      addDocumentCommentLocal(documentId, {
        content: newComment.trim(),
      });
    }

    setNewComment("");
    setReplyTo(null);
    reloadComments();
  }, [newComment, pendingInlineComment, documentId, reloadComments]);

  // Add a reply
  const handleReply = useCallback(
    (parentId: string) => {
      if (!replyContent.trim()) return;

      addDocumentCommentLocal(documentId, {
        content: replyContent.trim(),
        parentCommentId: parentId,
      });

      setReplyContent("");
      setReplyTo(null);
      setPendingInlineComment(null);
      reloadComments();
    },
    [replyContent, documentId, reloadComments]
  );

  // Toggle resolve status
  const handleToggleResolve = useCallback(
    (commentId: string, isResolved: boolean) => {
      if (isResolved) {
        unresolveDocumentCommentLocal(documentId, commentId);
      } else {
        resolveDocumentCommentLocal(documentId, commentId);
      }
      reloadComments();
    },
    [documentId, reloadComments]
  );

  // Delete comment
  const handleDelete = useCallback(
    (commentId: string) => {
      deleteDocumentCommentLocal(documentId, commentId);
      reloadComments();
    },
    [documentId, reloadComments]
  );

  const totalUnresolved = threads.filter((t) => !t.comment.isResolved).length;

  return (
    <div className="w-80 bg-surface border-l border-border flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <ChatCircle size={16} className="text-ink-muted" />
          <h3 className="text-sm font-semibold text-ink">Comments</h3>
          {totalUnresolved > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-500">
              {totalUnresolved}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-surface-raised text-ink-muted transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-border/50">
        <FunnelSimple size={12} className="text-ink-muted mr-1" />
        {(["all", "unresolved", "resolved"] as FilterMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setFilter(mode)}
            className={cn(
              "px-2 py-1 rounded text-[10px] font-medium capitalize transition-colors",
              filter === mode
                ? "bg-brand/10 text-brand"
                : "text-ink-muted hover:bg-surface-raised"
            )}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Pending inline comment indicator */}
        {replyTo === "new-inline" && pendingInlineComment && (
          <div className="p-3 rounded-lg bg-brand/5 border border-brand/20">
            <div className="flex items-center gap-2 mb-2">
              <TextB size={12} className="text-brand" />
              <span className="text-[10px] font-medium text-brand uppercase">
                Commenting on selection
              </span>
            </div>
            {pendingInlineComment.quotedText && (
              <blockquote className="text-[11px] text-ink-muted italic border-l-2 border-brand/30 pl-2 mb-2 truncate">
                &ldquo;{pendingInlineComment.quotedText}&rdquo;
              </blockquote>
            )}
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
              placeholder="Add a comment..."
              className="w-full px-3 py-2 text-xs rounded-lg bg-surface border border-border text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-1 focus:ring-brand/50"
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => {
                  setReplyTo(null);
                  setPendingInlineComment(null);
                  setNewComment("");
                }}
                className="px-2.5 py-1 text-[10px] font-medium rounded-lg text-ink-muted hover:bg-surface-raised transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="px-2.5 py-1 text-[10px] font-medium rounded-lg bg-brand text-white hover:bg-brand/90 disabled:opacity-50 transition-colors"
              >
                Add Comment
              </button>
            </div>
          </div>
        )}

        {/* Comment threads */}
        {filteredThreads.length === 0 && replyTo !== "new-inline" && (
          <div className="text-center py-8">
            <ChatCircle size={32} className="mx-auto text-ink-muted/30 mb-2" />
            <p className="text-sm text-ink-muted">No comments yet</p>
            <p className="text-xs text-ink-muted/70 mt-1">
              Select text and click the comment button to start
            </p>
          </div>
        )}

        {filteredThreads.map((thread) => (
          <div key={thread.comment.id} className="space-y-2">
            {/* Top-level comment */}
            <CommentBubble
              comment={thread.comment}
              isOwner={thread.comment.userId === "local-user"}
              onToggleResolve={handleToggleResolve}
              onDelete={handleDelete}
              onReply={() => {
                setReplyTo(
                  replyTo === thread.comment.id ? null : thread.comment.id
                );
                setReplyContent("");
              }}
              onScrollToComment={scrollToComment}
              isReplyOpen={replyTo === thread.comment.id}
              formatTimestamp={formatTimestamp}
            />

            {/* Replies */}
            {thread.replies.length > 0 && (
              <div className="ml-4 space-y-2">
                {thread.replies.map((reply) => (
                  <CommentBubble
                    key={reply.id}
                    comment={reply}
                    isOwner={reply.userId === "local-user"}
                    onToggleResolve={handleToggleResolve}
                    onDelete={handleDelete}
                    onScrollToComment={scrollToComment}
                    formatTimestamp={formatTimestamp}
                    isReply
                  />
                ))}
              </div>
            )}

            {/* Reply input */}
            {replyTo === thread.comment.id && (
              <div className="ml-4 flex gap-2">
                <input
                  type="text"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleReply(thread.comment.id);
                    }
                  }}
                  placeholder="Write a reply..."
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-surface-raised border border-border text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-1 focus:ring-brand/50"
                  autoFocus
                />
                <button
                  onClick={() => handleReply(thread.comment.id)}
                  disabled={!replyContent.trim()}
                  className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-brand text-white hover:bg-brand/90 disabled:opacity-50 transition-colors"
                >
                  Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New comment input (at bottom) */}
      {replyTo !== "new-inline" && (
        <div className="p-3 border-t border-border">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAddComment();
              }
            }}
            placeholder="Add a comment..."
            className="w-full px-3 py-2 text-xs rounded-lg bg-surface-raised border border-border text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-1 focus:ring-brand/50"
          />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// CommentBubble sub-component
// ---------------------------------------------------------------------------

interface CommentBubbleProps {
  comment: DocumentComment;
  isOwner: boolean;
  onToggleResolve: (id: string, isResolved: boolean) => void;
  onDelete: (id: string) => void;
  onScrollToComment: (comment: DocumentComment) => void;
  formatTimestamp: (isoString: string) => string;
  onReply?: () => void;
  isReply?: boolean;
  isReplyOpen?: boolean;
}

function CommentBubble({
  comment,
  isOwner,
  onToggleResolve,
  onDelete,
  onScrollToComment,
  formatTimestamp,
  onReply,
  isReply = false,
  isReplyOpen = false,
}: CommentBubbleProps) {
  return (
    <div
      className={cn(
        "group rounded-lg p-3 text-xs transition-colors",
        comment.isResolved
          ? "bg-surface-raised/50 opacity-70"
          : "bg-surface-raised"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center text-[9px] font-bold text-brand">
          {(comment.userName ?? "U")[0].toUpperCase()}
        </div>
        <span
          className={cn(
            "font-medium",
            comment.isResolved ? "line-through text-ink-muted" : "text-ink"
          )}
        >
          {comment.userName ?? "User"}
        </span>
        <span className="text-ink-muted/60 text-[10px]">
          {formatTimestamp(comment.createdAt)}
        </span>
        {comment.isResolved && (
          <span className="ml-auto px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-emerald-500/10 text-emerald-500">
            Resolved
          </span>
        )}
      </div>

      {/* Quoted text for inline comments */}
      {comment.quotedText && (
        <button
          onClick={() => onScrollToComment(comment)}
          className="w-full text-left mb-2 p-2 rounded bg-surface border border-border/50 hover:border-brand/30 transition-colors group/bubble"
        >
          <blockquote className="text-[10px] text-ink-muted/70 truncate flex items-start gap-1">
            <TextB size={10} className="text-brand/50 shrink-0 mt-0.5" />
            &ldquo;{comment.quotedText}&rdquo;
          </blockquote>
        </button>
      )}

      {/* Content */}
      <p
        className={cn(
          "text-ink leading-relaxed",
          comment.isResolved && "line-through text-ink-muted"
        )}
      >
        {comment.content}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isReply && (
          <button
            onClick={() => onToggleResolve(comment.id, comment.isResolved)}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-colors",
              comment.isResolved
                ? "text-amber-500 hover:bg-amber-500/10"
                : "text-emerald-500 hover:bg-emerald-500/10"
            )}
          >
            {comment.isResolved ? (
              <>
                <ArrowClockwise size={10} /> Unresolve
              </>
            ) : (
              <>
                <Check size={10} /> Resolve
              </>
            )}
          </button>
        )}

        {!isReply && onReply && (
          <button
            onClick={onReply}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-colors",
              isReplyOpen
                ? "text-brand bg-brand/10"
                : "text-ink-muted hover:bg-surface-raised"
            )}
          >
            <ArrowBendDownRight size={10} /> Reply
          </button>
        )}

        {isOwner && (
          <button
            onClick={() => onDelete(comment.id)}
            className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium text-red-500 hover:bg-red-500/10 transition-colors ml-auto"
          >
            <Trash size={10} /> Delete
          </button>
        )}
      </div>
    </div>
  );
}
