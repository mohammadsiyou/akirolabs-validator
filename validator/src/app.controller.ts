import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  index(): string {
    return "";
  }

  @Get('validate/:token')
  getHello(@Param('token') token: string): { isValid: boolean } {
    const isValid = this.appService.validate(token);
    return { isValid }
  }
}
