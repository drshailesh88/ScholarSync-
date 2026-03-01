"use client";

import { useState, useCallback, useRef } from "react";
import { useSlidesStore } from "@/stores/slides-store";
import type { ContentBlock, ThemeConfig, SlideLayout } from "@/types/presentation";
import { PRESET_THEMES } from "@/types/presentation";
import { computeLayout, regionToCSS } from "../shared/slide-layout-engine";
import { ThemeProvider } from "../shared/theme-engine";
import { BLOCK_REGISTRY } from "../blocks";
import { BlockSelectionWrapper } from "./block-selection-wrapper";
import { EditableTextBlock, EditableBulletsBlock } from "./editable-text-block";
import { BlockInserter } from "./block-inserter";

// ---------------------------------------------------------------------------
// SlideCanvasWYSIWYG — The slide IS the editor.
// Each content block is clickable and editable in-place.
// ---------------------------------------------------------------------------

export function SlideCanvasWYSIWYG() {
  const activeSlide = useSlidesStore((s) => s.getActiveSlide());
  const themeKey = useSlidesStore((s) => s.themeKey);
  const themeConfig = useSlidesStore((s) => s.themeConfig);
  const updateSlide = useSlidesStore((s) => s.updateSlide);

  // Block selection lives in the store so the properties panel can see it
  const selectedBlockIndex = useSlidesStore((s) => s.selectedBlockIndex);
  const setSelectedBlockIndex = useSlidesStore((s) => s.setSelectedBlockIndex);

  const theme = themeConfig ?? PRESET_THEMES[themeKey] ?? PRESET_THEMES.modern;

  // Editing state stays local (only the canvas needs it)
  const [editingBlockIndex, setEditingBlockIndex] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingSubtitle, setEditingSubtitle] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const prevSlideIdRef = useRef(activeSlide?.id);

  // Reset selection when active slide changes
  if (prevSlideIdRef.current !== activeSlide?.id) {
    prevSlideIdRef.current = activeSlide?.id;
    if (selectedBlockIndex !== null) setSelectedBlockIndex(null);
    if (editingBlockIndex !== null) setEditingBlockIndex(null);
    if (editingTitle) setEditingTitle(false);
    if (editingSubtitle) setEditingSubtitle(false);
  }

  // Click on canvas background deselects
  const handleCanvasClick = useCallback(() => {
    setSelectedBlockIndex(null);
    setEditingBlockIndex(null);
    setEditingTitle(false);
    setEditingSubtitle(false);
  }, [setSelectedBlockIndex]);

  // Update a specific block in the slide
  const updateBlock = useCallback(
    (blockIndex: number, updatedBlock: ContentBlock) => {
      if (!activeSlide) return;
      const newBlocks = [...activeSlide.contentBlocks];
      newBlocks[blockIndex] = updatedBlock;
      updateSlide(activeSlide.id, { contentBlocks: newBlocks });
    },
    [activeSlide, updateSlide]
  );

  // Delete a block
  const deleteBlock = useCallback(
    (blockIndex: number) => {
      if (!activeSlide) return;
      const newBlocks = activeSlide.contentBlocks.filter((_, i) => i !== blockIndex);
      updateSlide(activeSlide.id, { contentBlocks: newBlocks });
      setSelectedBlockIndex(null);
      setEditingBlockIndex(null);
    },
    [activeSlide, updateSlide, setSelectedBlockIndex]
  );

  // Insert a block after a given index
  const insertBlockAfter = useCallback(
    (afterIndex: number, block: ContentBlock) => {
      if (!activeSlide) return;
      const newBlocks = [...activeSlide.contentBlocks];
      newBlocks.splice(afterIndex + 1, 0, block);
      updateSlide(activeSlide.id, { contentBlocks: newBlocks });
      setSelectedBlockIndex(afterIndex + 1);
    },
    [activeSlide, updateSlide, setSelectedBlockIndex]
  );

  // Insert a block at the end
  const appendBlock = useCallback(
    (block: ContentBlock) => {
      if (!activeSlide) return;
      const newBlocks = [...activeSlide.contentBlocks, block];
      updateSlide(activeSlide.id, { contentBlocks: newBlocks });
      setSelectedBlockIndex(newBlocks.length - 1);
    },
    [activeSlide, updateSlide, setSelectedBlockIndex]
  );

  // Keyboard handler for the canvas level
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!activeSlide) return;

      // Ctrl+M — new slide
      if (e.ctrlKey && e.key === "m") {
        e.preventDefault();
        useSlidesStore.getState().addSlide(activeSlide.id);
      }

      // Ctrl+D — duplicate slide
      if (e.ctrlKey && e.key === "d") {
        e.preventDefault();
        useSlidesStore.getState().duplicateSlide(activeSlide.id);
      }

      // Ctrl+Z — undo
      if (e.ctrlKey && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        useSlidesStore.getState().undo();
      }

      // Ctrl+Y or Ctrl+Shift+Z — redo
      if ((e.ctrlKey && e.key === "y") || (e.ctrlKey && e.shiftKey && e.key === "z")) {
        e.preventDefault();
        useSlidesStore.getState().redo();
      }

      // Delete selected block
      if (
        selectedBlockIndex !== null &&
        editingBlockIndex === null &&
        (e.key === "Delete" || e.key === "Backspace")
      ) {
        e.preventDefault();
        deleteBlock(selectedBlockIndex);
      }

      // Escape — deselect
      if (e.key === "Escape") {
        if (editingBlockIndex !== null) {
          setEditingBlockIndex(null);
        } else if (selectedBlockIndex !== null) {
          setSelectedBlockIndex(null);
        }
      }

      // Arrow keys — navigate blocks when not editing
      if (editingBlockIndex === null && selectedBlockIndex !== null) {
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          e.preventDefault();
          const next = Math.min(selectedBlockIndex + 1, activeSlide.contentBlocks.length - 1);
          setSelectedBlockIndex(next);
        }
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          e.preventDefault();
          const prev = Math.max(selectedBlockIndex - 1, 0);
          setSelectedBlockIndex(prev);
        }
      }
    },
    [activeSlide, selectedBlockIndex, editingBlockIndex, deleteBlock, setSelectedBlockIndex]
  );

  if (!activeSlide) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-ink-muted">Select a slide to start editing</p>
      </div>
    );
  }

  const layout = (activeSlide.layout ?? "title_content") as SlideLayout;
  const layoutResult = computeLayout(layout, activeSlide.contentBlocks);

  return (
    <div
      className="flex-1 flex items-center justify-center p-8 overflow-auto"
      onClick={handleCanvasClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="w-full max-w-5xl">
        {/* The slide frame — 16:9 aspect ratio */}
        <ThemeProvider
          theme={theme}
          className="aspect-video relative overflow-hidden rounded-lg shadow-2xl"
          style={{ fontSize: "16px" }}
        >
          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ backgroundColor: theme.primaryColor }}
          />

          <div
            ref={canvasRef}
            className="absolute inset-0 p-[6%] pt-[8%] flex flex-col"
          >
            {/* Title area — editable in-place */}
            {!layoutResult.hasBuiltInTitle && (
              <div className="mb-[0.5em] shrink-0">
                <EditableTextBlock
                  content={activeSlide.title}
                  isEditing={editingTitle}
                  onStartEdit={() => {
                    setEditingTitle(true);
                    setEditingSubtitle(false);
                    setEditingBlockIndex(null);
                    setSelectedBlockIndex(null);
                  }}
                  onUpdate={(html) => {
                    const text = html.replace(/<[^>]*>/g, "").trim();
                    updateSlide(activeSlide.id, { title: text });
                  }}
                  onBlur={() => setEditingTitle(false)}
                  placeholder="Click to add title..."
                  theme={theme}
                  style="title"
                />
                <EditableTextBlock
                  content={activeSlide.subtitle}
                  isEditing={editingSubtitle}
                  onStartEdit={() => {
                    setEditingSubtitle(true);
                    setEditingTitle(false);
                    setEditingBlockIndex(null);
                    setSelectedBlockIndex(null);
                  }}
                  onUpdate={(html) => {
                    const text = html.replace(/<[^>]*>/g, "").trim();
                    updateSlide(activeSlide.id, { subtitle: text });
                  }}
                  onBlur={() => setEditingSubtitle(false)}
                  placeholder="Click to add subtitle..."
                  theme={theme}
                  style="subtitle"
                />
              </div>
            )}

            {/* Built-in title layouts */}
            {layout === "title_slide" && (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-[0.5em]">
                <EditableTextBlock
                  content={activeSlide.title}
                  isEditing={editingTitle}
                  onStartEdit={() => {
                    setEditingTitle(true);
                    setEditingSubtitle(false);
                    setEditingBlockIndex(null);
                    setSelectedBlockIndex(null);
                  }}
                  onUpdate={(html) => {
                    const text = html.replace(/<[^>]*>/g, "").trim();
                    updateSlide(activeSlide.id, { title: text });
                  }}
                  onBlur={() => setEditingTitle(false)}
                  placeholder="Presentation Title"
                  theme={theme}
                  style="title"
                  className="text-center"
                />
                <EditableTextBlock
                  content={activeSlide.subtitle}
                  isEditing={editingSubtitle}
                  onStartEdit={() => {
                    setEditingSubtitle(true);
                    setEditingTitle(false);
                    setEditingBlockIndex(null);
                    setSelectedBlockIndex(null);
                  }}
                  onUpdate={(html) => {
                    const text = html.replace(/<[^>]*>/g, "").trim();
                    updateSlide(activeSlide.id, { subtitle: text });
                  }}
                  onBlur={() => setEditingSubtitle(false)}
                  placeholder="Subtitle"
                  theme={theme}
                  style="subtitle"
                  className="text-center"
                />
              </div>
            )}

            {layout === "section_header" && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div
                  className="w-[3em] h-[0.15em] mb-[0.8em] rounded-full"
                  style={{ backgroundColor: theme.accentColor }}
                />
                <EditableTextBlock
                  content={activeSlide.title}
                  isEditing={editingTitle}
                  onStartEdit={() => {
                    setEditingTitle(true);
                    setEditingBlockIndex(null);
                    setSelectedBlockIndex(null);
                  }}
                  onUpdate={(html) => {
                    const text = html.replace(/<[^>]*>/g, "").trim();
                    updateSlide(activeSlide.id, { title: text });
                  }}
                  onBlur={() => setEditingTitle(false)}
                  placeholder="Section Title"
                  theme={theme}
                  style="title"
                  className="text-center"
                />
              </div>
            )}

            {/* Content regions with editable blocks */}
            {layoutResult.regions.length > 0 && (
              <div className="flex-1 relative min-h-0 group">
                {layoutResult.regions.map((region) => (
                  <div key={region.id} style={regionToCSS(region)}>
                    {region.blocks.map((block, localIdx) => {
                      // Find the global index of this block
                      const globalIdx = activeSlide.contentBlocks.indexOf(block);
                      const blockIndex = globalIdx >= 0 ? globalIdx : localIdx;

                      return (
                        <EditableBlockDispatcher
                          key={`${block.type}-${blockIndex}`}
                          block={block}
                          blockIndex={blockIndex}
                          isSelected={selectedBlockIndex === blockIndex}
                          isEditing={editingBlockIndex === blockIndex}
                          onSelect={() => {
                            setSelectedBlockIndex(blockIndex);
                            setEditingBlockIndex(null);
                            setEditingTitle(false);
                            setEditingSubtitle(false);
                          }}
                          onStartEdit={() => {
                            setSelectedBlockIndex(blockIndex);
                            setEditingBlockIndex(blockIndex);
                            setEditingTitle(false);
                            setEditingSubtitle(false);
                          }}
                          onStopEdit={() => setEditingBlockIndex(null)}
                          onUpdate={(updated) => updateBlock(blockIndex, updated)}
                          onDelete={() => deleteBlock(blockIndex)}
                          onInsertAfter={(newBlock) => insertBlockAfter(blockIndex, newBlock)}
                          theme={theme}
                        />
                      );
                    })}

                    {/* Block inserter at the end of each region */}
                    <BlockInserter
                      onInsert={(block) => appendBlock(block)}
                      className="mt-1"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Slide number */}
          <div
            className="absolute bottom-[3%] right-[4%] text-[0.6em] opacity-30"
            style={{ color: theme.textColor }}
          >
            {activeSlide.sortOrder + 1}
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// EditableBlockDispatcher — routes block types to their editable renderers
// ---------------------------------------------------------------------------

interface EditableBlockDispatcherProps {
  block: ContentBlock;
  blockIndex: number;
  isSelected: boolean;
  isEditing: boolean;
  onSelect: () => void;
  onStartEdit: () => void;
  onStopEdit: () => void;
  onUpdate: (block: ContentBlock) => void;
  onDelete: () => void;
  onInsertAfter: (block: ContentBlock) => void;
  theme: ThemeConfig;
}

function EditableBlockDispatcher({
  block,
  blockIndex,
  isSelected,
  isEditing,
  onSelect,
  onStartEdit,
  onStopEdit,
  onUpdate,
  onDelete,
  theme,
}: EditableBlockDispatcherProps) {
  // Text and bullets get TipTap-powered editing
  if (block.type === "text") {
    return (
      <BlockSelectionWrapper
        block={block}
        blockIndex={blockIndex}
        isSelected={isSelected}
        isEditing={isEditing}
        onSelect={onSelect}
        onStartEdit={onStartEdit}
        onDelete={onDelete}
      >
        <EditableTextBlock
          content={block.data.text}
          isEditing={isEditing}
          onStartEdit={onStartEdit}
          onUpdate={(html) => {
            onUpdate({ ...block, data: { ...block.data, text: html } });
          }}
          onBlur={onStopEdit}
          theme={theme}
          style={block.data.style ?? "body"}
        />
      </BlockSelectionWrapper>
    );
  }

  if (block.type === "bullets") {
    return (
      <BlockSelectionWrapper
        block={block}
        blockIndex={blockIndex}
        isSelected={isSelected}
        isEditing={isEditing}
        onSelect={onSelect}
        onStartEdit={onStartEdit}
        onDelete={onDelete}
      >
        <EditableBulletsBlock
          items={block.data.items}
          ordered={block.data.ordered}
          isEditing={isEditing}
          onStartEdit={onStartEdit}
          onUpdate={(items, ordered) => {
            onUpdate({ ...block, data: { items, ordered } });
          }}
          onBlur={onStopEdit}
          theme={theme}
        />
      </BlockSelectionWrapper>
    );
  }

  if (block.type === "quote") {
    return (
      <BlockSelectionWrapper
        block={block}
        blockIndex={blockIndex}
        isSelected={isSelected}
        isEditing={isEditing}
        onSelect={onSelect}
        onStartEdit={onStartEdit}
        onDelete={onDelete}
      >
        <EditableTextBlock
          content={block.data.text}
          isEditing={isEditing}
          onStartEdit={onStartEdit}
          onUpdate={(html) => {
            const text = html.replace(/<[^>]*>/g, "").trim();
            onUpdate({ ...block, data: { ...block.data, text } });
          }}
          onBlur={onStopEdit}
          theme={theme}
          style="body"
          placeholder="Enter quote..."
        />
      </BlockSelectionWrapper>
    );
  }

  // All other block types: render with BlockSelectionWrapper + read-only renderer
  // Click to select — properties panel shows block-specific editor
  const entry = BLOCK_REGISTRY[block.type];
  if (!entry) return null;
  const Renderer = entry.render;

  return (
    <BlockSelectionWrapper
      block={block}
      blockIndex={blockIndex}
      isSelected={isSelected}
      isEditing={false}
      onSelect={onSelect}
      onStartEdit={onSelect} // For non-text blocks, "edit" = select (properties panel)
      onDelete={onDelete}
    >
      <Renderer
        data={block.data as Record<string, unknown>}
        theme={theme}
        scale={1}
      />
    </BlockSelectionWrapper>
  );
}
