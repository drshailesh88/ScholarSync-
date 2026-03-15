"use client";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h2 className="text-lg font-semibold text-red-500">Unable to load this page</h2>
      <p className="text-sm text-gray-500">{error.message || "An unexpected error occurred"}</p>
      <button
        onClick={reset}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}

