import type { ContentBlock, ImageData } from "@/types/presentation";

export interface ImageBlockRef {
  path: number[];
  block: Extract<ContentBlock, { type: "image" }>;
}

function isNestedCardBlock(
  block: ContentBlock
): block is Extract<ContentBlock, { type: "nested_card" }> {
  return block.type === "nested_card";
}

export function visitImageBlocks(
  blocks: ContentBlock[],
  visitor: (ref: ImageBlockRef) => void,
  parentPath: number[] = []
): void {
  blocks.forEach((block, index) => {
    const path = [...parentPath, index];

    if (block.type === "image") {
      visitor({ path, block });
      return;
    }

    if (isNestedCardBlock(block)) {
      visitImageBlocks(block.data.contentBlocks, visitor, path);
    }
  });
}

export function collectImageBlocks(blocks: ContentBlock[]): ImageBlockRef[] {
  const refs: ImageBlockRef[] = [];
  visitImageBlocks(blocks, (ref) => refs.push(ref));
  return refs;
}

export function collectMissingImageBlocks(blocks: ContentBlock[]): ImageBlockRef[] {
  return collectImageBlocks(blocks).filter(
    ({ block }) => !block.data.url && typeof block.data.suggestion === "string" && block.data.suggestion.trim().length > 0
  );
}

export function updateBlockAtPath(
  blocks: ContentBlock[],
  path: number[],
  updater: (block: ContentBlock) => ContentBlock
): ContentBlock[] {
  if (path.length === 0) return blocks;

  const [index, ...rest] = path;
  return blocks.map((block, currentIndex) => {
    if (currentIndex !== index) return block;

    if (rest.length === 0) {
      return updater(block);
    }

    if (!isNestedCardBlock(block)) {
      return block;
    }

    return {
      ...block,
      data: {
        ...block.data,
        contentBlocks: updateBlockAtPath(block.data.contentBlocks, rest, updater),
      },
    };
  });
}

export function mergeGeneratedImageData(
  data: ImageData,
  next: { imageUrl: string; attribution?: string; prompt?: string }
): ImageData {
  const versions = [...(data.versions ?? [])];
  if (data.url) {
    versions.unshift({
      url: data.url,
      prompt: data.suggestion,
      attribution: data.attribution,
      createdAt: new Date().toISOString(),
    });
  }

  return {
    ...data,
    url: next.imageUrl,
    attribution: next.attribution,
    suggestion: next.prompt ?? data.suggestion,
    versions,
    crop: undefined,
  };
}
