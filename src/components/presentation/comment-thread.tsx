"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Check,
  ArrowBendDownRight,
  Trash,
  ArrowClockwise,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { CommentWithReplies } from "@/lib/actions/comments";
import {
  addComment,
  resolveComment,
  unresolveComment,
  deleteComment,
} from "@/lib/actions/comments";

interface CommentThreadProps {
  slideId: number;
  deckId: number;
  comments: CommentWithReplies[];
  currentUserId: string;
  onRefresh: () => void;
}

export function CommentThread({
  slideId,
  deckId,
  comments,
  currentUserId,
  onRefresh,
}: CommentThreadProps) {
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  async function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      await addComment(slideId, deckId, newComment.trim());
      setNewComment("");
      onRefresh();
    } catch (err) {
      console.error("Failed to add comment:", err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReply(parentId: string) {
    if (!replyContent.trim()) return;
    setSubmitting(true);
    try {
      await addComment(slideId, deckId, replyContent.trim(), parentId);
      setReplyContent("");
      setReplyTo(null);
      onRefresh();
    } catch (err) {
      console.error("Failed to reply:", err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResolve(commentId: string, isResolved: boolean) {
    try {
      if (isResolved) {
        await unresolveComment(commentId);
      } else {
        await resolveComment(commentId);
      }
      onRefresh();
    } catch (err) {
      console.error("Failed to resolve:", err);
    }
  }

  async function handleDelete(commentId: string) {
    try {
      await deleteComment(commentId);
      onRefresh();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div key={comment.id} className="space-y-2">
          <CommentBubble
            comment={comment}
            currentUserId={currentUserId}
            onResolve={handleResolve}
            onDelete={handleDelete}
            onReply={() => {
              setReplyTo(replyTo === comment.id ? null : comment.id);
              setReplyContent("");
            }}
            isReplyOpen={replyTo === comment.id}
          />

          {/* Replies */}
          {comment.replies.length > 0 && (
            <div className="ml-6 space-y-2">
              {comment.replies.map((reply) => (
                <CommentBubble
                  key={reply.id}
                  comment={reply}
                  currentUserId={currentUserId}
                  onResolve={handleResolve}
                  onDelete={handleDelete}
                  isReply
                />
              ))}
            </div>
          )}

          {/* Reply input */}
          {replyTo === comment.id && (
            <div className="ml-6 flex gap-2">
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleReply(comment.id);
                  }
                }}
                placeholder="Write a reply..."
                className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-surface-raised border border-border text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-1 focus:ring-brand/50"
                autoFocus
                disabled={submitting}
              />
              <button
                onClick={() => handleReply(comment.id)}
                disabled={submitting || !replyContent.trim()}
                className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-brand text-white hover:bg-brand/90 disabled:opacity-50 transition-colors"
              >
                Reply
              </button>
            </div>
          )}
        </div>
      ))}

      {/* New comment input */}
      <form onSubmit={handleAddComment} className="flex gap-2 pt-2 border-t border-border/50">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 px-3 py-2 text-xs rounded-lg bg-surface-raised border border-border text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-1 focus:ring-brand/50"
          disabled={submitting}
        />
        <button
          type="submit"
          disabled={submitting || !newComment.trim()}
          className="px-3 py-2 text-xs font-medium rounded-lg bg-brand text-white hover:bg-brand/90 disabled:opacity-50 transition-colors"
        >
          Post
        </button>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CommentBubble sub-component
// ---------------------------------------------------------------------------

function CommentBubble({
  comment,
  currentUserId,
  onResolve,
  onDelete,
  onReply,
  isReply = false,
  isReplyOpen = false,
}: {
  comment: CommentWithReplies;
  currentUserId: string;
  onResolve: (id: string, resolved: boolean) => void;
  onDelete: (id: string) => void;
  onReply?: () => void;
  isReply?: boolean;
  isReplyOpen?: boolean;
}) {
  const isOwner = comment.userId === currentUserId;
  const isResolved = comment.resolved ?? false;

  return (
    <div
      className={cn(
        "group rounded-lg p-3 text-xs transition-colors",
        isResolved
          ? "bg-surface-raised/50 opacity-70"
          : "bg-surface-raised"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-1.5">
        {comment.userAvatar ? (
          <Image
            src={comment.userAvatar}
            alt=""
            width={20}
            height={20}
            className="w-5 h-5 rounded-full"
          />
        ) : (
          <div className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center text-[9px] font-bold text-brand">
            {(comment.userName ?? "U")[0].toUpperCase()}
          </div>
        )}
        <span
          className={cn(
            "font-medium",
            isResolved ? "line-through text-ink-muted" : "text-ink"
          )}
        >
          {comment.userName ?? "User"}
        </span>
        <span className="text-ink-muted/60 text-[10px]">
          {new Date(comment.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        {isResolved && (
          <span className="ml-auto px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-emerald-500/10 text-emerald-500">
            Resolved
          </span>
        )}
      </div>

      {/* Content */}
      <p
        className={cn(
          "text-ink leading-relaxed",
          isResolved && "line-through text-ink-muted"
        )}
      >
        {comment.content}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isReply && (
          <button
            onClick={() => onResolve(comment.id, isResolved)}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-colors",
              isResolved
                ? "text-amber-500 hover:bg-amber-500/10"
                : "text-emerald-500 hover:bg-emerald-500/10"
            )}
          >
            {isResolved ? (
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
