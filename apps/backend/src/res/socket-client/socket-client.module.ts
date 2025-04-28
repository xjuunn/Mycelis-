import { Module } from '@nestjs/common';
import { SocketClientService } from './socket-client.service';
import { SocketClientGateway } from './socket-client.gateway';
import { SocketClientController } from './socket-client.controller';
import { AuthGuard } from '../../gu/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RoleGuard } from '../../gu/role/role.guard';
import { ResultInterceptor } from '../../itc/result/result.interceptor';

@Module({
  providers: [
    SocketClientGateway,
    SocketClientService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResultInterceptor,
    },
  ],
  controllers: [SocketClientController],
  imports: [],
})
export class SocketClientModule {}
