import { Injectable } from '@nestjs/common';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { prisma } from '@mycelis/database';
import { PageRequest, PageResult } from '@mycelis/types';
import { SearchFriendshipDto } from './dto/search-friendship.dto';

@Injectable()
export class FriendshipService {
  create(createFriendshipDto: CreateFriendshipDto, userId: number) {
    return prisma.friendship.create({
      data: {
        userId,
        friendId: createFriendshipDto.friendId,
        note: createFriendshipDto.note
      },
      include: {
        friend: { omit: { passwordHash: true } },
        tags: true
      }
    });
  }

  async findAll(search: SearchFriendshipDto, pageInfo: PageRequest, userId: number) {
    const [list, total] = await Promise.all([
      prisma.friendship.findMany({
        where: {
          userId,
          ...search
        },
        ...pageInfo,
        include: {
          friend: { omit: { passwordHash: true } },
          tags: true
        }
      }),
      prisma.friendship.count({
        where: search
      })
    ])
    return new PageResult(list, total, pageInfo.skip, pageInfo.take);
  }

  findOne(id: number, userId: number) {
    return prisma.friendship.findUnique({
      where: { id, userId },
      include: {
        friend: { omit: { passwordHash: true } },
        tags: true
      }
    });
  }

  remove(id: number, userId: number) {
    return prisma.friendship.delete({
      where: { id, userId },
      include: {
        friend: { omit: { passwordHash: true } },
        tags: true
      }
    })
  }
}
