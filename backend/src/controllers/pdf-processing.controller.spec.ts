import { Test, TestingModule } from '@nestjs/testing';
import { PdfProcessingController } from './pdf-processing.controller';
import { FileProcessingService } from '../services/file-processing.service';
import * as supertest from 'supertest';
import { INestApplication } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { MulterModule } from '@nestjs/platform-express';
import { FileInterceptor } from '@nestjs/platform-express';

// Mock the FileProcessingService
jest.mock('./app.service');

describe('PdfProcessingController (e2e)', () => {
  let app: INestApplication;
  let fileProcessingService: FileProcessingService;

  beforeAll(async () => {
    // Mocking the FileProcessingService methods
    const appModule: TestingModule = await Test.createTestingModule({
      imports: [MulterModule.register({
        dest: './uploads',  // Destination folder for uploaded files (this is a mock, so it doesn't need to exist)
      })],
      controllers: [PdfProcessingController],
      providers: [
        {
          provide: FileProcessingService,
          useValue: {
            processFileContent: jest.fn().mockResolvedValue({ message: 'File processed' }),  // Mock response from the service
          },
        },
      ],
    }).compile();

    app = appModule.createNestApplication(new ExpressAdapter(express()));
    await app.init();

    fileProcessingService = appModule.get<FileProcessingService>(FileProcessingService); // Get the mocked service instance
  });

  it('should upload a file and return processed content', async () => {
    // Mocking the file upload
    const response = await supertest(app.getHttpServer())
      .post('/extract-pdf/upload')
      .attach('file', Buffer.from('file content'), 'dummy.pdf')  // Simulating a file upload
      .expect(200);

    // Assert the response
    expect(response.body).toEqual({ message: 'File processed' });

    // Verify that the service method was called
    expect(fileProcessingService.processFileContent).toHaveBeenCalledWith(expect.objectContaining({
      fieldname: 'file',
      originalname: 'dummy.pdf',
      encoding: '7bit',
      mimetype: 'application/pdf',
    }));
  });

  it('should return BadRequestException if no file is uploaded', async () => {
    // Test missing file upload
    const response = await supertest(app.getHttpServer())
      .post('/extract-pdf/upload')
      .expect(400); // Expecting BadRequestException

    // Assert the error message
    expect(response.body.message).toBe('Bad Request');
  });

  afterAll(async () => {
    await app.close();
  });
});
