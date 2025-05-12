import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { PageRequest, PageResultInfo, Result } from '@mycelis/types';
import { Token, TokenInfo } from 'src/d/token-info/token-info';
import { PageInfo } from 'src/d/pageinfo/pageinfo.decorator';
import {
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { Crypto } from '@mycelis/utils';
import { Public } from 'src/d/public/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: '用户搜索' })
  @ApiQuery({
    name: 'keyword',
    required: true,
    description: '搜索关键词',
    example: 'admin',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    description: '数据量',
    example: '15',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    description: '跳过',
    example: '0',
  })
  @ApiResponse({ status: 200, type: PageResultInfo })
  @Get('search')
  search(@Query('keyword') keyword: string, @PageInfo() pageinfo: PageRequest) {
    return this.userService.search(keyword, pageinfo);
  }

  // @ApiOperation({ summary: "创建用户" })
  // @ApiResponse({ status: 201, type: Result })
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   if (createUserDto.passwordHash)
  //     createUserDto.passwordHash = Crypto.UserPasswordCrypto.hashPassword(createUserDto.passwordHash)
  //   return this.userService.create(createUserDto);
  // }

  @ApiOperation({ summary: '查询用户列表' })
  @Post()
  findAll(
    @Body() searchUserDto: SearchUserDto,
    @PageInfo() pageInfo: PageRequest,
  ) {
    return this.userService.findAll(searchUserDto, pageInfo);
  }

  @ApiOperation({ summary: '查询用户', description: '通过ID查询用户' })
  @Get('/id/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: "查询用户(通过name)" })
  @Get('/name/:name')
  findOneByName(@Param('name') name: string) {
    return this.userService.findOneByName(name);
  }

  @ApiOperation({ summary: '修改当前用户信息' })
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @Token() tokeninfo: TokenInfo) {
    return this.userService.update(tokeninfo.id, updateUserDto);
  }

  @ApiOperation({ summary: '删除当前用户' })
  @Delete()
  remove(@Token() tokneinfo: TokenInfo) {
    return this.userService.remove(tokneinfo.id);
  }
}
