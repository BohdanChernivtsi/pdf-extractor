import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as pdfParser from 'pdf-parse';
import { FileValidationException } from '../exceptions/file-validation-exception';

@Injectable()
export class FileProcessingService {
  formatData(formData): string {
    return formData;
  }

  processFile(file: Express.Multer.File): boolean {
    const fileExt = path.extname(file.originalname).toLowerCase();
    const fileName = this.generateFileName(fileExt);

    if (!['.jpg', '.jpeg', '.png', '.gif', '.pdf'].includes(fileExt)) {
      throw new FileValidationException('Invalid file type.');
    }

    return true
  }

  async processFileContent(file: Express.Multer.File): Promise<any> {
    if (!file || !file.path) {
      throw new Error('File path is missing');
    }

    const filePath = path.resolve(__dirname, '../..', file.path);
    
    const fileBuffer = fs.readFileSync(filePath);

    console.log('File content buffer:', fileBuffer);

    let parsedContent = ''

    if (file.mimetype === 'application/pdf') {
      try {
        const pdfData = await pdfParser(fileBuffer);
        console.log('PDF Content:', pdfData.text);
        parsedContent = pdfData.text
      } catch (error) {
        console.error('Error parsing PDF:', error);
        return { error: 'Failed to parse PDF file' };
      }
    }

    console.log({
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      content: parsedContent
    });
    return parsedContent
  }

  private generateFileName(extension: string): string {
    const hash = crypto.randomBytes(16).toString('hex');
    return `${hash}${extension}`;
  }
}
