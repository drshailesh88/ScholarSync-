"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { CircleNotch } from "@phosphor-icons/react";
import { getLatexProject, getLatexFiles } from "@/lib/actions/latex";
import { LatexWorkspace } from "@/components/latex-editor/latex-workspace";
import { useLatexEditorStore } from "@/stores/latex-editor-store";

type LatexProject = {
  id: string;
  title: string;
  compiler: "pdflatex" | "xelatex" | "lualatex" | null;
};

type LatexFile = {
  id: string;
  latexProjectId: string;
  path: string;
  content: string | null;
  isMain: boolean | null;
};

export default function LatexEditorPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const [project, setProject] = useState<LatexProject | null>(null);
  const [files, setFiles] = useState<LatexFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const setProjectTitle = useLatexEditorStore((s) => s.setProjectTitle);
  const setActiveFileId = useLatexEditorStore((s) => s.setActiveFileId);
  const setDocumentContent = useLatexEditorStore((s) => s.setDocumentContent);

  useEffect(() => {
    async function load() {
      try {
        const [proj, fileList] = await Promise.all([
          getLatexProject(projectId),
          getLatexFiles(projectId),
        ]);
        if (!proj) {
          setError(true);
          return;
        }
        setProject(proj as LatexProject);
        setFiles(fileList as LatexFile[]);
        setProjectTitle(proj.title);

        // Set active file to main .tex file
        const mainFile = fileList.find((f) => f.isMain);
        if (mainFile) {
          setActiveFileId(mainFile.id);
          setDocumentContent(mainFile.content ?? "");
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [projectId, setProjectTitle, setActiveFileId, setDocumentContent]);

  if (error) return notFound();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-7rem)]">
        <div className="flex flex-col items-center gap-3">
          <CircleNotch size={28} className="text-brand animate-spin" />
          <p className="text-sm text-ink-muted">Loading editor...</p>
        </div>
      </div>
    );
  }

  if (!project) return notFound();

  return (
    <LatexWorkspace
      project={project}
      initialFiles={files}
    />
  );
}
