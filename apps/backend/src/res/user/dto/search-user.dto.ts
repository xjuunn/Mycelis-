import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Types } from '@mycelis/database';

export class SearchUserDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    displayName: string;
    @ApiProperty()
    avatarUrl: string;
    @ApiProperty({ enum: Types.UserStatus })
    status: Types.UserStatus;
    @ApiProperty({ enum: Types.UserRole })
    role: Types.UserRole;
    @ApiProperty()
    isActive: boolean;
}
