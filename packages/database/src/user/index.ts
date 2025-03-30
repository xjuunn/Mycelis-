import prisma from "../prisma";
import { Prisma, User } from "@prisma/client";

/**
 * 添加用户
 * @param user 用户对象
 */
export function add(
  user: Prisma.UserCreateInput
): Prisma.Prisma__UserClient<User> {

  return prisma.user.create({
    data: { ...user },
  });
}

/**
 * 删除用户
 * @param name 用户名
 */
export function del(name: string): Prisma.Prisma__UserClient<User>;
/**
 * 删除用户
 * @param id 用户ID
 */
export function del(id: number): Prisma.Prisma__UserClient<User>;
export function del(nameOrId: string | number) {
  if (typeof nameOrId == "number") {
    return prisma.user.delete({
      where: {
        id: nameOrId,
      },
    });
  } else {
    return prisma.user.delete({
      where: {
        name: nameOrId,
      },
    });
  }
}

/**
 * 修改用户
 * @param where 用户过滤
 * @param data 用户数据
 */
export function update(
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput
): Prisma.Prisma__UserClient<User> {
  return prisma.user.update({
    where,
    data,
  });
}

/**
 * 查找用户
 * @param name 用户名
 */
export function find(name: string): Prisma.Prisma__UserClient<User | null>;
/**
 * 查找用户
 * @param id 用户ID
 */
export function find(id: number): Prisma.Prisma__UserClient<User | null>;
export function find(nameOrId: string | number) {
  if (typeof nameOrId == "number") {
    return prisma.user.findUnique({
      where: { id: nameOrId },
    });
  } else {
    return prisma.user.findUnique({
      where: { name: nameOrId },
    });
  }
}

/**
 * 查询用户列表
 * @param where 过滤
 * @param take 数量
 * @param skip 跳过
 */
export function list(
  where: Prisma.UserWhereInput,
  take: number = 15,
  skip: number = 0,
  orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[]
): Prisma.PrismaPromise<User[]> {
  return prisma.user.findMany({
    take,
    skip,
    where,
    orderBy
  });
}

/**
 * 当前查询条件下的数据总量
 * @param where 查询条件
 */
export async function total(
  where: Prisma.UserWhereInput
): Promise<number> {
  return prisma.user.count({ where });
}