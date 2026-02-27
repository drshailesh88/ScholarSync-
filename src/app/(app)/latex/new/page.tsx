"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircleNotch } from "@phosphor-icons/react";
import { createLatexProject } from "@/lib/actions/latex";

const TEMPLATES = [
  { id: "blank", label: "Blank Document", description: "Start from scratch" },
  { id: "ieee", label: "IEEE Conference", description: "Two-column IEEE format" },
  { id: "nature", label: "Nature", description: "Nature journal style" },
  { id: "thesis", label: "Thesis", description: "Multi-chapter thesis template" },
] as const;

export default function NewLatexProjectPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("blank");
  const [compiler, setCompiler] = useState<"pdflatex" | "xelatex" | "lualatex">("pdflatex");
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    setCreating(true);
    try {
      const project = await createLatexProject({
        title: title || "Untitled Paper",
        compiler,
      });
      router.push(`/latex/${project.id}`);
    } catch {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-8">
      <h1 className="text-2xl font-semibold text-ink mb-6">New Paper</h1>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled Paper"
            className="w-full px-3 py-2.5 rounded-xl bg-surface-raised border border-border text-ink placeholder:text-ink-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Start from
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplate(t.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedTemplate === t.id
                    ? "border-brand bg-brand/5"
                    : "border-border-subtle hover:border-brand/30"
                }`}
              >
                <p className="text-sm font-medium text-ink">{t.label}</p>
                <p className="text-xs text-ink-muted mt-0.5">{t.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Compiler
          </label>
          <div className="flex gap-2">
            {(["pdflatex", "xelatex", "lualatex"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCompiler(c)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  compiler === c
                    ? "bg-brand text-white"
                    : "bg-surface-raised text-ink-muted hover:text-ink border border-border-subtle"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCreate}
          disabled={creating}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-50"
        >
          {creating && <CircleNotch size={16} className="animate-spin" />}
          Create Paper
        </button>
      </div>
    </div>
  );
}
