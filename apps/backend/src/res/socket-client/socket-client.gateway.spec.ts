import { Test, TestingModule } from '@nestjs/testing';
import { SocketClientGateway } from './socket-client.gateway';
import { SocketClientService } from './socket-client.service';

describe('SocketClientGateway', () => {
  let gateway: SocketClientGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketClientGateway, SocketClientService],
    }).compile();

    gateway = module.get<SocketClientGateway>(SocketClientGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
