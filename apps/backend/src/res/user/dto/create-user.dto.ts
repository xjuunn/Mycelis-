import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  passwordHash: string;
  @ApiProperty()
  displayName?: string;
  @ApiProperty()
  avatarUrl?: string;
}
