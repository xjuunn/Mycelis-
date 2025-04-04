import { Injectable } from '@nestjs/common';
import { Prisma, FriendDB } from '@mycelis/database';

@Injectable()
export class FriendshipService {
  create(createFriendshipDto: Prisma.FriendshipCreateInput) {
    return FriendDB.Friendship.add(createFriendshipDto);
  }

  findAll(skip: number, take: number) {
    return FriendDB.Friendship.findAll(skip, take);
  }

  findByUserId(id: number, skip: number, take: number) {
    return FriendDB.Friendship.findByUserId(id, skip, take);
  }

  update(id: number, updateFriendshipDto: Prisma.FriendshipUpdateInput) {
    return FriendDB.Friendship.update(id, updateFriendshipDto);
  }

  remove(id: number) {
    return FriendDB.Friendship.del(id);
  }
}
