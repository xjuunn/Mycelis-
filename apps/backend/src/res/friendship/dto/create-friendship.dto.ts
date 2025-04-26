import { ApiProperty } from '@nestjs/swagger';

export class CreateFriendshipDto {
  @ApiProperty({ description: '好友ID' })
  friendId: number;
  @ApiProperty({ description: '备注' })
  note?: string;
}
