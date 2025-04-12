import { Module } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestController } from './friend-request.controller';
import { FriendshipService } from '../friendship/friendship.service';

@Module({
  controllers: [FriendRequestController],
  providers: [FriendRequestService, FriendshipService],
})
export class FriendRequestModule { }
