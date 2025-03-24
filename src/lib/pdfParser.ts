// // lib/pdfParser.ts
import PDFParser from "pdf2json";

export const extractTextFromPDF = async (buffer: Buffer): Promise<string>=> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (errData: any) => {
      reject(new Error(errData.parserError));
    });

    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      try {
        // Extract text from each page
        const pages = pdfData.Pages || [];
        let text = '';

        for (const page of pages) {
          const texts = page.Texts || [];

          for (const textItem of texts) {
            // Decode text items
            for (const item of textItem.R || []) {
              text += decodeURIComponent(item.T) + ' ';
            }
          }

          text += '\n\n'; // Add double line break between pages
        }

        resolve(text);
      } catch (error) {
        reject(error);
      }
    });

    // Parse the PDF from the buffer
    pdfParser.parseBuffer(buffer);
  });
};
