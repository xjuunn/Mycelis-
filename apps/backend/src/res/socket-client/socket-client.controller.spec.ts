import { Test, TestingModule } from '@nestjs/testing';
import { SocketClientController } from './socket-client.controller';

describe('SocketClientController', () => {
  let controller: SocketClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocketClientController],
    }).compile();

    controller = module.get<SocketClientController>(SocketClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
