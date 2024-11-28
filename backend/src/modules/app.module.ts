import { Module } from '@nestjs/common';
import { PdfProcessingController } from '../controllers/pdf-processing.controller';
import { FileProcessingService } from '../services/file-processing.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        }
      }),
      limits: {
        fileSize: 10 * 1024 * 1024 // 10MB max file size
      }
    })
  ],
  controllers: [PdfProcessingController],
  providers: [FileProcessingService],
})
export class AppModule {}
