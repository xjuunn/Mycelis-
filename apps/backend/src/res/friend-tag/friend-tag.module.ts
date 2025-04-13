import { Module } from '@nestjs/common';
import { FriendTagService } from './friend-tag.service';
import { FriendTagController } from './friend-tag.controller';

@Module({
  controllers: [FriendTagController],
  providers: [FriendTagService],
})
export class FriendTagModule {}
