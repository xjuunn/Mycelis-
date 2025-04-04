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
import { Prisma, Types } from '@mycelis/database';
import { Roles } from 'src/d/roles/roles.decorator';
import { Token, TokenInfo } from 'src/d/token-info/token-info';
import { Public } from 'src/d/public/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @Roles("ADMIN")
  create(
    @Body() data: Prisma.UserCreateInput,
  ): Prisma.Prisma__UserClient<Types.User> {
    return this.userService.create(data);
  }

  @Get()
  @Roles("ADMIN")
  findAll(
    @Body('where') where: Prisma.UserWhereInput,
    @Query('take') take: string = '15',
    @Query('skip') skip: string = '0',
  ) {
    return this.userService.findAll(where, +take, +skip);
  }

  @Get('findbyid/:id')
  @Public()
  findOne(@Param('id') id: string): Prisma.Prisma__UserClient<Types.User | null> {
    return this.userService.findOne(+id);
  }

  @Get('findbyname/:name')
  @Public()
  findOneByName(
    @Param('name') name: string,
  ) {
    return this.userService.findOne(name);
  }

  @Patch(':id')
  @Roles("ADMIN")
  update(
    @Param('id') id: string,
    @Body() data: Prisma.UserUpdateInput,
  ) {
    return this.userService.update(+id, data);
  }

  @Delete(':id')
  @Roles("ADMIN")
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('search')
  @Public()
  async search(@Query('keyword') keyword: string, @Query('take') take: string = '15', @Query('skip') skip: string = '0') {
    if (!keyword?.trim()) return {
      data: [],
      total: 0,
      take,
      skip
    }
    const where: Prisma.UserWhereInput = {
      OR: [
        { name: { contains: keyword } },
        { displayName: { contains: keyword } }
      ]
    };
    return this.userService.findAll(where, Number(take), Number(skip))
  }
}
