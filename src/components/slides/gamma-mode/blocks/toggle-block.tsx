"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import type { ToggleData, ThemeConfig } from "@/types/presentation";

interface ToggleBlockProps {
  data: ToggleData;
  theme: ThemeConfig;
  scale?: number;
}

export function ToggleBlock({ data, theme, scale = 1 }: ToggleBlockProps) {
  const [isOpen, setIsOpen] = useState(data.defaultOpen ?? false);

  return (
    <div
      className="rounded-[0.3em] border text-[0.7em]"
      style={{
        borderColor: theme.borderColor ?? theme.primaryColor + "33",
        backgroundColor: theme.surfaceColor ?? theme.backgroundColor,
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center gap-[0.4em] p-[0.6em] text-left font-semibold"
        style={{ color: theme.textColor }}
      >
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <CaretDown
            size={Math.round(14 * scale)}
            weight="bold"
            style={{ color: theme.primaryColor }}
          />
        </motion.span>
        <span>{data.title}</span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {/* Content is from the app's own data store (AI-generated slide content) */}
            <div
              className="px-[0.6em] pb-[0.6em] pl-[1.8em]"
              style={{ color: theme.textColor }}
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
