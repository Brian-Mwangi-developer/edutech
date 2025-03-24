// app/api/uploadPdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import {extractTextFromPDF} from "@/lib/pdfParser";
import {uploadSectionsToAzureSearch} from "@/lib/azureSearch";


export async function POST(request: NextRequest) {
  try {
    // Handle form data
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate PDF mimetype
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Invalid file type. Only PDFs are allowed." },
        { status: 400 }
      );
    }

    const fileName = file.name || "Unknown.pdf";

    // Convert File to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Extract text from PDF
    const text = await extractTextFromPDF(buffer);

    // Split text into sections (paragraphs)
    const sections = text
      .split('\n\n')
      .map(section => section.trim())
      .filter(section => section.length > 0);

    // Save the document and its sections in the database
    const newDocument = await db.document.create({
      data: {
        title: title || fileName,
        fileName: fileName,
        content: text,
        sections: {
          create: sections.map((content, index) => ({
            content,
            order: index + 1,
          })),
        },
      },
      include: {
        sections: true,
      },
    });
    // Prepare sections for Azure Search upload
    const azureSections = newDocument.sections.map((sec) => ({
      documentId: newDocument.id,
      documentName: newDocument.fileName,
      content: sec.content,
      order: sec.order,
    }));

    const azureResult = await uploadSectionsToAzureSearch(azureSections);
    console.log("Azure Search upload result:", azureResult);

    return NextResponse.json({ documentId: newDocument.id }, { status: 200 });
  } catch (error) {
    console.error("Processing error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error processing PDF" },
      { status: 500 }
    );
  }
}