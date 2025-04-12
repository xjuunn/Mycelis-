import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
import { SearchFriendRequestDto } from './dto/search-friend-request';
import { PageInfo } from 'src/d/pageinfo/pageinfo.decorator';
import { PageRequest } from '@mycelis/types';
import { ApiOperation } from '@nestjs/swagger';
import { Token, TokenInfo } from 'src/d/token-info/token-info';

@Controller('friend-request')
export class FriendRequestController {
  constructor(private readonly friendRequestService: FriendRequestService) { }

  @ApiOperation({ summary: "创建好友请求" })
  @Post()
  create(@Body() createFriendRequestDto: CreateFriendRequestDto, @Token() tokenInfo: TokenInfo) {
    return this.friendRequestService.create(createFriendRequestDto, tokenInfo.id);
  }

  @ApiOperation({ summary: "获取当前账号的好友请求" })
  @Get()
  findAll(@Body() search: SearchFriendRequestDto, @PageInfo() pageInfo: PageRequest, @Token() tokeninfo: TokenInfo) {
    return this.friendRequestService.findAll(search, pageInfo, tokeninfo.id);
  }

  @ApiOperation({ summary: "获取好友请求" })
  @Get(':id')
  findOne(@Param('id') id: string, @Token() tokenInfo: TokenInfo) {
    return this.friendRequestService.findOne(+id, tokenInfo.id);
  }

  @ApiOperation({ summary: "删除好友请求" })
  @Delete(':id')
  remove(@Param('id') id: string, @Token() tokenInfo: TokenInfo) {
    return this.friendRequestService.remove(+id, tokenInfo.id);
  }

  @ApiOperation({ summary: "接受好友请求" })
  @Patch('/accept/:id')
  accept(@Param('id') id: string, @Token() tokenInfo: TokenInfo) {
    return this.friendRequestService.update(+id, { status: "ACCEPTED" }, tokenInfo.id);
  }

  @ApiOperation({ summary: "拒绝好友请求" })
  @Patch('/reject/:id')
  reject(@Param('id') id: string, @Token() tokeninfo: TokenInfo) {
    return this.friendRequestService.update(+id, { status: "REJECTED" }, tokeninfo.id);
  }

}
