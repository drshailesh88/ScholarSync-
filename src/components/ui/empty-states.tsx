"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

/**
 * Reusable empty state component for when no data, no results, or nothing here yet.
 * Use this to get started with consistent empty states across the app.
 */
export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      {icon && <div className="mb-4 text-ink-muted">{icon}</div>}
      <h3 className="text-sm font-medium text-ink mb-1">{title}</h3>
      {description && <p className="text-xs text-ink-muted max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// Pre-built empty state variants for common scenarios

/** Show when search returns no results */
export function NoResultsState({ query, onClear }: { query?: string; onClear?: () => void }) {
  return (
    <EmptyState
      title="No results found"
      description={query ? `No results match "${query}". Try a different search term.` : "No results to display."}
      action={
        onClear ? (
          <button onClick={onClear} className="text-xs text-brand hover:text-brand-hover font-medium">
            Clear search
          </button>
        ) : undefined
      }
    />
  );
}

/** Show when a list or collection is empty */
export function EmptyListState({ noun, onAdd }: { noun: string; onAdd?: () => void }) {
  return (
    <EmptyState
      title={`No ${noun} yet`}
      description={`Nothing here yet. Get started by adding your first ${noun}.`}
      action={
        onAdd ? (
          <button
            onClick={onAdd}
            className="px-4 py-2 text-xs font-medium text-white bg-brand rounded-lg hover:bg-brand-hover"
          >
            Add {noun}
          </button>
        ) : undefined
      }
    />
  );
}

/** Show when no data is available */
export function NoDataState({ message }: { message?: string }) {
  return (
    <EmptyState
      title="No data available"
      description={message || "There is no data to display at this time."}
    />
  );
}

/** Show when a feature area is empty and needs user action */
export function GetStartedState({ feature, description, action }: { feature: string; description: string; action?: ReactNode }) {
  return (
    <EmptyState
      title={`Get started with ${feature}`}
      description={description}
      action={action}
    />
  );
}

/** Show when a document is empty */
export function EmptyDocumentState() {
  return (
    <EmptyState
      title="Empty document"
      description="Nothing here yet. Start typing to get started."
    />
  );
}

/** Show when a project has no items */
export function EmptyProjectState({ onCreateItem }: { onCreateItem?: () => void }) {
  return (
    <EmptyState
      title="No items in this project"
      description="Get started by creating your first item."
      action={
        onCreateItem ? (
          <button
            onClick={onCreateItem}
            className="px-4 py-2 text-xs font-medium text-white bg-brand rounded-lg hover:bg-brand-hover"
          >
            Create item
          </button>
        ) : undefined
      }
    />
  );
}

/** Show when search/filter finds nothing */
export function EmptyFilterState({ onReset }: { onReset?: () => void }) {
  return (
    <EmptyState
      title="No results match your filters"
      description="Try adjusting your search or filters to find what you're looking for."
      action={
        onReset ? (
          <button onClick={onReset} className="text-xs text-brand hover:text-brand-hover font-medium">
            Clear all filters
          </button>
        ) : undefined
      }
    />
  );
}

/** Show when a collection/library is empty */
export function EmptyLibraryState() {
  return (
    <EmptyState
      title="Your library is empty"
      description="No data here yet. Get started by adding papers from your research."
    />
  );
}

/** Show when feed/notifications are empty */
export function EmptyFeedState() {
  return (
    <EmptyState
      title="No new items"
      description="Nothing here right now. Check back later for updates."
    />
  );
}

/** Show when analysis has no results */
export function NoAnalysisResults() {
  return (
    <EmptyState
      title="No analysis results"
      description="No data to analyze. Get started by entering text or selecting a document."
    />
  );
}
