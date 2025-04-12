import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { Token, TokenInfo } from 'src/d/token-info/token-info';
import { PageInfo } from 'src/d/pageinfo/pageinfo.decorator';
import { PageRequest } from '@mycelis/types';
import { SearchFriendshipDto } from './dto/search-friendship.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) { }

  // @ApiOperation({ summary: "创建好友关系" })
  // @Post()
  // create(@Body() createFriendshipDto: CreateFriendshipDto, @Token() tokenInfo: TokenInfo) {
  //   return this.friendshipService.create(createFriendshipDto, tokenInfo.id);
  // }

  @ApiOperation({ summary: "获取好友关系列表" })
  @Get()
  findAll(@Body() search: SearchFriendshipDto, @PageInfo() pageInfo: PageRequest, @Token() tokenInfo: TokenInfo) {
    return this.friendshipService.findAll(search, pageInfo, tokenInfo.id);
  }

  @ApiOperation({ summary: "获取好友关系" })
  @Get(':id')
  findOne(@Param('id') id: string, @Token() tokenInfo: TokenInfo) {
    return this.friendshipService.findOne(+id, tokenInfo.id);
  }

  @ApiOperation({ summary: "删除好友关系" })
  @Delete(':id')
  remove(@Param('id') id: string, @Token() tokenInfo: TokenInfo) {
    return this.friendshipService.remove(+id, tokenInfo.id);
  }
}
