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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(
    @Body() data: Prisma.UserCreateInput,
  ): Prisma.Prisma__UserClient<Types.User> {
    return this.userService.create(data);
  }

  @Get()
  @Roles("ADMIN")
  findAll(
    @Body('where') where: Prisma.UserWhereInput,
    @Body('take') take: number,
    @Body('skip') skip: number,
  ): Prisma.Prisma__UserClient<Types.User[]> {
    return this.userService.findAll(where, take, skip);
  }

  @Get('findbyid/:id')
  findOne(@Param('id') id: string): Prisma.Prisma__UserClient<Types.User | null> {
    return this.userService.findOne(+id);
  }

  @Get('findbyname/:name')
  findOneByName(
    @Param('name') name: string,
  ): Prisma.Prisma__UserClient<Types.User | null> {
    return this.userService.findOne(name);
  }

  @Patch(':id')
  update(
    @Body('where') where: Prisma.UserWhereUniqueInput,
    @Body('data') data: Prisma.UserUpdateInput,
  ): Prisma.Prisma__UserClient<Types.User> {
    return this.userService.update(where, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Prisma.Prisma__UserClient<Types.User> {
    return this.userService.remove(+id);
  }
}
