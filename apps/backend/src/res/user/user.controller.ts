import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@mycelis/database';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(
    @Body() data: Prisma.UserCreateInput,
  ): Prisma.Prisma__UserClient<User> {
    return this.userService.create(data);
  }

  @Get()
  findAll(
    @Body('where') where: Prisma.UserWhereInput,
    @Body('take') take: number,
    @Body('skip') skip: number,
  ): Prisma.Prisma__UserClient<User[]> {
    return this.userService.findAll(where, take, skip);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Prisma.Prisma__UserClient<User | null> {
    return this.userService.findOne(+id);
  }

  @Get(':name')
  findOneByName(
    @Param('name') name: string,
  ): Prisma.Prisma__UserClient<User | null> {
    return this.userService.findOne(name);
  }

  @Patch(':id')
  update(
    @Body('where') where: Prisma.UserWhereUniqueInput,
    @Body('data') data: Prisma.UserUpdateInput,
  ): Prisma.Prisma__UserClient<User> {
    return this.userService.update(where, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Prisma.Prisma__UserClient<User> {
    return this.userService.remove(+id);
  }
}
