import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFriendRequestDto } from './create-friend-request.dto';
import { Types } from '@mycelis/database';

export class SearchFriendRequestDto {
    @ApiProperty({ description: "被请求者ID" })
    receiverId: number;
    @ApiProperty({ description: "请求状态", enum: Types.FriendRequestStatus })
    status: Types.FriendRequestStatus;
}
