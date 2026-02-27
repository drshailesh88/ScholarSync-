"use server";

import { db } from "@/lib/db";
import { latexProjects, latexFiles, latexCompilations } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// ---------------------------------------------------------------------------
// Default content for new LaTeX projects
// ---------------------------------------------------------------------------

const DEFAULT_MAIN_TEX = `\\documentclass[12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{amsmath,amssymb}
\\usepackage{graphicx}
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}

\\title{Untitled Paper}
\\author{Author Name}
\\date{\\today}

\\begin{document}

\\maketitle

\\begin{abstract}
Your abstract here.
\\end{abstract}

\\section{Introduction}

Start writing here.

\\section{Methods}

\\section{Results}

\\section{Discussion}

\\section{Conclusion}

\\bibliographystyle{plain}
\\bibliography{references}

\\end{document}
`;

const DEFAULT_BIB = `% Add your BibTeX references here
% Example:
% @article{key2024,
%   author  = {Author Name},
%   title   = {Paper Title},
%   journal = {Journal Name},
%   year    = {2024},
%   volume  = {1},
%   pages   = {1--10},
% }
`;

// ---------------------------------------------------------------------------
// Projects — Read
// ---------------------------------------------------------------------------

export async function getLatexProjects() {
  const userId = await getCurrentUserId();
  return db
    .select()
    .from(latexProjects)
    .where(eq(latexProjects.userId, userId))
    .orderBy(desc(latexProjects.updatedAt));
}

export async function getLatexProject(id: string) {
  const userId = await getCurrentUserId();
  const [project] = await db
    .select()
    .from(latexProjects)
    .where(and(eq(latexProjects.id, id), eq(latexProjects.userId, userId)));
  return project ?? null;
}

// ---------------------------------------------------------------------------
// Projects — Create
// ---------------------------------------------------------------------------

export async function createLatexProject(data: {
  title?: string;
  compiler?: "pdflatex" | "xelatex" | "lualatex";
  projectId?: number;
}) {
  const userId = await getCurrentUserId();
  const title = data.title || "Untitled Paper";

  const [project] = await db
    .insert(latexProjects)
    .values({
      userId,
      title,
      compiler: data.compiler || "pdflatex",
      projectId: data.projectId ?? null,
    })
    .returning();

  // Create default files (main.tex + references.bib)
  await db.insert(latexFiles).values([
    {
      latexProjectId: project.id,
      path: "main.tex",
      content: DEFAULT_MAIN_TEX.replace("Untitled Paper", title),
      isMain: true,
    },
    {
      latexProjectId: project.id,
      path: "references.bib",
      content: DEFAULT_BIB,
      isMain: false,
    },
  ]);

  revalidatePath("/latex");
  return project;
}

// ---------------------------------------------------------------------------
// Projects — Update
// ---------------------------------------------------------------------------

export async function updateLatexProject(
  id: string,
  data: Partial<{
    title: string;
    compiler: "pdflatex" | "xelatex" | "lualatex";
  }>
) {
  const userId = await getCurrentUserId();
  const [project] = await db
    .update(latexProjects)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(latexProjects.id, id), eq(latexProjects.userId, userId)))
    .returning();
  revalidatePath("/latex");
  return project;
}

// ---------------------------------------------------------------------------
// Projects — Delete
// ---------------------------------------------------------------------------

export async function deleteLatexProject(id: string) {
  const userId = await getCurrentUserId();
  await db
    .delete(latexProjects)
    .where(and(eq(latexProjects.id, id), eq(latexProjects.userId, userId)));
  revalidatePath("/latex");
}

// ---------------------------------------------------------------------------
// Files — Read
// ---------------------------------------------------------------------------

export async function getLatexFiles(latexProjectId: string) {
  return db
    .select()
    .from(latexFiles)
    .where(eq(latexFiles.latexProjectId, latexProjectId))
    .orderBy(desc(latexFiles.isMain), latexFiles.path);
}

export async function getLatexFile(id: string) {
  const [file] = await db
    .select()
    .from(latexFiles)
    .where(eq(latexFiles.id, id));
  return file ?? null;
}

export async function getMainLatexFile(latexProjectId: string) {
  const [file] = await db
    .select()
    .from(latexFiles)
    .where(
      and(
        eq(latexFiles.latexProjectId, latexProjectId),
        eq(latexFiles.isMain, true)
      )
    );
  return file ?? null;
}

// ---------------------------------------------------------------------------
// Files — Create
// ---------------------------------------------------------------------------

export async function createLatexFile(data: {
  latexProjectId: string;
  path: string;
  content?: string;
  isMain?: boolean;
}) {
  const [file] = await db
    .insert(latexFiles)
    .values({
      latexProjectId: data.latexProjectId,
      path: data.path,
      content: data.content ?? "",
      isMain: data.isMain ?? false,
    })
    .returning();

  // Touch project updatedAt
  await db
    .update(latexProjects)
    .set({ updatedAt: new Date() })
    .where(eq(latexProjects.id, data.latexProjectId));

  return file;
}

// ---------------------------------------------------------------------------
// Files — Update
// ---------------------------------------------------------------------------

export async function updateLatexFile(
  id: string,
  data: Partial<{ path: string; content: string; isMain: boolean }>
) {
  const [file] = await db
    .update(latexFiles)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(latexFiles.id, id))
    .returning();

  // Touch project updatedAt
  if (file) {
    await db
      .update(latexProjects)
      .set({ updatedAt: new Date() })
      .where(eq(latexProjects.id, file.latexProjectId));
  }

  return file;
}

// ---------------------------------------------------------------------------
// Files — Delete
// ---------------------------------------------------------------------------

export async function deleteLatexFile(id: string) {
  const [file] = await db
    .delete(latexFiles)
    .where(eq(latexFiles.id, id))
    .returning();
  return file;
}

// ---------------------------------------------------------------------------
// Compilations — Read
// ---------------------------------------------------------------------------

export async function getLatexCompilations(latexProjectId: string) {
  return db
    .select()
    .from(latexCompilations)
    .where(eq(latexCompilations.latexProjectId, latexProjectId))
    .orderBy(desc(latexCompilations.createdAt));
}

export async function getLatestCompilation(latexProjectId: string) {
  const [compilation] = await db
    .select()
    .from(latexCompilations)
    .where(eq(latexCompilations.latexProjectId, latexProjectId))
    .orderBy(desc(latexCompilations.createdAt))
    .limit(1);
  return compilation ?? null;
}
