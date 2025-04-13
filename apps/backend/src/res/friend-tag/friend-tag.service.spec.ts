import { Test, TestingModule } from '@nestjs/testing';
import { FriendTagService } from './friend-tag.service';

describe('FriendTagService', () => {
  let service: FriendTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendTagService],
    }).compile();

    service = module.get<FriendTagService>(FriendTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
