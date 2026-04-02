export default function LibraryItemLoading() {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--brand)]" />
        <p className="text-sm text-[var(--ink-muted)]">Loading source...</p>
      </div>
    </div>
  );
}
