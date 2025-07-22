import { ApiProperty } from "@nestjs/swagger";

export class ContributeHeatmapDTO {
    @ApiProperty({ description: "开始时间", example: "2025-07-23" })
    start?: string;
    @ApiProperty({ description: "结束时间" })
    end?: string;
    @ApiProperty({ description: "提交者" })
    author?: string;
}