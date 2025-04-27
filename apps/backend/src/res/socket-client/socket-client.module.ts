import { Module } from '@nestjs/common';
import { SocketClientService } from './socket-client.service';
import { SocketClientGateway } from './socket-client.gateway';
import { SocketClientController } from './socket-client.controller';

@Module({
  providers: [SocketClientGateway, SocketClientService],
  controllers: [SocketClientController],
})
export class SocketClientModule {}
