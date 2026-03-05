"use client";

import dynamic from "next/dynamic";

// Fabric.js and related canvas libraries don't support SSR
const EditorMode = dynamic(
  () => import("@/components/illustration/pages/EditorMode/EditorMode").then((m) => ({ default: m.EditorMode })),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-screen">Loading editor...</div> }
);

/**
 * Canvas editor page
 * Full scientific illustration editor with Fabric.js
 */
export default function IllustrateEditorPage() {
  return <EditorMode />;
}
