import { Types } from '@mycelis/database';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ description: '接收者ID' })
  receiverId: number;
  @ApiProperty({ description: '消息' })
  message: string;
  @ApiProperty({ description: '消息类型', enum: Types.MessageType })
  type: Types.MessageType = 'Text';
  @ApiProperty({ description: '消息源', enum: Types.MessageOrigin })
  origin: Types.MessageOrigin = 'System';
  @ApiProperty({ description: '消息状态', enum: Types.MessageStatus })
  status: Types.MessageStatus = 'Sent';
  @ApiProperty({ description: '回复消息ID' })
  replyTo?: number;
  @ApiProperty({ description: '额外JSON消息' })
  extra?: string;
  @ApiProperty({ description: '是否置顶' })
  isPinned: boolean = false;
}
