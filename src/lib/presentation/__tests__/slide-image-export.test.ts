// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const toPngMock = vi.fn();
const toSvgMock = vi.fn();
const zipFileMock = vi.fn();
const zipGenerateAsyncMock = vi.fn();

vi.mock("html-to-image", () => ({
  toPng: toPngMock,
  toSvg: toSvgMock,
}));

vi.mock("jszip", () => ({
  default: class MockZip {
    file = zipFileMock;
    generateAsync = zipGenerateAsyncMock;
  },
}));

import {
  downloadBlob,
  exportAllSlidesAsZip,
  exportSlideAsPNG,
  exportSlideAsSVG,
} from "../slide-image-export";

const PNG_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO5Vv2QAAAAASUVORK5CYII=";

const SVG_DATA_URL =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3C/svg%3E";

beforeEach(() => {
  toPngMock.mockReset();
  toSvgMock.mockReset();
  zipFileMock.mockReset();
  zipGenerateAsyncMock.mockReset();
  zipGenerateAsyncMock.mockResolvedValue(new Blob(["zip"], { type: "application/zip" }));
});

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

describe("slide-image-export", () => {
  it("exportSlideAsPNG returns a PNG blob and forwards pixelRatio scale", async () => {
    toPngMock.mockResolvedValue(PNG_DATA_URL);
    const element = document.createElement("div");

    const blob = await exportSlideAsPNG(element, { scale: 3 });

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe("image/png");
    expect(toPngMock).toHaveBeenCalledWith(
      element,
      expect.objectContaining({ pixelRatio: 3 }),
    );
  });

  it("exportSlideAsSVG returns SVG markup", async () => {
    toSvgMock.mockResolvedValue(SVG_DATA_URL);
    const element = document.createElement("div");

    const svg = await exportSlideAsSVG(element);

    expect(svg.startsWith("<svg")).toBe(true);
  });

  it("exportAllSlidesAsZip adds one file per slide", async () => {
    toPngMock.mockResolvedValue(PNG_DATA_URL);
    const elements = [document.createElement("div"), document.createElement("div")];

    const zipBlob = await exportAllSlidesAsZip(elements, ["Slide One", "Slide Two"], {
      format: "png",
      scale: 2,
    });

    expect(zipBlob).toBeInstanceOf(Blob);
    expect(zipFileMock).toHaveBeenCalledTimes(2);
    expect(zipFileMock).toHaveBeenNthCalledWith(1, "01_Slide_One.png", expect.any(Blob));
    expect(zipFileMock).toHaveBeenNthCalledWith(2, "02_Slide_Two.png", expect.any(Blob));
    expect(zipGenerateAsyncMock).toHaveBeenCalledWith({ type: "blob" });
  });

  it("downloadBlob creates and clicks an anchor", () => {
    const createObjectURLSpy = vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:test");
    const revokeObjectURLSpy = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    const createElementSpy = vi.spyOn(document, "createElement");
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb: FrameRequestCallback) => {
      cb(0);
      return 1;
    });

    downloadBlob(new Blob(["test"], { type: "text/plain" }), "test.txt");

    expect(createElementSpy).toHaveBeenCalledWith("a");
    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(createObjectURLSpy).toHaveBeenCalledTimes(1);
    expect(revokeObjectURLSpy).toHaveBeenCalledWith("blob:test");
  });

  it("sanitizes slide titles for zip filenames", async () => {
    toPngMock.mockResolvedValue(PNG_DATA_URL);
    const element = document.createElement("div");

    await exportAllSlidesAsZip([element], ["My Slide / Title: Test"], { format: "png" });

    expect(zipFileMock).toHaveBeenCalledWith(
      "01_My_Slide___Title__Test.png",
      expect.any(Blob),
    );
  });
});

