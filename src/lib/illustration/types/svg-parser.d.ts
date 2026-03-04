declare module 'svg-parser' {
  export interface TextNode {
    type: 'text';
    value: string;
  }

  export interface ElementNode {
    type: 'element';
    tagName: string;
    properties: Record<string, string | number>;
    children: (ElementNode | TextNode)[];
  }

  export interface RootNode {
    type: 'root';
    children: ElementNode[];
  }

  export function parse(svg: string): RootNode;
}
