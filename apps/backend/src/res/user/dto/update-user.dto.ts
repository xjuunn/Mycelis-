import { ApiProperty } from '@nestjs/swagger';
import { Enums } from '@mycelis/types';

export class UpdateUserDto {
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
  @ApiProperty({ enum: Enums.UserStatus })
  status?: Enums.UserStatus;
}
