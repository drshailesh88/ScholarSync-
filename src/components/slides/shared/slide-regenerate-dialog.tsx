"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import {
  type RegenerateTone,
} from "@/lib/slides/regenerate";
import { SlideRegenerateForm } from "./slide-regenerate-form";

interface SlideRegenerateDialogProps {
  open: boolean;
  title: string;
  slideTitles: string[];
  submitLabel?: string;
  onClose: () => void;
  onSubmit: (instruction: string, tone: RegenerateTone) => Promise<boolean>;
}

export function SlideRegenerateDialog({
  open,
  title,
  slideTitles,
  submitLabel,
  onClose,
  onSubmit,
}: SlideRegenerateDialogProps) {
  const [instruction, setInstruction] = useState("");
  const [tone, setTone] = useState<RegenerateTone>("keep_similar");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setInstruction("");
      setTone("keep_similar");
      setSubmitting(false);
      setError("");
    }
  }, [open]);

  async function handleSubmit() {
    setSubmitting(true);
    setError("");

    try {
      const ok = await onSubmit(instruction.trim(), tone);
      if (ok) {
        onClose();
        return;
      }
      setError("Regeneration failed. The slide was left unchanged.");
    } catch {
      setError("Regeneration failed. The slide was left unchanged.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        if (!submitting) onClose();
      }}
      title={title}
      className="max-w-md"
    >
      <SlideRegenerateForm
        slideTitles={slideTitles}
        instruction={instruction}
        tone={tone}
        error={error}
        loading={submitting}
        submitLabel={submitLabel}
        onInstructionChange={setInstruction}
        onToneChange={setTone}
        onCancel={onClose}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}

