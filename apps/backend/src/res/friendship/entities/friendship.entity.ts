import { ApiProperty } from '@nestjs/swagger';

export class Friendship {
  @ApiProperty()
  id: number;
  @ApiProperty({ description: '用户ID' })
  userId: number;
  @ApiProperty({ description: '好友ID' })
  friendId: number;
  @ApiProperty({ description: '备注' })
  note?: string;
  @ApiProperty({ description: '创建时间' })
  createAt: Date;
  // tags
}
