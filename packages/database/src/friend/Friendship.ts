import prisma from "../prisma";
import { Prisma, Friendship } from "@prisma/client";

/**
 * 创建好友关系
 * @param friendship 好友关系
 */
export function add(friendship: Prisma.FriendshipCreateInput) {
    return prisma.friendship.create({
        data: friendship, include: {
            friend: { omit: { passwordHash: true } },
            tags: true,
            user: { omit: { passwordHash: true } }
        }
    })
}

/**
 * 删除好友关系
 * @param id 好友关系ID
 */
export function del(id: number) {
    return prisma.friendship.delete({
        where: { id }, include: {
            friend: { omit: { passwordHash: true } },
            tags: true,
            user: { omit: { passwordHash: true } }
        }
    })
}

/**
 * 删除指定的好友关系
 * @param where 筛选
 */
export function delWhere(where: Prisma.FriendshipWhereUniqueInput) {
    return prisma.friendship.delete({
        where, include: { friend: { omit: { passwordHash: true } }, tags: true, user: { omit: { passwordHash: true } } }
    })
}

/**
 * 修改好友关系
 * @param id 关系ID
 * @param friendship 好友关系
 */
export function update(id: number, friendship: Prisma.FriendshipUpdateInput) {
    return prisma.friendship.update({
        where: { id }, data: friendship, include: {
            friend: { omit: { passwordHash: true } },
            tags: true,
            user: { omit: { passwordHash: true } }
        }
    })
}

export function udpateWhere(where: Prisma.FriendshipWhereUniqueInput, data: Prisma.FriendshipUpdateInput) {
    return prisma.friendship.update({
        where, data, include: {
            friend: {
                omit: { passwordHash: true }
            },
            tags: true,
            user: {
                omit: { passwordHash: true }
            }
        }
    })
}

/**
 * 获取所有的好友关系
 * @param skip 跳过
 * @param take 数据量
 */
export async function findAll(skip: number = 0, take: number = 15) {
    const [list, total] = await Promise.all([
        prisma.friendship.findMany({
            skip, take, include: { friend: { omit: { passwordHash: true } }, tags: true, user: { omit: { passwordHash: true } } },
            orderBy: { createAt: 'desc' },
        }),
        prisma.friendship.count()
    ])
    return {
        list, total, skip, take
    }
}

/**
 * 获取用户的所有好友
 * @param id 用户ID
 * @param skip 跳过
 * @param take 数据量
 */
export async function findByUserId(id: number, skip: number = 0, take: number = 15) {
    const [friendships, total] = await Promise.all([
        prisma.friendship.findMany({
            where: {
                OR: [
                    { userId: id },
                    { friendId: id }
                ]
            },
            include: {
                user: { omit: { passwordHash: true } },
                friend: { omit: { passwordHash: true } },
                tags: true
            },
            skip, take,
            orderBy: {
                createAt: 'desc'
            }
        }),
        prisma.friendship.count({
            where: {
                OR: [
                    { userId: id },
                    { friendId: id }
                ]
            }
        })
    ])
    const friends = friendships.map(f => {
        const isUser = f.userId === id;
        return {
            friendshipId: f.id,
            user: isUser ? f.friend : f.user,
            note: f.note,
            tags: f.tags,
            createdAt: f.createAt
        };
    });
    return {
        friends,
        total,
        take,
        skip
    }
}

export async function findWhere(where: Prisma.FriendshipWhereInput, skip: number, take: number) {
    const [list, total] = await Promise.all([
        prisma.friendship.findMany({
            where, skip, take,
            include: {
                friend: { omit: { passwordHash: true } },
                tags: true,
                user: { omit: { passwordHash: true } }
            }
        }),
        prisma.friendship.count({ where })
    ])
    return {
        list, total, take, skip
    }
}