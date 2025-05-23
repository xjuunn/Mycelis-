import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  findOneByName(name: string) {
    return prisma.user.findUnique({
      where: { name },
      omit: {
        passwordHash: true
      }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.newPassword) {
      if (!updateUserDto.oldPassword) throw new BadRequestException("请输入旧密码");
      const userData = await prisma.user.findUnique({ where: { id } });
      if (!userData) throw new NotFoundException("未找到用户信息");
      if (!Crypto.UserPasswordCrypto.verifyPassword(userData.passwordHash, updateUserDto.oldPassword))
        throw new UnauthorizedException("旧密码输入不正确");
      updateUserDto.newPassword = Crypto.UserPasswordCrypto.hashPassword(
        updateUserDto.newPassword,
      );
    }
    if (updateUserDto.name) {
      const user = await prisma.user.findUnique({
        where: { name: updateUserDto.name }
      })
      if (user) throw new BadRequestException("当前用户名已存在")
    }
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        name: updateUserDto.name,
        displayName: updateUserDto.displayName,
        avatarUrl: updateUserDto.avatarUrl,
        status: updateUserDto.status,
        passwordHash: updateUserDto.newPassword
      },
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
