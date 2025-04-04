import { Injectable } from '@nestjs/common';
import { Prisma, Types, FriendDB } from '@mycelis/database';

@Injectable()
export class FriendRequestService {
  async create(createFriendRequestDto: Prisma.FriendRequestCreateInput) {
    return await FriendDB.FriendRequest.add(createFriendRequestDto)
  }

  findAll(skip: number, take: number) {
    return FriendDB.FriendRequest.findAll(skip, take)
  }

  findByUserId(id: number, skip: number, take: number) {
    return FriendDB.FriendRequest.findByUserId(id, skip, take);
  }

  remove(id: number) {
    return FriendDB.FriendRequest.del(id);
  }
}
