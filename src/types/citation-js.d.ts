declare module '@citation-js/core' {
  export interface CSLData {
    type?: string;
    title?: string;
    author?: Array<{ family?: string; given?: string; literal?: string }>;
    'container-title'?: string;
    'container-title-short'?: string;
    issued?: { 'date-parts': Array<Array<number | string>> };
    DOI?: string;
    PMID?: string;
    abstract?: string;
    volume?: string;
    issue?: string;
    page?: string;
    publisher?: string;
    keywords?: string[];
  }

  export interface CiteOptions {
    format?: string;
    template?: string;
    lang?: string;
  }

  export interface CiteGetOptions {
    format?: string;
    type?: string;
    style?: string;
  }

  export interface Cite {
    constructor(data: CSLData | CSLData[] | string);
    static async(data: CSLData | CSLData[] | string): Promise<Cite>;
    format(type: string, options?: CiteOptions): string;
    get(options: CiteGetOptions): unknown;
    data: CSLData[];
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
