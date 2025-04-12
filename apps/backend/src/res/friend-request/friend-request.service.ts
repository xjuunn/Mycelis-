import { Injectable } from '@nestjs/common';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
import { prisma } from '@mycelis/database';
import { SearchFriendRequestDto } from './dto/search-friend-request';
import { PageRequest, PageResult } from '@mycelis/types';

@Injectable()
export class FriendRequestService {
  create(createFriendRequestDto: CreateFriendRequestDto, senderId: number) {
    return prisma.friendRequest.create({
      data: {
        senderId,
        receiverId: createFriendRequestDto.receiverId,
        status: "PENDING"
      },
      include: {
        receiver: { omit: { passwordHash: true } }
      }
    });
  }

  async findAllSent(search: SearchFriendRequestDto, pageinfo: PageRequest, senderId: number) {
    const [list, total] = await Promise.all([
      prisma.friendRequest.findMany({
        where: {
          senderId,
          ...search
        },
        include: {
          receiver: { omit: { passwordHash: true } }
        },
        ...pageinfo
      }),
      prisma.friendRequest.count({
        where: search
      })
    ])
    return new PageResult(list, total, pageinfo.skip, pageinfo.take);
  }

  async findAllReceived(search: SearchFriendRequestDto, pageinfo: PageRequest, receiverId: number) {
    const [list, total] = await Promise.all([
      prisma.friendRequest.findMany({
        where: {
          ...search,
          receiverId
        },
        include: {
          receiver: { omit: { passwordHash: true } }
        },
        ...pageinfo
      }),
      prisma.friendRequest.count({
        where: search
      })
    ])
    return new PageResult(list, total, pageinfo.skip, pageinfo.take);
  }

  findOne(id: number, receiverId: number) {
    return prisma.friendRequest.findUnique({
      where: { id, receiverId },
      include: {
        receiver: { omit: { passwordHash: true } }
      }
    });
  }

  update(id: number, updateFriendRequestDto: UpdateFriendRequestDto, receiverId: number) {
    return prisma.friendRequest.update({
      where: { id, receiverId },
      data: updateFriendRequestDto,
      include: {
        receiver: { omit: { passwordHash: true } }
      }
    });
  }

  remove(id: number, senderId: number) {
    return prisma.friendRequest.delete({
      where: { id, senderId },
      include: {
        receiver: { omit: { passwordHash: true } }
      }
    });
  }
}
