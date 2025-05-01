import { Controller, Get, Param, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './d/public/public.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Token, TokenInfo } from './d/token-info/token-info';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from './res/user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) { }

  @Get('/checkConnect')
  @Public()
  async checkConnect() {
    return 'ok';
  }

  @ApiOperation({ summary: '检查用户登录状态' })
  @ApiResponse({ status: 200, description: 'test', type: 'string' })
  @Get('/checkLogin')
  @Public()
  async checkLogin(@Req() request: Request) {
    if (!request.headers.authorization) throw new UnauthorizedException("未登录");
    const token = this.extractTokenFromHeader(request.headers.authorization);
    try {
      const payload = await this.jwtService.verifyAsync(token ?? '', {
        secret: this.configService.get<string>('JWT_SECRET')
      })
      return this.userService.findOne(payload.id);
    } catch {
      throw new UnauthorizedException("无效token")
    }
  }

  private extractTokenFromHeader(authorization: string): string | undefined {
    const [type, token] = authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
