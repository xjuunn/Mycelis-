import { Test, TestingModule } from '@nestjs/testing';
import { FriendTagController } from './friend-tag.controller';
import { FriendTagService } from './friend-tag.service';

describe('FriendTagController', () => {
  let controller: FriendTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendTagController],
      providers: [FriendTagService],
    }).compile();

    controller = module.get<FriendTagController>(FriendTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
