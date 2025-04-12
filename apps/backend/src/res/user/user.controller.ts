import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { PageRequest } from '@mycelis/types';
import { Token, TokenInfo } from 'src/d/token-info/token-info';
import { PageInfo } from 'src/d/pageinfo/pageinfo.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('search')
  search(@Query("keyword") keyword: string, @PageInfo() pageinfo: PageRequest) {
    return this.userService.search(keyword, pageinfo);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Body() searchUserDto: SearchUserDto, @PageInfo() pageInfo: PageRequest) {
    return this.userService.findAll(searchUserDto, pageInfo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @Token() tokeninfo: TokenInfo) {
    return this.userService.update(tokeninfo.id, updateUserDto);
  }

  @Delete()
  remove(@Token() tokneinfo: TokenInfo) {
    return this.userService.remove(tokneinfo.id);
  }

}
