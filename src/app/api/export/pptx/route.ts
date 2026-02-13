import { NextResponse } from "next/server";
import PptxGenJS from "pptxgenjs";

interface SlideInput {
  title: string;
  content: string;
}

interface ExportRequest {
  title: string;
  slides: SlideInput[];
}

export async function POST(req: Request) {
  try {
    const body: ExportRequest = await req.json();

    if (!body.slides || !Array.isArray(body.slides) || body.slides.length === 0) {
      return NextResponse.json(
        { error: "At least one slide is required" },
        { status: 400 }
      );
    }

    const pptx = new PptxGenJS();
    pptx.title = body.title || "Presentation";
    pptx.author = "ScholarSync";
    pptx.layout = "LAYOUT_WIDE";

    for (const slideData of body.slides) {
      const slide = pptx.addSlide();

      // Dark blue title bar background
      slide.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 0,
        w: "100%",
        h: 1.4,
        fill: { color: "1E3A5F" },
      });

      // Title text on the dark blue bar
      slide.addText(slideData.title || "Untitled Slide", {
        x: 0.6,
        y: 0.2,
        w: "90%",
        h: 1.0,
        fontSize: 28,
        fontFace: "Arial",
        color: "FFFFFF",
        bold: true,
        valign: "middle",
      });

      // Content body on white background
      slide.addText(slideData.content || "", {
        x: 0.6,
        y: 1.8,
        w: "90%",
        h: 5.0,
        fontSize: 16,
        fontFace: "Arial",
        color: "333333",
        valign: "top",
        paraSpaceAfter: 8,
      });

      // Subtle bottom accent line
      slide.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 7.2,
        w: "100%",
        h: 0.05,
        fill: { color: "1E3A5F" },
      });
    }

    // Generate the PPTX as a Node buffer, then wrap as Uint8Array for Response
    const nodeBuffer = (await pptx.write({ outputType: "nodebuffer" })) as Buffer;
    const uint8 = new Uint8Array(nodeBuffer);

    const safeTitle = (body.title || "presentation").replace(/[^a-zA-Z0-9]/g, "_");

    return new Response(uint8, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "Content-Disposition": `attachment; filename="${safeTitle}.pptx"`,
        "Content-Length": String(uint8.byteLength),
      },
    });
  } catch (error) {
    console.error("PPTX export error:", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
