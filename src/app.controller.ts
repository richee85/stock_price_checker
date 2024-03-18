import { Controller, Get, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/stock/:symbol')
  getHello(): string {
    return this.appService.getHello();
  }

  @Put('/stock/:symbol')
  getWellHello(): string {
    return this.appService.getHello();
  }
}
