"use client";

import { Rss } from "@phosphor-icons/react";
import { useDomain } from "@/components/providers/domain-provider";
import { EmptyState } from "@/components/ui/empty-state";
import type { DomainConfig } from "@/lib/search/domains";

interface FeedEmptyStateProps {
  onAddFeed: () => void;
}

export function getFeedEmptyStateDescription(
  domain: Pick<DomainConfig, "id"> | null,
) {
  const suggestion =
    domain?.id === "medicine"
      ? "Follow journals like NEJM, The Lancet, JAMA, and BMJ."
      : domain?.id === "physics"
        ? "Follow journals like Nature Physics, Physical Review Letters, and arXiv feeds."
        : domain?.id === "computer_science"
          ? "Follow journals like ACM Computing Surveys, IEEE Transactions, and arXiv cs feeds."
          : "Follow academic journals and RSS feeds in your field.";

  return `Subscribe to journals, search feeds, or any RSS feed to stay current with the latest research. ${suggestion}`;
}

export function FeedEmptyState({ onAddFeed }: FeedEmptyStateProps) {
  const domain = useDomain();

  return (
    <EmptyState
      icon={Rss}
      title="Your Journal Feed is empty"
      description={getFeedEmptyStateDescription(domain)}
      actionLabel="Add Your First Feed"
      onAction={onAddFeed}
    />
  );
}
