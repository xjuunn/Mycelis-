import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResultInterceptor } from './itc/result/result.interceptor';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './res/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { RoleGuard } from './gu/role/role.guard';
import { AuthGuard } from './gu/auth/auth.guard';
import { FilesModule } from './res/files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { getFileUrl } from './utils/FileUrl';
import { join } from 'path';
import { UserModule } from './res/user/user.module';
import { FriendRequestModule } from './res/friend-request/friend-request.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '../../../.env'
    }),
    FilesModule,
    ServeStaticModule.forRootAsync({
      useFactory: async () => {
        const rootPath = join(await getFileUrl(), '');
        return [{
          rootPath,
          serveRoot: '/file',
          serveStaticOptions: {
            index: false,
            cacheControl: true,
          },
        }];
      },
    }),
    UserModule,
    FriendRequestModule,
  ],
  controllers: [AppController],
  providers: [
    JwtService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }, {
      provide: APP_GUARD,
      useClass: RoleGuard
    }, {
      provide: APP_INTERCEPTOR,
      useClass: ResultInterceptor,
    }
  ],
})
export class AppModule { }
