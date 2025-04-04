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

  async findAll(
    where: Prisma.UserWhereInput,
    take: number,
    skip: number,
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[]
  ) {
    return {
      list: await UserDB.list({
        ...where,
        passwordHash: undefined
      }, take, skip, orderBy),
      total: await this.total(where),
      take, skip

    }
  }

  findOne(idOrName: number | string) {
    if (typeof idOrName == 'number') {
      return UserDB.find(idOrName);
    } else {
      return UserDB.find(idOrName);
    }
  }

  update(
    id: number,
    data: Prisma.UserUpdateInput,
  ) {
    return UserDB.update({
      id
    }, data);
  }

  remove(idOrName: number | string) {
    if (typeof idOrName == 'number') {
      return UserDB.del(idOrName);
    } else {
      return UserDB.del(idOrName);
    }
  }

  total(where: Prisma.UserWhereInput): Promise<number> {
    return UserDB.total(where)
  }
}
