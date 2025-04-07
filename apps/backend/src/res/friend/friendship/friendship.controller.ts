import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { Prisma } from '@mycelis/database';
import { Token, TokenInfo } from 'src/d/token-info/token-info';
import { Roles } from 'src/d/roles/roles.decorator';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) { }

  @Post()
  @Roles("ADMIN")
  create(@Body() createFriendshipDto: Prisma.FriendshipCreateInput) {
    return this.friendshipService.create(createFriendshipDto);
  }

  @Get('/admin')
  @Roles("ADMIN")
  findAll(@Query('skip') skip: string = '0', @Query('take') take: string = '15') {
    return this.friendshipService.findAll(+skip, +take);
  }

  @Get('/admin/:id')
  @Roles("ADMIN")
  findByUserId(@Param('id') id: string, @Query('skip') skip: string = '0', @Query('take') take: string = '15') {
    return this.friendshipService.findByUserId(+id, +skip, +take);
  }

  @Patch('/admin/:id')
  @Roles("ADMIN")
  update(@Param('id') id: string, @Body() updateFriendshipDto: Prisma.FriendshipUpdateInput) {
    return this.friendshipService.update(+id, updateFriendshipDto);
  }

  @Delete('/admin/:id')
  @Roles("ADMIN")
  remove(@Param('id') id: string) {
    return this.friendshipService.remove(+id);
  }

  @Patch("/tag/self/:shipid/tag/")
  insertMyFriendTag(@Param("shipid") id: string, @Query("tag") tag: string, @Token() tokeninfo: TokenInfo) {
    return this.friendshipService.insertMyFriendTag(+id, tokeninfo.id, tag);
  }

  @Delete("/tag/self/:shipid/tag/:tagid")
  removeMyFriendTag(@Param("shipid") id: string, @Param("tagid") tagid: string, @Token() tokeninfo: TokenInfo) {
    return this.friendshipService.removeFriendTag(+id, tokeninfo.id, +tagid);
  }

  @Get("/tag/self/:shipid/tag/")
  listMyFriendTags(@Param("shipid") shipid: string, @Query('skip') skip: string = '0', @Query('take') take: string = '15') {
    return this.friendshipService.listFriendTags(+shipid, +skip, +take);
  }

  @Post('/self/:id')
  async createByUser(@Param("id") id: string, @Token() tokeninfo: TokenInfo) {
    await this.friendshipService.create({
      user: { connect: { id: +id } },
      friend: { connect: { id: tokeninfo.id } },
    })
    return this.friendshipService.create({
      user: { connect: { id: tokeninfo.id } },
      friend: { connect: { id: +id } },
    })
  }

  @Delete("/self/:id")
  deleteByUser(@Param('id') id: string, @Token() tokeninfo: TokenInfo) {
    return this.friendshipService.removeByUser(+id, tokeninfo.id);
  }

  @Patch('/self/:id')
  updateByUser(@Param('id') id: string, @Body() data: Prisma.FriendshipUpdateInput, @Token() tokeninfo: TokenInfo) {
    return this.friendshipService.updateByUser(+id, tokeninfo.id, {
      ...data,
      createAt: undefined,
      user: undefined,
      friend: undefined
    })
  }

  @Get("/self/list")
  findMyFriend(@Token() tokeninfo: TokenInfo, @Query('skip') skip: string = '0', @Query('take') take: string = '15') {
    return this.friendshipService.findMyFriend(tokeninfo.id, +skip, +take);
  }



}
