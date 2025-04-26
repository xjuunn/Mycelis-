import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { prisma } from '@mycelis/database';
import { SearchUserDto } from './dto/search-user.dto';
import { PageRequest, PageResultInfo } from '@mycelis/types';
import { Crypto } from '@mycelis/utils';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(searchUserDto: SearchUserDto, pageReq: PageRequest) {
    const [list, total] = await Promise.all([
      prisma.user.findMany({
        where: searchUserDto,
        ...pageReq,
        omit: {
          passwordHash: true,
        },
      }),
      prisma.user.count({ where: searchUserDto }),
    ]);
    return new PageResultInfo(list, total, pageReq.skip, pageReq.take);
  }

  findOne(id: number) {
    return prisma.user.findUnique({
      where: { id },
      omit: {
        passwordHash: true,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.passwordHash)
      updateUserDto.passwordHash = Crypto.UserPasswordCrypto.hashPassword(
        updateUserDto.passwordHash,
      );
    return prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
      omit: {
        passwordHash: true,
      },
    });
  }

  remove(id: number) {
    return prisma.user.delete({
      where: { id },
      omit: {
        passwordHash: true,
      },
    });
  }

  async search(keyword: string, pageInfo: PageRequest) {
    let [list, total] = await Promise.all([
      prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: keyword } },
            { displayName: { contains: keyword } },
          ],
        },
        omit: {
          passwordHash: true,
        },
      }),
      prisma.user.count({
        where: {
          OR: [
            { name: { contains: keyword } },
            { displayName: { contains: keyword } },
          ],
        },
      }),
    ]);

    // 匹配度排序
    list = list.sort((a, b) => {
      const aNameMatch = a.name.toLowerCase().includes(keyword.toLowerCase())
        ? keyword.length / a.name.length
        : 0;
      const aDisplayNameMatch = a.displayName
        ?.toLowerCase()
        .includes(keyword.toLowerCase())
        ? keyword.length / a.displayName.length
        : 0;
      const aScore = aNameMatch * 2 + aDisplayNameMatch;
      const bNameMatch = b.name.toLowerCase().includes(keyword.toLowerCase())
        ? keyword.length / b.name.length
        : 0;
      const bDisplayNameMatch = b.displayName
        ?.toLowerCase()
        .includes(keyword.toLowerCase())
        ? keyword.length / b.displayName.length
        : 0;
      const bScore = bNameMatch * 2 + bDisplayNameMatch;
      return bScore - aScore;
    });
    return new PageResultInfo(list, total, pageInfo.skip, pageInfo.take);
  }
}
