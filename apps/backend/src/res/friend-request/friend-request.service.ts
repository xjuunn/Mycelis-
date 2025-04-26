import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
import { prisma } from '@mycelis/database';
import { SearchFriendRequestDto } from './dto/search-friend-request';
import { PageRequest, PageResultInfo } from '@mycelis/types';

@Injectable()
export class FriendRequestService {
  async create(
    createFriendRequestDto: CreateFriendRequestDto,
    senderId: number,
  ) {
    const check = await prisma.friendRequest.findFirst({
      where: {
        receiverId: createFriendRequestDto.receiverId,
        senderId,
      },
    });
    if (check) throw new BadRequestException('已存在请求记录，请勿重复请求');
    return prisma.friendRequest.create({
      data: {
        senderId,
        receiverId: createFriendRequestDto.receiverId,
        status: 'PENDING',
      },
      include: {
        receiver: { omit: { passwordHash: true } },
      },
    });
  }

  async findAllSent(
    search: SearchFriendRequestDto,
    pageinfo: PageRequest,
    senderId: number,
  ) {
    const [list, total] = await Promise.all([
      prisma.friendRequest.findMany({
        where: {
          senderId,
          status: search.status,
        },
        include: {
          receiver: { omit: { passwordHash: true } },
        },
        take: +pageinfo.take,
        skip: +pageinfo.skip,
      }),
      prisma.friendRequest.count({
        where: {
          status: search.status,
        },
      }),
    ]);
    return new PageResultInfo(list, total, pageinfo.skip, pageinfo.take);
  }

  async findAllReceived(
    search: SearchFriendRequestDto,
    pageinfo: PageRequest,
    receiverId: number,
  ) {
    const [list, total] = await Promise.all([
      prisma.friendRequest.findMany({
        where: {
          status: search.status,
          receiverId,
        },
        include: {
          sender: { omit: { passwordHash: true } },
        },
        take: +pageinfo.take,
        skip: +pageinfo.skip,
      }),
      prisma.friendRequest.count({
        where: {
          status: search.status,
        },
      }),
    ]);
    return new PageResultInfo(list, total, pageinfo.skip, pageinfo.take);
  }

  findOne(id: number, receiverId: number) {
    return prisma.friendRequest.findUnique({
      where: { id, receiverId },
      include: {
        receiver: { omit: { passwordHash: true } },
      },
    });
  }

  update(
    id: number,
    updateFriendRequestDto: UpdateFriendRequestDto,
    receiverId: number,
  ) {
    return prisma.friendRequest.update({
      where: { id, receiverId },
      data: updateFriendRequestDto,
      include: {
        receiver: { omit: { passwordHash: true } },
      },
    });
  }

  remove(id: number, senderId: number) {
    return prisma.friendRequest.delete({
      where: { id, senderId },
      include: {
        receiver: { omit: { passwordHash: true } },
      },
    });
  }
}
