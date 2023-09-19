import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api/healthCheck')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthCheck(): string {
    return this.appService.healthCheck();
  }
}
