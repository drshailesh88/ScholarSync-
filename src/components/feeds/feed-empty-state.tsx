"use client";

import { Rss } from "@phosphor-icons/react";
import { EmptyState } from "@/components/ui/empty-state";

interface FeedEmptyStateProps {
  onAddFeed: () => void;
}

export function FeedEmptyState({ onAddFeed }: FeedEmptyStateProps) {
  return (
    <EmptyState
      icon={Rss}
      title="Your Journal Feed is empty"
      description="Subscribe to medical journals, PubMed searches, or any RSS feed to stay current with the latest research."
      actionLabel="Add Your First Feed"
      onAction={onAddFeed}
    />
  );
}
