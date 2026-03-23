import Link from "next/link";

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-[201] w-full border-b border-black/[0.06] backdrop-blur-[12px] bg-white/90">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between h-14 px-6 md:px-9">
        <Link
          href="/"
          className="flex items-center gap-2"
          style={{ color: "#1E1145" }}
        >
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="10" fill="#6D28D9" />
            <text
              x="50%"
              y="54%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontFamily="Source Serif 4,serif"
              fontSize="20"
              fontWeight="700"
            >
              S
            </text>
          </svg>
          <span className="text-xl font-bold tracking-tight">ScholarSync</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-sm font-medium transition-colors hover:text-[#241013]"
            style={{ color: "rgba(36,16,19,0.65)" }}
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-sm font-medium transition-colors hover:text-[#241013]"
            style={{ color: "rgba(36,16,19,0.65)" }}
          >
            Blog
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm font-medium transition-colors hover:text-[#241013]"
            style={{ color: "rgba(36,16,19,0.65)" }}
          >
            Log in
          </Link>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-1.5 bg-[#6D28D9] text-white text-sm font-medium px-5 py-2 rounded-md transition-colors hover:bg-[#5B21B6]"
          >
            Get started
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 16 16"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </nav>
    </header>
  );
}
