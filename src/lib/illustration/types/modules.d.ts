/**
 * Type declarations for third-party FINNISH dependencies
 * These packages don't have built-in TypeScript declarations
 */

declare module "svg2pdf.js" {
  export function convert_svg2pdf(svg: string | HTMLElement, options?: unknown): Promise<Blob>;
}

declare module "svg2pdf" {
  export function svg2pdf(svg: SVGElement | string, pdf: unknown): Promise<void>;
}

declare module "react-plotly.js" {
  import { ComponentType } from "react";
  export const Plot: ComponentType<any>;
}

declare module "react-plotly" {
  import { ComponentType } from "react";
  export const Plot: ComponentType<any>;
}

declare module "svg-parser" {
  export function parse(svg: string): unknown;
}

declare module "react-plotly.js" {
  import { ComponentType } from "react";
  export const PlotlyComponent: ComponentType<any>;
}

declare module "save-svg-as-png" {
  export function saveSvgAsPng(svg: SVGElement, options?: unknown): Promise<void>;
}

declare module "glfx" {
  export const glfx: any;
}

declare module "@scienceicons/react" {
  import { ComponentType } from "react";
  export const icons: Record<string, ComponentType<any>>;
}

export {};
