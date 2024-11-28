import { Injectable } from '@nestjs/common';
import path from 'path';
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

  private generateFileName(extension: string): string {
    const hash = crypto.randomBytes(16).toString('hex');
    return `${hash}${extension}`;
  }
}
