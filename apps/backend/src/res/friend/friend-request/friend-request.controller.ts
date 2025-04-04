import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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

  @Get('/listbyuser')
  findByUserId(@Query('skip') skip: string = '0', @Query('take') take: string = '15', @Token() tokeninfo: TokenInfo) {
    return this.friendRequestService.findByUserId(tokeninfo.id, +skip, +take);
  }

  @Post('/createbyuser/:id')
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
}
