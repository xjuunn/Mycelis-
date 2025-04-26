import { Types } from '@mycelis/database';

export class FriendRequest {
  id: number;
  senderId: number;
  receiverId: number;
  sender: Types.User;
  receiver: Types.User;
  status: Types.FriendRequestStatus;
  createAt: Date;
}
