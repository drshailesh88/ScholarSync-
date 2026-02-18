import Link from "next/link";

export function MarketingNav() {
  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-brand flex items-center justify-center">
            <span className="font-serif text-white font-bold text-sm leading-none">S</span>
          </div>
          <span className="font-serif font-semibold tracking-tight text-ink">
            ScholarSync
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-ink-muted">
          <a href="#features" className="hover:text-ink transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-ink transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="hover:text-ink transition-colors">
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="text-sm text-ink-muted hover:text-ink transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="bg-ink text-background px-4 py-2 rounded text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Start Writing — Free
          </Link>
        </div>
      </div>
    </nav>
  );
}
