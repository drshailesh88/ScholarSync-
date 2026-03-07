import { beforeEach, describe, expect, it, vi } from "vitest";
import JSZip from "jszip";

const mockGetCurrentUserId = vi.hoisted(() => vi.fn());
const mockCheckRateLimit = vi.hoisted(() => vi.fn());
const mockCreateDeck = vi.hoisted(() => vi.fn());
const mockCreateSlide = vi.hoisted(() => vi.fn());
const mockStoreImportedSlideAsset = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: mockGetCurrentUserId,
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: mockCheckRateLimit,
  RATE_LIMITS: {
    ai: { limit: 60, windowSeconds: 3600 },
  },
}));

vi.mock("@/lib/logger", () => ({
  logger: {
    withRequestId: vi.fn().mockReturnValue({
      info: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
    }),
  },
}));

vi.mock("@/lib/actions/presentations", () => ({
  createDeck: mockCreateDeck,
  createSlide: mockCreateSlide,
}));

vi.mock("@/lib/slides/pptx-asset-storage", () => ({
  storeImportedSlideAsset: mockStoreImportedSlideAsset,
}));

import { POST } from "@/app/api/slides/import-pptx/route";

function asArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

function makeMultipartRequest(file: File): Request {
  const formData = new FormData();
  formData.append("file", file);
  return new Request("http://localhost/api/slides/import-pptx", {
    method: "POST",
    body: formData,
  });
}

