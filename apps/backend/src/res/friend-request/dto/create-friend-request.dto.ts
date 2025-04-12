import { ApiProperty } from "@nestjs/swagger";

export class CreateFriendRequestDto {
    @ApiProperty({description:"被请求者ID"})
    receiverId: number;
}
