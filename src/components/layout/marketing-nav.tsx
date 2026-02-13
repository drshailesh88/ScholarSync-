import Link from "next/link";
import { SquaresFour } from "@phosphor-icons/react/dist/ssr";

export function MarketingNav() {
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="glass-panel rounded-full px-6 py-3 flex items-center gap-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white text-xs">
            <SquaresFour size={14} weight="fill" />
          </div>
          <span className="font-semibold tracking-tight text-sm text-white">
            ScholarSync
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-[#94a3b8]">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
        </div>

        <div className="w-px h-4 bg-white/10 hidden md:block" />

        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="text-xs font-medium text-[#94a3b8] hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="bg-gradient-to-r from-indigo-500 to-sky-500 text-white px-4 py-1.5 rounded-full text-xs font-bold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(99,102,241,0.3)]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
