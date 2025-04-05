import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { Prisma } from '@mycelis/database';
import { Token, TokenInfo } from 'src/d/token-info/token-info';
import { Roles } from 'src/d/roles/roles.decorator';

@Controller('friend-request')
export class FriendRequestController {
  constructor(private readonly friendRequestService: FriendRequestService) { }

  @Post()
  @Roles("ADMIN")
  async create(@Body() createFriendRequestDto: Prisma.FriendRequestCreateInput) {
    return await this.friendRequestService.create(createFriendRequestDto);
  }

  @Get()
  @Roles("ADMIN")
  findAll(@Query('skip') skip: string = '0', @Query('take') take: string = '15') {
    return this.friendRequestService.findAll(+skip, +take);
  }

  @Delete(':id')
  @Roles("ADMIN")
  remove(@Param('id') id: string) {
    return this.friendRequestService.remove(+id);
  }

  @Get('/self/list')
  findByUserId(@Query('skip') skip: string = '0', @Query('take') take: string = '15', @Token() tokeninfo: TokenInfo) {
    return this.friendRequestService.findByUserId(tokeninfo.id, +skip, +take);
  }

  @Post('/self/:id')
  createByUser(@Param('id') id: string, @Token() tokeninfo: TokenInfo) {
    return this.friendRequestService.create({
      sender: {
        connect: { id: tokeninfo.id },
      },
      receiver: {
        connect: { id: +id }
      },
      status: 'PENDING'
    })
  }

  @Delete('/self/:id')
  deleteByUser(@Param('id') id: string, @Token() tokeninfo: TokenInfo) {
    return this.friendRequestService.removeByUser(+id, tokeninfo.id);
  }

  @Get('/self/receive')
  findReceiveRequest(@Token() tokeninfo: TokenInfo, @Query('skip') skip: string = '0', @Query('take') take: string = '15') {
    return this.friendRequestService.findReceiveRequest(tokeninfo.id, +skip, +take)
  }


  /**
   * 修改好友请求状态
   * @param id 好友请求ID
   * @param status 状态：PENDING、ACCEPTED、REJECTED、DELETED
   */
  @Patch('/self/:id')
  updateReceiveRequestState(@Param('id') id: string, @Query('status') status: Prisma.EnumFriendRequestStatusFieldUpdateOperationsInput, @Token() token: TokenInfo) {
    return this.friendRequestService.updateReceiveRequest(+id, token.id, status)
  }

}
