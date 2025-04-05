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

  findReceiveRequest(userID: number, skip: number, take: number) {
    return FriendDB.FriendRequest.findWhere({
      receiverId: userID,
    },
      skip, take
    )
  }

  updateReceiveRequest(id: number, userId: number, status: Prisma.EnumFriendRequestStatusFieldUpdateOperationsInput) {
    return FriendDB.FriendRequest.update({
      id,
      receiverId: userId,
    }, { status })
  }

  remove(id: number) {
    return FriendDB.FriendRequest.del(id);
  }

  removeByUser(id: number, userid: number) {
    return FriendDB.FriendRequest.delByUser(id, userid)
  }


}
