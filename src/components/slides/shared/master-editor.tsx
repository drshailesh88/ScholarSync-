"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Trash } from "@phosphor-icons/react";
import { useSlidesStore } from "@/stores/slides-store";
import type { BlockPosition, ContentBlock, SlideLayout, SlideMaster } from "@/types/presentation";
import { LAYOUT_OPTIONS } from "@/components/presentation/layout-picker";
import { SlideRendererV2 } from "./slide-renderer-v2";

interface MasterEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

function createId(prefix: string): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}`;
}

function toNumber(value: string, fallback: number): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return parsed;
}

function defaultMaster(name = "New Master"): SlideMaster {
  return {
    id: createId("master"),
    name,
    layout: "title_content",
    fixedBlocks: [],
    placeholders: [],
    showSlideNumber: true,
    showFooter: false,
  };
}

function upsertFixedBlock(
  blocks: ContentBlock[],
  key: string,
  nextBlock: ContentBlock
): ContentBlock[] {
  const index = blocks.findIndex((block) => block.masterFixedKey === key);
  if (index === -1) return [...blocks, nextBlock];
  const next = [...blocks];
  next[index] = nextBlock;
  return next;
}

function removeFixedBlock(blocks: ContentBlock[], key: string): ContentBlock[] {
  return blocks.filter((block) => block.masterFixedKey !== key);
}

function updateBlockPosition(
  block: ContentBlock,
  partial: Partial<BlockPosition>
): ContentBlock {
  const current = block.position ?? { x: 0, y: 0, width: 20, height: 10 };
  return {
    ...block,
    position: {
      x: Number((partial.x ?? current.x).toFixed(4)),
      y: Number((partial.y ?? current.y).toFixed(4)),
      width: Number((partial.width ?? current.width).toFixed(4)),
      height: Number((partial.height ?? current.height).toFixed(4)),
    },
  };
}

function getFixedBlock(master: SlideMaster, key: string): ContentBlock | null {
  return master.fixedBlocks.find((block) => block.masterFixedKey === key) ?? null;
}

const DEFAULT_PLACEHOLDER_POSITION: BlockPosition = {
  x: 10,
  y: 18,
  width: 80,
  height: 20,
};

export function MasterEditor({ isOpen, onClose }: MasterEditorProps) {
  const masters = useSlidesStore((s) => s.masters);
  const addMaster = useSlidesStore((s) => s.addMaster);
  const updateMaster = useSlidesStore((s) => s.updateMaster);
  const deleteMaster = useSlidesStore((s) => s.deleteMaster);
  const [activeMasterId, setActiveMasterId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    if (masters.length === 0) {
      const created = defaultMaster("Master");
      addMaster(created);
      setActiveMasterId(created.id);
      return;
    }
    if (!activeMasterId || !masters.some((master) => master.id === activeMasterId)) {
      setActiveMasterId(masters[0].id);
    }
  }, [activeMasterId, addMaster, isOpen, masters]);

  const activeMaster = useMemo(
    () => masters.find((master) => master.id === activeMasterId) ?? null,
    [activeMasterId, masters]
  );

  if (!isOpen || !activeMaster) return null;

  const logoBlock = getFixedBlock(activeMaster, "logo");
  const footerBlock = getFixedBlock(activeMaster, "footer");
  const slideNumberBlock = getFixedBlock(activeMaster, "slide_number");

  const applyMasterUpdate = (updates: Partial<SlideMaster>) => {
    updateMaster(activeMaster.id, updates);
  };

  const createMaster = () => {
    const created = defaultMaster(`Master ${masters.length + 1}`);
    addMaster(created);
    setActiveMasterId(created.id);
  };

  const removeActiveMaster = () => {
    deleteMaster(activeMaster.id);
    const remaining = masters.filter((master) => master.id !== activeMaster.id);
    setActiveMasterId(remaining.length > 0 ? remaining[0].id : null);
  };

  const toggleLogo = (enabled: boolean) => {
    if (!enabled) {
      applyMasterUpdate({
        fixedBlocks: removeFixedBlock(activeMaster.fixedBlocks, "logo"),
      });
      return;
    }
    applyMasterUpdate({
      fixedBlocks: upsertFixedBlock(activeMaster.fixedBlocks, "logo", {
        type: "image",
        masterFixedKey: "logo",
        position: { x: 82, y: 86, width: 14, height: 10 },
        data: { alt: "Logo", suggestion: "Logo" },
      }),
    });
  };

  const toggleFooter = (enabled: boolean) => {
    const nextBlocks = enabled
      ? upsertFixedBlock(activeMaster.fixedBlocks, "footer", {
          type: "text",
          masterFixedKey: "footer",
          position: { x: 2, y: 94, width: 45, height: 5 },
          data: { text: "Footer", style: "caption" },
        })
      : removeFixedBlock(activeMaster.fixedBlocks, "footer");

    applyMasterUpdate({
      fixedBlocks: nextBlocks,
      showFooter: enabled,
    });
  };

  const toggleSlideNumber = (enabled: boolean) => {
    const nextBlocks = enabled
      ? upsertFixedBlock(activeMaster.fixedBlocks, "slide_number", {
          type: "text",
          masterFixedKey: "slide_number",
          position: { x: 92, y: 94, width: 6, height: 5 },
          data: { text: "1", style: "caption" },
        })
      : removeFixedBlock(activeMaster.fixedBlocks, "slide_number");

    applyMasterUpdate({
      fixedBlocks: nextBlocks,
      showSlideNumber: enabled,
    });
  };

  const updateFixedBlockPosition = (key: string, partial: Partial<BlockPosition>) => {
    const target = getFixedBlock(activeMaster, key);
    if (!target) return;
    const nextBlocks = activeMaster.fixedBlocks.map((block) =>
      block.masterFixedKey === key ? updateBlockPosition(block, partial) : block
    );
    applyMasterUpdate({ fixedBlocks: nextBlocks });
  };

  const addPlaceholder = () => {
    applyMasterUpdate({
      placeholders: [
        ...activeMaster.placeholders,
        {
          id: createId("placeholder"),
          label: "Placeholder",
          position: { ...DEFAULT_PLACEHOLDER_POSITION },
          defaultType: "text",
        },
      ],
    });
  };

  const updatePlaceholder = (
    placeholderId: string,
    updates: Partial<SlideMaster["placeholders"][number]>
  ) => {
    applyMasterUpdate({
      placeholders: activeMaster.placeholders.map((placeholder) =>
        placeholder.id === placeholderId
          ? { ...placeholder, ...updates }
          : placeholder
      ),
    });
  };

  const removePlaceholder = (placeholderId: string) => {
    applyMasterUpdate({
      placeholders: activeMaster.placeholders.filter(
        (placeholder) => placeholder.id !== placeholderId
      ),
    });
  };

  const layoutOptions = LAYOUT_OPTIONS.map((option) => option.key) as SlideLayout[];

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/45 p-6">
      <div className="h-[90vh] w-[min(1200px,96vw)] overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
        <div className="flex h-full">
          <aside className="w-60 shrink-0 border-r border-border bg-surface-raised/50 p-3">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-ink">Masters</h3>
              <button
                type="button"
                onClick={createMaster}
                className="rounded border border-border px-2 py-1 text-[11px] text-ink-muted hover:text-ink"
              >
                <Plus size={12} className="inline mr-1" />
                New
              </button>
            </div>
            <div className="space-y-1">
              {masters.map((master) => (
                <button
                  key={master.id}
                  type="button"
                  onClick={() => setActiveMasterId(master.id)}
                  className={`w-full rounded-md border px-2 py-1.5 text-left text-xs transition-colors ${
                    master.id === activeMaster.id
                      ? "border-brand bg-brand/10 text-brand"
                      : "border-border text-ink-muted hover:border-brand/40 hover:text-ink"
                  }`}
                >
                  {master.name}
                </button>
              ))}
            </div>
          </aside>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-ink">Slide Master Editor</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={removeActiveMaster}
                  className="rounded border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                >
                  <Trash size={12} className="inline mr-1" />
                  Delete Master
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded border border-border px-2 py-1 text-xs text-ink-muted hover:text-ink"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <section className="rounded-lg border border-border p-3">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink">
                    Basics
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <label className="mb-1 block text-[10px] text-ink-muted">Name</label>
                      <input
                        type="text"
                        value={activeMaster.name}
                        onChange={(event) =>
                          applyMasterUpdate({ name: event.target.value })
                        }
                        className="w-full rounded border border-border bg-surface px-2 py-1.5 text-xs text-ink"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] text-ink-muted">Layout</label>
                      <select
                        value={activeMaster.layout}
                        onChange={(event) =>
                          applyMasterUpdate({ layout: event.target.value as SlideLayout })
                        }
                        className="w-full rounded border border-border bg-surface px-2 py-1.5 text-xs text-ink"
                      >
                        {layoutOptions.map((layoutKey) => (
                          <option key={layoutKey} value={layoutKey}>
                            {layoutKey}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                <section className="rounded-lg border border-border p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
                      Placeholders
                    </h3>
                    <button
                      type="button"
                      onClick={addPlaceholder}
                      className="rounded border border-border px-2 py-1 text-[11px] text-ink-muted hover:text-ink"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {activeMaster.placeholders.map((placeholder) => (
                      <div key={placeholder.id} className="rounded border border-border p-2">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={placeholder.label}
                            onChange={(event) =>
                              updatePlaceholder(placeholder.id, { label: event.target.value })
                            }
                            className="flex-1 rounded border border-border bg-surface px-2 py-1 text-xs text-ink"
                          />
                          <button
                            type="button"
                            onClick={() => removePlaceholder(placeholder.id)}
                            className="rounded border border-red-200 px-2 py-1 text-[11px] text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="mb-2">
                          <label className="mb-1 block text-[10px] text-ink-muted">Type</label>
                          <select
                            value={placeholder.defaultType}
                            onChange={(event) =>
                              updatePlaceholder(placeholder.id, {
                                defaultType: event.target.value as ContentBlock["type"],
                              })
                            }
                            className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-ink"
                          >
                            <option value="text">Text</option>
                            <option value="bullets">Content</option>
                            <option value="image">Image</option>
                            <option value="chart">Chart</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-4 gap-1">
                          {(["x", "y", "width", "height"] as const).map((field) => (
                            <input
                              key={field}
                              type="number"
                              value={placeholder.position[field]}
                              onChange={(event) =>
                                updatePlaceholder(placeholder.id, {
                                  position: {
                                    ...placeholder.position,
                                    [field]: toNumber(
                                      event.target.value,
                                      placeholder.position[field]
                                    ),
                                  },
                                })
                              }
                              className="rounded border border-border bg-surface px-1 py-1 text-[11px] text-ink"
                              aria-label={`${placeholder.label} ${field}`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                    {activeMaster.placeholders.length === 0 && (
                      <p className="text-xs text-ink-muted">No placeholders yet.</p>
                    )}
                  </div>
                </section>
              </div>

              <div className="space-y-4">
                <section className="rounded-lg border border-border p-3">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink">
                    Fixed Elements
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs text-ink">
                      <input
                        type="checkbox"
                        checked={Boolean(logoBlock)}
                        onChange={(event) => toggleLogo(event.target.checked)}
                      />
                      Logo
                    </label>
                    <label className="flex items-center gap-2 text-xs text-ink">
                      <input
                        type="checkbox"
                        checked={Boolean(footerBlock)}
                        onChange={(event) => toggleFooter(event.target.checked)}
                      />
                      Footer
                    </label>
                    <label className="flex items-center gap-2 text-xs text-ink">
                      <input
                        type="checkbox"
                        checked={Boolean(slideNumberBlock)}
                        onChange={(event) => toggleSlideNumber(event.target.checked)}
                      />
                      Slide Number
                    </label>
                  </div>
                  {[logoBlock, footerBlock, slideNumberBlock]
                    .filter((block): block is ContentBlock => block !== null)
                    .map((block) => (
                      <div key={block.masterFixedKey} className="mt-2 rounded border border-border p-2">
                        <p className="mb-1 text-[10px] uppercase tracking-wider text-ink-muted">
                          {block.masterFixedKey} Position
                        </p>
                        <div className="grid grid-cols-4 gap-1">
                          {(["x", "y", "width", "height"] as const).map((field) => (
                            <input
                              key={`${block.masterFixedKey}-${field}`}
                              type="number"
                              value={block.position?.[field] ?? 0}
                              onChange={(event) =>
                                updateFixedBlockPosition(block.masterFixedKey ?? "", {
                                  [field]: toNumber(
                                    event.target.value,
                                    block.position?.[field] ?? 0
                                  ),
                                })
                              }
                              className="rounded border border-border bg-surface px-1 py-1 text-[11px] text-ink"
                              aria-label={`${block.masterFixedKey} ${field}`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                </section>

                <section className="rounded-lg border border-border p-3">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink">
                    Background
                  </h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={activeMaster.background?.color ?? "#ffffff"}
                      onChange={(event) =>
                        applyMasterUpdate({
                          background: {
                            ...(activeMaster.background ?? {}),
                            color: event.target.value,
                          },
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => applyMasterUpdate({ background: undefined })}
                      className="rounded border border-border px-2 py-1 text-xs text-ink-muted hover:text-ink"
                    >
                      Clear
                    </button>
                  </div>
                </section>

                <section className="rounded-lg border border-border p-3">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink">
                    Preview
                  </h3>
                  <div className="overflow-hidden rounded-lg border border-border">
                    <SlideRendererV2
                      title="Master Preview"
                      subtitle={activeMaster.name}
                      layout={activeMaster.layout}
                      contentBlocks={[]}
                      master={activeMaster}
                      showMasterPlaceholders
                      className="bg-surface"
                    />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
