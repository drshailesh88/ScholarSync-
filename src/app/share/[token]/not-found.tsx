import Link from "next/link";

export default function ShareNotFound() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#f1f5f9] mb-4">404</h1>
        <p className="text-lg text-[#94a3b8] mb-2">
          Presentation not found
        </p>
        <p className="text-sm text-[#64748b] mb-8 max-w-md">
          This shared link may have expired, been disabled by the owner, or
          the presentation may no longer exist.
        </p>
        <Link
          href="/"
          className="inline-flex px-5 py-2.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-medium rounded-lg transition-colors"
        >
          Go to ScholarSync
        </Link>
      </div>
    </div>
  );
}
