import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  formatData(formData): string {
    return formData;
  }
}
