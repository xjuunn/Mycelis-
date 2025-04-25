import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { MessageController } from './message.controller';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from 'src/gu/auth/auth.guard';
import { RoleGuard } from 'src/gu/role/role.guard';
import { ResultInterceptor } from 'src/itc/result/result.interceptor';

@Module({
  imports: [
    JwtModule,
  ],
  providers: [MessageGateway, MessageService],
  controllers: [MessageController],
})
export class MessageModule { }
