type CitationNodeLike = {
  type: { name: string };
  attrs: Record<string, unknown>;
  nodeSize?: number;
};

type DescendantsLike = {
  descendants: (
    callback: (node: CitationNodeLike, pos: number) => void
  ) => void;
};

export type CitationReferenceMutation =
  | {
      kind: "delete";
      pos: number;
      nodeSize: number;
    }
  | {
      kind: "update";
      pos: number;
      attrs: Record<string, unknown>;
    };

export function collectCitationReferenceMutations(
  doc: DescendantsLike,
  referenceId: string
): CitationReferenceMutation[] {
  const mutations: CitationReferenceMutation[] = [];

  doc.descendants((node, pos) => {
    if (node.type.name !== "citation") {
      return;
    }

    const referenceIds = Array.isArray(node.attrs.referenceIds)
      ? (node.attrs.referenceIds as string[])
      : [];

    if (!referenceIds.includes(referenceId)) {
      return;
    }

    const nextReferenceIds = referenceIds.filter((id) => id !== referenceId);

    if (nextReferenceIds.length === 0) {
      mutations.push({
        kind: "delete",
        pos,
        nodeSize: node.nodeSize ?? 0,
      });
      return;
    }

    mutations.push({
      kind: "update",
      pos,
      attrs: {
        ...node.attrs,
        referenceIds: nextReferenceIds,
      },
    });
  });

  return mutations.sort((a, b) => b.pos - a.pos);
}
