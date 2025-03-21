import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDB } from '@mycelis/database';
@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    return await UserDB.addUser(createUserDto.name, createUserDto.email);
  }

  async findAll() {
    return await UserDB.findAll();
  }

  async findOne(id: number) {
    return await UserDB.findUser(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return await UserDB.delUser(id);
  }
}
