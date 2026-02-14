import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-ink mb-2">404</h1>
        <h2 className="text-xl font-semibold text-ink mb-4">Page not found</h2>
        <p className="text-sm text-ink-muted max-w-sm mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