async function buildPptxFixture(options?: { empty?: boolean }): Promise<Uint8Array> {
  const zip = new JSZip();

  zip.file(
    "[Content_Types].xml",
    `<?xml version="1.0" encoding="UTF-8"?>
      <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
        <Default Extension="xml" ContentType="application/xml"/>
        <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
        <Default Extension="png" ContentType="image/png"/>
      </Types>`
  );

  zip.file(
    "docProps/core.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
      <cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
        xmlns:dc="http://purl.org/dc/elements/1.1/">
        <dc:title>Imported Deck</dc:title>
      </cp:coreProperties>`
  );

  if (options?.empty) {
    zip.file(
      "ppt/presentation.xml",
      `<?xml version="1.0" encoding="UTF-8"?>
        <p:presentation xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"
          xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
          <p:sldIdLst />
        </p:presentation>`
    );
    zip.file(
      "ppt/_rels/presentation.xml.rels",
      `<?xml version="1.0" encoding="UTF-8"?>
        <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
          <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>
        </Relationships>`
    );
    zip.file(
      "ppt/theme/theme1.xml",
      `<?xml version="1.0" encoding="UTF-8"?>
        <a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme"></a:theme>`
    );

    return zip.generateAsync({ type: "uint8array" });
  }

  zip.file(
    "ppt/presentation.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
      <p:presentation xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"
        xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
        <p:sldIdLst>
          <p:sldId id="256" r:id="rId2"/>
          <p:sldId id="257" r:id="rId3"/>
        </p:sldIdLst>
      </p:presentation>`
  );

  zip.file(
    "ppt/_rels/presentation.xml.rels",
    `<?xml version="1.0" encoding="UTF-8"?>
      <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
        <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>
        <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide1.xml"/>
        <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide2.xml"/>
      </Relationships>`
  );

  zip.file(
    "ppt/theme/theme1.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
      <a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme"></a:theme>`
  );

  zip.file(
    "ppt/slideLayouts/slideLayout1.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
      <p:sldLayout xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
        <p:cSld name="Title and Content"/>
      </p:sldLayout>`
  );
  zip.file(
    "ppt/slideLayouts/slideLayout2.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
      <p:sldLayout xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
        <p:cSld name="Title and Content"/>
      </p:sldLayout>`
  );

  zip.file(
    "ppt/slides/slide1.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
      <p:sld xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"
        xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
        xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
        <p:cSld name="Title and Content">
          <p:spTree>
            <p:sp>
              <p:nvSpPr>
                <p:cNvPr id="2" name="Title 1"/>
                <p:nvPr><p:ph type="title"/></p:nvPr>
              </p:nvSpPr>
              <p:spPr>
                <a:xfrm><a:off x="457200" y="228600"/><a:ext cx="7315200" cy="685800"/></a:xfrm>
              </p:spPr>
              <p:txBody>
                <a:bodyPr/><a:lstStyle/>
                <a:p><a:r><a:t>Imported Slide 1</a:t></a:r></a:p>
              </p:txBody>
            </p:sp>
            <p:sp>
              <p:nvSpPr>
                <p:cNvPr id="3" name="Content Placeholder 2"/>
                <p:nvPr><p:ph type="body"/></p:nvPr>
              </p:nvSpPr>
              <p:spPr>
                <a:xfrm><a:off x="457200" y="1371600"/><a:ext cx="3657600" cy="2286000"/></a:xfrm>
              </p:spPr>
              <p:txBody>
                <a:bodyPr/><a:lstStyle/>
                <a:p><a:r><a:t>First bullet</a:t></a:r></a:p>
                <a:p><a:r><a:t>Second bullet</a:t></a:r></a:p>
              </p:txBody>
            </p:sp>
            <p:pic>
              <p:nvPicPr>
                <p:cNvPr id="4" name="Image 3" descr="Microscope image"/>
              </p:nvPicPr>
              <p:blipFill>
                <a:blip r:embed="rId1"/>
              </p:blipFill>
              <p:spPr>
                <a:xfrm><a:off x="4572000" y="1371600"/><a:ext cx="2743200" cy="2057400"/></a:xfrm>
              </p:spPr>
            </p:pic>
          </p:spTree>
        </p:cSld>
      </p:sld>`
  );

  zip.file(
    "ppt/slides/_rels/slide1.xml.rels",
    `<?xml version="1.0" encoding="UTF-8"?>
      <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
        <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image1.png"/>
        <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesSlide" Target="../notesSlides/notesSlide1.xml"/>
        <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
      </Relationships>`
  );

  zip.file(
    "ppt/notesSlides/notesSlide1.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
      <p:notes xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"
        xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
        <p:cSld>
          <p:spTree>
            <p:sp>
              <p:txBody>
                <a:bodyPr/><a:lstStyle/>
                <a:p><a:r><a:t>Speaker note for slide 1</a:t></a:r></a:p>
              </p:txBody>
            </p:sp>
          </p:spTree>
        </p:cSld>
      </p:notes>`
  );

  zip.file("ppt/media/image1.png", Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10]));

  zip.file(
    "ppt/slides/slide2.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
      <p:sld xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"
        xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
        <p:cSld name="Title and Content">
          <p:spTree>
            <p:sp>
              <p:nvSpPr>
                <p:cNvPr id="2" name="Title 1"/>
                <p:nvPr><p:ph type="title"/></p:nvPr>
              </p:nvSpPr>
              <p:spPr>
                <a:xfrm><a:off x="457200" y="228600"/><a:ext cx="7315200" cy="685800"/></a:xfrm>
              </p:spPr>
              <p:txBody>
                <a:bodyPr/><a:lstStyle/>
                <a:p><a:r><a:t>Imported Slide 2</a:t></a:r></a:p>
              </p:txBody>
            </p:sp>
            <p:graphicFrame>
              <a:graphic>
                <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/table">
                  <a:tbl>
                    <a:tr>
                      <a:tc><a:txBody><a:bodyPr/><a:p><a:r><a:t>Header 1</a:t></a:r></a:p></a:txBody></a:tc>
                      <a:tc><a:txBody><a:bodyPr/><a:p><a:r><a:t>Header 2</a:t></a:r></a:p></a:txBody></a:tc>
                    </a:tr>
                    <a:tr>
                      <a:tc><a:txBody><a:bodyPr/><a:p><a:r><a:t>Row 1</a:t></a:r></a:p></a:txBody></a:tc>
                      <a:tc><a:txBody><a:bodyPr/><a:p><a:r><a:t>Value 1</a:t></a:r></a:p></a:txBody></a:tc>
                    </a:tr>
                  </a:tbl>
                </a:graphicData>
              </a:graphic>
            </p:graphicFrame>
          </p:spTree>
        </p:cSld>
      </p:sld>`
  );

  zip.file(
    "ppt/slides/_rels/slide2.xml.rels",
    `<?xml version="1.0" encoding="UTF-8"?>
      <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
        <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout2.xml"/>
      </Relationships>`
  );

  return zip.generateAsync({ type: "uint8array" });
}

describe("POST /api/slides/import-pptx", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCurrentUserId.mockResolvedValue("user_123");
    mockCheckRateLimit.mockResolvedValue(null);
    mockCreateDeck.mockResolvedValue({ id: 42 });
    mockCreateSlide.mockResolvedValue({ id: 1 });
    mockStoreImportedSlideAsset.mockResolvedValue({
      key: "slides/images/mock-image.png",
      url: "/api/slides/upload-image?key=slides%2Fimages%2Fmock-image.png",
    });
  });

  it("returns a deck id and correct slide count for a valid pptx", async () => {
    const bytes = await buildPptxFixture();
    const file = new File([asArrayBuffer(bytes)], "sample.pptx", {
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    });

    const res = await POST(makeMultipartRequest(file));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toEqual({
      deckId: 42,
      slideCount: 2,
      warnings: [],
    });
    expect(mockCreateDeck).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Imported Deck",
      })
    );
    expect(mockCreateSlide).toHaveBeenCalledTimes(2);
  });

  it("extracts slide text, table data, and speaker notes", async () => {
    const bytes = await buildPptxFixture();
    const file = new File([asArrayBuffer(bytes)], "notes.pptx", {
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    });

    await POST(makeMultipartRequest(file));

    expect(mockCreateSlide).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        title: "Imported Slide 1",
        speakerNotes: "Speaker note for slide 1",
        contentBlocks: expect.arrayContaining([
          expect.objectContaining({
            type: "bullets",
            data: { items: ["First bullet", "Second bullet"] },
          }),
        ]),
      })
    );

    expect(mockCreateSlide).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        title: "Imported Slide 2",
        contentBlocks: expect.arrayContaining([
          expect.objectContaining({
            type: "table",
            data: {
              headers: ["Header 1", "Header 2"],
              rows: [["Row 1", "Value 1"]],
            },
          }),
        ]),
      })
    );
  });

  it("extracts images and replaces them with generated ScholarSync URLs", async () => {
    const bytes = await buildPptxFixture();
    const file = new File([asArrayBuffer(bytes)], "images.pptx", {
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    });

    await POST(makeMultipartRequest(file));

    expect(mockStoreImportedSlideAsset).toHaveBeenCalledTimes(1);
    expect(mockCreateSlide).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        contentBlocks: expect.arrayContaining([
          expect.objectContaining({
            type: "image",
            data: expect.objectContaining({
              alt: "Microscope image",
              url: "/api/slides/upload-image?key=slides%2Fimages%2Fmock-image.png",
            }),
          }),
        ]),
      })
    );
  });

  it("returns 400 for an invalid file type", async () => {
    const file = new File([new Uint8Array([1, 2, 3])], "notes.txt", {
      type: "text/plain",
    });

    const res = await POST(makeMultipartRequest(file));
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toBe("Please upload a .pptx file");
  });

  it("enforces the 50MB file size limit", async () => {
    const file = new File([new Uint8Array(50 * 1024 * 1024 + 1)], "large.pptx", {
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    });

    const res = await POST(makeMultipartRequest(file));
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toBe("File exceeds 50MB limit");
  });

  it("returns a deck with zero slides for an empty presentation", async () => {
    const bytes = await buildPptxFixture({ empty: true });
    const file = new File([asArrayBuffer(bytes)], "empty.pptx", {
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    });

    const res = await POST(makeMultipartRequest(file));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.deckId).toBe(42);
    expect(body.slideCount).toBe(0);
    expect(body.warnings).toContain("Presentation contains no slides");
    expect(mockCreateSlide).not.toHaveBeenCalled();
  });

  it("returns a clear error for corrupted files", async () => {
    const file = new File([Uint8Array.from([1, 2, 3, 4])], "broken.pptx", {
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    });

    const res = await POST(makeMultipartRequest(file));
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toBe("Could not read this file. Is it a valid PowerPoint presentation?");
  });

  it("returns a clear error for password-protected files", async () => {
    const protectedHeader = Uint8Array.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1, 0, 0, 0, 0]);
    const file = new File([protectedHeader], "protected.pptx", {
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    });

    const res = await POST(makeMultipartRequest(file));
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toBe("Password-protected files are not supported");
  });
});
