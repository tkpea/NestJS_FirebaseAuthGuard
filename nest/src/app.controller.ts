import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { FirebaseAuthGuard } from './common/firebase-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @Get("/me")
  getMe(@Request() req): string {
    return req.user;
  }  
}
