import Link from "next/link";
import { MarketingNav } from "@/components/layout/marketing-nav";
import {
  GlobeHemisphereWest,
  Brain,
  PenNib,
  ShieldCheck,
  ArrowRight,
  Sparkle,
  SquaresFour,
  Check,
} from "@phosphor-icons/react/dist/ssr";

export default function LandingPage() {
  return (
    <div className="bg-[#020617] text-[#f1f5f9] font-sans antialiased overflow-x-hidden selection:bg-sky-500 selection:text-white">
      <MarketingNav />

      {/* Hero */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.12),transparent)] opacity-50 blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-xs font-medium mb-8 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>Now in Beta</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-light leading-[1.1] mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50">
              Think Clearly.
            </span>
            <br />
            <span className="italic text-white text-glow">Write Deeply.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#94a3b8] max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Escape the noise. ScholarSync is a luminous workspace designed for
            the flow state, combining deep research, architectural outlining, and
            distraction-free writing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sign-up"
              className="group relative px-8 py-4 bg-sky-500 text-white rounded-full font-medium transition-all hover:scale-105 hover:shadow-[0_0_80px_-20px_rgba(14,165,233,0.3)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
              <span className="relative flex items-center gap-2">
                Start Researching <ArrowRight size={16} />
              </span>
            </Link>
            <a
              href="#demo"
              className="px-8 py-4 glass-panel text-[#94a3b8] hover:text-white rounded-full font-medium transition-all hover:border-white/20"
            >
              View Demo
            </a>
          </div>
        </div>

        {/* App Preview */}
        <div
          id="demo"
          className="mt-24 max-w-6xl mx-auto relative group"
        >
          <div className="absolute inset-0 bg-sky-500/10 blur-[80px] -z-10 rounded-full" />
          <div className="glass-panel rounded-xl border border-white/10 p-2 shadow-2xl relative overflow-hidden">
            <div className="h-10 bg-black/40 border-b border-white/5 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
              </div>
              <div className="mx-auto bg-white/5 px-4 py-1 rounded-md text-[10px] text-[#94a3b8] font-mono">
                scholarsync.app/studio
              </div>
            </div>
            <div className="bg-[#0f172a] h-[400px] md:h-[600px] flex">
              <div className="w-64 border-r border-white/5 p-6 hidden md:block">
                <div className="space-y-4">
                  <div className="h-4 w-24 bg-white/10 rounded" />
                  <div className="h-4 w-32 bg-white/5 rounded" />
                  <div className="h-4 w-20 bg-white/5 rounded" />
                </div>
              </div>
              <div className="flex-1 p-8 md:p-16 flex justify-center bg-[#020617]">
                <div className="w-full max-w-2xl bg-[#0f172a] border border-white/5 rounded-lg shadow-2xl p-8 md:p-12">
                  <div className="h-12 w-3/4 bg-white/10 rounded mb-8" />
                  <div className="space-y-4">
                    <div className="h-4 w-full bg-white/5 rounded" />
                    <div className="h-4 w-full bg-white/5 rounded" />
                    <div className="h-4 w-2/3 bg-white/5 rounded" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-10 right-10 glass-panel p-4 rounded-xl hidden md:flex items-center gap-3 animate-bounce">
              <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white">
                <Sparkle size={16} weight="fill" />
              </div>
              <div className="text-sm text-white">
                Citation Audit Complete: 100% Integrity
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-32 px-6 bg-[#0f172a] relative border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Built for Researchers
            </h2>
            <p className="text-[#94a3b8] max-w-xl mx-auto">
              Every feature designed to keep you in flow state.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform">
                <GlobeHemisphereWest size={24} />
              </div>
              <h3 className="font-serif text-xl text-white mb-3">
                Deep Research
              </h3>
              <p className="text-[#94a3b8] text-sm leading-relaxed">
                Search 200M+ papers from PubMed and Semantic Scholar. Find
                consensus, not just citations.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Brain size={24} />
              </div>
              <h3 className="font-serif text-xl text-white mb-3">
                Socratic Co-Pilot
              </h3>
              <p className="text-[#94a3b8] text-sm leading-relaxed">
                It doesn&apos;t write for you; it thinks with you. Challenge
                arguments and detect weak claims in real time.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 mb-6 group-hover:scale-110 transition-transform">
                <PenNib size={24} />
              </div>
              <h3 className="font-serif text-xl text-white mb-3">
                Luminous Editor
              </h3>
              <p className="text-[#94a3b8] text-sm leading-relaxed">
                A writing surface that respects focus. Automated citations and
                structure management built in.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-serif text-xl text-white mb-3">
                Integrity Guard
              </h3>
              <p className="text-[#94a3b8] text-sm leading-relaxed">
                AI plagiarism detection and citation verification. Submit with
                confidence every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="py-32 px-6 bg-[#020617] border-t border-white/5"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Membership
            </h2>
            <p className="text-[#94a3b8]">
              Free tier for exploring, Pro tier for sustained research
              workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free */}
            <div className="glass-panel rounded-2xl p-8 flex flex-col">
              <h3 className="text-lg font-semibold text-white mb-1">Free</h3>
              <div className="text-3xl font-bold text-white mb-6">
                ₹0
                <span className="text-sm font-normal text-[#94a3b8]">
                  /month
                </span>
              </div>
              <ul className="space-y-3 text-sm text-[#94a3b8] mb-8 flex-1">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-sky-400" /> 10K AI tokens
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-sky-400" /> 50 paper searches
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-sky-400" /> 1 plagiarism check
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-sky-400" /> 3 projects
                </li>
              </ul>
              <Link
                href="/sign-up"
                className="block text-center py-3 rounded-full border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Basic */}
            <div className="glass-panel rounded-2xl p-8 flex flex-col ring-2 ring-sky-500/50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-sky-500 text-white text-xs font-bold rounded-full">
                Popular
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Basic</h3>
              <div className="text-3xl font-bold text-white mb-6">
                ₹1,000
                <span className="text-sm font-normal text-[#94a3b8]">
                  /month
                </span>
              </div>
              <ul className="space-y-3 text-sm text-[#94a3b8] mb-8 flex-1">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-sky-400" /> 100K AI tokens
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-sky-400" /> Unlimited searches
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-sky-400" /> 10 plagiarism
                  checks
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-sky-400" /> 10 exports
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-sky-400" /> 5 deep research
                  sessions
                </li>
              </ul>
              <Link
                href="/sign-up"
                className="block text-center py-3 rounded-full bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="glass-panel rounded-2xl p-8 flex flex-col">
              <h3 className="text-lg font-semibold text-white mb-1">Pro</h3>
              <div className="text-3xl font-bold text-white mb-6">
                ₹2,000
                <span className="text-sm font-normal text-[#94a3b8]">
                  /month
                </span>
              </div>
              <ul className="space-y-3 text-sm text-[#94a3b8] mb-8 flex-1">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-sky-400" /> 500K AI tokens
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-sky-400" /> Unlimited
                  everything
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-sky-400" /> 50 plagiarism
                  checks
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-sky-400" /> 25 deep research
                  sessions
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-sky-400" /> Priority support
                </li>
              </ul>
              <Link
                href="/sign-up"
                className="block text-center py-3 rounded-full border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-6 bg-[#0f172a] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-serif italic text-white/80 leading-relaxed mb-8">
            &ldquo;ScholarSync changed how I approach my thesis. The deep
            research mode found connections across 300 papers that I would have
            missed manually.&rdquo;
          </p>
          <div className="text-[#94a3b8] text-sm">
            — Dr. Priya Sharma, AIIMS New Delhi
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#020617] border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
          <div className="flex items-center gap-2">
            <SquaresFour size={16} className="text-white" weight="fill" />
            <span className="font-semibold text-white">ScholarSync</span>
          </div>
          <div className="text-sm text-[#94a3b8] flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
          </div>
          <div className="text-sm text-[#94a3b8]">
            &copy; 2026 ScholarSync Inc.
          </div>
        </div>
      </footer>
    </div>
  );
}
