"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MarketingNav } from "@/components/layout/marketing-nav";

/* ─── Design tokens ─────────────────────────────────────────────────────── */
const ink = "#241013";
const inkMuted = "rgba(36,16,19,0.65)";
const inkFaint = "rgba(36,16,19,0.45)";
const purple = "#6D28D9";
const _purpleDark = "#5B21B6";
const purpleLight = "rgba(109,40,217,0.08)";
const warmBg = "rgb(242,240,235)";
const cardBg = "rgb(233,229,221)";
const darkBg = "#1E1145";

/* ─── Check icon (reused) ───────────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg
      className="w-6 h-6 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      style={{ color: purple }}
    >
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Arrow icon (reused) ───────────────────────────────────────────────── */
function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Product data ──────────────────────────────────────────────────────── */
const products = [
  {
    id: "product-lit-search",
    label: "Discover",
    title: "Find every relevant paper in seconds",
    desc: "Search across millions of academic papers, preprints, and journals. AI-powered relevance ranking surfaces exactly what you need.",
    features: [
      "Search across PubMed, Semantic Scholar, and more",
      "AI-ranked results by relevance to your query",
      "Save, organize, and annotate papers in one place",
      "Export citations in any format instantly",
    ],
    tabColor: "#B45309",
    tabIcon: (
      <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
        <circle cx="8" cy="8" r="5.5" stroke="#fff" strokeWidth="1.5" />
        <path d="M12.5 12.5l3 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "product-learn-mode",
    label: "Learn Mode",
    title: "Understand complex research, effortlessly",
    desc: "Turn dense papers into clear explanations. Ask questions, get summaries, and build deep understanding at your own pace.",
    features: [
      "AI-generated paper summaries and key takeaways",
      "Ask follow-up questions about any section",
      "Visual concept maps and knowledge graphs",
      "Adaptive explanations for any expertise level",
    ],
    tabColor: "#15803D",
    tabIcon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M8 2.5C6.5 2.5 5 4 5 6c0 1.5 1 2.2 1.5 2.8.4.5.5 1 .5 1.7h2c0-.7.1-1.2.5-1.7C10 8.2 11 7.5 11 6c0-2-1.5-3.5-3-3.5z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M6.5 12.5h3M7 14h2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "product-deep-research",
    label: "Deep Research",
    title: "Go from question to comprehensive analysis",
    desc: "AI that reads hundreds of papers for you, synthesizes findings, identifies gaps, and produces publication-ready research briefs.",
    features: [
      "Automated multi-paper synthesis and analysis",
      "Identify research gaps and contradictions",
      "Generate evidence tables and comparisons",
      "Full citations and source traceability",
    ],
    tabColor: "#1D4ED8",
    tabIcon: (
      <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
        <path d="M9 2v14M2 9h14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "product-systematic-reviews",
    label: "Systematic Reviews",
    title: "Months of review work, done in days",
    desc: "Follow PRISMA guidelines with AI assistance at every step — from screening to data extraction to bias assessment.",
    features: [
      "PRISMA-compliant workflow from start to finish",
      "AI-assisted screening and eligibility assessment",
      "Automated data extraction and quality scoring",
      "Generate PRISMA flow diagrams automatically",
    ],
    tabColor: "#4D7C0F",
    tabIcon: (
      <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
        <path d="M3 2h12v3H3z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M5 8h8v2.5H5z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M7 13.5h4v2.5H7z" fill="rgba(255,255,255,0.3)" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M9 5v3M9 10.5v3" stroke="#fff" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    id: "product-latex-editor",
    label: "LaTeX Editor",
    title: "Write and publish beautiful papers, faster",
    desc: "A modern LaTeX editor with real-time preview, AI-powered writing assistance, and one-click journal formatting.",
    features: [
      "Real-time LaTeX rendering and preview",
      "AI writing assistant for academic prose",
      "One-click formatting for 10,000+ journals",
      "Real-time collaboration with co-authors",
    ],
    tabColor: "#475569",
    tabIcon: (
      <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
        <path d="M6 3.5L2 9l4 5.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3.5l4 5.5-4 5.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.5 2.5l-3 13" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "product-slides",
    label: "Stage",
    title: "Turn your research into stunning presentations",
    desc: "Generate conference-ready slides from your papers. Beautiful templates, smart layouts, and figures that tell the story.",
    features: [
      "Auto-generate slides from your manuscript",
      "Conference-ready templates and themes",
      "Smart figure placement and annotation",
      "Export to PowerPoint, PDF, or present online",
    ],
    tabColor: "#0E7490",
    tabIcon: (
      <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="3" width="14" height="10" rx="1.5" stroke="#fff" strokeWidth="1.3" />
        <path d="M6 16h6" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M9 13v3" stroke="#fff" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    id: "product-illustrations",
    label: "Canvas",
    title: "Publication-quality figures, made simple",
    desc: "Create scientific illustrations, diagrams, and graphical abstracts with AI assistance. No design skills required.",
    features: [
      "AI-generated scientific diagrams and figures",
      "Graphical abstract builder for journals",
      "Pathway, mechanism, and flowchart templates",
      "Export in SVG, PNG, or EPS for any journal",
    ],
    tabColor: "#DC2626",
    tabIcon: (
      <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
        <path d="M3 15l4-1.5L14.5 6a1.4 1.4 0 00-2-2L5 11.5z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const stats = [
  { value: 6, suffix: "+", unit: "tools", desc: "the average researcher juggles per paper", color: "#0a6847" },
  { value: 15, suffix: "–20", unit: "min", desc: "of focus lost every time you switch between them", color: "#4a7ab5" },
  { value: 3, suffix: "–5", unit: "days", desc: "spent on literature review alone", color: "#d4b060" },
  { value: 40, suffix: "%", unit: "", desc: "of researcher time spent on formatting, not thinking", color: "#c06090" },
];

/* ─── Animated counter hook ─────────────────────────────────────────────── */
function useCountUp(target: number, suffix: string, isVisible: boolean) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!isVisible) return;
    const duration = 1200;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target) + suffix);
      if (progress < 1) requestAnimationFrame(animate);
    };
    const timer = setTimeout(() => requestAnimationFrame(animate), 200);
    return () => clearTimeout(timer);
  }, [target, suffix, isVisible]);
  return display;
}

