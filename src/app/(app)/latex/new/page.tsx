"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CircleNotch,
  ArrowLeft,
  FileText,
  Newspaper,
  Flask,
  GraduationCap,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { createLatexProjectFromTemplate } from "@/lib/actions/latex";

const TEMPLATES = [
  {
    id: "blank",
    label: "Blank Document",
    description: "Standard article with sections and bibliography",
    icon: FileText,
    color: "text-ink-muted",
  },
  {
    id: "ieee",
    label: "IEEE Conference",
    description: "Two-column format with structured sections",
    icon: Newspaper,
    color: "text-blue-500",
  },
  {
    id: "nature",
    label: "Nature",
    description: "Nature journal style with line numbers",
    icon: Flask,
    color: "text-emerald-500",
  },
  {
    id: "thesis",
    label: "Thesis",
    description: "Multi-chapter report with TOC and appendices",
    icon: GraduationCap,
    color: "text-violet-500",
  },
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
      const project = await createLatexProjectFromTemplate({
        title: title || "Untitled Paper",
        compiler,
        templateId: selectedTemplate,
      });
      router.push(`/latex/${project.id}`);
    } catch {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-8">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/latex"
          className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-2xl font-semibold text-ink">New Paper</h1>
      </div>

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
            onKeyDown={(e) => { if (e.key === "Enter") handleCreate(); }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Template
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TEMPLATES.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id)}
                  className={cn(
                    "p-3 rounded-xl border text-left transition-all",
                    selectedTemplate === t.id
                      ? "border-brand bg-brand/5 ring-1 ring-brand/20"
                      : "border-border-subtle hover:border-brand/30"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon
                      size={16}
                      className={selectedTemplate === t.id ? "text-brand" : t.color}
                    />
                    <p className="text-sm font-medium text-ink">{t.label}</p>
                  </div>
                  <p className="text-xs text-ink-muted">{t.description}</p>
                </button>
              );
            })}
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
                className={cn(
                  "px-3 py-2 rounded-lg text-xs font-medium transition-all",
                  compiler === c
                    ? "bg-brand text-white"
                    : "bg-surface-raised text-ink-muted hover:text-ink border border-border-subtle"
                )}
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
