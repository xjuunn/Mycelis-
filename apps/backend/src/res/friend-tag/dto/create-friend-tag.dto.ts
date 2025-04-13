import { ApiProperty } from "@nestjs/swagger";

export class CreateFriendTagDto {
    @ApiProperty({ description: "标签" })
    tag: string;
    @ApiProperty({ description: "排序" })
    sort: number;
}
