import { Injectable } from '@nestjs/common';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { prisma } from '@mycelis/database';
import { PageRequest, PageResultInfo } from '@mycelis/types';
import { SearchFriendshipDto } from './dto/search-friendship.dto';
import { CreateFriendTagDto } from '../friend-tag/dto/create-friend-tag.dto';

@Injectable()
export class FriendshipService {
  create(createFriendshipDto: CreateFriendshipDto, userId: number) {
    return prisma.friendship.create({
      data: {
        userId,
        friendId: createFriendshipDto.friendId,
        note: createFriendshipDto.note,
      },
      include: {
        friend: { omit: { passwordHash: true } },
        tag: true,
      },
    });
  }

  async updateTag(
    id: number,
    createFriendshipTagDto: CreateFriendTagDto,
    userId: number,
  ) {
    const tag = await prisma.friendshipTag.findFirst({
      where: { userId, tag: createFriendshipTagDto.tag },
    });
    return prisma.friendship.update({
      where: { id, userId },
      include: {
        friend: { omit: { passwordHash: true } },
        tag: true,
      },
      data: {
        tag: {
          connectOrCreate: {
            where: {
              id: tag?.id ?? -1,
            },
            create: {
              tag: createFriendshipTagDto.tag,
              sort: createFriendshipTagDto.sort,
              userId,
            },
          },
        },
      },
    });
  }

  removeTag(id: number, userId: number) {
    return prisma.friendship.update({
      where: { id, userId },
      include: {
        friend: { omit: { passwordHash: true } },
        tag: true,
      },
      data: {
        tag: {
          disconnect: true,
        },
      },
    });
  }

  async findAll(
    search: SearchFriendshipDto,
    pageInfo: PageRequest,
    userId: number,
  ) {
    const [list, total] = await Promise.all([
      prisma.friendship.findMany({
        where: {
          userId,
          ...search,
        },
        ...pageInfo,
        include: {
          friend: { omit: { passwordHash: true } },
          tag: true,
        },
      }),
      prisma.friendship.count({
        where: search,
      }),
    ]);
    return new PageResultInfo(list, total, pageInfo.skip, pageInfo.take);
  }

  findOne(id: number, userId: number) {
    return prisma.friendship.findUnique({
      where: { id, userId },
      include: {
        friend: { omit: { passwordHash: true } },
        tag: true,
      },
    });
  }

  remove(id: number, userId: number) {
    return prisma.friendship.delete({
      where: { id, userId },
      include: {
        friend: { omit: { passwordHash: true } },
        tag: true,
      },
    });
  }
}
