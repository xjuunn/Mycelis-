import { ApiProperty } from '@nestjs/swagger';
import { Types } from '@mycelis/database';

export class UpdateFriendRequestDto {
  @ApiProperty({ enum: Types.FriendRequestStatus, description: '请求状态' })
  status: Types.FriendRequestStatus;
}
