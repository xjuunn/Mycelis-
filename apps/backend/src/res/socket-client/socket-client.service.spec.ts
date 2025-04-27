import { Test, TestingModule } from '@nestjs/testing';
import { SocketClientService } from './socket-client.service';

describe('SocketClientService', () => {
  let service: SocketClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketClientService],
    }).compile();

    service = module.get<SocketClientService>(SocketClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
