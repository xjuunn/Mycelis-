import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { MessageController } from './message.controller';
import { JwtModule } from '@nestjs/jwt';
import { SocketClientService } from "../socket-client/socket-client.service";
import { SocketClientModule } from '../socket-client/socket-client.module';

@Module({
  imports: [JwtModule, SocketClientModule],
  providers: [MessageGateway, MessageService, SocketClientService],
  controllers: [MessageController],
})
export class MessageModule { }
