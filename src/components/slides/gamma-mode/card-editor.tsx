"use client";

import { useState, useCallback } from "react";
import { useSlidesStore } from "@/stores/slides-store";
import type { SlideState } from "@/stores/slides-store";
import type { ContentBlock, ThemeConfig } from "@/types/presentation";
import { BLOCK_REGISTRY } from "@/components/slides/blocks";
import {
  EditableTextBlock,
  EditableBulletsBlock,
} from "@/components/slides/wysiwyg/editable-text-block";
import { AddBlockButton } from "./add-block-button";

// ---------------------------------------------------------------------------
// CardEditor — Makes each card's content inline-editable when active
// ---------------------------------------------------------------------------

interface CardEditorProps {
  slide: SlideState;
  isActive: boolean;
}

export function CardEditor({ slide, isActive }: CardEditorProps) {
  const themeConfig = useSlidesStore((s) => s.themeConfig);
  const updateSlide = useSlidesStore((s) => s.updateSlide);
  const [editingBlockIndex, setEditingBlockIndex] = useState<number | null>(
    null,
  );
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(
    null,
  );

  // Title editing state
  const [editingTitle, setEditingTitle] = useState(false);

  const handleBlockUpdate = useCallback(
    (blockIndex: number, updatedData: Record<string, unknown>) => {
      const newBlocks = [...slide.contentBlocks];
      newBlocks[blockIndex] = {
        ...newBlocks[blockIndex],
        data: updatedData,
      } as ContentBlock;
      updateSlide(slide.id, { contentBlocks: newBlocks });
    },
    [slide.id, slide.contentBlocks, updateSlide],
  );

  const handleTitleUpdate = useCallback(
    (html: string) => {
      // Strip HTML tags for title (it's plain text)
      const text = html.replace(/<[^>]*>/g, "").trim();
      updateSlide(slide.id, { title: text });
    },
    [slide.id, updateSlide],
  );

  return (
    <div className="p-6 md:p-8">
      {/* Editable title */}
      {(slide.title || isActive) && (
        <div className="mb-4">
          {isActive ? (
            <EditableTextBlock
              content={slide.title || ""}
              isEditing={editingTitle}
              onStartEdit={() => setEditingTitle(true)}
              onUpdate={handleTitleUpdate}
              onBlur={() => setEditingTitle(false)}
              placeholder="Card title..."
              theme={themeConfig}
              style="title"
            />
          ) : (
            <h2
              className="text-xl md:text-2xl font-bold leading-tight"
              style={{
                color: themeConfig.primaryColor,
                fontFamily:
                  themeConfig.headingFontFamily ??
                  themeConfig.fontFamily ??
                  undefined,
              }}
            >
              {slide.title || "Untitled Card"}
            </h2>
          )}
        </div>
      )}

      {/* Subtitle (read-only for now, keeping parity with card-stack) */}
      {slide.subtitle && !isActive && (
        <p
          className="text-sm md:text-base mb-4 opacity-70"
          style={{
            fontFamily: themeConfig.fontFamily ?? undefined,
          }}
        >
          {slide.subtitle}
        </p>
      )}
      {slide.subtitle && isActive && (
        <div className="mb-4">
          <EditableTextBlock
            content={slide.subtitle || ""}
            isEditing={false}
            onStartEdit={() => {}}
            onUpdate={(html) => {
              const text = html.replace(/<[^>]*>/g, "").trim();
              updateSlide(slide.id, { subtitle: text });
            }}
            onBlur={() => {}}
            placeholder="Subtitle..."
            theme={themeConfig}
            style="subtitle"
          />
        </div>
      )}

      {/* Content blocks */}
      <div className="flex flex-col gap-4">
        {slide.contentBlocks.map((block, blockIndex) => (
          <CardBlock
            key={blockIndex}
            block={block}
            blockIndex={blockIndex}
            isCardActive={isActive}
            isEditing={editingBlockIndex === blockIndex}
            isSelected={selectedBlockIndex === blockIndex}
            onStartEdit={() => {
              setEditingBlockIndex(blockIndex);
              setSelectedBlockIndex(blockIndex);
            }}
            onSelect={() => setSelectedBlockIndex(blockIndex)}
            onBlur={() => setEditingBlockIndex(null)}
            onUpdate={(data) => handleBlockUpdate(blockIndex, data)}
            theme={themeConfig}
          />
        ))}
      </div>

      {/* Add block button for active cards */}
      {isActive && (
        <AddBlockButton
          onAddBlock={(block) => {
            const newBlocks = [...slide.contentBlocks, block];
            updateSlide(slide.id, { contentBlocks: newBlocks });
          }}
        />
      )}

      {/* Empty state for active card with no content */}
      {isActive && slide.contentBlocks.length === 0 && (
        <p className="text-sm text-ink-muted/50 italic">
          Click here to start typing, or type / for commands
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// CardBlock — Single block within a card, editable or read-only
// ---------------------------------------------------------------------------

interface CardBlockProps {
  block: ContentBlock;
  blockIndex: number;
  isCardActive: boolean;
  isEditing: boolean;
  isSelected: boolean;
  onStartEdit: () => void;
  onSelect: () => void;
  onBlur: () => void;
  onUpdate: (data: Record<string, unknown>) => void;
  theme: ThemeConfig;
}

function CardBlock({
  block,
  isCardActive,
  isEditing,
  isSelected,
  onStartEdit,
  onSelect,
  onBlur,
  onUpdate,
  theme,
}: CardBlockProps) {
  // Text blocks: use Tiptap inline editing
  if (block.type === "text" && isCardActive) {
    const textData = block.data as {
      text: string;
      style?: string;
      fontFamily?: string;
      fontSize?: string;
      color?: string;
    };
    return (
      <EditableTextBlock
        content={textData.text}
        isEditing={isEditing}
        onStartEdit={onStartEdit}
        onUpdate={(html) => onUpdate({ ...textData, text: html })}
        onBlur={onBlur}
        theme={theme}
        style={
          (textData.style as "title" | "subtitle" | "body" | "caption") ??
          "body"
        }
        fontFamily={textData.fontFamily}
        fontSize={textData.fontSize}
        color={textData.color}
      />
    );
  }

  // Bullets blocks: use Tiptap bullets editing
  if (block.type === "bullets" && isCardActive) {
    const bulletsData = block.data as {
      items: string[];
      ordered?: boolean;
    };
    return (
      <EditableBulletsBlock
        items={bulletsData.items}
        ordered={bulletsData.ordered}
        isEditing={isEditing}
        onStartEdit={onStartEdit}
        onUpdate={(items, ordered) => onUpdate({ items, ordered })}
        onBlur={onBlur}
        theme={theme}
      />
    );
  }

  // All other blocks: render read-only via BLOCK_REGISTRY with selection ring
  const entry = BLOCK_REGISTRY[block.type];
  if (!entry) return null;
  const Renderer = entry.render;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (isCardActive) onSelect();
      }}
      className={`rounded-lg transition-all ${
        isSelected && isCardActive
          ? "ring-2 ring-brand/40 bg-brand/5"
          : isCardActive
            ? "hover:ring-1 hover:ring-border cursor-pointer"
            : ""
      }`}
    >
      <Renderer
        data={block.data as Record<string, unknown>}
        theme={theme}
        scale={1}
      />
    </div>
  );
}
