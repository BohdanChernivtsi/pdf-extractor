import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileProcessingService } from '../services/file-processing.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('extract-pdf')
export class PdfProcessingController {
  constructor(private readonly fileProcessingService: FileProcessingService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('Received file:', file);

    const content = await this.fileProcessingService.processFileContent(file);

    return content;
  }
}
