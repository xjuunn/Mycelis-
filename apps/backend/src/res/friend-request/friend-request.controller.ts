import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
import { SearchFriendRequestDto } from './dto/search-friend-request';
import { PageInfo } from 'src/d/pageinfo/pageinfo.decorator';
import { PageRequest } from '@mycelis/types';
import { ApiOperation } from '@nestjs/swagger';
import { Token, TokenInfo } from 'src/d/token-info/token-info';
import { FriendshipService } from '../friendship/friendship.service';

@Controller('friend-request')
export class FriendRequestController {
  constructor(
    private readonly friendRequestService: FriendRequestService,
    private readonly friendshipService: FriendshipService,
  ) {}

  @ApiOperation({ summary: '创建好友请求' })
  @Post()
  create(
    @Body() createFriendRequestDto: CreateFriendRequestDto,
    @Token() tokenInfo: TokenInfo,
  ) {
    if (createFriendRequestDto.receiverId == tokenInfo.id)
      throw new BadRequestException('您不能添加自己为好友');
    return this.friendRequestService.create(
      createFriendRequestDto,
      tokenInfo.id,
    );
  }

  @ApiOperation({ summary: '获取当前账号发送的好友请求' })
  @Get('sent')
  findAllSent(
    @Query() search: SearchFriendRequestDto,
    @PageInfo() pageInfo: PageRequest,
    @Token() tokeninfo: TokenInfo,
  ) {
    return this.friendRequestService.findAllSent(
      search,
      pageInfo,
      tokeninfo.id,
    );
  }

  @ApiOperation({ summary: '获取当前账号接收的好友请求' })
  @Get('received')
  findAllReceived(
    @Query() search: SearchFriendRequestDto,
    @PageInfo() pageInfo: PageRequest,
    @Token() tokeninfo: TokenInfo,
  ) {
    return this.friendRequestService.findAllReceived(
      search,
      pageInfo,
      tokeninfo.id,
    );
  }

  @ApiOperation({ summary: '获取好友请求' })
  @Get(':id')
  findOne(@Param('id') id: string, @Token() tokenInfo: TokenInfo) {
    return this.friendRequestService.findOne(+id, tokenInfo.id);
  }

  @ApiOperation({ summary: '删除好友请求' })
  @Delete(':id')
  remove(@Param('id') id: string, @Token() tokenInfo: TokenInfo) {
    return this.friendRequestService.remove(+id, tokenInfo.id);
  }

  @ApiOperation({ summary: '接受好友请求' })
  @Patch('/accept/:id')
  async accept(@Param('id') id: string, @Token() tokenInfo: TokenInfo) {
    const request = await this.friendRequestService.findOne(+id, tokenInfo.id);
    if (request?.receiverId == undefined)
      throw new BadRequestException('错误的请求接收者');
    if (request?.status === 'ACCEPTED')
      throw new BadRequestException('该请求已被同意');
    if (request?.status === 'REJECTED')
      throw new BadRequestException('该请求已被拒绝');
    await this.friendshipService.create(
      { friendId: request?.receiverId },
      request?.senderId,
    );
    await this.friendshipService.create(
      { friendId: request?.senderId },
      request?.receiverId,
    );
    return this.friendRequestService.update(
      +id,
      { status: 'ACCEPTED' },
      tokenInfo.id,
    );
  }

  @ApiOperation({ summary: '拒绝好友请求' })
  @Patch('/reject/:id')
  reject(@Param('id') id: string, @Token() tokeninfo: TokenInfo) {
    return this.friendRequestService.update(
      +id,
      { status: 'REJECTED' },
      tokeninfo.id,
    );
  }
}
