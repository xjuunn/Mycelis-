import prisma from "../prisma";
import { Prisma, Friendship } from "@prisma/client";

/**
 * 创建好友关系
 * @param friendship 好友关系
 */
export function add(friendship: Prisma.FriendshipCreateInput) {
    return prisma.friendship.create({ data: friendship })
}

/**
 * 删除好友关系
 * @param id 好友关系ID
 */
export function del(id: number) {
    return prisma.friendship.delete({ where: { id } })
}


/**
 * 修改好友关系
 * @param id 关系ID
 * @param friendship 好友关系
 */
export function update(id: number, friendship: Prisma.FriendshipUpdateInput) {
    return prisma.friendship.update({ where: { id }, data: friendship })
}

/**
 * 获取所有的好友关系
 * @param skip 跳过
 * @param take 数据量
 */
export async function findAll(skip: number = 0, take: number = 15) {
    const [list, total] = await Promise.all([
        prisma.friendship.findMany({
            skip, take, include: { friend: true, tags: true, user: true },
            orderBy: { createAt: 'desc' }
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
                user: true,
                friend: true,
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