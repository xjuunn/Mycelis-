import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateFriendTagDto } from './dto/create-friend-tag.dto';
import { UpdateFriendTagDto } from './dto/update-friend-tag.dto';
import { Prisma, prisma } from '@mycelis/database';
import { PageRequest, PageResult } from '@mycelis/types';

@Injectable()
export class FriendTagService {

  async list(pageInfo: PageRequest, userId: number) {
    const [list, total] = await Promise.all([
      prisma.friendshipTag.findMany({
        where: {
          userId
        },
        ...pageInfo,
      }),
      prisma.friendshipTag.count({
        where: { userId }
      })
    ])
    return new PageResult(list, total, pageInfo.skip, pageInfo.take);
  }

  async listDetails(id: number, pageInfo: PageRequest, userId: number) {
    const [list, total] = await Promise.all([
      prisma.friendship.findMany({
        where: {
          tagId: id,
          userId
        },
        ...pageInfo
      }),
      prisma.friendship.count({
        where: { tagId: id, userId }
      })
    ])
    return new PageResult(list, total, pageInfo.skip, pageInfo.take);
  }

  create(createFrienddto: CreateFriendTagDto, userId: number) {
    return prisma.friendshipTag.create({
      data: {
        tag: createFrienddto.tag,
        sort: createFrienddto.sort,
        userId
      }
    });
  }

  update(id: number, updateFriendTagDto: UpdateFriendTagDto, userId: number) {
    return prisma.friendshipTag.update({
      where: { id, userId },
      data: {
        sort: updateFriendTagDto.sort,
        tag: updateFriendTagDto.tag
      },
      include: {
        friendship: {
          include: {
            friend: { omit: { passwordHash: true } },
            tag: true
          }
        }
      }
    })
  }

  remove(id: number, userId: number) {
    return prisma.friendshipTag.delete({
      where: {
        id,
        userId
      }
    })
  }
}
