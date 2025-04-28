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

@UseGuards(AuthGuard)
@WebSocketGateway()
export class SocketClientGateway {
  constructor(private readonly socketClientService: SocketClientService) { }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('client/Connect')
  connect(
    @MessageBody() message: CreateDeviceDTO,
    @ConnectedSocket() client: Socket,
    @Token() tokenInfo: TokenInfo,
  ) {
    return this.socketClientService.upsertDevice(message, tokenInfo.id, client);
  }

  @SubscribeMessage("client/getAll")
  getAll() {
    return this.server.sockets.sockets
  }
}
