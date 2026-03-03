declare module '@citation-js/core' {
  export class Cite {
    constructor(data: unknown | unknown[]);
    static async(data: unknown): Promise<Cite>;
    format(type: string, options?: Record<string, unknown>): string;
    data: unknown[];
  }

  export const plugins: {
    config: {
      get(name: string): {
        templates: {
          has(name: string): boolean;
          add(name: string, template: string): void;
        };
      } | undefined;
    };
  };
}

declare module '@citation-js/plugin-csl' {
  const plugin: unknown;
  export default plugin;
}

declare module '@citation-js/plugin-bibtex' {
  const plugin: unknown;
  export default plugin;
}

declare module '@citation-js/plugin-doi' {
  const plugin: unknown;
  export default plugin;
}

declare module '@citation-js/plugin-ris' {
  const plugin: unknown;
  export default plugin;
}
