import Link from "next/link";
import { MarketingNav } from "@/components/layout/marketing-nav";
import {
  GlobeHemisphereWest,
  Brain,
  PenNib,
  ShieldCheck,
  ArrowRight,
  Check,
  Notebook,
  ProjectorScreenChart,
  Books,
  FilePdf,
  Export,
  GraduationCap,
} from "@phosphor-icons/react/dist/ssr";

export default function LandingPage() {
  return (
    <div className="bg-background text-ink font-sans antialiased overflow-x-hidden">
      <MarketingNav />

      {/* Hero */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand/20 bg-accent-muted text-brand text-xs font-medium mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                Now in Beta
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] mb-6 tracking-tight">
                Think like a researcher.{" "}
                <span className="text-brand">Write like a pro.</span>
              </h1>

              <p className="text-lg text-ink-muted max-w-lg mb-10 leading-relaxed">
                One AI-powered workspace for finding papers, writing with citations,
                and submitting with confidence. Built for medical students and researchers.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link
                  href="/sign-up"
                  className="group flex items-center gap-2 bg-brand text-white px-6 py-3 rounded font-medium text-sm hover:bg-brand-hover transition-colors"
                >
                  Start Writing — Free
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <a
                  href="#features"
                  className="px-6 py-3 rounded border border-border text-ink-muted hover:text-ink hover:border-ink/20 text-sm font-medium transition-all"
                >
                  See Features
                </a>
              </div>
            </div>

            {/* App Preview */}
            <div className="relative hidden lg:block">
              <div className="rounded border border-border bg-surface shadow-xl overflow-hidden">
                <div className="h-9 bg-surface-raised border-b border-border flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                  </div>
                  <div className="mx-auto bg-background px-4 py-0.5 rounded text-[10px] text-ink-muted font-mono">
                    scholarsync.app/studio
                  </div>
                </div>
                <div className="flex h-[360px]">
                  <div className="w-48 bg-[#0e0e10] border-r border-[#27272a] p-4 hidden md:block">
                    <div className="space-y-3">
                      <div className="h-3 w-20 bg-white/10 rounded" />
                      <div className="h-3 w-28 bg-white/5 rounded" />
                      <div className="h-3 w-16 bg-white/5 rounded" />
                    </div>
                  </div>
                  <div className="flex-1 p-8 bg-surface">
                    <div className="max-w-sm mx-auto">
                      <div className="h-8 w-3/4 bg-ink/10 rounded mb-6" />
                      <div className="space-y-3">
                        <div className="h-3 w-full bg-ink/5 rounded" />
                        <div className="h-3 w-full bg-ink/5 rounded" />
                        <div className="h-3 w-2/3 bg-ink/5 rounded" />
                        <div className="h-3 w-full bg-ink/5 rounded" />
                        <div className="h-3 w-1/2 bg-ink/5 rounded" />
                      </div>
                    </div>
                  </div>
                  <div className="w-48 bg-[#0e0e10] border-l border-[#27272a] p-4 hidden md:block">
                    <div className="space-y-3">
                      <div className="h-3 w-16 bg-white/10 rounded" />
                      <div className="h-3 w-24 bg-white/5 rounded" />
                      <div className="h-3 w-20 bg-white/5 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-6">
            You&apos;ve been here before.
          </h2>
          <p className="text-ink-muted leading-relaxed text-lg">
            Thirty browser tabs. A half-written draft. Citations scattered across
            three apps. The deadline is tomorrow, and you&apos;re still
            reformatting references. Academic writing shouldn&apos;t feel this broken.
          </p>
        </div>
      </section>

      {/* Solution Bridge */}
      <section className="py-16 px-6 bg-accent-muted border-y border-brand/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-xl md:text-2xl text-brand font-medium">
            One workspace. Everything your paper needs.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-brand uppercase tracking-widest mb-3">FEATURES</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold">
              Built for the way you work
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: GlobeHemisphereWest,
                tag: "DISCOVER",
                title: "Find papers fast",
                desc: "Search 282M+ papers across PubMed, Semantic Scholar, and OpenAlex. AI-augmented queries find what you actually need.",
              },
              {
                icon: PenNib,
                tag: "WRITE",
                title: "Write with citations",
                desc: "A distraction-free editor with inline citations, auto-formatting in APA, Vancouver, and 10,000+ styles.",
              },
              {
                icon: Brain,
                tag: "THINK",
                title: "AI that helps you think",
                desc: "Socratic co-pilot that challenges your arguments, detects weak claims, and teaches methodology — never writes for you.",
              },
              {
                icon: ShieldCheck,
                tag: "CHECK",
                title: "Submit with confidence",
                desc: "AI detection, plagiarism scanning, and citation verification. Know your paper is clean before you submit.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="group p-6 rounded border border-border bg-surface hover:border-brand/30 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded bg-accent-muted flex items-center justify-center text-brand mb-4 group-hover:scale-110 transition-transform">
                  <card.icon size={20} />
                </div>
                <p className="text-[10px] font-mono text-brand uppercase tracking-widest mb-2">{card.tag}</p>
                <h3 className="font-semibold text-ink mb-2">{card.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-surface-raised border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-brand uppercase tracking-widest mb-3">WORKFLOW</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold">
              Three steps to a better paper
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "1", title: "Research", desc: "Search across databases, save papers, and let AI synthesize findings into structured notes." },
              { num: "2", title: "Write", desc: "Draft in a serif editor with inline citations, AI suggestions, and real-time word count." },
              { num: "3", title: "Check & Export", desc: "Run compliance checks, format references, and export to PDF or Word in one click." },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-10 h-10 rounded-full bg-brand text-white font-mono font-bold flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-semibold text-ink mb-2">{step.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-brand uppercase tracking-widest mb-3">AND MORE</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold">
              Everything else you need
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Notebook, title: "Source Notebook", desc: "Upload PDFs and synthesize research across multiple papers with RAG." },
              { icon: ProjectorScreenChart, title: "Slide Generator", desc: "Convert your paper into presentation slides automatically." },
              { icon: Books, title: "Reference Library", desc: "Save, organize, and manage your entire paper collection." },
              { icon: FilePdf, title: "PDF Chat", desc: "Ask questions about any uploaded paper. Get answers with page references." },
              { icon: Export, title: "Export Anywhere", desc: "PDF, Word, and LaTeX export with properly formatted citations." },
              { icon: GraduationCap, title: "Learn Mode", desc: "Socratic tutoring that teaches research methodology step by step." },
            ].map((card) => (
              <div key={card.title} className="flex gap-4 p-4 rounded border border-border bg-surface hover:border-brand/20 transition-colors">
                <div className="w-9 h-9 rounded bg-accent-muted flex items-center justify-center text-brand shrink-0">
                  <card.icon size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-ink text-sm mb-1">{card.title}</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-surface-raised border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-brand uppercase tracking-widest mb-3">PRICING</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-3">
              Simple, honest pricing
            </h2>
            <p className="text-ink-muted">Start free. Upgrade when you need more.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="rounded border border-border bg-surface p-6 flex flex-col">
              <h3 className="font-semibold text-ink mb-1">Free</h3>
              <div className="text-3xl font-bold text-ink mb-6">
                &#8377;0<span className="text-sm font-normal text-ink-muted">/month</span>
              </div>
              <ul className="space-y-3 text-sm text-ink-muted mb-8 flex-1">
                <li className="flex items-center gap-2"><Check size={16} className="text-brand shrink-0" /> 10K AI tokens</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-brand shrink-0" /> 50 paper searches</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-brand shrink-0" /> 1 plagiarism check</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-brand shrink-0" /> 3 projects</li>
              </ul>
              <Link
                href="/sign-up"
                className="block text-center py-3 rounded border border-border text-ink text-sm font-medium hover:bg-surface-raised transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Basic — Recommended */}
            <div className="rounded border-2 border-brand bg-surface p-6 flex flex-col relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-brand text-white text-xs font-medium rounded">
                Popular
              </div>
              <h3 className="font-semibold text-ink mb-1">Basic</h3>
              <div className="text-3xl font-bold text-ink mb-6">
                &#8377;1,000<span className="text-sm font-normal text-ink-muted">/month</span>
              </div>
              <ul className="space-y-3 text-sm text-ink-muted mb-8 flex-1">
                <li className="flex items-center gap-2"><Check size={16} className="text-brand shrink-0" /> 100K AI tokens</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-brand shrink-0" /> Unlimited searches</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-brand shrink-0" /> 10 plagiarism checks</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-brand shrink-0" /> 10 exports</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-brand shrink-0" /> 5 deep research sessions</li>
              </ul>
              <Link
                href="/sign-up"
                className="block text-center py-3 rounded bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="rounded border border-border bg-surface p-6 flex flex-col">
              <h3 className="font-semibold text-ink mb-1">Pro</h3>
              <div className="text-3xl font-bold text-ink mb-6">
                &#8377;2,000<span className="text-sm font-normal text-ink-muted">/month</span>
              </div>
              <ul className="space-y-3 text-sm text-ink-muted mb-8 flex-1">
                <li className="flex items-center gap-2"><Check size={16} className="text-brand shrink-0" /> 500K AI tokens</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-brand shrink-0" /> Unlimited everything</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-brand shrink-0" /> 50 plagiarism checks</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-brand shrink-0" /> 25 deep research sessions</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-brand shrink-0" /> Priority support</li>
              </ul>
              <Link
                href="/sign-up"
                className="block text-center py-3 rounded border border-border text-ink text-sm font-medium hover:bg-surface-raised transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Note */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-mono text-brand uppercase tracking-widest mb-6">FROM THE FOUNDER</p>
          <p className="font-serif text-xl md:text-2xl text-ink leading-relaxed mb-6 italic">
            &ldquo;I built ScholarSync because I was tired of juggling five tools
            to write one paper. This is the workspace I wish I had during my
            residency.&rdquo;
          </p>
          <p className="text-sm text-ink-muted">— Dr. Shailesh Singh</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-ink text-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Your next paper doesn&apos;t have to be this hard.
          </h2>
          <p className="text-background/60 mb-8">
            Join researchers who are writing smarter, not harder.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 bg-brand text-white px-8 py-3 rounded font-medium hover:bg-brand-hover transition-colors"
          >
            Start Writing — Free <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-brand flex items-center justify-center">
              <span className="font-serif text-white font-bold text-xs leading-none">S</span>
            </div>
            <span className="font-serif font-semibold text-ink text-sm">ScholarSync</span>
          </div>
          <div className="text-sm text-ink-muted flex gap-6">
            <a href="#" className="hover:text-ink transition-colors">Privacy</a>
            <a href="#" className="hover:text-ink transition-colors">Terms</a>
            <a href="#" className="hover:text-ink transition-colors">Twitter</a>
          </div>
          <div className="text-sm text-ink-muted">
            &copy; 2026 ScholarSync. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
