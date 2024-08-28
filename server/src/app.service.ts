import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as PDFDocument from 'pdfkit';
import * as pdfParse from 'pdf-parse';
@Injectable()
export class AppService {
  private pdfDir = path.join(__dirname, '..', '..', 'server');
  async createPdf(payload: any): Promise<string> {
    const fileName = 'output.pdf';
    const filePath = path.join(this.pdfDir, fileName);

    // Create a new PDF document
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    // Add content to the PDF
    doc.text(JSON.stringify(payload, null, 2), {
      align: 'left',
    });

    doc.end();

    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => resolve(fileName));
      writeStream.on('error', (err) => reject(err));
    });
  }

  async readPdf(fileName: string): Promise<any> {
    const filePath = path.join(this.pdfDir, fileName);
    console.log(filePath);
    
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }

    const dataBuffer = fs.readFileSync(filePath);
    return pdfParse(dataBuffer);
  }
}
