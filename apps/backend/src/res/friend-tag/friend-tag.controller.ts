import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FriendTagService } from './friend-tag.service';
import { CreateFriendTagDto } from './dto/create-friend-tag.dto';
import { UpdateFriendTagDto } from './dto/update-friend-tag.dto';
import { Token, TokenInfo } from 'src/d/token-info/token-info';
import { PageInfo } from 'src/d/pageinfo/pageinfo.decorator';
import { PageRequest } from '@mycelis/types';
import { ApiOperation } from '@nestjs/swagger';

@Controller('friend-tag')
export class FriendTagController {
  constructor(private readonly friendTagService: FriendTagService) {}

  @ApiOperation({ summary: '查询标签列表' })
  @Get()
  list(@PageInfo() pageInfo: PageRequest, @Token() tokenInfo: TokenInfo) {
    return this.friendTagService.list(pageInfo, tokenInfo.id);
  }

  @ApiOperation({ summary: '查询标签下的好友' })
  @Get('/details/:id')
  listDetails(
    @Param('id') id: string,
    @PageInfo() pageInfo: PageRequest,
    @Token() tokenInfo: TokenInfo,
  ) {
    return this.friendTagService.listDetails(+id, pageInfo, tokenInfo.id);
  }

  @ApiOperation({ summary: '创建标签' })
  @Post()
  create(
    @Body() createFriendTagdto: CreateFriendTagDto,
    @Token() tokenInfo: TokenInfo,
  ) {
    return this.friendTagService.create(createFriendTagdto, tokenInfo.id);
  }

  @ApiOperation({ summary: '修改标签' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFriendTagDto: UpdateFriendTagDto,
    @Token() tokenInfo: TokenInfo,
  ) {
    return this.friendTagService.update(+id, updateFriendTagDto, tokenInfo.id);
  }

  @ApiOperation({ summary: '删除标签' })
  @Delete(':id')
  remove(@Param('id') id: string, @Token() tokenInfo: TokenInfo) {
    return this.friendTagService.remove(+id, tokenInfo.id);
  }
}
