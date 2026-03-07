/**
 * Rough Canvas Bridge
 *
 * Bridges Rough.js hand-drawn style generation with Fabric.js objects.
 * Converts clean Fabric shapes (Rect, Ellipse, Line) into sketchy
 * SVG path equivalents using Rough.js generators.
 */

import rough from 'roughjs';
import type { Options as RoughOptions } from 'roughjs/bin/core';
import { Path as FabricPath, type FabricObject } from 'fabric';
import { defaultRoughOptions, roughStylePresets } from '@/lib/illustration/lib/rough/index';

export type RoughPreset = keyof typeof roughStylePresets;

export interface RoughCanvasSettings {
  preset: RoughPreset;
  roughness: number;
  bowing: number;
  seed?: number;
  stroke: string;
  strokeWidth: number;
  fill: string;
  fillStyle: string;
}

export const defaultRoughSettings: RoughCanvasSettings = {
  preset: 'notebook',
  roughness: 1,
  bowing: 1,
  stroke: '#000000',
  strokeWidth: 2,
  fill: 'rgba(0, 120, 212, 0.1)',
  fillStyle: 'hachure',
};

function getRoughOptions(settings: RoughCanvasSettings): RoughOptions {
  const presetOptions = roughStylePresets[settings.preset] || {};
  return {
    ...defaultRoughOptions,
    ...presetOptions,
    roughness: settings.roughness,
    bowing: settings.bowing,
    stroke: settings.stroke,
    strokeWidth: settings.strokeWidth,
    fill: settings.fill,
    fillStyle: settings.fillStyle as RoughOptions['fillStyle'],
    seed: settings.seed,
  };
}

function extractPathData(svgGroup: SVGGElement): string {
  const paths: string[] = [];
  const pathElements = svgGroup.querySelectorAll('path');
  pathElements.forEach((pathEl) => {
    const d = pathEl.getAttribute('d');
    if (d) paths.push(d);
  });
  return paths.join(' ');
}

function createTempSvg(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '1');
  svg.setAttribute('height', '1');
  return svg;
}

export function generateRoughRect(
  x: number,
  y: number,
  width: number,
  height: number,
  settings: RoughCanvasSettings
): FabricPath {
  const svg = createTempSvg();
  const rc = rough.svg(svg);
  const options = getRoughOptions(settings);
  const node = rc.rectangle(x, y, width, height, options);
  const pathData = extractPathData(node);

  return new FabricPath(pathData, {
    fill: settings.fill,
    stroke: settings.stroke,
    strokeWidth: settings.strokeWidth,
    selectable: true,
    evented: true,
  });
}

export function generateRoughEllipse(
  cx: number,
  cy: number,
  width: number,
  height: number,
  settings: RoughCanvasSettings
): FabricPath {
  const svg = createTempSvg();
  const rc = rough.svg(svg);
  const options = getRoughOptions(settings);
  const node = rc.ellipse(cx, cy, width, height, options);
  const pathData = extractPathData(node);

  return new FabricPath(pathData, {
    fill: settings.fill,
    stroke: settings.stroke,
    strokeWidth: settings.strokeWidth,
    selectable: true,
    evented: true,
  });
}

export function generateRoughLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  settings: RoughCanvasSettings
): FabricPath {
  const svg = createTempSvg();
  const rc = rough.svg(svg);
  const options = getRoughOptions(settings);
  const node = rc.line(x1, y1, x2, y2, options);
  const pathData = extractPathData(node);

  return new FabricPath(pathData, {
    fill: 'transparent',
    stroke: settings.stroke,
    strokeWidth: settings.strokeWidth,
    selectable: true,
    evented: true,
  });
}

export function convertObjectToRough(
  obj: FabricObject,
  settings: RoughCanvasSettings
): FabricPath | null {
  const type = obj.type;
  const left = obj.left ?? 0;
  const top = obj.top ?? 0;
  const width = (obj.width ?? 0) * (obj.scaleX ?? 1);
  const height = (obj.height ?? 0) * (obj.scaleY ?? 1);

  const objSettings: RoughCanvasSettings = {
    ...settings,
    stroke: (typeof obj.stroke === 'string' ? obj.stroke : settings.stroke),
    fill: (typeof obj.fill === 'string' ? obj.fill : settings.fill),
    strokeWidth: obj.strokeWidth ?? settings.strokeWidth,
  };

  let roughPath: FabricPath | null = null;

  if (type === 'rect') {
    roughPath = generateRoughRect(left, top, width, height, objSettings);
  } else if (type === 'ellipse') {
    roughPath = generateRoughEllipse(
      left + width / 2,
      top + height / 2,
      width,
      height,
      objSettings
    );
  } else if (type === 'line') {
    const lineObj = obj as unknown as { x1: number; y1: number; x2: number; y2: number };
    roughPath = generateRoughLine(
      lineObj.x1 ?? left,
      lineObj.y1 ?? top,
      lineObj.x2 ?? left + width,
      lineObj.y2 ?? top + height,
      objSettings
    );
  }

  if (roughPath) {
    roughPath.set({
      left,
      top,
    });
  }

  return roughPath;
}
