import type { SlideMaster } from "@/types/presentation";

const BUILT_IN_SLIDE_MASTERS: SlideMaster[] = [
  {
    id: "master-title-slide",
    name: "Title Slide",
    layout: "title_slide",
    fixedBlocks: [
      {
        type: "image",
        masterFixedKey: "logo",
        position: { x: 82, y: 86, width: 14, height: 10 },
        data: {
          alt: "Logo",
          suggestion: "Organization logo",
        },
      },
    ],
    placeholders: [
      {
        id: "title",
        label: "Title",
        position: { x: 18, y: 34, width: 64, height: 14 },
        defaultType: "text",
      },
      {
        id: "subtitle",
        label: "Subtitle",
        position: { x: 22, y: 52, width: 56, height: 10 },
        defaultType: "text",
      },
    ],
    showSlideNumber: false,
    showFooter: false,
  },
  {
    id: "master-content",
    name: "Content",
    layout: "title_content",
    fixedBlocks: [
      {
        type: "text",
        masterFixedKey: "footer",
        position: { x: 2, y: 94, width: 45, height: 5 },
        data: {
          text: "Footer",
          style: "caption",
        },
      },
    ],
    placeholders: [
      {
        id: "content-title",
        label: "Title",
        position: { x: 0, y: 0, width: 100, height: 16 },
        defaultType: "text",
      },
      {
        id: "content-body",
        label: "Content",
        position: { x: 0, y: 20, width: 100, height: 68 },
        defaultType: "text",
      },
    ],
    showSlideNumber: true,
    showFooter: true,
  },
  {
    id: "master-two-column",
    name: "Two Column",
    layout: "two_column",
    fixedBlocks: [
      {
        type: "text",
        masterFixedKey: "footer",
        position: { x: 2, y: 94, width: 45, height: 5 },
        data: {
          text: "Footer",
          style: "caption",
        },
      },
    ],
    placeholders: [
      {
        id: "two-column-title",
        label: "Title",
        position: { x: 0, y: 0, width: 100, height: 14 },
        defaultType: "text",
      },
      {
        id: "two-column-left",
        label: "Left Content",
        position: { x: 0, y: 18, width: 48, height: 70 },
        defaultType: "text",
      },
      {
        id: "two-column-right",
        label: "Right Content",
        position: { x: 52, y: 18, width: 48, height: 70 },
        defaultType: "text",
      },
    ],
    showSlideNumber: true,
    showFooter: true,
  },
];

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function createBuiltInSlideMasters(): SlideMaster[] {
  return deepClone(BUILT_IN_SLIDE_MASTERS);
}

export function mergeSlideMasters(rawMasters: unknown): SlideMaster[] {
  const builtIns = createBuiltInSlideMasters();
  if (!Array.isArray(rawMasters)) {
    return builtIns;
  }

  const custom = rawMasters as SlideMaster[];
  const byId = new Map<string, SlideMaster>();

  for (const master of builtIns) {
    byId.set(master.id, master);
  }

  for (const master of custom) {
    if (!master || typeof master.id !== "string") continue;
    byId.set(master.id, deepClone(master));
  }

  return [...byId.values()];
}

export function getSlideMasterById(
  masters: SlideMaster[],
  masterId?: string
): SlideMaster | null {
  if (!masterId) return null;
  return masters.find((master) => master.id === masterId) ?? null;
}

export function masterPlaceholderPrompt(type: string): string {
  return `Click to add ${type}`;
}
