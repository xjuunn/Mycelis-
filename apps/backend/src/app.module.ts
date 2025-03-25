import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './res/user/user.module';
import { ResultInterceptor } from './itc/result/result.interceptor';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './res/user/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { RoleGuard } from './gu/role/role.guard';
import { AuthGuard } from './gu/auth/auth.guard';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '../../../.env'
    })],
  controllers: [AppController],
  providers: [
    JwtService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },{
      provide: APP_GUARD,
      useClass: RoleGuard
    }, {
      provide: APP_INTERCEPTOR,
      useClass: ResultInterceptor,
    }
  ],
})
export class AppModule { }
