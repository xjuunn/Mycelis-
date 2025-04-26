import { ApiProperty } from '@nestjs/swagger';
import { Types } from '@mycelis/database';

export class SearchFriendRequestDto {
  @ApiProperty({ description: '请求状态', enum: Types.FriendRequestStatus })
  status: Types.FriendRequestStatus;
}
