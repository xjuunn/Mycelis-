import { Prisma, UserDB, Types } from '@mycelis/database';
import { Injectable } from '@nestjs/common';
import { Crypto } from '@mycelis/utils';

@Injectable()
export class UserService {
  create(
    createUserDto: Prisma.UserCreateInput,
  ): Prisma.Prisma__UserClient<Types.User> {
    createUserDto.passwordHash = Crypto.UserPasswordCrypto.hashPassword(createUserDto.passwordHash);
    return UserDB.add(createUserDto);
  }

  findAll(
    where: Prisma.UserWhereInput,
    take: number,
    skip: number,
  ): Prisma.Prisma__UserClient<Types.User[]> {
    return UserDB.list({
      ...where,
      passwordHash: undefined
    }, take, skip);
  }

  findOne(idOrName: number | string): Prisma.Prisma__UserClient<Types.User | null> {
    if (typeof idOrName == 'number') {
      return UserDB.find(idOrName);
    } else {
      return UserDB.find(idOrName);
    }
  }

  update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Prisma.Prisma__UserClient<Types.User> {
    return UserDB.update({
      ...where,
      passwordHash: undefined
    }, data);
  }

  remove(idOrName: number | string): Prisma.Prisma__UserClient<Types.User> {
    if (typeof idOrName == 'number') {
      return UserDB.del(idOrName);
    } else {
      return UserDB.del(idOrName);
    }
  }
}
