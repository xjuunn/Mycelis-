import { Types } from '@mycelis/database';
import { name } from '@mycelis/utils';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  displayName: string;
  @ApiProperty()
  passwordHash: string;
  @ApiProperty()
  avatarUrl: string;
  @ApiProperty({ enum: Types.UserStatus })
  status: Types.UserStatus;
  @ApiProperty({ enum: Types.UserRole })
  role: Types.UserRole;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  createAt: Date;
  @ApiProperty()
  updateAt: Date;
  @ApiProperty()
  lastLoginAt: Date;
}
