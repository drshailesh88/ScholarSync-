/**
 * Type declarations for plotly.js-dist-min
 */
declare module 'plotly.js-dist-min' {
  // Re-export types from @types/plotly.js
  export interface Data {
    type: string;
    x?: (number | string)[];
    y?: (number | string)[];
    z?: number[][];
    name?: string;
    mode?: string;
    fill?: string;
    fillcolor?: string;
    stackgroup?: string;
    labels?: string[];
    values?: number[];
    hole?: number;
    textinfo?: string;
    textposition?: string;
    marker?: {
      color?: string | string[];
      colors?: string[];
      size?: number;
    };
    line?: {
      color?: string;
      width?: number;
      shape?: string;
    };
    error_y?: {
      type: 'data';
      array: number[];
      visible: boolean;
      color?: string;
    };
    box?: {
      visible?: boolean;
    };
    meanline?: {
      visible?: boolean;
    };
    points?: boolean | string;
    boxpoints?: boolean | string;
    colorscale?: string;
    showscale?: boolean;
    nbinsx?: number;
  }

  export interface Layout {
    title?: {
      text: string;
      font?: {
        family?: string;
        size?: number;
        color?: string;
      };
    };
    width?: number;
    height?: number;
    font?: {
      family?: string;
      size?: number;
      color?: string;
    };
    paper_bgcolor?: string;
    plot_bgcolor?: string;
    margin?: { t?: number; b?: number; l?: number; r?: number };
    showlegend?: boolean;
    legend?: {
      orientation?: 'h' | 'v';
      x?: number;
      y?: number;
      xanchor?: string;
      yanchor?: string;
    };
    xaxis?: {
      title?: { text: string; font?: { family?: string; size?: number } };
      type?: string;
      range?: [number, number];
      showgrid?: boolean;
      gridcolor?: string;
      zeroline?: boolean;
    };
    yaxis?: {
      title?: { text: string; font?: { family?: string; size?: number } };
      type?: string;
      range?: [number, number];
      showgrid?: boolean;
      gridcolor?: string;
      zeroline?: boolean;
    };
    barmode?: 'group' | 'stack';
    annotations?: Partial<Annotations>[];
    shapes?: Array<{
      type?: string;
      x0?: number | string;
      x1?: number | string;
      y0?: number | string;
      y1?: number | string;
      xref?: string;
      yref?: string;
      line?: { color?: string; width?: number; dash?: string };
      fillcolor?: string;
      opacity?: number;
    }>;
  }

  export interface Annotations {
    x: number | string;
    y: number | string;
    text: string;
    showarrow: boolean;
    font?: { color?: string; size?: number };
  }

  export interface Config {
    responsive?: boolean;
    displayModeBar?: boolean;
    staticPlot?: boolean;
  }

  export interface PlotlyHTMLElement extends HTMLElement {
    data: Data[];
    layout: Partial<Layout>;
  }

  function newPlot(
    element: HTMLElement,
    data: Data[],
    layout: Partial<Layout>,
    config?: Partial<Config>
  ): Promise<PlotlyHTMLElement>;

  function react(
    element: PlotlyHTMLElement,
    data: Data[],
    layout: Partial<Layout>
  ): Promise<PlotlyHTMLElement>;

  function toImage(
    element: PlotlyHTMLElement,
    options: { format: string; width?: number; height?: number; scale?: number }
  ): Promise<string>;

  function purge(element: PlotlyHTMLElement): void;

  const Plotly: {
    newPlot: typeof newPlot;
    react: typeof react;
    toImage: typeof toImage;
    purge: typeof purge;
  };

  export default Plotly;
  export { newPlot, react, toImage, purge };
}
