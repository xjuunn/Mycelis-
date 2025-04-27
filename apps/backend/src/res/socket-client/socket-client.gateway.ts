import { WebSocketGateway } from '@nestjs/websockets';
import { SocketClientService } from './socket-client.service';

@WebSocketGateway()
export class SocketClientGateway {
  constructor(private readonly socketClientService: SocketClientService) {}
}
