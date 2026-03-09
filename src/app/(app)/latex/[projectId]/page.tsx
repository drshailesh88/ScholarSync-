"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowClockwise, CircleNotch, Warning } from "@phosphor-icons/react";
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
  const router = useRouter();
  const [project, setProject] = useState<LatexProject | null>(null);
  const [files, setFiles] = useState<LatexFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const setProjectTitle = useLatexEditorStore((s) => s.setProjectTitle);
  const setActiveFileId = useLatexEditorStore((s) => s.setActiveFileId);
  const setDocumentContent = useLatexEditorStore((s) => s.setDocumentContent);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
          const [proj, fileList] = await Promise.all([
            getLatexProject(projectId),
            getLatexFiles(projectId),
          ]);

          if (!proj) {
            if (attempt < 2) {
              await new Promise((resolve) =>
                setTimeout(resolve, 300 * (attempt + 1))
              );
              continue;
            }

            if (!cancelled) {
              setError(
                "This LaTeX workspace is not ready yet. Retry in a moment."
              );
            }
            return;
          }

          if (cancelled) return;

          setProject(proj as LatexProject);
          setFiles(fileList as LatexFile[]);
          setProjectTitle(proj.title);

          const mainFile = fileList.find((f) => f.isMain);
          if (mainFile) {
            setActiveFileId(mainFile.id);
            setDocumentContent(mainFile.content ?? "");
          }

          return;
        } catch (loadError) {
          if (attempt < 2) {
            await new Promise((resolve) =>
              setTimeout(resolve, 300 * (attempt + 1))
            );
            continue;
          }

          if (!cancelled) {
            setError(
              loadError instanceof Error
                ? loadError.message
                : "Unable to load this LaTeX workspace right now."
            );
          }
          return;
        }
      }
    }

    load().finally(() => {
      if (!cancelled) {
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [
    projectId,
    reloadToken,
    setProjectTitle,
    setActiveFileId,
    setDocumentContent,
  ]);

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

  if (error || !project) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-7rem)] px-6">
        <div className="max-w-md rounded-2xl border border-border bg-surface p-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-400">
            <Warning size={20} />
          </div>
          <h1 className="text-lg font-semibold text-ink">
            Unable to open this paper
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            {error ??
              "This LaTeX workspace could not be loaded yet. Try again once the project finishes initializing."}
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setReloadToken((value) => value + 1)}
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white"
            >
              <ArrowClockwise size={16} />
              Retry
            </button>
            <button
              onClick={() => router.push("/latex")}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink"
            >
              Back to Papers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LatexWorkspace
      project={project}
      initialFiles={files}
    />
  );
}
