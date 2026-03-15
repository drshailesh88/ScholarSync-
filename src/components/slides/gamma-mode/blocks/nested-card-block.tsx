"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown, Cards } from "@phosphor-icons/react";
import type { NestedCardData, ThemeConfig } from "@/types/presentation";
import { BLOCK_REGISTRY } from "@/components/slides/blocks";

interface NestedCardBlockProps {
  data: NestedCardData;
  theme: ThemeConfig;
  scale?: number;
}

export function NestedCardBlock({ data, theme, scale = 1 }: NestedCardBlockProps) {
  const [isOpen, setIsOpen] = useState(!(data.collapsed ?? true));

  // Slightly adjust the surface color for visual nesting
  const nestedBg = theme.surfaceColor ?? theme.backgroundColor;

  return (
    <div
      className="rounded-[0.4em] border text-[0.7em]"
      style={{
        borderColor: theme.borderColor ?? theme.primaryColor + "33",
        backgroundColor: nestedBg,
      }}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center gap-[0.4em] p-[0.6em] text-left font-semibold"
        style={{ color: theme.textColor }}
      >
        <Cards
          size={Math.round(14 * scale)}
          weight="duotone"
          style={{ color: theme.primaryColor }}
          className="shrink-0"
        />
        <span className="flex-1">{data.title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <CaretDown
            size={Math.round(12 * scale)}
            weight="bold"
            style={{ color: theme.primaryColor }}
          />
        </motion.span>
        {!isOpen && (
          <span
            className="ml-[0.2em] text-[0.75em] opacity-50"
            style={{ color: theme.textColor }}
          >
            Click to expand
          </span>
        )}
      </button>

      {/* Collapsible content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="space-y-[0.4em] border-t px-[0.6em] pb-[0.6em] pt-[0.4em]"
              style={{
                borderColor: theme.borderColor ?? theme.primaryColor + "1a",
              }}
            >
              {/* empty state: renders nothing when no data */}
              {data.contentBlocks.map((block, idx) => {
                const entry = BLOCK_REGISTRY[block.type];
                if (!entry) return null;
                const Renderer = entry.render;
                return (
                  <Renderer
                    key={idx}
                    data={block.data as Record<string, unknown>}
                    theme={theme}
                    scale={scale}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
