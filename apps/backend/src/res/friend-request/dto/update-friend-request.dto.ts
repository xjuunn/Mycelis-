import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFriendRequestDto } from './create-friend-request.dto';
import { Types } from '@mycelis/database';

export class UpdateFriendRequestDto {
    @ApiProperty({ enum: Types.FriendRequestStatus ,description:"请求状态"})
    status: Types.FriendRequestStatus;
}
