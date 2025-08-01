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
import { FriendshipModule } from './res/friendship/friendship.module';
import { FriendTagModule } from './res/friend-tag/friend-tag.module';
import { MessageModule } from './res/message/message.module';
import { SocketClientModule } from './res/socket-client/socket-client.module';
import { UserService } from './res/user/user.service';
import { AppinfoModule } from './res/appinfo/appinfo.module';

@Module({
  imports: [
    AuthModule, FilesModule,
    ConfigModule.forRoot({ isGlobal: true, }),
    ServeStaticModule.forRootAsync({
      useFactory: async () => {
        const rootPath = join(await getFileUrl(), '');
        return [
          {
            rootPath,
            serveRoot: '/file',
            serveStaticOptions: {
              index: false,
              cacheControl: true,
            },
          },
        ];
      },
    }),
    UserModule,
    FriendRequestModule,
    FriendshipModule,
    FriendTagModule,
    MessageModule,
    SocketClientModule,
    AppinfoModule,
  ],
  controllers: [AppController],
  providers: [
    JwtService, AppService, UserService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
    { provide: APP_INTERCEPTOR, useClass: ResultInterceptor },
  ],
})
export class AppModule { }
