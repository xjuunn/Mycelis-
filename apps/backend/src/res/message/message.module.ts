import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { MessageController } from './message.controller';
import { JwtModule } from '@nestjs/jwt';
import {SocketClientService} from "../socket-client/socket-client.service";

@Module({
  imports: [JwtModule],
  providers: [MessageGateway, MessageService,SocketClientService],
  controllers: [MessageController],
})
export class MessageModule {}
