import prisma from "../prisma";
import { Prisma, FriendRequest } from "@prisma/client";

/**
 * 添加好友请求
 * @param req 好友请求
 */
export function add(req: Prisma.FriendRequestCreateInput) {
    return prisma.friendRequest.create({ data: req });
}

/**
 * 删除好友请求
 * @param id 好友请求ID
 */
export function del(id: number) {
    return prisma.friendRequest.delete({ where: { id } })
}

/**
 * 查询所有的好友请求
 * @param skip 跳过
 * @param 数据量
 */
export async function findAll(skip: number = 0, take: number = 15) {
    const [list, total] = await Promise.all([
        prisma.friendRequest.findMany({
            skip, take, orderBy: { createAt: "desc" },
            include: { receiver: true, sender: true },
        }),
        prisma.friendRequest.count()
    ])
    return { list, total, skip, take }
}

/**
 * 查询用户的请求列表
 * @param id 请求发送者ID
 * @param skip 跳过
 * @param take 数据量
 */
export async function findByUserId(id: number, skip: number = 0, take: number = 15) {
    const [list, total] = await Promise.all([
        prisma.friendRequest.findMany({
            skip, take, where: {
                senderId: id
            },
            include: {
                receiver: true,
                sender: true
            }
        }),
        prisma.friendRequest.count({ where: { senderId: id } })
    ])
    return { list, total, skip, take }
}

/**
 * 查询特定的好友请求
 * @param where 查询
 * @param skip 跳过
 * @param take 数据量
 */
export async function findWhere(where: Prisma.FriendRequestWhereInput, skip: number = 0, take: number = 15) {
    const [list, total] = await Promise.all([
        prisma.friendRequest.findMany({ where, skip, take }),
        prisma.friendRequest.count({ where })
    ])
    return { list, total, skip, take }
}