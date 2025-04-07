import { Injectable } from '@nestjs/common';
import { Prisma, FriendDB, prisma } from '@mycelis/database';

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

  updateByUser(id: number, userId: number, data: Prisma.FriendshipUpdateInput) {
    return FriendDB.Friendship.udpateWhere({
      id, userId
    }, data)
  }

  remove(id: number) {
    return FriendDB.Friendship.del(id);
  }

  removeByUser(id: number, userId: number) {
    return FriendDB.Friendship.delWhere({
      id, userId
    })
  }

  async findMyFriend(id: number, skip: number, take: number) {
    const [list, total] = await Promise.all([
      prisma.friendship.findMany({
        where: {
          userId: id,
        }, skip, take,
        include: {
          tags: {
            take: 5
          },
          friend: {
            omit: { passwordHash: true }
          }
        }
      }),
      prisma.friendship.count({
        where: { userId: id }
      })
    ])
    return {
      list, total, skip, take
    }
  }

  async insertMyFriendTag(id: number, userId: number, tag: string) {
    let tagdata = await prisma.friendshipTag.findFirst({
      where: {
        friendshipId: id,
        tag
      }
    });
    if (tagdata) {
      return prisma.friendship.update({
        where: {
          id
        },
        include: {
          friend: {
            omit: { passwordHash: true },
          },
          tags: {
            take: 10
          }
        },
        data: {
          tags: {
            connect: {
              id: tagdata.id
            }
          }
        }
      })
    } else {
      return prisma.friendship.update({
        where: {
          id,
          userId
        },
        include: {
          user: {
            omit: { passwordHash: true }
          },
          tags: {
            take: 10
          }
        },
        data: {
          tags: {
            create: [{
              tag
            }]
          }
        }
      })
    }
  }

  async removeFriendTag(id: number, userId: number, tagId: number) {
    return prisma.friendship.update({
      where: {
        id, userId
      },
      include: {
        friend: {
          omit: { passwordHash: true }
        },
        tags: {
          take: 10
        }
      },
      data: {
        tags: {
          delete: {
            id: tagId
          }
        }
      }
    })
  }

  async listFriendTags(id: number, skip: number, take: number) {
    const [list, total] = await Promise.all([
      prisma.friendshipTag.findMany({
        where: {
          friendshipId: id
        },
        take, skip,
        include: {
          friendship: {
            include: {
              friend: {
                omit: {
                  passwordHash: true
                }
              }
            }
          }
        }
      }),
      prisma.friendshipTag.count({
        where: {
          friendshipId: id
        }
      })
    ])
    return {
      list, total, take, skip
    }
  }
}
