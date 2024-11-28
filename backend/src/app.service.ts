import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as crypto from 'crypto';
import { FileValidationException } from './exceptions/file-validation-exception';

@Injectable()
export class AppService {
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
    // Access the file buffer (raw content of the file)
    const fileBuffer = file.buffer;
    const fileContent = fileBuffer.toString();

    let parsedContent: any;
    try {
      parsedContent = JSON.parse(fileContent);
    } catch (err) {
      parsedContent = null;
    }

    console.log({
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      content: parsedContent || fileContent,  // Can return the parsed content or raw text
    });
    return parsedContent || fileContent
  }

  private generateFileName(extension: string): string {
    const hash = crypto.randomBytes(16).toString('hex');
    return `${hash}${extension}`;
  }
}
