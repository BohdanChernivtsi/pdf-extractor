import { BadRequestException, Body, Controller, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as busboy from 'busboy';
import { IncomingMessage } from 'http';


@Controller('extract-pdf')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('Received file:', file);

    const content = await this.appService.processFileContent(file);

    return content;
  }
}
