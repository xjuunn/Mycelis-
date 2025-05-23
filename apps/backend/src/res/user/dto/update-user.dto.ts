import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Types } from '@mycelis/database';

export class UpdateUserDto{
  @ApiProperty()
  name?: string;
  @ApiProperty()
  displayName?: string;
  @ApiProperty()
  oldPassword?: string;
  @ApiProperty()
  newPassword?: string;
  @ApiProperty()
  avatarUrl?: string;
  @ApiProperty({ enum: Types.UserStatus })
  status?: Types.UserStatus;
}
