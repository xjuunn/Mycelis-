import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { Prisma } from '@mycelis/database';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) { }

  @Post()
  create(@Body() createFriendshipDto: Prisma.FriendshipCreateInput) {
    return this.friendshipService.create(createFriendshipDto);
  }

  @Get()
  findAll(@Query('skip') skip: string = '0', @Query('take') take: string = '15') {
    return this.friendshipService.findAll(+skip, +take);
  }

  @Get(':id')
  findByUserId(@Param('id') id: string, @Query('skip') skip: string = '0', @Query('take') take: string = '15') {
    return this.friendshipService.findByUserId(+id, +skip, +take);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFriendshipDto: Prisma.FriendshipUpdateInput) {
    return this.friendshipService.update(+id, updateFriendshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendshipService.remove(+id);
  }
}
