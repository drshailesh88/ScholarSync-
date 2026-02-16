"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  GlobeHemisphereWest,
  PenNib,
  ShieldCheck,
  Presentation,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { updateUserProfile } from "@/lib/actions/user";

const SPECIALTIES = [
  "Internal Medicine",
  "Surgery",
  "Pediatrics",
  "Obstetrics & Gynecology",
  "Orthopedics",
  "Radiology",
  "Pathology",
  "Pharmacology",
  "Microbiology",
  "Anatomy",
  "Physiology",
  "Biochemistry",
  "Community Medicine",
  "Forensic Medicine",
  "Dermatology",
  "Psychiatry",
  "Ophthalmology",
  "ENT",
  "Anesthesiology",
  "Emergency Medicine",
  "Other",
];

const GOALS = [
  {
    id: "write",
    label: "Write Research Papers",
    description: "Draft and polish manuscripts for publication",
    icon: PenNib,
  },
  {
    id: "search",
    label: "Search Literature",
    description: "Find and organize relevant papers",
    icon: GlobeHemisphereWest,
  },
  {
    id: "check",
    label: "Check Plagiarism & AI",
    description: "Ensure originality before submission",
    icon: ShieldCheck,
  },
  {
    id: "present",
    label: "Create Presentations",
    description: "Generate slides from your research",
    icon: Presentation,
  },
  {
    id: "learn",
    label: "Learn Research Methods",
    description: "Socratic AI tutor for methodology",
    icon: BookOpen,
  },
];

const FEATURES = [
  { title: "Deep Research", desc: "Search 282M+ papers across PubMed, Semantic Scholar, and OpenAlex" },
  { title: "The Studio", desc: "AI-powered editor with Learn Mode and Draft Mode" },
  { title: "Citation Manager", desc: "Auto-format citations in 10,000+ styles" },
  { title: "Final Checks", desc: "Plagiarism detection and AI content analysis" },
  { title: "Slides Generator", desc: "Turn your paper into a presentation in minutes" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const totalSteps = 4;

  const toggleSpecialty = (s: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleComplete = useCallback(async () => {
    setSaving(true);
    try {
      await updateUserProfile({
        full_name: name || undefined,
        specialty: selectedSpecialties.join(", ") || undefined,
        bio: institution || undefined,
      });
      // Mark onboarding as complete via API
      await fetch("/api/onboarding/complete", { method: "POST" });
      router.push("/dashboard");
    } catch (err) {
      console.error("Onboarding save failed:", err);
      router.push("/dashboard");
    } finally {
      setSaving(false);
    }
  }, [name, institution, selectedSpecialties, router]);

  const canNext =
    step === 0 ? true : // Welcome step, always can proceed
    step === 1 ? selectedSpecialties.length > 0 :
    step === 2 ? selectedGoals.length > 0 :
    true;

  return (
    <div className="min-h-[calc(100vh-7rem)] flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 rounded-full flex-1 transition-all",
                i <= step ? "bg-brand" : "bg-surface-raised"
              )}
            />
          ))}
        </div>

        {/* Step 0: Welcome */}
        {step === 0 && (
          <div className="glass-panel rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center text-brand mx-auto mb-6">
              <Sparkle size={32} />
            </div>
            <h1 className="text-2xl font-bold text-ink mb-3">Welcome to ScholarSync</h1>
            <p className="text-ink-muted mb-8 max-w-md mx-auto">
              Your AI-powered academic writing companion. Let&apos;s set things up so we can personalize your experience.
            </p>
            <div className="space-y-4 max-w-sm mx-auto text-left">
              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1.5">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Rahul Sharma"
                  className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1.5">Institution</label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="AIIMS New Delhi"
                  className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Specialties */}
        {step === 1 && (
          <div className="glass-panel rounded-2xl p-8">
            <h2 className="text-xl font-bold text-ink mb-2">Your Research Interests</h2>
            <p className="text-sm text-ink-muted mb-6">
              Select your specialties so we can personalize search results and suggestions.
            </p>
            <div className="flex flex-wrap gap-2">
              {SPECIALTIES.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSpecialty(s)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all border",
                    selectedSpecialties.includes(s)
                      ? "bg-brand/10 text-brand border-brand/30"
                      : "bg-surface-raised text-ink-muted border-border hover:text-ink hover:border-border"
                  )}
                >
                  {selectedSpecialties.includes(s) && <Check size={14} className="inline mr-1" />}
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Goals */}
        {step === 2 && (
          <div className="glass-panel rounded-2xl p-8">
            <h2 className="text-xl font-bold text-ink mb-2">What do you want to do?</h2>
            <p className="text-sm text-ink-muted mb-6">
              Select all that apply. This helps us prioritize features for you.
            </p>
            <div className="space-y-3">
              {GOALS.map((goal) => {
                const Icon = goal.icon;
                const isSelected = selectedGoals.includes(goal.id);
                return (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-xl transition-all border text-left",
                      isSelected
                        ? "bg-brand/5 border-brand/30"
                        : "bg-surface-raised/50 border-border hover:border-border"
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                        isSelected ? "bg-brand/10 text-brand" : "bg-surface-raised text-ink-muted"
                      )}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-ink">{goal.label}</h4>
                      <p className="text-xs text-ink-muted">{goal.description}</p>
                    </div>
                    {isSelected && (
                      <Check size={18} className="text-brand ml-auto shrink-0" weight="bold" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Feature Tour */}
        {step === 3 && (
          <div className="glass-panel rounded-2xl p-8">
            <h2 className="text-xl font-bold text-ink mb-2">Here&apos;s what you can do</h2>
            <p className="text-sm text-ink-muted mb-6">
              ScholarSync has everything you need to research, write, and publish.
            </p>
            <div className="space-y-3">
              {FEATURES.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface-raised/50 border border-border-subtle"
                >
                  <span className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center text-sm font-bold shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-ink">{feature.title}</h4>
                    <p className="text-xs text-ink-muted">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-ink-muted hover:text-ink transition-colors disabled:opacity-0"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          {step < totalSteps - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-50"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-50"
            >
              {saving ? "Setting up..." : "Start Using ScholarSync"}
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
