/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
import { getDocument, type PDFDocumentProxy, type TextContent, type TextContentItem } from 'pdfjs-dist'

class PDFToText {
  private pathToPDF: string;

  constructor(pathToPDF: string) {
    this.pathToPDF = pathToPDF;
  }

  public async convert(): Promise<string> {
    const pdf: PDFDocumentProxy = await getDocument(this.pathToPDF).promise;
    const numPages: number = pdf.numPages;

    let textContent = '';
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const tokenizedText: TextContent = await page.getTextContent();
      const strings: string[] = tokenizedText.items.map((token: TextContentItem) => token.str);
      textContent += strings.join(' ') + '\n';
    }

    return textContent;
  }
}

export default PDFToText;
