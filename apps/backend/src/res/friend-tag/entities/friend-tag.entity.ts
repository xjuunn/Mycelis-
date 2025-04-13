import { ApiProperty } from "@nestjs/swagger";

export class FriendTag {
    @ApiProperty({ description: "ID" })
    id: number;
    @ApiProperty({ description: "创建用户ID" })
    userId: number;
    @ApiProperty({ description: "好友关系ID" })
    friendshipId: number;
    @ApiProperty({ description: "标签" })
    tag: string;
    @ApiProperty({ description: "排序" })
    sort: number;
}
