import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketClientService } from './socket-client.service';
import { Server, Socket } from 'socket.io';
import { CreateDeviceDTO } from './types/CreateDeviceDTO';
import { Token, TokenInfo } from '../../d/token-info/token-info';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../gu/auth/auth.guard';
import { prisma } from '@mycelis/database';

@UseGuards(AuthGuard)
@WebSocketGateway()
export class SocketClientGateway {
  constructor(private readonly socketClientService: SocketClientService) { }

  async onApplicationBootstrap() {
    await prisma.userDevice.updateMany({ data: { isOnline: false } });
    await prisma.user.updateMany({ data: { status: 'OFFLINE' } });
    this.server.on('connection', (socket) => {
      console.log("connection:", socket.id);

    })
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('client:connect')
  connect(
    @MessageBody() deviceDTO: CreateDeviceDTO,
    @ConnectedSocket() client: Socket,
    @Token() tokenInfo: TokenInfo,
  ) {
    return this.socketClientService.deviceConnect(
      deviceDTO,
      tokenInfo.id,
      client,
    );
  }
}
