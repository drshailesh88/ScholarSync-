/**
 * React Hook for Hand-Drawn Style
 *
 * Provides easy integration of Rough.js hand-drawn styles with React components.
 */

import { useRef, useCallback, useMemo } from 'react';
import { HandDrawnStyle, StylePreset, convertToHandDrawn } from './HandDrawnStyle';
import type { Options as RoughOptions } from 'roughjs/bin/core';

export interface UseHandDrawnStyleOptions {
  preset?: StylePreset;
  customOptions?: Partial<RoughOptions>;
  seed?: number;
}

export interface UseHandDrawnStyleReturn {
  svgRef: React.RefObject<SVGSVGElement | null>;
  handDrawn: HandDrawnStyle;
  rectangle: (x: number, y: number, width: number, height: number, options?: Partial<RoughOptions>) => SVGGElement | null;
  circle: (x: number, y: number, diameter: number, options?: Partial<RoughOptions>) => SVGGElement | null;
  ellipse: (x: number, y: number, width: number, height: number, options?: Partial<RoughOptions>) => SVGGElement | null;
  line: (x1: number, y1: number, x2: number, y2: number, options?: Partial<RoughOptions>) => SVGGElement | null;
  path: (pathData: string, options?: Partial<RoughOptions>) => SVGGElement | null;
  polygon: (points: Array<[number, number]>, options?: Partial<RoughOptions>) => SVGGElement | null;
  arrow: (x1: number, y1: number, x2: number, y2: number, options?: Partial<RoughOptions>) => SVGGElement | null;
  setPreset: (preset: StylePreset) => void;
  setOptions: (options: Partial<RoughOptions>) => void;
  convertElement: () => SVGSVGElement | null;
  init: () => void;
}

export function useHandDrawnStyle(options: UseHandDrawnStyleOptions = {}): UseHandDrawnStyleReturn {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const handDrawn = useMemo(() => {
    return new HandDrawnStyle({
      preset: options.preset,
      customOptions: options.customOptions,
      seed: options.seed,
    });
  }, [options.preset, options.seed]);

  const init = useCallback(() => {
    if (svgRef.current) {
      handDrawn.init(svgRef.current);
    }
  }, [handDrawn]);

  const rectangle = useCallback(
    (x: number, y: number, width: number, height: number, opts?: Partial<RoughOptions>) => {
      if (svgRef.current && !handDrawn.getOptions().seed) {
        handDrawn.init(svgRef.current);
      }
      return handDrawn.rectangle(x, y, width, height, opts);
    },
    [handDrawn]
  );

  const circle = useCallback(
    (x: number, y: number, diameter: number, opts?: Partial<RoughOptions>) => {
      if (svgRef.current && !handDrawn.getOptions().seed) {
        handDrawn.init(svgRef.current);
      }
      return handDrawn.circle(x, y, diameter, opts);
    },
    [handDrawn]
  );

  const ellipse = useCallback(
    (x: number, y: number, width: number, height: number, opts?: Partial<RoughOptions>) => {
      if (svgRef.current && !handDrawn.getOptions().seed) {
        handDrawn.init(svgRef.current);
      }
      return handDrawn.ellipse(x, y, width, height, opts);
    },
    [handDrawn]
  );

  const line = useCallback(
    (x1: number, y1: number, x2: number, y2: number, opts?: Partial<RoughOptions>) => {
      if (svgRef.current && !handDrawn.getOptions().seed) {
        handDrawn.init(svgRef.current);
      }
      return handDrawn.line(x1, y1, x2, y2, opts);
    },
    [handDrawn]
  );

  const path = useCallback(
    (pathData: string, opts?: Partial<RoughOptions>) => {
      if (svgRef.current && !handDrawn.getOptions().seed) {
        handDrawn.init(svgRef.current);
      }
      return handDrawn.path(pathData, opts);
    },
    [handDrawn]
  );

  const polygon = useCallback(
    (points: Array<[number, number]>, opts?: Partial<RoughOptions>) => {
      if (svgRef.current && !handDrawn.getOptions().seed) {
        handDrawn.init(svgRef.current);
      }
      return handDrawn.polygon(points, opts);
    },
    [handDrawn]
  );

  const arrow = useCallback(
    (x1: number, y1: number, x2: number, y2: number, opts?: Partial<RoughOptions>) => {
      if (svgRef.current && !handDrawn.getOptions().seed) {
        handDrawn.init(svgRef.current);
      }
      return handDrawn.arrow(x1, y1, x2, y2, opts);
    },
    [handDrawn]
  );

  const setPreset = useCallback(
    (preset: StylePreset) => {
      handDrawn.setPreset(preset);
    },
    [handDrawn]
  );

  const setOptions = useCallback(
    (opts: Partial<RoughOptions>) => {
      handDrawn.setOptions(opts);
    },
    [handDrawn]
  );

  const convertElement = useCallback((): SVGSVGElement | null => {
    if (!svgRef.current) return null;
    return convertToHandDrawn(svgRef.current, {
      preset: options.preset,
      customOptions: options.customOptions,
      seed: options.seed,
    });
  }, [options.preset, options.customOptions, options.seed]);

  return {
    svgRef,
    handDrawn,
    rectangle,
    circle,
    ellipse,
    line,
    path,
    polygon,
    arrow,
    setPreset,
    setOptions,
    convertElement,
    init,
  };
}

export default useHandDrawnStyle;
