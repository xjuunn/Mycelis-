import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Token, TokenInfo } from '../../d/token-info/token-info';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../gu/auth/auth.guard';
import { Socket } from 'socket.io';
import { prisma } from '@mycelis/database';

@UseGuards(AuthGuard)
@WebSocketGateway({ cors: true })
export class MessageGateway {
  constructor(private readonly messageService: MessageService) { }

  @WebSocketServer()
  socket: Socket;

  @SubscribeMessage('message:send')
  async sendMessage(
    @MessageBody() msg: CreateMessageDto,
    @Token() tokenInfo: TokenInfo,
  ) {
    const devices = await prisma.userDevice.findMany({
      where: {
        isOnline: true,
        userId: msg.receiverId
      },
      select: { socketId: true }
    });
    devices.forEach(device => { this.socket.to(String(device.socketId ?? "")).emit('message:receive', msg) })
    return this.messageService.create(msg, tokenInfo.id);
  }
}
