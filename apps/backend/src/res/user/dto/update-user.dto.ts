import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Types } from '@mycelis/database';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    name?: string;
    @ApiProperty()
    displayName?: string;
    @ApiProperty()
    passwordHash?: string;
    @ApiProperty()
    avatarUrl?: string;
    @ApiProperty({enum: Types.UserStatus })
    status?: Types.UserStatus;
}
