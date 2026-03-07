import { describe, expect, it } from "vitest";
import {
  hexToHSB,
  hsbToHex,
  hexToRGB,
  rgbToHex,
  isValidHex,
} from "../color-utils";

describe("color-utils", () => {
  it("converts red to HSB", () => {
    expect(hexToHSB("#FF0000")).toEqual({ h: 0, s: 100, b: 100 });
  });

  it("converts white to HSB", () => {
    expect(hexToHSB("#FFFFFF")).toEqual({ h: 0, s: 0, b: 100 });
  });

  it("converts black to HSB", () => {
    expect(hexToHSB("#000000")).toEqual({ h: 0, s: 0, b: 0 });
  });

  it("round-trips HSB for sample colors", () => {
    const sampleColors = [
      "#FF0000",
      "#00FF00",
      "#0000FF",
      "#FFFFFF",
      "#000000",
      "#FFFF00",
      "#00FFFF",
      "#FF00FF",
      "#808080",
      "#FF8000",
    ];

    for (const color of sampleColors) {
      const hsb = hexToHSB(color);
      expect(hsbToHex(hsb.h, hsb.s, hsb.b)).toBe(color);
    }
  });

  it("converts hex to RGB", () => {
    expect(hexToRGB("#FF8000")).toEqual({ r: 255, g: 128, b: 0 });
  });

  it("converts RGB to hex", () => {
    expect(rgbToHex(255, 128, 0)).toBe("#FF8000");
  });

  it("validates hex values", () => {
    expect(isValidHex("#FF0000")).toBe(true);
    expect(isValidHex("red")).toBe(false);
    expect(isValidHex("#GGHHII")).toBe(false);
    expect(isValidHex("#FFF")).toBe(true);
  });
});
