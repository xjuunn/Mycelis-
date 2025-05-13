import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { prisma } from '@mycelis/database';
import { PageRequest, PageResult, PageResultInfo } from '@mycelis/types';
import { SearchMessageDto } from './dto/search-message.dto';
import { take } from 'rxjs';

@Injectable()
export class MessageService {
  create(createMessageDto: CreateMessageDto, senderId: number) {
    return prisma.message.create({
      data: {
        senderId: senderId,
        receiverId: createMessageDto.receiverId,
        message: createMessageDto.message,
        type: createMessageDto.type,
        origin: createMessageDto.origin,
        status: 'Delivered',
        replyTo: createMessageDto.replyTo,
        isPinned: createMessageDto.isPinned,
      },
      include: {
        receiver: { omit: { passwordHash: true } },
      },
    });
  }

  async findSentMessageList(
    searchMessageDto: SearchMessageDto,
    senderId: number,
    pageInfo: PageRequest,
  ) {
    const where = {
      id: searchMessageDto.id,
      senderId,
      receiverId: searchMessageDto.receiverId,
      message: searchMessageDto.message,
      type: searchMessageDto.type,
      origin: searchMessageDto.origin,
      status: searchMessageDto.status,
      replyTo: searchMessageDto.replyTo,
      isPinned: searchMessageDto.isPinned,
      createAt: searchMessageDto.createAt,
      updateAt: searchMessageDto.updateAt,
      readAt: searchMessageDto.readAt,
    };
    const [list, total] = await Promise.all([
      prisma.message.findMany({
        where,
        include: {
          receiver: { omit: { passwordHash: true } },
        },
        orderBy: {
          createAt: 'desc'
        },
        skip: pageInfo.skip,
        take: pageInfo.take,
      }),
      prisma.message.count({ where }),
    ]);
    return new PageResultInfo(list, total, pageInfo.skip, pageInfo.take);
  }

  async findReceivedMessageList(
    searchMessageDto: SearchMessageDto,
    receiverId: number,
    pageInfo: PageRequest,
  ) {
    const where = {
      id: searchMessageDto.id,
      senderId: searchMessageDto.senderId,
      receiverId,
      message: searchMessageDto.message,
      type: searchMessageDto.type,
      origin: searchMessageDto.origin,
      status: searchMessageDto.status,
      replyTo: searchMessageDto.replyTo,
      isPinned: searchMessageDto.isPinned,
      createAt: searchMessageDto.createAt,
      updateAt: searchMessageDto.updateAt,
      readAt: searchMessageDto.readAt,
    };
    const [list, total] = await Promise.all([
      prisma.message.findMany({
        where,
        include: {
          receiver: { omit: { passwordHash: true } },
        },
        orderBy: {
          createAt: 'desc'
        },
        skip: pageInfo.skip,
        take: pageInfo.take,
      }),
      prisma.message.count({ where }),
    ]);
    return new PageResultInfo(list, total, pageInfo.skip, pageInfo.take);
  }

  async listByFriend(searchMessageDto: SearchMessageDto, myId: number, pageInfo: PageRequest) {
    const where = {
      id: searchMessageDto.id,
      message: searchMessageDto.message,
      type: searchMessageDto.type,
      origin: searchMessageDto.origin,
      status: searchMessageDto.status,
      replyTo: searchMessageDto.replyTo,
      isPinned: searchMessageDto.isPinned,
      createAt: searchMessageDto.createAt,
      updateAt: searchMessageDto.updateAt,
      readAt: searchMessageDto.readAt,
    }

    let yourid = searchMessageDto.senderId === myId ? searchMessageDto.receiverId : searchMessageDto.senderId;
    if (yourid && yourid < 0) throw new BadRequestException("请设置目标好友ID(sender.id或receiver.id)")
    const [list, total] = await Promise.all([
      prisma.message.findMany({
        where: {
          OR: [{ ...where, senderId: myId, receiverId: yourid }, { ...where, senderId: yourid, receiverId: myId, }]
        },
        orderBy: {
          createAt: 'desc'
        },
        take: pageInfo.take,
        skip: pageInfo.skip
      }),
      prisma.message.count({
        where: {
          OR: [{ ...where, senderId: myId, receiverId: yourid }, { ...where, senderId: yourid, receiverId: myId, }]
        }
      })
    ])
    return new PageResultInfo(list, total, pageInfo.skip, pageInfo.take);
  }

  findOne(id: number, userId: number) {
    return prisma.message.findUnique({
      where: {
        id,
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
    });
  }

  update(id: number, updateMessageDto: UpdateMessageDto, userId: number) {
    return prisma.message.update({
      where: {
        id,
        senderId: userId,
      },
      data: {
        message: updateMessageDto.message,
        isPinned: updateMessageDto.isPinned,
      },
      include: {
        receiver: {
          omit: { passwordHash: true },
        },
      },
    });
  }

  remove(id: number, userId: number) {
    return prisma.message.delete({
      where: {
        id,
        senderId: userId,
      },
      include: {
        receiver: {
          omit: { passwordHash: true },
        },
      },
    });
  }
}
