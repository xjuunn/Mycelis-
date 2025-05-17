import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Token, TokenInfo } from '../../d/token-info/token-info';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../../gu/auth/auth.guard';
import { Socket } from 'socket.io';
import { ResultInterceptor } from 'src/itc/result/result.interceptor';

@UseGuards(AuthGuard)
@UseInterceptors(ResultInterceptor)
@WebSocketGateway({ cors: true })
export class MessageGateway {
  constructor(private readonly messageService: MessageService) { }

  @WebSocketServer()
  socket: Socket;

  @SubscribeMessage('message:send')
  async sendMessage(
    @MessageBody() msg: CreateMessageDto,
    @Token() tokenInfo: TokenInfo,
    @ConnectedSocket() client: Socket
  ) {
    const message = await this.messageService.create(msg, tokenInfo.id);
    client.to('user:' + msg.receiverId).emit('message:receive', message);
    client.to('user:' + tokenInfo.id).emit('message:receive', message);
    return message;
  }

  @SubscribeMessage('message:userreadAll')
  readAll(@MessageBody() userId: string, @Token() tokenInfo: TokenInfo) {
    return this.doReadAll(tokenInfo.id, +userId)
  }

  doReadAll(userId: number, friendId: number) {
    this.messageService.setAllRead(friendId, userId);
    return this.socket.to('user:' + friendId).emit('message:readall', userId);
  }
}