/* ─── Stat Card ─────────────────────────────────────────────────────────── */
function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const display = useCountUp(stat.value, stat.suffix, visible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl px-6 py-8 text-left transition-all duration-600"
      style={{
        background: cardBg,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 120}ms`,
      }}
    >
      <div
        className="absolute left-0 top-4 bottom-4 w-1 rounded-r transition-transform duration-500"
        style={{
          background: stat.color,
          transform: visible ? "scaleY(1)" : "scaleY(0)",
          transitionDelay: `${400 + index * 120}ms`,
        }}
      />
      <div
        className="text-[52px] font-bold leading-none tracking-tight mb-1"
        style={{ color: ink, fontVariantNumeric: "tabular-nums", letterSpacing: "-1.5px" }}
      >
        {display}
      </div>
      <div className="text-[15px] font-medium mb-4 min-h-5" style={{ color: "rgba(36,16,19,0.5)" }}>
        {stat.unit}
      </div>
      <div className="text-sm leading-relaxed" style={{ color: "rgba(36,16,19,0.55)" }}>
        {stat.desc}
      </div>
    </div>
  );
}

/* ─── Product Block ─────────────────────────────────────────────────────── */
function ProductBlock({
  product,
  reversed,
}: {
  product: (typeof products)[number];
  reversed: boolean;
}) {
  return (
    <div
      id={product.id}
      className={`flex gap-12 items-stretch min-h-[500px] scroll-mt-[280px] flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"}`}
    >
      <div className="flex-1 flex flex-col gap-4 justify-center py-9">
        <h3 className="text-xl" style={{ color: ink }}>
          {product.label}
        </h3>
        <h2
          className="text-5xl font-normal leading-[48px]"
          style={{ color: ink }}
        >
          {product.title}
        </h2>
        <p className="text-base leading-relaxed max-w-[480px]" style={{ color: inkMuted }}>
          {product.desc}
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-sm font-medium w-fit transition-opacity hover:opacity-70"
          style={{ color: purple }}
        >
          Learn more about {product.label} <ArrowIcon />
        </a>
        <ul className="flex flex-col gap-4 mt-4">
          {product.features.map((f) => (
            <li key={f} className="flex gap-4 items-start text-base leading-6" style={{ color: inkMuted }}>
              <CheckIcon />
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div
        className="flex-1 rounded-3xl flex items-center justify-center overflow-hidden min-h-[460px]"
        style={{ background: cardBg }}
      >
        <div
          className="w-full h-full flex items-center justify-center text-5xl font-light"
          style={{
            background: "linear-gradient(135deg, rgba(109,40,217,0.08), rgba(107,165,232,0.08))",
            color: "rgba(36,16,19,0.2)",
          }}
        >
          {product.label}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* LANDING PAGE                                                              */
/* ═══════════════════════════════════════════════════════════════════════════ */

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-white" style={{ color: ink }}>
      <MarketingNav />

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-white px-9 pt-0 max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center gap-5 pt-14">
          <h1 className="text-4xl md:text-[64px] font-medium leading-[0.96] text-center max-w-[900px]">
            Where Deep Thinking Becomes Deep Work
          </h1>
          <h2
            className="text-lg md:text-[22px] font-normal leading-relaxed text-center max-w-[700px]"
            style={{ color: "rgba(36,16,19,0.6)" }}
          >
            Search the literature. Write with precision. Verify every claim.
            Present your work. All without leaving one workspace.
          </h2>
        </div>
      </section>

      {/* ─── Hero gradient band + mockup ──────────────────────────────── */}
      <div className="relative max-w-[1440px] mx-auto px-9">
        <div
          className="absolute left-0 right-0 h-[360px] rounded-3xl z-0"
          style={{
            top: 40,
            background: [
              "radial-gradient(ellipse at 30% 50%, rgba(109,40,217,0.7) 0%, transparent 50%)",
              "radial-gradient(ellipse at 70% 50%, rgba(107,165,232,0.6) 0%, transparent 50%)",
              "radial-gradient(ellipse at 50% 60%, rgba(176,112,192,0.5) 0%, transparent 50%)",
              "radial-gradient(ellipse at 50% 40%, rgba(80,50,140,0.8) 0%, transparent 40%)",
            ].join(","),
          }}
        />
        <div className="relative z-[1] max-w-[1100px] mx-auto mt-8 bg-white border border-black/[0.08] rounded-2xl overflow-hidden shadow-[0_8px_60px_rgba(109,40,217,0.15),0_2px_8px_rgba(0,0,0,0.06)]">
          {/* Toolbar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-black/[0.08]" style={{ background: "#FAFAF8" }}>
            <div className="flex gap-[5px]">
              <span className="w-[9px] h-[9px] rounded-full bg-[#fca5a5]" />
              <span className="w-[9px] h-[9px] rounded-full bg-[#fde68a]" />
              <span className="w-[9px] h-[9px] rounded-full bg-[#86efac]" />
            </div>
            <div className="flex-1 text-center font-mono text-[11px]" style={{ color: "rgba(36,16,19,0.4)" }}>
              research-paper-draft.md
            </div>
          </div>
          {/* Body */}
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_240px] min-h-[340px]">
            {/* Sidebar */}
            <div className="hidden md:block p-[18px] border-r border-black/[0.08]">
              <div className="text-[9px] uppercase tracking-[0.1em] font-semibold mb-3" style={{ color: inkFaint }}>
                Cited Sources
              </div>
              {[
                { title: "Meta-analysis of cardiac biomarkers in acute chest pain", meta: "Sharma et al., 2024 · JAMA", badge: "Level I", badgeClass: "bg-[rgba(10,104,71,0.1)] text-[#0a6847]" },
                { title: "Diagnostic accuracy of high-sensitivity troponin assays", meta: "Chen & Patel, 2023 · Lancet", badge: "Level II", badgeClass: "bg-[rgba(74,122,181,0.1)] text-[#4a7ab5]" },
                { title: "Emerging role of NT-proBNP in risk stratification", meta: "Gupta, 2024 · Indian Heart J", badge: "Level III", badgeClass: "bg-[rgba(212,176,96,0.15)] text-[#8a6d1b]" },
              ].map((s) => (
                <div key={s.title} className="rounded-lg p-[10px] mb-2" style={{ background: "#F5F4F0", border: "1px solid rgba(36,16,19,0.06)" }}>
                  <div className="text-[10.5px] font-medium leading-snug mb-[3px]" style={{ color: ink }}>{s.title}</div>
                  <div className="text-[9.5px]" style={{ color: inkFaint }}>{s.meta}</div>
                  <span className={`inline-block text-[8.5px] px-1.5 py-0.5 rounded mt-[5px] font-semibold ${s.badgeClass}`}>
                    {s.badge}
                  </span>
                </div>
              ))}
            </div>
            {/* Editor */}
            <div className="px-7 py-6">
              <div className="text-[9px] uppercase tracking-[0.1em] font-semibold mb-4" style={{ color: purple }}>
                Discussion
              </div>
              <p className="text-[13px] leading-[1.75] mb-3" style={{ color: inkMuted }}>
                Our findings demonstrate that high-sensitivity cardiac troponin assays significantly improve early diagnostic accuracy in patients presenting with acute chest pain. The pooled sensitivity of 94.2% (95% CI: 91.8–96.1) across 12 studies aligns with recent meta-analyses by{" "}
                <span style={{ color: purple }}>Sharma et al.</span> and extends their work by incorporating Indian population data.
              </p>
              <p className="text-[13px] leading-[1.75] mb-3" style={{ color: inkMuted }}>
                Notably, the subgroup analysis revealed a statistically significant difference in diagnostic performance between rural and urban tertiary centres (p = 0.003), a finding not previously reported in the literature.
              </p>
              <div className="w-0.5 h-[18px] rounded-sm mt-2.5 animate-pulse" style={{ background: purple }} />
            </div>
            {/* AI panel */}
            <div className="hidden md:block p-[18px] border-l border-black/[0.08]">
              <div className="flex items-center gap-[7px] mb-3">
                <div className="w-5 h-5 rounded-[5px] flex items-center justify-center" style={{ background: purpleLight }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={purple} strokeWidth="2.5">
                    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                  </svg>
                </div>
                <div className="text-[10.5px] font-semibold" style={{ color: purple }}>Learn Mode</div>
              </div>
              <div className="rounded-lg p-3 mb-2" style={{ background: "#F5F4F0", border: "1px solid rgba(36,16,19,0.06)" }}>
                <div className="text-[9.5px] font-semibold mb-[5px]" style={{ color: purple }}>Socratic prompt</div>
                <p className="text-[10.5px] leading-relaxed" style={{ color: "rgba(36,16,19,0.6)" }}>
                  Your subgroup analysis is compelling. What confounders might explain the urban-rural disparity beyond pre-analytical handling? Consider the INDIAN-ACS registry data.
                </p>
              </div>
              <span
                className="inline-block text-[8.5px] px-2 py-1 rounded-[5px] font-medium mt-2"
                style={{ background: purpleLight, color: purple }}
              >
                I won&apos;t write for you — I&apos;ll help you think.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Gradient spacer ──────────────────────────────────────────── */}
      <div className="h-20" style={{ background: `linear-gradient(to bottom, #fff 0%, ${warmBg} 100%)` }} />

      {/* ─── Main content area ────────────────────────────────────────── */}
      <div style={{ background: warmBg }}>
        {/* Stats */}
        <section className="px-9 py-20 max-w-[1100px] mx-auto">
          <h2 className="text-4xl font-medium leading-tight text-center mb-12 tracking-tight" style={{ color: ink }}>
            Research workflows are broken.<br />The numbers prove it.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <StatCard key={s.desc} stat={s} index={i} />
            ))}
          </div>
        </section>

        {/* Suite section */}
        <section className="px-9 max-w-[1440px] mx-auto">
          {/* Sticky header */}
          <div className="sticky top-[72px] z-[190] pb-6" style={{ background: warmBg }}>
            <div className="flex gap-8 justify-between items-center py-9 h-[124px]">
              <h2 className="text-5xl font-normal" style={{ color: ink }}>
                Built for deep work
              </h2>
              <Link
                href="/sign-up"
                className="flex-shrink-0 text-white text-sm font-medium px-6 py-2.5 rounded-md transition-colors"
                style={{ background: purple }}
              >
                Get the suite
              </Link>
            </div>

            {/* Desktop tabs */}
            <div className="hidden md:grid grid-cols-7 h-[70px] rounded-xl overflow-hidden border border-black/[0.12]">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  className={`text-base font-normal px-4 py-3 flex items-center justify-center gap-2.5 whitespace-nowrap transition-all border-r border-black/[0.12] last:border-r-0 ${
                    activeTab === i ? "text-[#241013]" : "hover:bg-black/[0.04]"
                  }`}
                  style={{
                    color: activeTab === i ? ink : "rgba(36,16,19,0.76)",
                    background: activeTab === i ? cardBg : "transparent",
                  }}
                  onClick={() => {
                    setActiveTab(i);
                    document.getElementById(p.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: p.tabColor }}
                  >
                    {p.tabIcon}
                  </div>
                  {p.label}
                </button>
              ))}
            </div>

            {/* Mobile tabs — vertical accordion-style, one at a time */}
            <div className="flex flex-col gap-2 md:hidden">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-base font-normal transition-all border ${
                    activeTab === i
                      ? "border-black/[0.12]"
                      : "border-transparent hover:bg-black/[0.04]"
                  }`}
                  style={{
                    color: activeTab === i ? ink : "rgba(36,16,19,0.76)",
                    background: activeTab === i ? cardBg : "transparent",
                  }}
                  onClick={() => {
                    setActiveTab(i);
                    document.getElementById(p.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: p.tabColor }}
                  >
                    {p.tabIcon}
                  </div>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product blocks */}
          <div className="flex flex-col gap-9 py-9 pb-24">
            {products.map((p, i) => (
              <ProductBlock key={p.id} product={p} reversed={i % 2 === 1} />
            ))}
          </div>
        </section>
      </div>

      {/* ─── Becoming section ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: darkBg }}>
        <div
          className="absolute right-[10%] top-[30%] w-[400px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(109,40,217,0.08) 0%, transparent 70%)" }}
        />
        <div className="max-w-[1440px] mx-auto px-9 py-24 flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="text-5xl md:text-[64px] font-medium leading-[0.9] text-white">
              Becoming a Scholar.
            </h2>
            <p className="text-lg leading-relaxed max-w-[500px]" style={{ color: "rgba(252,250,247,0.6)" }}>
              When AI works everywhere you research, it starts to change{" "}
              <em style={{ color: "rgba(252,250,247,0.7)" }}>how</em> you research. You stop drowning in tabs. You stop formatting references at midnight. Instead, you have the time to think deeper, write bolder, and ask better questions.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-sm font-medium w-fit transition-opacity hover:opacity-70"
              style={{ color: "#C4B5FD" }}
            >
              Read our story <ArrowIcon />
            </a>
          </div>
          <div
            className="flex-1 rounded-2xl h-[420px] flex items-center justify-center text-lg"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.08)",
            }}
          >
            [ Learn Mode Conversation ]
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ───────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: darkBg, borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="absolute left-[20%] top-1/2 w-[500px] h-[300px] -translate-y-1/2 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(109,40,217,0.12) 0%, transparent 70%)" }}
        />
        <div className="max-w-[1440px] mx-auto px-9 py-24 flex flex-col md:flex-row gap-20 items-center relative z-[1]">
          <h2
            className="text-5xl md:text-[64px] font-medium leading-[0.9] max-w-[500px]"
            style={{
              background: "linear-gradient(90deg, #C4B5FD, #7DD3FC, #E9D5FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Your next paper deserves a better environment.
          </h2>
          <Link
            href="/sign-up"
            className="flex-shrink-0 whitespace-nowrap text-sm font-medium px-7 py-3 rounded-md transition-opacity hover:opacity-90"
            style={{ background: "#fff", color: darkBg }}
          >
            Get ScholarSync
          </Link>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────────────── */}
      <footer className="bg-white px-8 pt-12 pb-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-12 mb-12">
            <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-2" style={{ color: ink }}>
                <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="10" fill="#6D28D9" />
                  <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" fill="white" fontFamily="Source Serif 4,serif" fontSize="20" fontWeight="700">S</text>
                </svg>
                <span className="text-lg font-bold tracking-tight">ScholarSync</span>
              </Link>
              <p className="text-sm" style={{ color: inkMuted }}>
                Built for researchers who take their work seriously.
              </p>
            </div>
            {[
              { title: "Products", links: ["Discover", "Learn Mode", "Deep Research", "Systematic Reviews", "LaTeX Editor", "Stage", "Canvas"] },
              { title: "Company", links: ["About", "Mission", "Careers", "Help Center", "Contact"] },
              { title: "Legal", links: ["Terms", "Privacy Policy", "Trust"] },
              { title: "Connect", links: ["LinkedIn", "X", "YouTube"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold mb-4" style={{ color: ink }}>
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm transition-colors hover:text-[#241013]" style={{ color: inkMuted }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-black/[0.08] pt-6 flex justify-between items-center">
            <p className="text-xs" style={{ color: "rgba(36,16,19,0.5)" }}>
              &copy; 2026 ScholarSync. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
