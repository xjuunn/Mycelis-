import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';
import { Types } from '@mycelis/database';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDto {
  @ApiProperty({ description: "消息" })
  message?: string;
  @ApiProperty({ description: "是否置顶" })
  isPinned?: boolean;
}
