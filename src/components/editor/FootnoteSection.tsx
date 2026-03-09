import { useEffect, useState } from "react";
import type { Editor } from "@tiptap/react";

interface FootnoteSectionProps {
  editor: Editor;
}

interface FootnoteData {
  id: string;
  number: number;
  text: string;
  pos: number;
}

export function FootnoteSection({ editor }: FootnoteSectionProps) {
  const [footnotes, setFootnotes] = useState<FootnoteData[]>([]);

  useEffect(() => {
    const updateFootnotes = () => {
      const nextFootnotes: FootnoteData[] = [];
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === "footnote") {
          nextFootnotes.push({
            id: node.attrs.id as string,
            number: node.attrs.number as number,
            text: node.attrs.text as string,
            pos,
          });
        }
      });

      setFootnotes(nextFootnotes.sort((a, b) => a.number - b.number));
    };

    updateFootnotes();
    editor.on("transaction", updateFootnotes);
    return () => {
      editor.off("transaction", updateFootnotes);
    };
  }, [editor]);

  if (footnotes.length === 0) return null;

  return (
    <div className="mt-12 pt-6 border-t border-border">
      <h4 className="text-sm font-semibold text-ink-muted mb-3 uppercase tracking-wider">
        Footnotes
      </h4>
      <ol className="space-y-2">
        {footnotes.map((fn) => (
          <li
            key={fn.id}
            className="text-sm text-ink-muted flex gap-2 cursor-pointer hover:text-ink transition-colors"
            onClick={() => {
              // Scroll to the footnote marker in the text
              editor.chain().focus().setTextSelection(fn.pos).scrollIntoView().run();
            }}
          >
            <span className="font-semibold text-brand shrink-0">
              {fn.number}.
            </span>
            <span>{fn.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
