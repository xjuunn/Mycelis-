import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './gu/auth/auth.guard';
import { Public } from './d/public/public.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { STATUS_CODES } from 'http';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({summary:"hello"})
  @ApiResponse({status:200,description:"test",type:"string"})
  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }
}
