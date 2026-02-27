"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Article,
  Clock,
  Trash,
  CircleNotch,
} from "@phosphor-icons/react";
import { getLatexProjects, deleteLatexProject } from "@/lib/actions/latex";

type LatexProject = {
  id: string;
  title: string;
  compiler: "pdflatex" | "xelatex" | "lualatex" | null;
  createdAt: Date;
  updatedAt: Date;
};

export default function LatexProjectListPage() {
  const [projects, setProjects] = useState<LatexProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLatexProjects()
      .then((rows) => setProjects(rows as LatexProject[]))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    await deleteLatexProject(id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-ink">LaTeX Editor</h1>
          <p className="text-sm text-ink-muted mt-1">
            Write, preview, and compile LaTeX papers
          </p>
        </div>
        <Link
          href="/latex/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors"
        >
          <Plus size={16} weight="bold" />
          New Paper
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <CircleNotch size={28} className="text-brand animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center mb-4">
            <Article size={32} className="text-brand" />
          </div>
          <h2 className="text-lg font-medium text-ink mb-2">No papers yet</h2>
          <p className="text-sm text-ink-muted mb-6 max-w-sm">
            Create your first LaTeX paper to start writing with live preview and AI assistance.
          </p>
          <Link
            href="/latex/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors"
          >
            <Plus size={16} weight="bold" />
            Create Paper
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/latex/${project.id}`}
              className="group flex items-center justify-between p-4 rounded-xl glass-panel border border-border-subtle hover:border-brand/30 transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                  <Article size={20} className="text-brand" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-ink truncate">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock size={12} className="text-ink-muted" />
                    <span className="text-xs text-ink-muted">
                      {new Date(project.updatedAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-xs text-ink-muted/50">
                      {project.compiler ?? "pdflatex"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete(project.id);
                }}
                className="p-2 rounded-lg text-ink-muted hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash size={16} />
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
