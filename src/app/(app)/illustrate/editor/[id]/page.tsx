"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

// Fabric.js and related canvas libraries don't support SSR
const EditorMode = dynamic(
  () => import("@/components/illustration/pages/EditorMode/EditorMode").then((m) => ({ default: m.EditorMode })),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-screen">Loading editor...</div> }
);

/**
 * Canvas editor page with illustration ID
 * Full scientific illustration editor with Fabric.js, loading existing illustration
 */
export default function IllustrateEditorByIdPage() {
  const params = useParams();
  const id = params.id as string;
  return <EditorMode id={id} />;
}
